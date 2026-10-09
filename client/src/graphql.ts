/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type FriendInput = {
  nameId: string;
  userId: number;
};

export type Input = {
  password: string;
  username: string;
};

export type MessageInput = {
  channelId: string;
  msg: string;
};

export type UpdatePassInput = {
  currPass: string;
  newPass: string;
};

export type UpdateUserInput = {
  iconId?: string | null | undefined;
  nameId?: string | null | undefined;
  status?: string | null | undefined;
  username?: string | null | undefined;
};

export type AcceptFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type AcceptFriendRequestMutation = { acceptFriendRequest: { id: number, nameId: string, userId: number, friends: Array<{ id: number, nameId: string, userId: number, status: string }> | null, friendRequests: Array<{ nameId: string, userId: number, status: string }> | null, channels: Array<{ id: number, name: string, channelId: string, users: Array<{ id: number, nameId: string, userId: number }> | null }> | null } };

export type BanMutationVariables = Exact<{
  serverId: number;
  params: FriendInput;
}>;


export type BanMutation = { ban: boolean };

export type BlockMutationVariables = Exact<{
  params: FriendInput;
}>;


export type BlockMutation = { block: { nameId: string, userId: number } };

export type CancelFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type CancelFriendRequestMutation = { cancelFriendRequest: { id: number, nameId: string, userId: number, status: string, friends: Array<{ id: number, nameId: string, userId: number, status: string }> | null, friendRequests: Array<{ nameId: string, userId: number, status: string }> | null } };

export type CreateServerMutationVariables = Exact<{
  name: string;
}>;


export type CreateServerMutation = { createServer: { id: number, name: string, link: string, serverId: number, channels: Array<{ id: number, name: string, channelId: string }> | null } };

export type CreateServerChannelMutationVariables = Exact<{
  name: string;
  serverId: number;
}>;


export type CreateServerChannelMutation = { createServerChannel: { id: number, name: string, channelId: string } };

export type DeclineFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type DeclineFriendRequestMutation = { declineFriendRequest: { id: number, nameId: string, userId: number, status: string, friends: Array<{ id: number, nameId: string, userId: number, status: string }> | null, friendRequests: Array<{ nameId: string, userId: number, status: string }> | null } };

export type DeleteChannelMutationVariables = Exact<{
  channelId: string;
}>;


export type DeleteChannelMutation = { deleteChannel: boolean };

export type DeleteMessageMutationVariables = Exact<{
  msgId: string;
}>;


export type DeleteMessageMutation = { deleteMessage: boolean };

export type DeleteServerMutationVariables = Exact<{
  serverId: number;
}>;


export type DeleteServerMutation = { deleteServer: boolean };

export type DeleteUserMutationVariables = Exact<{
  password: string;
}>;


export type DeleteUserMutation = { deleteUser: boolean };

export type JoinMutationVariables = Exact<{
  link: string;
}>;


export type JoinMutation = { join: { nameId: string, userId: number, servers: Array<{ name: string, link: string, serverId: number }> | null } | null };

export type KickMutationVariables = Exact<{
  serverId: number;
  params: FriendInput;
}>;


export type KickMutation = { kick: boolean };

export type LeaveMutationVariables = Exact<{
  serverId: number;
}>;


export type LeaveMutation = { leave: boolean };

export type LoginMutationVariables = Exact<{
  params: Input;
}>;


