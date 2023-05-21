import { createContext } from 'react'
import { UserQuery } from './graphql'

export type User = UserQuery['user']

export const UserContext = createContext<User>({} as User)
