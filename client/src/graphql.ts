import { GraphQLResolveInfo } from 'graphql';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Channel = {
  __typename?: 'Channel';
  channelId: Scalars['String']['output'];
  createdAt: Scalars['String']['output'];
  desc?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  messages?: Maybe<Array<Message>>;
  name: Scalars['String']['output'];
  ptChat: Scalars['Boolean']['output'];
  server?: Maybe<Server>;
  updatedAt: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type FriendInput = {
  nameId: Scalars['String']['input'];
  userId: Scalars['Float']['input'];
};

export type FriendRequest = {
  __typename?: 'FriendRequest';
  iconId: Scalars['String']['output'];
  nameId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
};

export type Input = {
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Message = {
  __typename?: 'Message';
  channel?: Maybe<Channel>;
  createdAt: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  msg: Scalars['String']['output'];
  msgId: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  user?: Maybe<User>;
};

export type MessageInput = {
  channelId: Scalars['String']['input'];
  msg: Scalars['String']['input'];
};

export type MessagesResponse = {
  __typename?: 'MessagesResponse';
  channel: Channel;
  friend?: Maybe<User>;
  messages: Array<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: User;
  ban: Scalars['Boolean']['output'];
  block: User;
  cancelFriendRequest: User;
  createServer: Server;
  createServerChannel: Channel;
  declineFriendRequest: User;
  deleteChannel: Scalars['Boolean']['output'];
  deleteServer: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  join?: Maybe<User>;
  kick: Scalars['Boolean']['output'];
  leave: Scalars['Boolean']['output'];
  login: User;
  logout: Scalars['Boolean']['output'];
  removeFriend: User;
  sendFriendRequest: User;
  sendMessage: Message;
  signup: User;
  unban: Scalars['Boolean']['output'];
  unblock: User;
  updateChannel: Channel;
  updatePass: User;
  updateServer: Server;
  updateStatus: User;
  updateUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  params: FriendInput;
};


export type MutationBanArgs = {
  params: FriendInput;
  serverId: Scalars['Float']['input'];
};


export type MutationBlockArgs = {
  params: FriendInput;
};


export type MutationCancelFriendRequestArgs = {
  params: FriendInput;
};


export type MutationCreateServerArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateServerChannelArgs = {
  name: Scalars['String']['input'];
  serverId: Scalars['Float']['input'];
};


export type MutationDeclineFriendRequestArgs = {
  params: FriendInput;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type MutationDeleteServerArgs = {
  id: Scalars['Float']['input'];
};


export type MutationJoinArgs = {
  link: Scalars['String']['input'];
};


export type MutationKickArgs = {
  params: FriendInput;
  serverId: Scalars['Float']['input'];
};


export type MutationLeaveArgs = {
  serverId: Scalars['Float']['input'];
};


export type MutationLoginArgs = {
  params: Input;
};


export type MutationRemoveFriendArgs = {
  params: FriendInput;
};


export type MutationSendFriendRequestArgs = {
  params: FriendInput;
};


export type MutationSendMessageArgs = {
  params: MessageInput;
};


export type MutationSignupArgs = {
  params: Input;
};


export type MutationUnbanArgs = {
  params: FriendInput;
  serverId: Scalars['Float']['input'];
};


export type MutationUnblockArgs = {
  params: FriendInput;
};


export type MutationUpdateChannelArgs = {
  channelId: Scalars['String']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdatePassArgs = {
  params: UpdatePassInput;
};


export type MutationUpdateServerArgs = {
  name: Scalars['String']['input'];
  serverId: Scalars['Int']['input'];
};


export type MutationUpdateStatusArgs = {
  status: Scalars['String']['input'];
};


export type MutationUpdateUserArgs = {
  params: UpdateUserInput;
};

export type Query = {
  __typename?: 'Query';
  channel: Server;
  currentChannel: Channel;
  deleteMessage: Scalars['Boolean']['output'];
  message: Message;
  messages: MessagesResponse;
  partyChats: Array<Channel>;
  server?: Maybe<Server>;
  serverChannels: Array<Channel>;
  serverRole?: Maybe<Array<User>>;
  servers: Array<Server>;
  updateMessage: Message;
  user?: Maybe<User>;
  userChannels: Array<Channel>;
  userFriends?: Maybe<User>;
  userServers?: Maybe<Array<Server>>;
  users: Array<User>;
};


export type QueryChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryCurrentChannelArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryDeleteMessageArgs = {
  channelId: Scalars['String']['input'];
  msgId: Scalars['String']['input'];
};


export type QueryMessageArgs = {
  msgId: Scalars['String']['input'];
};


export type QueryMessagesArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryServerArgs = {
  serverId: Scalars['Float']['input'];
};


export type QueryServerChannelsArgs = {
  channelId: Scalars['String']['input'];
};


export type QueryServerRoleArgs = {
  serverId: Scalars['Float']['input'];
};


export type QueryUpdateMessageArgs = {
  content: Scalars['String']['input'];
  msgId: Scalars['String']['input'];
};

export type Server = {
  __typename?: 'Server';
  banned?: Maybe<Array<User>>;
  channels?: Maybe<Array<Channel>>;
  createdAt: Scalars['String']['output'];
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  link: Scalars['String']['output'];
  name: Scalars['String']['output'];
  serverId: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  users?: Maybe<Array<User>>;
};

export type ServerRole = {
  __typename?: 'ServerRole';
  role: Scalars['String']['output'];
  serverId: Scalars['Int']['output'];
};

export type UpdatePassInput = {
  currPass: Scalars['String']['input'];
  newPass: Scalars['String']['input'];
};

export type UpdateUserInput = {
  nameId?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  blocked?: Maybe<Array<User>>;
  channels?: Maybe<Array<Channel>>;
  createdAt: Scalars['String']['output'];
  friendRequests?: Maybe<Array<FriendRequest>>;
  friends?: Maybe<Array<User>>;
  iconId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  messages?: Maybe<Array<Message>>;
  nameId: Scalars['String']['output'];
  roles?: Maybe<Array<ServerRole>>;
  servers?: Maybe<Array<Server>>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['Float']['output'];
  username: Scalars['String']['output'];
};

export type AcceptFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'User', id: number, nameId: string, userId: number, friends?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number, status: string }> | null, friendRequests?: Array<{ __typename?: 'FriendRequest', nameId: string, userId: number, status: string }> | null, channels?: Array<{ __typename?: 'Channel', id: number, name: string, channelId: string, users?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number }> | null }> | null } };