export type LoginMutation = { login: { id: number } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { logout: boolean };

export type RefreshLinkMutationVariables = Exact<{
  serverId: number;
}>;


export type RefreshLinkMutation = { refreshLink: { id: number, link: string } };

export type RemoveFriendMutationVariables = Exact<{
  params: FriendInput;
}>;


export type RemoveFriendMutation = { removeFriend: { nameId: string, userId: number } };

export type SendFriendRequestMutationVariables = Exact<{
  params: FriendInput;
}>;


export type SendFriendRequestMutation = { sendFriendRequest: { id: number, nameId: string, userId: number, status: string, friends: Array<{ id: number, nameId: string, userId: number, status: string }> | null, friendRequests: Array<{ nameId: string, userId: number, status: string }> | null } };

export type SendMessageMutationVariables = Exact<{
  params: MessageInput;
}>;


export type SendMessageMutation = { sendMessage: { id: number, msg: string, msgId: string, edited: boolean, createdAt: string, updatedAt: string, user: { nameId: string, userId: number } | null, channel: { channelId: string } | null } };

export type SignupMutationVariables = Exact<{
  params: Input;
}>;


export type SignupMutation = { signup: { id: number } };

export type UnbanMutationVariables = Exact<{
  serverId: number;
  params: FriendInput;
}>;


export type UnbanMutation = { unban: boolean };

export type UnblockMutationVariables = Exact<{
  params: FriendInput;
}>;


export type UnblockMutation = { unblock: { nameId: string, userId: number } };

export type UpdateChannelMutationVariables = Exact<{
  channelId: string;
  name?: string | null | undefined;
  desc?: string | null | undefined;
}>;


export type UpdateChannelMutation = { updateChannel: { id: number, name: string, desc: string | null, channelId: string } };

export type UpdateMessageMutationVariables = Exact<{
  msgId: string;
  content: string;
}>;


export type UpdateMessageMutation = { updateMessage: { id: number, msgId: string, msg: string, edited: boolean } };

export type UpdatePassMutationVariables = Exact<{
  params: UpdatePassInput;
}>;


export type UpdatePassMutation = { updatePass: { nameId: string, userId: number } };

export type UpdateRoleMutationVariables = Exact<{
  serverId: number;
  params: FriendInput;
  role: string;
}>;


export type UpdateRoleMutation = { updateRole: boolean };

export type UpdateServerMutationVariables = Exact<{
  serverId: number;
  name?: string | null | undefined;
  icon?: string | null | undefined;
}>;


export type UpdateServerMutation = { updateServer: { id: number, name: string, icon: string | null } };

export type UpdateStatusMutationVariables = Exact<{
  status: string;
}>;


export type UpdateStatusMutation = { updateStatus: { id: number, nameId: string, userId: number, status: string, createdAt: string, updatedAt: string } };

export type UpdateUserMutationVariables = Exact<{
  params: UpdateUserInput;
}>;


export type UpdateUserMutation = { updateUser: { id: number, username: string | null, nameId: string, userId: number, iconId: string, status: string } };

export type ChannelQueryVariables = Exact<{
  channelId: string;
}>;


export type ChannelQuery = { channel: { name: string, link: string, serverId: number, channels: Array<{ name: string, ptChat: boolean, channelId: string, server: { serverId: number } | null }> | null } };

export type CurrentChannelQueryVariables = Exact<{
  channelId: string;
}>;


export type CurrentChannelQuery = { currentChannel: { id: number, name: string, desc: string | null, ptChat: boolean, channelId: string, server: { serverId: number } | null, users: Array<{ id: number, nameId: string, userId: number, iconId: string, status: string }> | null } };

export type InviteQueryVariables = Exact<{
  link: string;
}>;


export type InviteQuery = { invite: { name: string, link: string, icon: string | null, serverId: number, memberCount: number, joined: boolean, channelId: string | null } | null };

export type MessageQueryVariables = Exact<{
  msgId: string;
}>;


export type MessageQuery = { message: { id: number, msg: string, msgId: string, edited: boolean, createdAt: string, updatedAt: string, user: { id: number, nameId: string, userId: number, iconId: string } | null, channel: { name: string, channelId: string, ptChat: boolean } | null } };

export type MessagesQueryVariables = Exact<{
  channelId: string;
  beforeId?: number | null | undefined;
}>;


export type MessagesQuery = { messages: { hasMore: boolean, nextCursor: number | null, channel: { name: string, desc: string | null, ptChat: boolean, channelId: string }, messages: Array<{ id: number, msg: string, msgId: string, edited: boolean, createdAt: string, updatedAt: string, user: { id: number, nameId: string, userId: number, iconId: string } | null }>, friend: { id: number, nameId: string, userId: number, iconId: string, status: string } | null } };

export type PartyChatsQueryVariables = Exact<{ [key: string]: never; }>;


export type PartyChatsQuery = { partyChats: Array<{ channelId: string, users: Array<{ id: number, nameId: string, userId: number, iconId: string, status: string }> | null }> };

export type ServerQueryVariables = Exact<{
  serverId: number;
}>;


export type ServerQuery = { server: { id: number, name: string, link: string, icon: string | null, serverId: number, members: Array<{ role: string, user: { id: number, nameId: string, userId: number, iconId: string, status: string } }>, channels: Array<{ id: number, name: string, desc: string | null, channelId: string }> | null, banned: Array<{ id: number, nameId: string, userId: number, iconId: string }> | null } | null };

export type ServerChannelsQueryVariables = Exact<{
  channelId: string;
}>;


export type ServerChannelsQuery = { serverChannels: Array<{ name: string, channelId: string, server: { name: string, serverId: number } | null }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { user: { id: number, username: string | null, nameId: string, userId: number, iconId: string, status: string, roles: Array<{ serverId: number, role: string }> | null } | null };

export type UserFriendsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserFriendsQuery = { userFriends: { id: number, nameId: string, userId: number, iconId: string, friends: Array<{ id: number, nameId: string, userId: number, iconId: string, status: string }> | null, friendRequests: Array<{ nameId: string, userId: number, iconId: string, status: string }> | null, blocked: Array<{ id: number, nameId: string, userId: number, iconId: string, status: string }> | null } | null };

export type UserServersQueryVariables = Exact<{ [key: string]: never; }>;


export type UserServersQuery = { userServers: Array<{ id: number, name: string, icon: string | null, link: string, serverId: number, channels: Array<{ name: string, channelId: string }> | null }> | null };


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
export const BanDocument = gql`
    mutation Ban($serverId: Float!, $params: FriendInput!) {
  ban(serverId: $serverId, params: $params)
}
    `;
export type BanMutationFn = Apollo.MutationFunction<BanMutation, BanMutationVariables>;

/**
 * __useBanMutation__
 *
 * To run a mutation, you first call `useBanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [banMutation, { data, loading, error }] = useBanMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      params: // value for 'params'
 *   },
 * });
 */
export function useBanMutation(baseOptions?: Apollo.MutationHookOptions<BanMutation, BanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BanMutation, BanMutationVariables>(BanDocument, options);
      }
export type BanMutationHookResult = ReturnType<typeof useBanMutation>;
export type BanMutationResult = Apollo.MutationResult<BanMutation>;
export type BanMutationOptions = Apollo.BaseMutationOptions<BanMutation, BanMutationVariables>;
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
export const DeleteChannelDocument = gql`
    mutation DeleteChannel($channelId: String!) {
  deleteChannel(channelId: $channelId)
}
    `;
export type DeleteChannelMutationFn = Apollo.MutationFunction<DeleteChannelMutation, DeleteChannelMutationVariables>;

/**
 * __useDeleteChannelMutation__
 *
 * To run a mutation, you first call `useDeleteChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChannelMutation, { data, loading, error }] = useDeleteChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useDeleteChannelMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChannelMutation, DeleteChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChannelMutation, DeleteChannelMutationVariables>(DeleteChannelDocument, options);
      }
export type DeleteChannelMutationHookResult = ReturnType<typeof useDeleteChannelMutation>;
export type DeleteChannelMutationResult = Apollo.MutationResult<DeleteChannelMutation>;
export type DeleteChannelMutationOptions = Apollo.BaseMutationOptions<DeleteChannelMutation, DeleteChannelMutationVariables>;
export const DeleteMessageDocument = gql`
    mutation DeleteMessage($msgId: String!) {
  deleteMessage(msgId: $msgId)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      msgId: // value for 'msgId'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, options);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeleteServerDocument = gql`
    mutation DeleteServer($serverId: Float!) {
  deleteServer(serverId: $serverId)
}
    `;
export type DeleteServerMutationFn = Apollo.MutationFunction<DeleteServerMutation, DeleteServerMutationVariables>;

/**
 * __useDeleteServerMutation__
 *
 * To run a mutation, you first call `useDeleteServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServerMutation, { data, loading, error }] = useDeleteServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useDeleteServerMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServerMutation, DeleteServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServerMutation, DeleteServerMutationVariables>(DeleteServerDocument, options);
      }
export type DeleteServerMutationHookResult = ReturnType<typeof useDeleteServerMutation>;
export type DeleteServerMutationResult = Apollo.MutationResult<DeleteServerMutation>;
export type DeleteServerMutationOptions = Apollo.BaseMutationOptions<DeleteServerMutation, DeleteServerMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($password: String!) {
  deleteUser(password: $password)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
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
export const KickDocument = gql`
    mutation Kick($serverId: Float!, $params: FriendInput!) {
  kick(serverId: $serverId, params: $params)
}
    `;
export type KickMutationFn = Apollo.MutationFunction<KickMutation, KickMutationVariables>;

/**
 * __useKickMutation__
 *
 * To run a mutation, you first call `useKickMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKickMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kickMutation, { data, loading, error }] = useKickMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      params: // value for 'params'
 *   },
 * });
 */
export function useKickMutation(baseOptions?: Apollo.MutationHookOptions<KickMutation, KickMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<KickMutation, KickMutationVariables>(KickDocument, options);
      }
export type KickMutationHookResult = ReturnType<typeof useKickMutation>;
export type KickMutationResult = Apollo.MutationResult<KickMutation>;
export type KickMutationOptions = Apollo.BaseMutationOptions<KickMutation, KickMutationVariables>;
export const LeaveDocument = gql`
    mutation Leave($serverId: Float!) {
  leave(serverId: $serverId)
}
    `;
export type LeaveMutationFn = Apollo.MutationFunction<LeaveMutation, LeaveMutationVariables>;

/**
 * __useLeaveMutation__
 *
 * To run a mutation, you first call `useLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveMutation, { data, loading, error }] = useLeaveMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useLeaveMutation(baseOptions?: Apollo.MutationHookOptions<LeaveMutation, LeaveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveMutation, LeaveMutationVariables>(LeaveDocument, options);
      }
export type LeaveMutationHookResult = ReturnType<typeof useLeaveMutation>;
export type LeaveMutationResult = Apollo.MutationResult<LeaveMutation>;
export type LeaveMutationOptions = Apollo.BaseMutationOptions<LeaveMutation, LeaveMutationVariables>;
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
export const RefreshLinkDocument = gql`
    mutation RefreshLink($serverId: Float!) {
  refreshLink(serverId: $serverId) {
    id
    link
  }
}
    `;
export type RefreshLinkMutationFn = Apollo.MutationFunction<RefreshLinkMutation, RefreshLinkMutationVariables>;

/**
 * __useRefreshLinkMutation__
 *
 * To run a mutation, you first call `useRefreshLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshLinkMutation, { data, loading, error }] = useRefreshLinkMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *   },
 * });
 */
export function useRefreshLinkMutation(baseOptions?: Apollo.MutationHookOptions<RefreshLinkMutation, RefreshLinkMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshLinkMutation, RefreshLinkMutationVariables>(RefreshLinkDocument, options);
      }
export type RefreshLinkMutationHookResult = ReturnType<typeof useRefreshLinkMutation>;
export type RefreshLinkMutationResult = Apollo.MutationResult<RefreshLinkMutation>;
export type RefreshLinkMutationOptions = Apollo.BaseMutationOptions<RefreshLinkMutation, RefreshLinkMutationVariables>;
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
    id
    msg
    msgId
    edited
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
export const UnbanDocument = gql`
    mutation Unban($serverId: Float!, $params: FriendInput!) {
  unban(serverId: $serverId, params: $params)
}
    `;
export type UnbanMutationFn = Apollo.MutationFunction<UnbanMutation, UnbanMutationVariables>;

/**
 * __useUnbanMutation__
 *
 * To run a mutation, you first call `useUnbanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnbanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unbanMutation, { data, loading, error }] = useUnbanMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      params: // value for 'params'
 *   },
 * });
 */
export function useUnbanMutation(baseOptions?: Apollo.MutationHookOptions<UnbanMutation, UnbanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UnbanMutation, UnbanMutationVariables>(UnbanDocument, options);
      }
export type UnbanMutationHookResult = ReturnType<typeof useUnbanMutation>;
export type UnbanMutationResult = Apollo.MutationResult<UnbanMutation>;
export type UnbanMutationOptions = Apollo.BaseMutationOptions<UnbanMutation, UnbanMutationVariables>;
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
export const UpdateChannelDocument = gql`
    mutation UpdateChannel($channelId: String!, $name: String, $desc: String) {
  updateChannel(channelId: $channelId, name: $name, desc: $desc) {
    id
    name
    desc
    channelId
  }
}
    `;
export type UpdateChannelMutationFn = Apollo.MutationFunction<UpdateChannelMutation, UpdateChannelMutationVariables>;

/**
 * __useUpdateChannelMutation__
 *
 * To run a mutation, you first call `useUpdateChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateChannelMutation, { data, loading, error }] = useUpdateChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      name: // value for 'name'
 *      desc: // value for 'desc'
 *   },
 * });
 */
export function useUpdateChannelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateChannelMutation, UpdateChannelMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateChannelMutation, UpdateChannelMutationVariables>(UpdateChannelDocument, options);
      }
export type UpdateChannelMutationHookResult = ReturnType<typeof useUpdateChannelMutation>;
export type UpdateChannelMutationResult = Apollo.MutationResult<UpdateChannelMutation>;
export type UpdateChannelMutationOptions = Apollo.BaseMutationOptions<UpdateChannelMutation, UpdateChannelMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($msgId: String!, $content: String!) {
  updateMessage(msgId: $msgId, content: $content) {
    id
    msgId
    msg
    edited
  }
}
    `;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      msgId: // value for 'msgId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
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
export const UpdateRoleDocument = gql`
    mutation UpdateRole($serverId: Float!, $params: FriendInput!, $role: String!) {
  updateRole(serverId: $serverId, params: $params, role: $role)
}
    `;
export type UpdateRoleMutationFn = Apollo.MutationFunction<UpdateRoleMutation, UpdateRoleMutationVariables>;

/**
 * __useUpdateRoleMutation__
 *
 * To run a mutation, you first call `useUpdateRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateRoleMutation, { data, loading, error }] = useUpdateRoleMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      params: // value for 'params'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useUpdateRoleMutation(baseOptions?: Apollo.MutationHookOptions<UpdateRoleMutation, UpdateRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateRoleMutation, UpdateRoleMutationVariables>(UpdateRoleDocument, options);
      }
