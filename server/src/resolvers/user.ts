import { Arg, Ctx, Query, Resolver, Int, Mutation, InputType, Field } from 'type-graphql'
import { User } from '../entities/User'
import { MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { COOKIE } from '../constants'

@InputType()
class SignupInput {
  @Field()
  name!: string

  @Field()
  username!: string

  @Field()
  password!: string
}

@InputType()
class LoginInput {
  @Field()
  username!: string

  @Field()
  password!: string
}

@Resolver()
export class UserResolver {
  // Testing purposes only 🧪 | ** REMOVE IN PROD **
  ///////////////////////////////////////////////////
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {})
  }
  ///////////////////////////////////////////////////

  // Find user by session id 🔎
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null
    }
    const user = await em.findOne(User, { id: req.session.userId })
    return user
  }

  // Create a new user 👶
  @Mutation(() => User)
  async signup(@Arg('params') params: SignupInput, @Ctx() { em, req }: MyContext): Promise<User> {
    // Find if user already exists
    const foundUser = await em.findOne(User, { username: params.username.toLowerCase() })

    if (foundUser) throw new Error('Username already taken')
    if (params.username.length < 3) throw new Error('Username must be at least 3 characters')
    if (params.password.length < 8) throw new Error('Password must be at least 8 characters')

    const hashedPassword = await hash(params.password, await genSalt(10))

    const user = em.create(User, {
      ...params,
      password: hashedPassword,
    })

    try {
      await em.persistAndFlush(user)
    } catch (err) {
      throw new Error('Error creating user')
    }

    req.session.userId = user.id

    return user
  }

  // Login 💳
  @Mutation(() => User)
  async login(@Arg('params') params: LoginInput, @Ctx() { em, req }: MyContext): Promise<User> {
    const user = await em.findOne(User, { username: params.username.toLowerCase() })

    if (!params.password) throw new Error('Password not provided')

    const valid = await compare(params.password, user!.password)

    if (!user || !valid) throw new Error('Invalid username or password')

    req.session.userId = user.id

    return user
  }

  // ! Below is not complete 🤔
  // Update a user 🌀
  @Mutation(() => User)
  async updateUser(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
    @Ctx() { em }: MyContext,
  ): Promise<User> {
    const user = await em.findOne(User, { id })
    if (!user) {
      throw new Error('User not found')
    }
    if (typeof name !== 'undefined') {
      user.name = name
      await em.persistAndFlush(user)
    }
    return user
  }

  // Delete a user ❌
  @Mutation(() => Boolean)
  async deleteUser(@Arg('id', () => Int) id: number, @Ctx() { em }: MyContext): Promise<boolean> {
    try {
      await em.nativeDelete(User, { id })
      return true
    } catch (err) {
      throw new Error('User not found')
    }
  }

  // Logout 🔓
  @Mutation(() => Boolean)
  async logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie(COOKIE)
        if (err) {
          console.log(err)
          resolve(false)
        }
        resolve(true)
      }),
    )
  }
}
