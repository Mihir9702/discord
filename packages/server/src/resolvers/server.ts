import {
  Ctx,
  Int,
  Arg,
  Field,
  Query,
  Resolver,
  Mutation,
  InputType,
  UseMiddleware,
} from 'type-graphql'
import { Server } from '../entities/Server'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'
import { generate } from '../helpers/genRand'

@InputType()
class ServerInput {
  @Field()
  name!: string
}

@Resolver()
export class ServerResolver {
  // Get all the servers from a user
  @Query(() => [Server])
  @UseMiddleware(isAuth)
  async servers(@Ctx() { req }: MyContext): Promise<Server[]> {
    return Server.find({ where: { ownerId: req.session.userId } })
  }

  // 💻 Create a Server
  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg('params') params: ServerInput,
    @Ctx() { req }: MyContext,
  ): Promise<Server> {
    const _tag = generate()
    return Server.create({
      ...params,
      tag: _tag,
      ownerId: req.session.userId,
    }).save()
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
