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

interface FriendRequestPromise {
  user: User
  friend: User
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
      length: 1,
    }

    const randomName = uniqueNamesGenerator(config)

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      userId: randomId,
      displayName: randomName,
      status: 'online',
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

    console.log(`Session: ${req.session}`)
    // console.log(`Cookie: ${req.cookies}`)

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

  /*
    Friend requests
    ******************************************************************************************
  */

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
  ): Promise<FriendRequestPromise> {
    // Find the user
    const user = await User.findOne({ where: { id: req.session.userId } })

    // Find the friend
    const friend = await User.findOne({ where: { id: params.userId } })

    if (!user || !friend) throw new Error('User not found')

    user.friendRequests?.push(friend)
    await user?.save()

    friend.friendRequests?.push(user)
    await friend?.save()

    return { user, friend }
  }

  // Accept a friend request
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<FriendRequestPromise> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    const friend = await User.findOne({ where: { id: params.userId } })

    if (!user || !friend) throw new Error('User not found')

    user.friends?.push(friend)
    await user?.save()

    friend.friends?.push(user)
    await friend?.save()

    return { user, friend }
  }

  // Decline a friend request
  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<FriendRequestPromise> {
    const user = await User.findOne({ where: { id: req.session.userId } })

    const friend = await User.findOne({ where: { id: params.userId } })

    if (!user || !friend) throw new Error('User not found')

    user.friendRequests = user.friendRequests?.filter(
      (friendRequest) => friendRequest.id !== friend.id,
    )

    await user.save()

    friend.friendRequests = friend.friendRequests?.filter(
      (friendRequest) => friendRequest.id !== user.id,
    )

    await friend.save()

    return { user, friend }
  }
}