export type BlockMutationVariables = Exact<{
  params: FriendInput;
}>;


export type BlockMutation = { __typename?: 'Mutation', block: { __typename?: 'User', nameId: string, userId: number } };

export type CancelFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type CancelFriendRequestMutation = { __typename?: 'Mutation', cancelFriendRequest: { __typename?: 'User', id: number, nameId: string, userId: number, status: string, friends?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number, status: string }> | null, friendRequests?: Array<{ __typename?: 'FriendRequest', nameId: string, userId: number, status: string }> | null } };

export type CreateServerMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: number, name: string, link: string, serverId: number, channels?: Array<{ __typename?: 'Channel', id: number, name: string, channelId: string, users?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number }> | null, messages?: Array<{ __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: number, nameId: string, userId: number } | null }> | null }> | null } };

export type CreateServerChannelMutationVariables = Exact<{
  name: Scalars['String']['input'];
  serverId: Scalars['Float']['input'];
}>;


export type CreateServerChannelMutation = { __typename?: 'Mutation', createServerChannel: { __typename?: 'Channel', id: number, name: string, channelId: string } };

export type DeclineFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest: { __typename?: 'User', id: number, nameId: string, userId: number, status: string, friends?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number, status: string }> | null, friendRequests?: Array<{ __typename?: 'FriendRequest', nameId: string, userId: number, status: string }> | null } };

export type JoinMutationVariables = Exact<{
  link: Scalars['String']['input'];
}>;


export type JoinMutation = { __typename?: 'Mutation', join?: { __typename?: 'User', nameId: string, userId: number, servers?: Array<{ __typename?: 'Server', name: string, link: string, serverId: number }> | null } | null };

export type LoginMutationVariables = Exact<{
  params: Input;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RemoveFriendMutationVariables = Exact<{
  params: FriendInput;
}>;


export type RemoveFriendMutation = { __typename?: 'Mutation', removeFriend: { __typename?: 'User', nameId: string, userId: number } };

export type SendFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'User', id: number, nameId: string, userId: number, status: string, friends?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number, status: string }> | null, friendRequests?: Array<{ __typename?: 'FriendRequest', nameId: string, userId: number, status: string }> | null } };

export type SendMessageMutationVariables = Exact<{
  params: MessageInput;
}>;


export type SendMessageMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', msg: string, msgId: string, createdAt: string, updatedAt: string, user?: { __typename?: 'User', nameId: string, userId: number } | null, channel?: { __typename?: 'Channel', channelId: string } | null } };

export type SignupMutationVariables = Exact<{
  params: Input;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: number } };

export type UnblockMutationVariables = Exact<{
  params: FriendInput;
}>;


export type UnblockMutation = { __typename?: 'Mutation', unblock: { __typename?: 'User', nameId: string, userId: number } };

export type UpdatePassMutationVariables = Exact<{
  params: UpdatePassInput;
}>;


export type UpdatePassMutation = { __typename?: 'Mutation', updatePass: { __typename?: 'User', nameId: string, userId: number } };

export type UpdateStatusMutationVariables = Exact<{
  status: Scalars['String']['input'];
}>;


export type UpdateStatusMutation = { __typename?: 'Mutation', updateStatus: { __typename?: 'User', id: number, nameId: string, userId: number, status: string, createdAt: string, updatedAt: string } };

export type UpdateUserMutationVariables = Exact<{
  params: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', nameId: string, userId: number } };

export type ChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ChannelQuery = { __typename?: 'Query', channel: { __typename?: 'Server', name: string, link: string, serverId: number, channels?: Array<{ __typename?: 'Channel', name: string, ptChat: boolean, channelId: string, users?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string, status: string }> | null, messages?: Array<{ __typename?: 'Message', msg: string, msgId: string, createdAt: string, updatedAt: string }> | null, server?: { __typename?: 'Server', serverId: number } | null }> | null } };