export type UpdateRoleMutationHookResult = ReturnType<typeof useUpdateRoleMutation>;
export type UpdateRoleMutationResult = Apollo.MutationResult<UpdateRoleMutation>;
export type UpdateRoleMutationOptions = Apollo.BaseMutationOptions<UpdateRoleMutation, UpdateRoleMutationVariables>;
export const UpdateServerDocument = gql`
    mutation UpdateServer($serverId: Float!, $name: String, $icon: String) {
  updateServer(serverId: $serverId, name: $name, icon: $icon) {
    id
    name
    icon
  }
}
    `;
export type UpdateServerMutationFn = Apollo.MutationFunction<UpdateServerMutation, UpdateServerMutationVariables>;

/**
 * __useUpdateServerMutation__
 *
 * To run a mutation, you first call `useUpdateServerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServerMutation, { data, loading, error }] = useUpdateServerMutation({
 *   variables: {
 *      serverId: // value for 'serverId'
 *      name: // value for 'name'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useUpdateServerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServerMutation, UpdateServerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServerMutation, UpdateServerMutationVariables>(UpdateServerDocument, options);
      }
export type UpdateServerMutationHookResult = ReturnType<typeof useUpdateServerMutation>;
export type UpdateServerMutationResult = Apollo.MutationResult<UpdateServerMutation>;
export type UpdateServerMutationOptions = Apollo.BaseMutationOptions<UpdateServerMutation, UpdateServerMutationVariables>;
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
    id
    username
    nameId
    userId
    iconId
    status
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
export function useChannelQuery(baseOptions: Apollo.QueryHookOptions<ChannelQuery, ChannelQueryVariables> & ({ variables: ChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
      }
export function useChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
        }
// @ts-ignore
export function useChannelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ChannelQuery, ChannelQueryVariables>): Apollo.UseSuspenseQueryResult<ChannelQuery, ChannelQueryVariables>;
export function useChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChannelQuery, ChannelQueryVariables>): Apollo.UseSuspenseQueryResult<ChannelQuery | undefined, ChannelQueryVariables>;
export function useChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ChannelQuery, ChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ChannelQuery, ChannelQueryVariables>(ChannelDocument, options);
        }
export type ChannelQueryHookResult = ReturnType<typeof useChannelQuery>;
export type ChannelLazyQueryHookResult = ReturnType<typeof useChannelLazyQuery>;
export type ChannelSuspenseQueryHookResult = ReturnType<typeof useChannelSuspenseQuery>;
export type ChannelQueryResult = Apollo.QueryResult<ChannelQuery, ChannelQueryVariables>;
export const CurrentChannelDocument = gql`
    query CurrentChannel($channelId: String!) {
  currentChannel(channelId: $channelId) {
    id
    name
    desc
    ptChat
    channelId
    server {
      serverId
    }
    users {
      id
      nameId
      userId
      iconId
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
export function useCurrentChannelQuery(baseOptions: Apollo.QueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables> & ({ variables: CurrentChannelQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentChannelQuery, CurrentChannelQueryVariables>(CurrentChannelDocument, options);
      }
export function useCurrentChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentChannelQuery, CurrentChannelQueryVariables>(CurrentChannelDocument, options);
        }
// @ts-ignore
export function useCurrentChannelSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>): Apollo.UseSuspenseQueryResult<CurrentChannelQuery, CurrentChannelQueryVariables>;
export function useCurrentChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>): Apollo.UseSuspenseQueryResult<CurrentChannelQuery | undefined, CurrentChannelQueryVariables>;
export function useCurrentChannelSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CurrentChannelQuery, CurrentChannelQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CurrentChannelQuery, CurrentChannelQueryVariables>(CurrentChannelDocument, options);
        }
export type CurrentChannelQueryHookResult = ReturnType<typeof useCurrentChannelQuery>;
export type CurrentChannelLazyQueryHookResult = ReturnType<typeof useCurrentChannelLazyQuery>;
export type CurrentChannelSuspenseQueryHookResult = ReturnType<typeof useCurrentChannelSuspenseQuery>;
export type CurrentChannelQueryResult = Apollo.QueryResult<CurrentChannelQuery, CurrentChannelQueryVariables>;
export const InviteDocument = gql`
    query Invite($link: String!) {
  invite(link: $link) {
    name
    link
    icon
    serverId
    memberCount
    joined
    channelId
  }
}
    `;

/**
 * __useInviteQuery__
 *
 * To run a query within a React component, call `useInviteQuery` and pass it any options that fit your needs.
 * When your component renders, `useInviteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInviteQuery({
 *   variables: {
 *      link: // value for 'link'
 *   },
 * });
 */
