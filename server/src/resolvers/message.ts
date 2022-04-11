import { Arg, Int, Query, Resolver } from 'type-graphql'
import { Message } from '../entities/Message'

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(): Promise<Message[]> {
    return Message.find()
  }

  // Send a Message 📲
  @Query(() => Message)
  async sendMessage(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string,
  ): Promise<Message> {
    return Message.create({ id, content }).save()
  }

  // Update a Message 🌀
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

  // Delete a Message ❌
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
