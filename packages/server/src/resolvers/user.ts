import { Arg, Ctx, Query, Resolver, Int, Mutation, InputType, Field } from 'type-graphql'
import { MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { User } from '../entities/User'
import { generateNumber } from '../helpers/rand'

@InputType()
class Input {
  @Field()
  username!: string

  @Field()
  password!: string
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

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      userId: randomId,
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

    if (!user) throw new Error('Invalid username or password')

    const valid = await compare(params.password, user!.password)

    if (!valid) throw new Error('Invalid username or password')

    req.session.userId = user.id

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
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    await req.session.destroy((err) => (err ? err : true))

    return true
  }
}
