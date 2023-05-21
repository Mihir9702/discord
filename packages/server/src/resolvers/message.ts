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
import { Message } from '../entities/Message'
import { MyContext } from '../types'
import { isAuth } from '../middleware/isAuth'

@InputType()
class MessageInput {
  @Field()
  content!: string
}

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return Message.find()
  }

  @Mutation(() => Message)
  @UseMiddleware(isAuth)
  async sendMessage(
    @Arg('params') params: MessageInput,
    @Ctx() { req }: MyContext,
  ): Promise<Message> {
    return await Message.create({
      ...params,
      senderId: req.session.username,
    }).save()
  }

  @Query(() => Message)
  async updateMessage(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string,
  ): Promise<Message> {
    const message = await Message.findOne({ where: { id } })

    if (!message) {
      throw new Error('Message not found')
    }

    if (typeof content !== 'undefined') {
      message.content = content
      await Message.save(message)
    }

    return message
  }

  @Query(() => Boolean)
  async deleteMessage(@Arg('id', () => Int) id: number): Promise<boolean> {
    const message = await Message.findOne({ where: { id } })

    if (!message) {
      throw new Error('Message not found')
    }

    await Message.remove(message)

    return true
  }
}
