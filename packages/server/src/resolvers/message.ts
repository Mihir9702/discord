import {
  Arg,
  Ctx,
  Int,
  Field,
  Query,
  Mutation,
  Resolver,
  InputType,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'
import { Message } from '../entities/Message'
import { User } from '../entities/User'
import { Channel } from '../entities/Channel'
import { generateNumber } from '../helpers/rand'

@InputType()
class MessageInput {
  @Field() content!: string
  @Field() channelId!: number
}

@Resolver()
export class MessageResolver {
  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg('params', () => MessageInput) params: MessageInput,
    @Ctx() { req }: MyContext,
  ): Promise<Message> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) throw new Error('send msg - no user')

    const ch = await Channel.findOne({ where: { channelId: params.channelId } })
    if (!ch) throw new Error('send msg - no channel')

    const msgId = generateNumber(10)
    const msg = await Message.create({ ...params, ownerId: u, messageId: msgId }).save()

    ch.messages ? ch.messages.push(msg) : (ch.messages = [msg])

    await Channel.save(ch)
    return msg
  }

  @Query(() => Message)
  async updateMessage(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string,
  ): Promise<Message> {
    const msg = await Message.findOne({ where: { id } })
    if (!msg) throw new Error('update msg - no msg')

    if (typeof content !== 'undefined') {
      msg.content = content
      await Message.save(msg)
    }

    return msg
  }

  @Query(() => Boolean)
  async deleteMessage(
    @Arg('messageId', () => Int) messageId: number,
    @Arg('channelId', () => Int) channelId: number,
  ): Promise<boolean> {
    const msg = await Message.findOne({ where: { messageId } })
    if (!msg) throw new Error('delete msg - no msg')

    const ch = await Channel.findOne({ where: { channelId } })
    if (!ch) throw new Error('delete msg - no channel')

    await Message.remove(msg)
    return true
  }
}