export type CurrentChannelQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type CurrentChannelQuery = { __typename?: 'Query', currentChannel: { __typename?: 'Channel', id: number, name: string, ptChat: boolean, channelId: string, users?: Array<{ __typename?: 'User', id: number, nameId: string, status: string }> | null } };

export type MessageQueryVariables = Exact<{
  msgId: Scalars['String']['input'];
}>;


export type MessageQuery = { __typename?: 'Query', message: { __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: number, nameId: string, userId: number } | null, channel?: { __typename?: 'Channel', name: string, channelId: string, ptChat: boolean, users?: Array<{ __typename?: 'User', id: number, nameId: string, userId: number }> | null, messages?: Array<{ __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string, user?: { __typename?: 'User', id: number, nameId: string, userId: number, messages?: Array<{ __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string }> | null } | null }> | null } | null } };

export type MessagesQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type MessagesQuery = { __typename?: 'Query', messages: { __typename?: 'MessagesResponse', channel: { __typename?: 'Channel', name: string, desc?: string | null, ptChat: boolean, channelId: string }, messages: Array<{ __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string, user?: { __typename?: 'User', nameId: string, userId: number, iconId: string } | null }>, friend?: { __typename?: 'User', nameId: string, userId: number, iconId: string, status: string } | null } };

export type PartyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type PartyChatsQuery = { __typename?: 'Query', partyChats: Array<{ __typename?: 'Channel', channelId: string, users?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string, status: string }> | null }> };

export type ServerQueryVariables = Exact<{
  serverId: Scalars['Float']['input'];
}>;


export type ServerQuery = { __typename?: 'Query', server?: { __typename?: 'Server', id: number, name: string, link: string, serverId: number, users?: Array<{ __typename?: 'User', id: number, servers?: Array<{ __typename?: 'Server', serverId: number }> | null }> | null, channels?: Array<{ __typename?: 'Channel', name: string, channelId: string, users?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string, status: string }> | null, messages?: Array<{ __typename?: 'Message', id: number, msg: string, msgId: string, createdAt: string, updatedAt: string, channel?: { __typename?: 'Channel', channelId: string } | null, user?: { __typename?: 'User', id: number, nameId: string, userId: number, iconId: string } | null }> | null }> | null } | null };

export type ServerChannelsQueryVariables = Exact<{
  channelId: Scalars['String']['input'];
}>;


export type ServerChannelsQuery = { __typename?: 'Query', serverChannels: Array<{ __typename?: 'Channel', name: string, channelId: string, server?: { __typename?: 'Server', name: string, serverId: number, channels?: Array<{ __typename?: 'Channel', name: string, channelId: string, users?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string }> | null }> | null } | null, users?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string }> | null }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, nameId: string, userId: number, iconId: string, status: string } | null };

export type UserFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFriendsQuery = { __typename?: 'Query', userFriends?: { __typename?: 'User', id: number, nameId: string, userId: number, iconId: string, friends?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string, status: string }> | null, friendRequests?: Array<{ __typename?: 'FriendRequest', nameId: string, userId: number, iconId: string, status: string }> | null, blocked?: Array<{ __typename?: 'User', nameId: string, userId: number, iconId: string, status: string }> | null } | null };

export type UserServersQueryVariables = Exact<{ [key: string]: never; }>;


