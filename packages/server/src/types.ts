import { Request, Response } from 'express'
import { Session, SessionData } from 'express-session'
import { User } from './entities/User'

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { idx?: number }
  }
  res: Response
}

export enum ServerRole {
  MEMBER = 'MEMBER',
  ADMIN = 'ADMIN',
  OWNER = 'OWNER',
}

export type FriendStatus = 'online' | 'pending' | 'blocked' | 'received'
export type FriendRequest = {
  uid: User
  status: FriendStatus
}
