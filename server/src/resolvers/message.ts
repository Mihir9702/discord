import { Arg, Ctx, Query, Resolver, Int, Mutation } from 'type-graphql'
import { Message } from '../entities/Message'
import { MyContext } from '../types'

@Resolver()
export class MessageResolver {
  @Query(() => [Message])
  messages(@Ctx() { em }: MyContext): Promise<Message[]> {
    return em.find(Message, {})
  }

  // Create a new Message 📩
  @Mutation(() => Message)
  async createMessage(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string,
    @Ctx() { em }: MyContext,
  ): Promise<Message> {
    const message = em.create(Message, { id, content })
    await em.persistAndFlush(message)
    return message
  }

  // Update a Message 🌀
  @Mutation(() => Message)
  async updateMessage(
    @Arg('id', () => Int) id: number,
    @Arg('content', () => String) content: string,
    @Ctx() { em }: MyContext,
  ): Promise<Message> {
    const message = await em.findOne(Message, { id })
    if (!message) {
      throw new Error('Message not found')
    }
    if (typeof content !== 'undefined') {
      message.content = content
      await em.persistAndFlush(message)
    }
    return message
  }

  // Delete a Message ❌
  @Mutation(() => Boolean)
  async deleteMessage(
    @Arg('id', () => Int) id: number,
    @Ctx() { em }: MyContext,
  ): Promise<boolean> {
    try {
      await em.nativeDelete(Message, { id })
      return true
    } catch (err) {
      throw new Error('Message not found')
    }
  }
}