export type UserServersQuery = { __typename?: 'Query', userServers?: Array<{ __typename?: 'Server', id: number, name: string, serverId: number, channels?: Array<{ __typename?: 'Channel', name: string, channelId: string }> | null }> | null };



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Channel: ResolverTypeWrapper<Channel>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  FriendInput: FriendInput;
  FriendRequest: ResolverTypeWrapper<FriendRequest>;
  Input: Input;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Message: ResolverTypeWrapper<Message>;
  MessageInput: MessageInput;
  MessagesResponse: ResolverTypeWrapper<MessagesResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Server: ResolverTypeWrapper<Server>;
  ServerRole: ResolverTypeWrapper<ServerRole>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdatePassInput: UpdatePassInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Channel: Channel;
  Float: Scalars['Float']['output'];
  FriendInput: FriendInput;
  FriendRequest: FriendRequest;
  Input: Input;
  Int: Scalars['Int']['output'];
  Message: Message;
  MessageInput: MessageInput;
  MessagesResponse: MessagesResponse;
  Mutation: {};
  Query: {};
  Server: Server;
  ServerRole: ServerRole;
  String: Scalars['String']['output'];
  UpdatePassInput: UpdatePassInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type ChannelResolvers<ContextType = any, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  desc?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ptChat?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  server?: Resolver<Maybe<ResolversTypes['Server']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FriendRequestResolvers<ContextType = any, ParentType extends ResolversParentTypes['FriendRequest'] = ResolversParentTypes['FriendRequest']> = {
  iconId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nameId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessageResolvers<ContextType = any, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  msg?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  msgId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MessagesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MessagesResponse'] = ResolversParentTypes['MessagesResponse']> = {
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  acceptFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationAcceptFriendRequestArgs, 'params'>>;
  ban?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationBanArgs, 'params' | 'serverId'>>;
  block?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationBlockArgs, 'params'>>;
  cancelFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCancelFriendRequestArgs, 'params'>>;
  createServer?: Resolver<ResolversTypes['Server'], ParentType, ContextType, RequireFields<MutationCreateServerArgs, 'name'>>;
  createServerChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationCreateServerChannelArgs, 'name' | 'serverId'>>;
  declineFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationDeclineFriendRequestArgs, 'params'>>;
  deleteChannel?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'channelId'>>;
  deleteServer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteServerArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  join?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationJoinArgs, 'link'>>;
  kick?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationKickArgs, 'params' | 'serverId'>>;
  leave?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationLeaveArgs, 'serverId'>>;
  login?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationLoginArgs, 'params'>>;
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  removeFriend?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationRemoveFriendArgs, 'params'>>;
  sendFriendRequest?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSendFriendRequestArgs, 'params'>>;
  sendMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<MutationSendMessageArgs, 'params'>>;
  signup?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationSignupArgs, 'params'>>;
  unban?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUnbanArgs, 'params' | 'serverId'>>;
  unblock?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnblockArgs, 'params'>>;
  updateChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, 'channelId' | 'name'>>;
  updatePass?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdatePassArgs, 'params'>>;
  updateServer?: Resolver<ResolversTypes['Server'], ParentType, ContextType, RequireFields<MutationUpdateServerArgs, 'name' | 'serverId'>>;
  updateStatus?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateStatusArgs, 'status'>>;
  updateUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'params'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channel?: Resolver<ResolversTypes['Server'], ParentType, ContextType, RequireFields<QueryChannelArgs, 'channelId'>>;
  currentChannel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType, RequireFields<QueryCurrentChannelArgs, 'channelId'>>;
  deleteMessage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<QueryDeleteMessageArgs, 'channelId' | 'msgId'>>;
  message?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<QueryMessageArgs, 'msgId'>>;
  messages?: Resolver<ResolversTypes['MessagesResponse'], ParentType, ContextType, RequireFields<QueryMessagesArgs, 'channelId'>>;
  partyChats?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  server?: Resolver<Maybe<ResolversTypes['Server']>, ParentType, ContextType, RequireFields<QueryServerArgs, 'serverId'>>;
  serverChannels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<QueryServerChannelsArgs, 'channelId'>>;
  serverRole?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryServerRoleArgs, 'serverId'>>;
  servers?: Resolver<Array<ResolversTypes['Server']>, ParentType, ContextType>;
  updateMessage?: Resolver<ResolversTypes['Message'], ParentType, ContextType, RequireFields<QueryUpdateMessageArgs, 'content' | 'msgId'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userChannels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  userFriends?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  userServers?: Resolver<Maybe<Array<ResolversTypes['Server']>>, ParentType, ContextType>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
};

export type ServerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Server'] = ResolversParentTypes['Server']> = {
  banned?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['Channel']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  icon?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serverId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  users?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ServerRoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['ServerRole'] = ResolversParentTypes['ServerRole']> = {
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serverId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  blocked?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  channels?: Resolver<Maybe<Array<ResolversTypes['Channel']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  friendRequests?: Resolver<Maybe<Array<ResolversTypes['FriendRequest']>>, ParentType, ContextType>;
  friends?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  iconId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<ResolversTypes['Message']>>, ParentType, ContextType>;
  nameId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles?: Resolver<Maybe<Array<ResolversTypes['ServerRole']>>, ParentType, ContextType>;
  servers?: Resolver<Maybe<Array<ResolversTypes['Server']>>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Channel?: ChannelResolvers<ContextType>;
  FriendRequest?: FriendRequestResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessagesResponse?: MessagesResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Server?: ServerResolvers<ContextType>;
  ServerRole?: ServerRoleResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};



export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($params: FriendInput!) {
  acceptFriendRequest(params: $params) {
    id
    nameId
    userId
    friends {
      id
      nameId
      userId
      status
    }
    friendRequests {
      nameId
      userId
      status
    }
    channels {
      id
      name
      channelId
      users {
        id
        nameId
        userId
      }
    }
  }
}
    `;
export type AcceptFriendRequestMutationFn = Apollo.MutationFunction<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;

/**
 * __useAcceptFriendRequestMutation__
 *
 * To run a mutation, you first call `useAcceptFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptFriendRequestMutation, { data, loading, error }] = useAcceptFriendRequestMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useAcceptFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument, options);
      }
export type AcceptFriendRequestMutationHookResult = ReturnType<typeof useAcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationResult = Apollo.MutationResult<AcceptFriendRequestMutation>;
export type AcceptFriendRequestMutationOptions = Apollo.BaseMutationOptions<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>;
export const BlockDocument = gql`
    mutation Block($params: FriendInput!) {
  block(params: $params) {
    nameId
    userId
  }
}
    `;
