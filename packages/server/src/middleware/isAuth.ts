import { MiddlewareFn } from 'type-graphql'
import { MyContext } from '../types'

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.username) {
    throw new Error('Please log in')
  }

  return next()
}
