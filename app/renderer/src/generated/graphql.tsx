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

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  content: Scalars['String'];
  id: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createMessage: Message;
  createServer: Server;
  deleteMessage: Scalars['Boolean'];
  deleteServer: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: User;
  logout: Scalars['Boolean'];
  signup: User;
  updateMessage: Message;
  updateServer: Server;
  updateUser: User;
};


export type MutationCreateMessageArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationCreateServerArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteServerArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  params: LoginInput;
};


export type MutationSignupArgs = {
  params: SignupInput;
};


export type MutationUpdateMessageArgs = {
  content: Scalars['String'];
  id: Scalars['Int'];
};


export type MutationUpdateServerArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
  messages: Array<Message>;
  servers: Array<Server>;
  users: Array<User>;
};

export type Server = {
  __typename?: 'Server';
  channels: Array<Scalars['String']>;
  icon: Scalars['String'];
  id: Scalars['Int'];
  name: Scalars['String'];
  owner: User;
};

export type SignupInput = {
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  avatar: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  friends: Array<User>;
  id: Scalars['Int'];
  name: Scalars['String'];
  nameId: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  params: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'User', id: number, name: string, username: string } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SignupMutationVariables = Exact<{
  params: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', id: number, name: string, username: string, createdAt: string, updatedAt: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string } | null };


export const LoginDocument = gql`
    mutation Login($params: LoginInput!) {
  login(params: $params) {
    id
    name
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
export const SignupDocument = gql`
    mutation Signup($params: SignupInput!) {
  signup(params: $params) {
    id
    name
    username
    createdAt
    updatedAt
  }
}
    `;

export function useSignupMutation() {
  return Urql.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};