export type BlockMutationFn = Apollo.MutationFunction<BlockMutation, BlockMutationVariables>;

/**
 * __useBlockMutation__
 *
 * To run a mutation, you first call `useBlockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBlockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [blockMutation, { data, loading, error }] = useBlockMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useBlockMutation(baseOptions?: Apollo.MutationHookOptions<BlockMutation, BlockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BlockMutation, BlockMutationVariables>(BlockDocument, options);
      }
export type BlockMutationHookResult = ReturnType<typeof useBlockMutation>;
export type BlockMutationResult = Apollo.MutationResult<BlockMutation>;
export type BlockMutationOptions = Apollo.BaseMutationOptions<BlockMutation, BlockMutationVariables>;
export const CancelFriendRequestDocument = gql`
    mutation CancelFriendRequest($params: FriendInput!) {
  cancelFriendRequest(params: $params) {
    id
    nameId
    userId
    status
    friends {
      id
      nameId
      userId
      status
    }
    friendRequests {
      nameId
      userId
      status
    }
  }
}
    `;
export type CancelFriendRequestMutationFn = Apollo.MutationFunction<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;

/**
 * __useCancelFriendRequestMutation__
 *
 * To run a mutation, you first call `useCancelFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelFriendRequestMutation, { data, loading, error }] = useCancelFriendRequestMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCancelFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>(CancelFriendRequestDocument, options);
      }
export type CancelFriendRequestMutationHookResult = ReturnType<typeof useCancelFriendRequestMutation>;
export type CancelFriendRequestMutationResult = Apollo.MutationResult<CancelFriendRequestMutation>;
export type CancelFriendRequestMutationOptions = Apollo.BaseMutationOptions<CancelFriendRequestMutation, CancelFriendRequestMutationVariables>;
export const CreateServerDocument = gql`
    mutation CreateServer($name: String!) {
  createServer(name: $name) {
    id
    name
    link
    serverId
    channels {
      id
      name
      channelId
      users {
        id
        nameId
        userId
      }
      messages {
        id
        msg
        msgId
        createdAt
        updatedAt
        user {
          id
          nameId
          userId
        }
      }
    }
  }
}
    `;
export type CreateServerMutationFn = Apollo.MutationFunction<CreateServerMutation, CreateServerMutationVariables>;

/**
 * __useCreateServerMutation__
 *
 * To run a mutation, you first call `useCreateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerMutation, { data, loading, error }] = useCreateServerMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateServerMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerMutation, CreateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument, options);
      }
export type CreateServerMutationHookResult = ReturnType<typeof useCreateServerMutation>;
export type CreateServerMutationResult = Apollo.MutationResult<CreateServerMutation>;
export type CreateServerMutationOptions = Apollo.BaseMutationOptions<CreateServerMutation, CreateServerMutationVariables>;
export const CreateServerChannelDocument = gql`
    mutation CreateServerChannel($name: String!, $serverId: Float!) {
  createServerChannel(name: $name, serverId: $serverId) {
    id
    name
    channelId
  }
}
    `;
export type CreateServerChannelMutationFn = Apollo.MutationFunction<CreateServerChannelMutation, CreateServerChannelMutationVariables>;

/**
 * __useCreateServerChannelMutation__
 *
 * To run a mutation, you first call `useCreateServerChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServerChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServerChannelMutation, { data, loading, error }] = useCreateServerChannelMutation({
 *   variables: {
 *      name: // value for 'name'
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useCreateServerChannelMutation(baseOptions?: Apollo.MutationHookOptions<CreateServerChannelMutation, CreateServerChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServerChannelMutation, CreateServerChannelMutationVariables>(CreateServerChannelDocument, options);
      }
export type CreateServerChannelMutationHookResult = ReturnType<typeof useCreateServerChannelMutation>;
export type CreateServerChannelMutationResult = Apollo.MutationResult<CreateServerChannelMutation>;
export type CreateServerChannelMutationOptions = Apollo.BaseMutationOptions<CreateServerChannelMutation, CreateServerChannelMutationVariables>;
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($params: FriendInput!) {
  declineFriendRequest(params: $params) {
    id
    nameId
    userId
    status
    friends {
      id
      nameId
      userId
      status
    }
    friendRequests {
      nameId
      userId
      status
    }
  }
}
    `;
export type DeclineFriendRequestMutationFn = Apollo.MutationFunction<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;

/**
 * __useDeclineFriendRequestMutation__
 *
 * To run a mutation, you first call `useDeclineFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineFriendRequestMutation, { data, loading, error }] = useDeclineFriendRequestMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useDeclineFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument, options);
      }
export type DeclineFriendRequestMutationHookResult = ReturnType<typeof useDeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationResult = Apollo.MutationResult<DeclineFriendRequestMutation>;
export type DeclineFriendRequestMutationOptions = Apollo.BaseMutationOptions<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>;
export const JoinDocument = gql`
    mutation Join($link: String!) {
  join(link: $link) {
    nameId
    userId
    servers {
      name
      link
      serverId
    }
  }
}
    `;
export type JoinMutationFn = Apollo.MutationFunction<JoinMutation, JoinMutationVariables>;

/**
 * __useJoinMutation__
 *
 * To run a mutation, you first call `useJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMutation, { data, loading, error }] = useJoinMutation({
 *   variables: {
 *      link: // value for 'link'
 *   },
 * });
 */
