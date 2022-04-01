import { Arg, Ctx, Query, Resolver, Int, Mutation } from 'type-graphql'
import { Server } from '../entities/Server'
import { MyContext } from '../types'

@Resolver()
export class ServerResolver {
  @Query(() => [Server])
  servers(@Ctx() { em }: MyContext): Promise<Server[]> {
    return em.find(Server, {})
  }

  // Create a new Server 📲
  @Mutation(() => Server)
  async createServer(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
    @Ctx() { em }: MyContext,
  ): Promise<Server> {
    const server = em.create(Server, { id, name })
    await em.persistAndFlush(server)
    return server
  }

  // Update a Server 🌀
  @Mutation(() => Server)
  async updateServer(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
    @Ctx() { em }: MyContext,
  ): Promise<Server> {
    const server = await em.findOne(Server, { id })
    if (!server) {
      throw new Error('Server not found')
    }
    if (typeof name !== 'undefined') {
      server.name = name
      await em.persistAndFlush(server)
    }
    return server
  }

  // Delete a Server ❌
  @Mutation(() => Boolean)
  async deleteServer(@Arg('id', () => Int) id: number, @Ctx() { em }: MyContext): Promise<boolean> {
    try {
      await em.nativeDelete(Server, { id })
      return true
    } catch (err) {
      throw new Error('Server not found')
    }
  }
}
