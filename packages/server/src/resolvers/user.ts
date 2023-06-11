import {
  Arg,
  Ctx,
  Int,
  Field,
  Query,
  Resolver,
  Mutation,
  InputType,
  UseMiddleware,
} from 'type-graphql'
import { MyContext } from '../types'
import { hash, genSalt, compare } from 'bcryptjs'
import { User } from '../entities/User'
import { generateNumber } from '../helpers/rand'
import { adjectives, colors, Config, uniqueNamesGenerator } from 'unique-names-generator'
import { isAuth } from '../middleware/isAuth'
import db from '../connect'

@InputType()
class Input {
  @Field() username!: string
  @Field() password!: string
}

@InputType()
class FriendInput {
  @Field() nameId!: string
  @Field() userId!: number
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await User.find()
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async user(@Ctx() { req }: MyContext): Promise<User | null> {
    return await User.findOne({ where: { id: req.session.idx } })
  }

  @Mutation(() => User)
  async signup(@Arg('params') params: Input): Promise<User> {
    if (await User.findOne({ where: { username: params.username } })) {
      throw new Error('Username already taken')
    }

    if (params.username.length < 2) throw new Error('Username must be at least 2 characters')
    if (params.password.length < 4) throw new Error('Password must be at least 4 characters')

    const hashedPassword = await hash(params.password, await genSalt(10))

    const randomId = generateNumber(4)

    const config: Config = {
      dictionaries: [adjectives, colors],
      length: 1,
    }

    const randomName = uniqueNamesGenerator(config)

    const user = await User.create({
      username: params.username.toLowerCase(),
      password: hashedPassword,
      userId: randomId,
      nameId: randomName,
      status: 'online',
    }).save()

    return user
  }

  @Mutation(() => User)
  async login(@Arg('params') params: Input, @Ctx() { req }: MyContext): Promise<User> {
    if (!params.username) throw new Error('Username not provided')
    if (!params.password) throw new Error('Password not provided')

    const user = await User.findOne({ where: { username: params.username } })

    if (!user) throw new Error('User not found')

    const valid = await compare(params.password, user!.password)

    if (!valid) throw new Error('Invalid username or password')

    req.session.idx = user.id

    return user
  }

  @Mutation(() => User) // todo
  async updateUser(@Arg('id', () => Int) id: number, @Arg('params') params: Input): Promise<User> {
    const u = await User.findOne({ where: { id } })
    if (!u) throw new Error('User not found')

    if (params.username) u.username = params.username
    if (params.password) u.password = params.password

    await User.save(u)
    return u
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteUser(@Ctx() { req }: MyContext): Promise<boolean> {
    const u = await User.findOne({ where: { id: req.session.idx } })
    if (!u) throw new Error('User not found')

    await User.remove(u)
    return true
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async logout(@Ctx() { req }: MyContext): Promise<boolean> {
    return req.session.destroy((err) => (err ? err : true)) ? true : false
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async sendFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User> {
    const uid = await User.findOne({ where: { id: req.session.idx } })

    const fid: User | undefined = await db
      .getRepository(User)
      .createQueryBuilder('uid')
      .where('uid.nameId = :nameId', { nameId: params.nameId })
      .andWhere('uid.userId = :userId', { userId: params.userId })
      .getRawOne()

    if (uid === null) throw new Error('send friend request - no user')
    if (fid === undefined) throw new Error('send friend request - no friend')
    if (fid) console.log('FOUND FRIEND', fid)

    fid && fid.friendRequests
      ? fid.friendRequests.push({ uid, status: 'pending' })
      : (fid.friendRequests = [{ uid, status: 'pending' }])

    uid && uid.friendRequests
      ? uid.friendRequests.push({ uid: fid, status: 'received' })
      : (uid.friendRequests = [{ uid: fid, status: 'received' }])

    await User.save(uid)
    await User.save(fid)

    return uid
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async acceptFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User> {
    const uid = await User.findOne({ where: { id: req.session.idx } })

    const fid: User | undefined = await db
      .getRepository(User)
      .createQueryBuilder('uid')
      .where('uid.nameId = :nameId', { nameId: params.nameId })
      .andWhere('uid.userId = :userId', { userId: params.userId })
      .getRawOne()

    if (uid === null) throw new Error('accept friend request - no user')
    if (fid === undefined) throw new Error('accept friend request - no friend')

    fid.friendRequests = fid.friendRequests && fid.friendRequests.filter((fr) => fr.uid !== uid)
    uid.friendRequests = uid.friendRequests && uid.friendRequests.filter((fr) => fr.uid !== fid)

    uid && uid.friends ? uid.friends.push(fid) : (uid.friends = [fid])
    fid && fid.friends ? fid.friends.push(uid) : (fid.friends = [uid])

    await User.save(uid)
    await User.save(fid)

    return uid
  }

  @Mutation(() => User)
  @UseMiddleware(isAuth)
  async declineFriendRequest(
    @Arg('params') params: FriendInput,
    @Ctx() { req }: MyContext,
  ): Promise<User> {
    const uid = await User.findOne({ where: { id: req.session.idx } })

    const fid: User | undefined = await db
      .getRepository(User)
      .createQueryBuilder('uid')
      .where('uid.nameId = :nameId', { nameId: params.nameId })
      .andWhere('uid.userId = :userId', { userId: params.userId })
      .getRawOne()

    if (uid === null) throw new Error('delete friend request - no user')
    if (fid === undefined) throw new Error('delete friend request - no friend')

    fid.friendRequests = fid.friendRequests && fid.friendRequests.filter((fr) => fr.uid !== uid)
    uid.friendRequests = uid.friendRequests && uid.friendRequests.filter((fr) => fr.uid !== fid)

    await User.save(uid)
    await User.save(fid)

    return uid
  }
}