export function useJoinMutation(baseOptions?: Apollo.MutationHookOptions<JoinMutation, JoinMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinMutation, JoinMutationVariables>(JoinDocument, options);
      }
export type JoinMutationHookResult = ReturnType<typeof useJoinMutation>;
export type JoinMutationResult = Apollo.MutationResult<JoinMutation>;
export type JoinMutationOptions = Apollo.BaseMutationOptions<JoinMutation, JoinMutationVariables>;
export const LoginDocument = gql`
    mutation Login($params: Input!) {
  login(params: $params) {
    id
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RemoveFriendDocument = gql`
    mutation RemoveFriend($params: FriendInput!) {
  removeFriend(params: $params) {
    nameId
    userId
  }
}
    `;
export type RemoveFriendMutationFn = Apollo.MutationFunction<RemoveFriendMutation, RemoveFriendMutationVariables>;

/**
 * __useRemoveFriendMutation__
 *
 * To run a mutation, you first call `useRemoveFriendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFriendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFriendMutation, { data, loading, error }] = useRemoveFriendMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRemoveFriendMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFriendMutation, RemoveFriendMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFriendMutation, RemoveFriendMutationVariables>(RemoveFriendDocument, options);
      }
export type RemoveFriendMutationHookResult = ReturnType<typeof useRemoveFriendMutation>;
export type RemoveFriendMutationResult = Apollo.MutationResult<RemoveFriendMutation>;
export type RemoveFriendMutationOptions = Apollo.BaseMutationOptions<RemoveFriendMutation, RemoveFriendMutationVariables>;
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($params: FriendInput!) {
  sendFriendRequest(params: $params) {
    id
    nameId
    userId
    status
    friends {
      id
      nameId
      userId
      status
    }
    friendRequests {
      nameId
      userId
      status
    }
  }
}
    `;
export type SendFriendRequestMutationFn = Apollo.MutationFunction<SendFriendRequestMutation, SendFriendRequestMutationVariables>;

/**
 * __useSendFriendRequestMutation__
 *
 * To run a mutation, you first call `useSendFriendRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendFriendRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendFriendRequestMutation, { data, loading, error }] = useSendFriendRequestMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSendFriendRequestMutation(baseOptions?: Apollo.MutationHookOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument, options);
      }
export type SendFriendRequestMutationHookResult = ReturnType<typeof useSendFriendRequestMutation>;
export type SendFriendRequestMutationResult = Apollo.MutationResult<SendFriendRequestMutation>;
export type SendFriendRequestMutationOptions = Apollo.BaseMutationOptions<SendFriendRequestMutation, SendFriendRequestMutationVariables>;
export const SendMessageDocument = gql`
    mutation sendMessage($params: MessageInput!) {
  sendMessage(params: $params) {
    msg
    msgId
    createdAt
    updatedAt
    user {
      nameId
      userId
    }
    channel {
      channelId
    }
  }
}
    `;
export type SendMessageMutationFn = Apollo.MutationFunction<SendMessageMutation, SendMessageMutationVariables>;

