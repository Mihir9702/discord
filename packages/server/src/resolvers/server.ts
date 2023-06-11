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
import { MyContext, ServerRole } from '../types'
import { isAuth } from '../middleware/isAuth'
import { generate, generateNumber } from '../helpers/rand'
import { User } from '../entities/User'

@InputType()
class ServerInput {
  @Field() name!: string
  @Field() icon!: string
  @Field() role!: ServerRole
}

@Resolver()
export class ServerResolver {
  @Query(() => [Server])
  async serverz(): Promise<Server[]> {
    return await Server.find()
  }

  @Query(() => [Server])
  @UseMiddleware(isAuth)
  async servers(): Promise<Server[]> {
    return await Server.find()
  }

  @Query(() => Server)
  @UseMiddleware(isAuth)
  async server(@Arg('id') id: number): Promise<Server | null> {
    return await Server.findOne({ where: { id } })
  }

  @Query(() => [Server]) // Get all the servers from a user
  @UseMiddleware(isAuth)
  async userServers(@Ctx() { req }: MyContext): Promise<Server[] | null> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    const s = u && u.getServers()
    return (s && s) || null
  }

  @Mutation(() => Server)
  @UseMiddleware(isAuth)
  async createServer(
    @Arg('params') params: ServerInput,
    @Ctx() { req }: MyContext,
  ): Promise<Server> {
    const link = generate()
    const serverId = generateNumber(5)

    const findLink = await Server.findOne({ where: { link } })
    if (findLink) throw new Error('create server - link generation failed')

    const uid = await User.findOne({ where: { id: req.session.idx } })
    if (!uid) throw new Error('create server - no user')

    const s = await Server.create({ ...params, link, ownerId: uid, serverId }).save()

    await s.init()
    return s
  }

  @Mutation(() => Server) // todo
  @UseMiddleware(isAuth)
  async updateServer(
    @Arg('id', () => Int) id: number,
    @Arg('name', () => String) name: string,
  ): Promise<Server> {
    const s = await Server.findOne({ where: { id } })
    if (!s) throw new Error('no server')

    if (typeof name !== 'undefined') {
      s.name = name
      await Server.save(s)
    }

    return s
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteServer(@Arg('id') id: number, @Ctx() { req }: MyContext): Promise<boolean> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) return false

    const s = await Server.findOne({ where: { id } })
    if (!s) return false

    if (s.ownerId !== u) return false

    await Server.remove(s)
    return true
  }
}