export function useInviteQuery(baseOptions: Apollo.QueryHookOptions<InviteQuery, InviteQueryVariables> & ({ variables: InviteQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<InviteQuery, InviteQueryVariables>(InviteDocument, options);
      }
export function useInviteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<InviteQuery, InviteQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<InviteQuery, InviteQueryVariables>(InviteDocument, options);
        }
// @ts-ignore
export function useInviteSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<InviteQuery, InviteQueryVariables>): Apollo.UseSuspenseQueryResult<InviteQuery, InviteQueryVariables>;
export function useInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteQuery, InviteQueryVariables>): Apollo.UseSuspenseQueryResult<InviteQuery | undefined, InviteQueryVariables>;
export function useInviteSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<InviteQuery, InviteQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<InviteQuery, InviteQueryVariables>(InviteDocument, options);
        }
export type InviteQueryHookResult = ReturnType<typeof useInviteQuery>;
export type InviteLazyQueryHookResult = ReturnType<typeof useInviteLazyQuery>;
export type InviteSuspenseQueryHookResult = ReturnType<typeof useInviteSuspenseQuery>;
export type InviteQueryResult = Apollo.QueryResult<InviteQuery, InviteQueryVariables>;
export const MessageDocument = gql`
    query Message($msgId: String!) {
  message(msgId: $msgId) {
    id
    msg
    msgId
    edited
    createdAt
    updatedAt
    user {
      id
      nameId
      userId
      iconId
    }
    channel {
      name
      channelId
      ptChat
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
export function useMessageQuery(baseOptions: Apollo.QueryHookOptions<MessageQuery, MessageQueryVariables> & ({ variables: MessageQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
      }
export function useMessageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessageQuery, MessageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
        }
// @ts-ignore
export function useMessageSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MessageQuery, MessageQueryVariables>): Apollo.UseSuspenseQueryResult<MessageQuery, MessageQueryVariables>;
export function useMessageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessageQuery, MessageQueryVariables>): Apollo.UseSuspenseQueryResult<MessageQuery | undefined, MessageQueryVariables>;
export function useMessageSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessageQuery, MessageQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MessageQuery, MessageQueryVariables>(MessageDocument, options);
        }
export type MessageQueryHookResult = ReturnType<typeof useMessageQuery>;
export type MessageLazyQueryHookResult = ReturnType<typeof useMessageLazyQuery>;
export type MessageSuspenseQueryHookResult = ReturnType<typeof useMessageSuspenseQuery>;
export type MessageQueryResult = Apollo.QueryResult<MessageQuery, MessageQueryVariables>;
export const MessagesDocument = gql`
    query Messages($channelId: String!, $beforeId: Int) {
  messages(channelId: $channelId, beforeId: $beforeId) {
    hasMore
    nextCursor
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
      edited
      createdAt
      updatedAt
      user {
        id
        nameId
        userId
        iconId
      }
    }
    friend {
      id
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
 *      beforeId: // value for 'beforeId'
 *   },
 * });
 */