/**
 * __useSendMessageMutation__
 *
 * To run a mutation, you first call `useSendMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMessageMutation, { data, loading, error }] = useSendMessageMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSendMessageMutation(baseOptions?: Apollo.MutationHookOptions<SendMessageMutation, SendMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendMessageMutation, SendMessageMutationVariables>(SendMessageDocument, options);
      }
export type SendMessageMutationHookResult = ReturnType<typeof useSendMessageMutation>;
export type SendMessageMutationResult = Apollo.MutationResult<SendMessageMutation>;
export type SendMessageMutationOptions = Apollo.BaseMutationOptions<SendMessageMutation, SendMessageMutationVariables>;
export const SignupDocument = gql`
    mutation Signup($params: Input!) {
  signup(params: $params) {
    id
  }
}
    `;
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const UnblockDocument = gql`
    mutation Unblock($params: FriendInput!) {
  unblock(params: $params) {
    nameId
    userId
  }
}
    `;
export type UnblockMutationFn = Apollo.MutationFunction<UnblockMutation, UnblockMutationVariables>;

/**
 * __useUnblockMutation__
 *
 * To run a mutation, you first call `useUnblockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnblockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unblockMutation, { data, loading, error }] = useUnblockMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUnblockMutation(baseOptions?: Apollo.MutationHookOptions<UnblockMutation, UnblockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnblockMutation, UnblockMutationVariables>(UnblockDocument, options);
      }
export type UnblockMutationHookResult = ReturnType<typeof useUnblockMutation>;
export type UnblockMutationResult = Apollo.MutationResult<UnblockMutation>;
export type UnblockMutationOptions = Apollo.BaseMutationOptions<UnblockMutation, UnblockMutationVariables>;
export const UpdatePassDocument = gql`
    mutation UpdatePass($params: UpdatePassInput!) {
  updatePass(params: $params) {
    nameId
    userId
  }
}
    `;
export type UpdatePassMutationFn = Apollo.MutationFunction<UpdatePassMutation, UpdatePassMutationVariables>;

/**
 * __useUpdatePassMutation__
 *
 * To run a mutation, you first call `useUpdatePassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePassMutation, { data, loading, error }] = useUpdatePassMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdatePassMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePassMutation, UpdatePassMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePassMutation, UpdatePassMutationVariables>(UpdatePassDocument, options);
      }
export type UpdatePassMutationHookResult = ReturnType<typeof useUpdatePassMutation>;
export type UpdatePassMutationResult = Apollo.MutationResult<UpdatePassMutation>;
export type UpdatePassMutationOptions = Apollo.BaseMutationOptions<UpdatePassMutation, UpdatePassMutationVariables>;
export const UpdateStatusDocument = gql`
    mutation UpdateStatus($status: String!) {
  updateStatus(status: $status) {
    id
    nameId
    userId
    status
    createdAt
    updatedAt
  }
}
    `;
export type UpdateStatusMutationFn = Apollo.MutationFunction<UpdateStatusMutation, UpdateStatusMutationVariables>;

/**
 * __useUpdateStatusMutation__
 *
 * To run a mutation, you first call `useUpdateStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStatusMutation, { data, loading, error }] = useUpdateStatusMutation({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useUpdateStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStatusMutation, UpdateStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStatusMutation, UpdateStatusMutationVariables>(UpdateStatusDocument, options);
      }
export type UpdateStatusMutationHookResult = ReturnType<typeof useUpdateStatusMutation>;
export type UpdateStatusMutationResult = Apollo.MutationResult<UpdateStatusMutation>;
export type UpdateStatusMutationOptions = Apollo.BaseMutationOptions<UpdateStatusMutation, UpdateStatusMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($params: UpdateUserInput!) {
  updateUser(params: $params) {
    nameId
    userId
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const ChannelDocument = gql`
    query Channel($channelId: String!) {
  channel(channelId: $channelId) {
    name
    link
    serverId
    channels {
      name
      ptChat
      channelId
      users {
        nameId
        userId
        iconId
        status
      }
      messages {
        msg
        msgId
        createdAt
        updatedAt
      }
      server {
        serverId
      }
    }
  }
}
    `;

/**
 * __useChannelQuery__
 *
 * To run a query within a React component, call `useChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
export const CurrentChannelDocument = gql`
    query CurrentChannel($channelId: String!) {
  currentChannel(channelId: $channelId) {
    id
    name
    ptChat
    channelId
    users {
      id
      nameId
      status
    }
  }
}
    `;

/**
 * __useCurrentChannelQuery__
 *
 * To run a query within a React component, call `useCurrentChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentChannelQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useCurrentChannelQuery(baseOptions: Apollo.QueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentChannelQuery, CurrentChannelQueryVariables>(CurrentChannelDocument, options);
      }
export function useCurrentChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentChannelQuery, CurrentChannelQueryVariables>(CurrentChannelDocument, options);
        }
export type CurrentChannelQueryHookResult = ReturnType<typeof useCurrentChannelQuery>;
export type CurrentChannelLazyQueryHookResult = ReturnType<typeof useCurrentChannelLazyQuery>;
export type CurrentChannelQueryResult = Apollo.QueryResult<CurrentChannelQuery, CurrentChannelQueryVariables>;
export const MessageDocument = gql`
    query Message($msgId: String!) {
  message(msgId: $msgId) {
    id
    msg
    msgId
    createdAt
    updatedAt
    user {
      id
      nameId
      userId
    }
    channel {
      name
      channelId
      ptChat
      users {
        id
        nameId
        userId
      }
      messages {
        id
        msg
        msgId
        createdAt
        updatedAt
        user {
          id
          nameId
          userId
          messages {
            id
            msg
            msgId
            createdAt
            updatedAt
          }
        }
      }
    }
  }
}
    `;

/**
 * __useMessageQuery__
 *
 * To run a query within a React component, call `useMessageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessageQuery({
 *   variables: {
 *      msgId: // value for 'msgId'
 *   },
 * });
 */
export function useMessageQuery(baseOptions: Apollo.QueryHookOptions<MessageQuery, MessageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
      }
export function useMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageQuery, MessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
        }
export type MessageQueryHookResult = ReturnType<typeof useMessageQuery>;
export type MessageLazyQueryHookResult = ReturnType<typeof useMessageLazyQuery>;
export type MessageQueryResult = Apollo.QueryResult<MessageQuery, MessageQueryVariables>;
export const MessagesDocument = gql`
    query Messages($channelId: String!) {
  messages(channelId: $channelId) {
    channel {
      name
      desc
      ptChat
      channelId
    }
    messages {
      id
      msg
      msgId
      createdAt
      updatedAt
      user {
        nameId
        userId
        iconId
      }
    }
    friend {
      nameId
      userId
      iconId
      status
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PartyChatsDocument = gql`
    query PartyChats {
  partyChats {
    channelId
    users {
      nameId
      userId
      iconId
      status
    }
  }
}
    `;

/**
 * __usePartyChatsQuery__
 *
 * To run a query within a React component, call `usePartyChatsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePartyChatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePartyChatsQuery({
 *   variables: {
 *   },
 * });
 */
