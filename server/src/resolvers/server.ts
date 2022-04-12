import { Arg, Query, Resolver, Int, Mutation } from 'type-graphql'
import { Server } from '../entities/Server'

@Resolver()
export class ServerResolver {
  @Query(() => [Server])
  servers(): Promise<Server[]> {
    return Server.find()
  }

  // 💻 Create a Server
  @Mutation(() => Server)
  async createServer(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
  ): Promise<Server> {
    return Server.create({ id, name }).save()
  }

  // 🌀 Update a Server
  @Mutation(() => Server)
  async updateServer(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
  ): Promise<Server> {
    const server = await Server.findOne({ where: { id } })

    if (!server) {
      throw new Error('Server not found')
    }

    if (typeof name !== 'undefined') {
      server.name = name
      await Server.save(server)
    }

    return server
  }

  // ❌ Delete a Server
  @Mutation(() => Boolean)
  async deleteServer(@Arg('id', () => Int) id: number): Promise<boolean> {
    const server = await Server.findOne({ where: { id } })

    if (!server) {
      throw new Error('Server not found')
    }

    await Server.remove(server)

    return true
  }
}
