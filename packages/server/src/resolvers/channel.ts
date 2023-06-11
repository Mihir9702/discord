import { Arg, Ctx, Query, Mutation, Resolver, UseMiddleware } from 'type-graphql'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'
import { User } from '../entities/User'
import { Channel } from '../entities/Channel'
import { Server } from '../entities/Server'
import { generateNumber } from '../helpers/rand'

@Resolver()
export class ChannelResolver {
  @Query(() => Channel) // channel.getMessages() on frontend should display the chat
  @UseMiddleware(isAuth)
  async channel(
    @Arg('channelId') channelId: number,
    @Ctx() { req }: MyContext,
  ): Promise<Channel | null> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) throw new Error('channel - no user found')

    const ch = await Channel.findOne({ where: { channelId } })
    if (!ch) throw new Error('channel - no channel found')

    if (ch.users.includes(u)) return ch

    return null
  }

  @Query(() => [Channel])
  @UseMiddleware(isAuth)
  async channels(@Arg('serverId') serverId: number, @Ctx() { req }: MyContext): Promise<Channel[]> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) throw new Error('channels - no user found')

    const chs = await Server.findOne({ where: { serverId } }).then((s) => s && s.getChannels())
    if (!chs) throw new Error('channels - no chs found')

    return chs
  }

  @Mutation(() => Channel)
  @UseMiddleware(isAuth)
  async createChannel(
    @Arg('name') name: string,
    @Arg('serverId', { nullable: true }) serverId: number,
    @Ctx() { req }: MyContext,
  ): Promise<Channel> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) throw new Error('create channel - no user')

    const s = await Server.findOne({ where: { serverId } })
    if (!s) throw new Error('create channel - no server')

    const channelId = generateNumber(10)
    const ch = await Channel.findOne({ where: { channelId } })
    if (ch) throw new Error('create channel - channel created')

    const info = { name, serverId, channelId, users: [u] }

    return await Channel.create(info).save()
  }
}