export function usePartyChatsQuery(baseOptions?: Apollo.QueryHookOptions<PartyChatsQuery, PartyChatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PartyChatsQuery, PartyChatsQueryVariables>(PartyChatsDocument, options);
      }
export function usePartyChatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PartyChatsQuery, PartyChatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PartyChatsQuery, PartyChatsQueryVariables>(PartyChatsDocument, options);
        }
export type PartyChatsQueryHookResult = ReturnType<typeof usePartyChatsQuery>;
export type PartyChatsLazyQueryHookResult = ReturnType<typeof usePartyChatsLazyQuery>;
export type PartyChatsQueryResult = Apollo.QueryResult<PartyChatsQuery, PartyChatsQueryVariables>;
export const ServerDocument = gql`
    query Server($serverId: Float!) {
  server(serverId: $serverId) {
    id
    name
    link
    serverId
    users {
      id
      servers {
        serverId
      }
    }
    channels {
      name
      channelId
      users {
        nameId
        userId
        iconId
        status
      }
      messages {
        id
        msg
        msgId
        createdAt
        updatedAt
        channel {
          channelId
        }
        user {
          id
          nameId
          userId
          iconId
        }
      }
    }
  }
}
    `;

/**
 * __useServerQuery__
 *
 * To run a query within a React component, call `useServerQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerQuery({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useServerQuery(baseOptions: Apollo.QueryHookOptions<ServerQuery, ServerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
      }
export function useServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
export type ServerQueryHookResult = ReturnType<typeof useServerQuery>;
export type ServerLazyQueryHookResult = ReturnType<typeof useServerLazyQuery>;
export type ServerQueryResult = Apollo.QueryResult<ServerQuery, ServerQueryVariables>;
export const ServerChannelsDocument = gql`
    query ServerChannels($channelId: String!) {
  serverChannels(channelId: $channelId) {
    name
    channelId
    server {
      name
      serverId
      channels {
        name
        channelId
        users {
          nameId
          userId
          iconId
        }
      }
    }
    users {
      nameId
      userId
      iconId
    }
  }
}
    `;

/**
 * __useServerChannelsQuery__
 *
 * To run a query within a React component, call `useServerChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useServerChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useServerChannelsQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useServerChannelsQuery(baseOptions: Apollo.QueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerChannelsQuery, ServerChannelsQueryVariables>(ServerChannelsDocument, options);
      }
export function useServerChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerChannelsQuery, ServerChannelsQueryVariables>(ServerChannelsDocument, options);
        }
export type ServerChannelsQueryHookResult = ReturnType<typeof useServerChannelsQuery>;
export type ServerChannelsLazyQueryHookResult = ReturnType<typeof useServerChannelsLazyQuery>;
export type ServerChannelsQueryResult = Apollo.QueryResult<ServerChannelsQuery, ServerChannelsQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    nameId
    userId
    iconId
    status
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFriendsDocument = gql`
    query UserFriends {
  userFriends {
    id
    nameId
    userId
    iconId
    friends {
      nameId
      userId
      iconId
      status
    }
    friendRequests {
      nameId
      userId
      iconId
      status
    }
    blocked {
      nameId
      userId
      iconId
      status
    }
  }
}
    `;

/**
 * __useUserFriendsQuery__
 *
 * To run a query within a React component, call `useUserFriendsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFriendsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFriendsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserFriendsQuery(baseOptions?: Apollo.QueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFriendsQuery, UserFriendsQueryVariables>(UserFriendsDocument, options);
      }
export function useUserFriendsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFriendsQuery, UserFriendsQueryVariables>(UserFriendsDocument, options);
        }
export type UserFriendsQueryHookResult = ReturnType<typeof useUserFriendsQuery>;
export type UserFriendsLazyQueryHookResult = ReturnType<typeof useUserFriendsLazyQuery>;
export type UserFriendsQueryResult = Apollo.QueryResult<UserFriendsQuery, UserFriendsQueryVariables>;
export const UserServersDocument = gql`
    query UserServers {
  userServers {
    id
    name
    serverId
    channels {
      name
      channelId
    }
  }
}
    `;

/**
 * __useUserServersQuery__
 *
 * To run a query within a React component, call `useUserServersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserServersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserServersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserServersQuery(baseOptions?: Apollo.QueryHookOptions<UserServersQuery, UserServersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserServersQuery, UserServersQueryVariables>(UserServersDocument, options);
      }
export function useUserServersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserServersQuery, UserServersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserServersQuery, UserServersQueryVariables>(UserServersDocument, options);
        }
export type UserServersQueryHookResult = ReturnType<typeof useUserServersQuery>;
export type UserServersLazyQueryHookResult = ReturnType<typeof useUserServersLazyQuery>;
export type UserServersQueryResult = Apollo.QueryResult<UserServersQuery, UserServersQueryVariables>;