export function useMessagesQuery(baseOptions: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables> & ({ variables: MessagesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
// @ts-ignore
export function useMessagesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MessagesQuery, MessagesQueryVariables>): Apollo.UseSuspenseQueryResult<MessagesQuery, MessagesQueryVariables>;
export function useMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessagesQuery, MessagesQueryVariables>): Apollo.UseSuspenseQueryResult<MessagesQuery | undefined, MessagesQueryVariables>;
export function useMessagesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesSuspenseQueryHookResult = ReturnType<typeof useMessagesSuspenseQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const PartyChatsDocument = gql`
    query PartyChats {
  partyChats {
    channelId
    users {
      id
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
// @ts-ignore
export function usePartyChatsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<PartyChatsQuery, PartyChatsQueryVariables>): Apollo.UseSuspenseQueryResult<PartyChatsQuery, PartyChatsQueryVariables>;
export function usePartyChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PartyChatsQuery, PartyChatsQueryVariables>): Apollo.UseSuspenseQueryResult<PartyChatsQuery | undefined, PartyChatsQueryVariables>;
export function usePartyChatsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PartyChatsQuery, PartyChatsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PartyChatsQuery, PartyChatsQueryVariables>(PartyChatsDocument, options);
        }
export type PartyChatsQueryHookResult = ReturnType<typeof usePartyChatsQuery>;
export type PartyChatsLazyQueryHookResult = ReturnType<typeof usePartyChatsLazyQuery>;
export type PartyChatsSuspenseQueryHookResult = ReturnType<typeof usePartyChatsSuspenseQuery>;
export type PartyChatsQueryResult = Apollo.QueryResult<PartyChatsQuery, PartyChatsQueryVariables>;
export const ServerDocument = gql`
    query Server($serverId: Float!) {
  server(serverId: $serverId) {
    id
    name
    link
    icon
    serverId
    members {
      role
      user {
        id
        nameId
        userId
        iconId
        status
      }
    }
    channels {
      id
      name
      desc
      channelId
    }
    banned {
      id
      nameId
      userId
      iconId
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
export function useServerQuery(baseOptions: Apollo.QueryHookOptions<ServerQuery, ServerQueryVariables> & ({ variables: ServerQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
      }
export function useServerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
// @ts-ignore
export function useServerSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServerQuery, ServerQueryVariables>): Apollo.UseSuspenseQueryResult<ServerQuery, ServerQueryVariables>;
export function useServerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServerQuery, ServerQueryVariables>): Apollo.UseSuspenseQueryResult<ServerQuery | undefined, ServerQueryVariables>;
export function useServerSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServerQuery, ServerQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServerQuery, ServerQueryVariables>(ServerDocument, options);
        }
export type ServerQueryHookResult = ReturnType<typeof useServerQuery>;
export type ServerLazyQueryHookResult = ReturnType<typeof useServerLazyQuery>;
export type ServerSuspenseQueryHookResult = ReturnType<typeof useServerSuspenseQuery>;
export type ServerQueryResult = Apollo.QueryResult<ServerQuery, ServerQueryVariables>;
export const ServerChannelsDocument = gql`
    query ServerChannels($channelId: String!) {
  serverChannels(channelId: $channelId) {
    name
    channelId
    server {
      name
      serverId
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
export function useServerChannelsQuery(baseOptions: Apollo.QueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables> & ({ variables: ServerChannelsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ServerChannelsQuery, ServerChannelsQueryVariables>(ServerChannelsDocument, options);
      }
export function useServerChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ServerChannelsQuery, ServerChannelsQueryVariables>(ServerChannelsDocument, options);
        }
// @ts-ignore
export function useServerChannelsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>): Apollo.UseSuspenseQueryResult<ServerChannelsQuery, ServerChannelsQueryVariables>;
export function useServerChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>): Apollo.UseSuspenseQueryResult<ServerChannelsQuery | undefined, ServerChannelsQueryVariables>;
export function useServerChannelsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ServerChannelsQuery, ServerChannelsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ServerChannelsQuery, ServerChannelsQueryVariables>(ServerChannelsDocument, options);
        }
export type ServerChannelsQueryHookResult = ReturnType<typeof useServerChannelsQuery>;
export type ServerChannelsLazyQueryHookResult = ReturnType<typeof useServerChannelsLazyQuery>;
export type ServerChannelsSuspenseQueryHookResult = ReturnType<typeof useServerChannelsSuspenseQuery>;
export type ServerChannelsQueryResult = Apollo.QueryResult<ServerChannelsQuery, ServerChannelsQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    id
    username
    nameId
    userId
    iconId
    status
    roles {
      serverId
      role
    }
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
// @ts-ignore
export function useUserSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>): Apollo.UseSuspenseQueryResult<UserQuery, UserQueryVariables>;
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>): Apollo.UseSuspenseQueryResult<UserQuery | undefined, UserQueryVariables>;
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const UserFriendsDocument = gql`
    query UserFriends {
  userFriends {
    id
    nameId
    userId
    iconId
    friends {
      id
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
      id
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
// @ts-ignore
export function useUserFriendsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>): Apollo.UseSuspenseQueryResult<UserFriendsQuery, UserFriendsQueryVariables>;
export function useUserFriendsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>): Apollo.UseSuspenseQueryResult<UserFriendsQuery | undefined, UserFriendsQueryVariables>;
export function useUserFriendsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserFriendsQuery, UserFriendsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserFriendsQuery, UserFriendsQueryVariables>(UserFriendsDocument, options);
        }
export type UserFriendsQueryHookResult = ReturnType<typeof useUserFriendsQuery>;
export type UserFriendsLazyQueryHookResult = ReturnType<typeof useUserFriendsLazyQuery>;
export type UserFriendsSuspenseQueryHookResult = ReturnType<typeof useUserFriendsSuspenseQuery>;
export type UserFriendsQueryResult = Apollo.QueryResult<UserFriendsQuery, UserFriendsQueryVariables>;
export const UserServersDocument = gql`
    query UserServers {
  userServers {
    id
    name
    icon
    link
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
// @ts-ignore
export function useUserServersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<UserServersQuery, UserServersQueryVariables>): Apollo.UseSuspenseQueryResult<UserServersQuery, UserServersQueryVariables>;
export function useUserServersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserServersQuery, UserServersQueryVariables>): Apollo.UseSuspenseQueryResult<UserServersQuery | undefined, UserServersQueryVariables>;
export function useUserServersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<UserServersQuery, UserServersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<UserServersQuery, UserServersQueryVariables>(UserServersDocument, options);
        }
export type UserServersQueryHookResult = ReturnType<typeof useUserServersQuery>;
export type UserServersLazyQueryHookResult = ReturnType<typeof useUserServersLazyQuery>;
export type UserServersSuspenseQueryHookResult = ReturnType<typeof useUserServersSuspenseQuery>;
export type UserServersQueryResult = Apollo.QueryResult<UserServersQuery, UserServersQueryVariables>;