import {
  Arg,
  Ctx,
  Int,
  Field,
  Query,
  Resolver,
  Mutation,
  InputType,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { User } from '../entities/User'
import { generateNumber } from '../helpers/rand'
import { adjectives, colors, Config, uniqueNamesGenerator } from 'unique-names-generator'
import { isAuth } from '../middleware/isAuth'

@InputType()
class Input {
  @Field()
  username!: string

  @Field()
  password!: string
}

@InputType()
class FriendInput {
  @Field()
  displayName!: string

  @Field()
  userId!: number
}

@Resolver()
export class UserResolver {
  // 🧪 Testing purposes only | ** REMOVE IN PROD **
  ///////////////////////////////////////////////////
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find()
  }
  ///////////////////////////////////////////////////

  // 🔎 Find user by session id
  @Query(() => User, { nullable: true })
  async user(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null
    }
    const user = await User.findOne({ where: { id: req.session.userId } })
    return user
  }

  // 👶 Create a new user
  @Mutation(() => User)
  async signup(@Arg('params') params: Input, @Ctx() { req }: MyContext): Promise<User> {
    // Find if user already exists
    const foundUser = await User.findOne({ where: { username: params.username } })

    if (foundUser) throw new Error('Username already taken')
    if (params.username.length < 2) throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4) throw new Error('Password must be at least 4 characters')

    const hashedPassword = await hash(params.password, await genSalt(10))

    const randomId = generateNumber(4)

    const config: Config = {
      dictionaries: [adjectives, colors],
      separator: '-',
      length: 2,
    }

    const randomName = uniqueNamesGenerator(config)

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      userId: randomId,
      displayName: randomName,
    }).save()

    req.session.userId = user.id

    return user
  }

  // 🔒 Login
  @Mutation(() => User)
  async login(@Arg('params') params: Input, @Ctx() { req }: MyContext): Promise<User> {
    if (!params.username) throw new Error('Username not provided')
    if (!params.password) throw new Error('Password not provided')

    const user = await User.findOne({ where: { username: params.username } })

    if (!user) throw new Error('User not found')

    const valid = await compare(params.password, user!.password)

    if (!valid) throw new Error('Invalid username or password')

    req.session.userId = user.id

    console.log(req.session)

    return user
  }

  // 🌀 Update a user
  @Mutation(() => User)
  async updateUser(@Arg('id', () => Int) id: number, @Arg('params') params: Input): Promise<User> {
    const user = await User.findOne({ where: { id } })

    if (!user) throw new Error('User not found')

    if (params.username) user.username = params.username
    if (params.password) user.password = params.password

    await user.save()

    return user
  }

  // ❌ Delete a user
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number): Promise<boolean> {
    const user = await User.findOne({ where: { id } })

    if (!user) throw new Error('User not found')

    await user.remove()

    return true
  }

  // 🔓 Logout
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    req.session.destroy((err) => (err ? err : true))

    return true
  }

  // 🎯 Friends
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async friends(@Ctx() { req }: MyContext): Promise<User[] | undefined> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    return user?.friends
  }

  // 🔔 Add a friend
  @Query(() => [User])
  @UseMiddleware(isAuth)
  async friendRequests(@Ctx() { req }: MyContext): Promise<User[] | undefined> {
    if (!req.session.userId) throw new Error('User not found')

    const user = await User.findOne({ where: { id: req.session.userId } })

    return user?.friendRequests
  }

  // Send a friend request
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    // * setting friend as any to avoid type error because I don't know how to fix it yet
    // ? friend: Promise<User | null>
    // ? friendRequests: User[]

    const friend = await User.createQueryBuilder('user')
      .where('user.displayName = :displayName', { displayName: params.displayName })
      .andWhere('user.userId = :userId', { userId: params.userId })
      .getOne()

    if (!user || !friend) throw new Error('User not found')

    console.log('User: ', user)
    console.log('Friend: ', friend)

    // The user information should be stored in the friend's friendRequests array
    // The friend does not need to be stored in the user because it is already stored in the friend's friendRequests array
    // The friend will see the friend request and can accept or decline it and only then the user will have the friend in his friends array

    if (friend.friends?.includes(user)) throw new Error('User is already a friend')

    if (friend.friendRequests?.includes(user))
      throw new Error('User has already sent a friend request')

    // ! Friend's friendRequests array is not being updated because it is not being used anywhere
    friend.friendRequests?.push(user)

    await friend.save()

    console.log('Friend requests: ', friend.friendRequests)

    return friend
  }

  // Accept a friend request
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User | null> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    if (!user) throw new Error('User not found')

    const friend = User.createQueryBuilder('user')
      .where('user.displayName = :displayName', { displayName: params.displayName })
      .andWhere('user.userId = :userId', { userId: params.userId })
      .getOne()

    if (!friend) throw new Error('User not found')

    friend.then((f) => {
      f?.friends?.push(friend as any)
      f?.save()
    })

    return friend
  }

  // Decline a friend request
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    if (!user) throw new Error('User not found')

    const friend = User.createQueryBuilder('user')
      .where('user.displayName = :displayName', { displayName: params.displayName })
      .andWhere('user.userId = :userId', { userId: params.userId })

    if (!friend) throw new Error('User not found')

    user.friendRequests = user.friendRequests?.filter(
      (friendRequest) => friendRequest !== (friend as any),
    )

    await user.save()

    return user
  }
}
