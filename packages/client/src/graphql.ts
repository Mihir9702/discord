import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type FriendInput = {
  displayName: Scalars['String'];
  userId: Scalars['Float'];
};

export type Input = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  senderId: Scalars['Float'];
  serverId: Scalars['Float'];
  textChannelId: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type MessageInput = {
  content: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptFriendRequest: User;
  createServer: Server;
  declineFriendRequest: User;
  deleteServer: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  sendFriendRequest: User;
  sendMessage: Message;
  signup: User;
  updateServer: Server;
  updateUser: User;
};


export type MutationAcceptFriendRequestArgs = {
  params: FriendInput;
};


export type MutationCreateServerArgs = {
  params: ServerInput;
};


export type MutationDeclineFriendRequestArgs = {
  params: FriendInput;
};


export type MutationDeleteServerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  params: Input;
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


export type MutationUpdateServerArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  params: Input;
};

export type Query = {
  __typename?: 'Query';
  deleteMessage: Scalars['Boolean'];
  friendRequests: Array<User>;
  friends: Array<User>;
  messages: Array<Message>;
  servers: Array<Server>;
  updateMessage: Message;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type QueryUpdateMessageArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};

export type Server = {
  __typename?: 'Server';
  icon: Scalars['String'];
  id: Scalars['Float'];
  name: Scalars['String'];
  ownerId: Scalars['Float'];
  role: Array<User>;
  tag?: Maybe<Scalars['String']>;
  textChannels: Array<TextChannel>;
};

export type ServerInput = {
  name: Scalars['String'];
};

export type TextChannel = {
  __typename?: 'TextChannel';
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  messages: Array<Message>;
  name: Scalars['String'];
  servers: Server;
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['String'];
  displayName: Scalars['String'];
  friendRequests: Array<User>;
  friends: Array<User>;
  id: Scalars['Float'];
  messages: Array<Message>;
  servers: Array<Server>;
  textChannels: Array<TextChannel>;
  updatedAt: Scalars['String'];
  userId: Scalars['Float'];
  username: Scalars['String'];
};

export type AcceptFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type AcceptFriendRequestMutation = { __typename?: 'Mutation', acceptFriendRequest: { __typename?: 'User', id: number, displayName: string } };

export type CreateServerMutationVariables = Exact<{
  params: ServerInput;
}>;


export type CreateServerMutation = { __typename?: 'Mutation', createServer: { __typename?: 'Server', id: number, name: string, ownerId: number } };

export type DeclineFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type DeclineFriendRequestMutation = { __typename?: 'Mutation', declineFriendRequest: { __typename?: 'User', id: number, displayName: string } };

export type LoginMutationVariables = Exact<{
  params: Input;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, username: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SendMutationVariables = Exact<{
  params: MessageInput;
}>;


export type SendMutation = { __typename?: 'Mutation', sendMessage: { __typename?: 'Message', id: number, content: string, senderId: number, createdAt: string } };

export type SendFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type SendFriendRequestMutation = { __typename?: 'Mutation', sendFriendRequest: { __typename?: 'User', id: number, displayName: string } };

export type SignupMutationVariables = Exact<{
  params: Input;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: number, username: string, createdAt: string, updatedAt: string } };

export type FriendRequestsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendRequestsQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, friendRequests: Array<{ __typename?: 'User', id: number, displayName: string, userId: number }> } | null };

export type FriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type FriendsQuery = { __typename?: 'Query', user?: { __typename?: 'User', friends: Array<{ __typename?: 'User', id: number, displayName: string }> } | null };

export type ServersQueryVariables = Exact<{ [key: string]: never; }>;


export type ServersQuery = { __typename?: 'Query', servers: Array<{ __typename?: 'Server', id: number, name: string, tag?: string | null, ownerId: number }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, userId: number, username: string, displayName: string } | null };


export const AcceptFriendRequestDocument = gql`
    mutation AcceptFriendRequest($params: FriendInput!) {
  acceptFriendRequest(params: $params) {
    id
    displayName
  }
}
    `;

export function useAcceptFriendRequestMutation() {
  return Urql.useMutation<AcceptFriendRequestMutation, AcceptFriendRequestMutationVariables>(AcceptFriendRequestDocument);
};
export const CreateServerDocument = gql`
    mutation CreateServer($params: ServerInput!) {
  createServer(params: $params) {
    id
    name
    ownerId
  }
}
    `;

export function useCreateServerMutation() {
  return Urql.useMutation<CreateServerMutation, CreateServerMutationVariables>(CreateServerDocument);
};
export const DeclineFriendRequestDocument = gql`
    mutation DeclineFriendRequest($params: FriendInput!) {
  declineFriendRequest(params: $params) {
    id
    displayName
  }
}
    `;

export function useDeclineFriendRequestMutation() {
  return Urql.useMutation<DeclineFriendRequestMutation, DeclineFriendRequestMutationVariables>(DeclineFriendRequestDocument);
};
export const LoginDocument = gql`
    mutation Login($params: Input!) {
  login(params: $params) {
    id
    username
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SendDocument = gql`
    mutation Send($params: MessageInput!) {
  sendMessage(params: $params) {
    id
    content
    senderId
    createdAt
  }
}
    `;

export function useSendMutation() {
  return Urql.useMutation<SendMutation, SendMutationVariables>(SendDocument);
};
export const SendFriendRequestDocument = gql`
    mutation SendFriendRequest($params: FriendInput!) {
  sendFriendRequest(params: $params) {
    id
    displayName
  }
}
    `;

export function useSendFriendRequestMutation() {
  return Urql.useMutation<SendFriendRequestMutation, SendFriendRequestMutationVariables>(SendFriendRequestDocument);
};
export const SignupDocument = gql`
    mutation Signup($params: Input!) {
  signup(params: $params) {
    id
    username
    createdAt
    updatedAt
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const FriendRequestsDocument = gql`
    query FriendRequests {
  user {
    id
    friendRequests {
      id
      displayName
      userId
    }
  }
}
    `;

export function useFriendRequestsQuery(options?: Omit<Urql.UseQueryArgs<FriendRequestsQueryVariables>, 'query'>) {
  return Urql.useQuery<FriendRequestsQuery>({ query: FriendRequestsDocument, ...options });
};
export const FriendsDocument = gql`
    query Friends {
  user {
    friends {
      id
      displayName
    }
  }
}
    `;

export function useFriendsQuery(options?: Omit<Urql.UseQueryArgs<FriendsQueryVariables>, 'query'>) {
  return Urql.useQuery<FriendsQuery>({ query: FriendsDocument, ...options });
};
export const ServersDocument = gql`
    query Servers {
  servers {
    id
    name
    tag
    ownerId
  }
}
    `;

export function useServersQuery(options?: Omit<Urql.UseQueryArgs<ServersQueryVariables>, 'query'>) {
  return Urql.useQuery<ServersQuery>({ query: ServersDocument, ...options });
};
export const UserDocument = gql`
    query User {
  user {
    id
    userId
    username
    displayName
  }
}
    `;

export function useUserQuery(options?: Omit<Urql.UseQueryArgs<UserQueryVariables>, 'query'>) {
  return Urql.useQuery<UserQuery>({ query: UserDocument, ...options });
};