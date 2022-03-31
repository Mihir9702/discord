import { Arg, Ctx, Query, Resolver, Int, Mutation } from 'type-graphql'
import { User } from '../entities/User'
import { MyContext } from '../types'

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users(@Ctx() { em }: MyContext): Promise<User[]> {
    return em.find(User, {})
  }

  @Query(() => User, { nullable: true })
  post(@Arg('id', () => Int) id: number, @Ctx() { em }: MyContext): Promise<User | null> {
    return em.findOne(User, { id })
  }

  // Create a new user 👶
  @Mutation(() => User)
  async createUser(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
    @Ctx() { em }: MyContext,
  ): Promise<User> {
    const user = em.create(User, { id, name })
    await em.persistAndFlush(user)
    return user
  }

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
}
