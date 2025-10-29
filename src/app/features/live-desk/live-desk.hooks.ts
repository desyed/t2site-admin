import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback } from 'react';

import type { Role } from '@/app/project-member/project-member.type';

import { useAuthStore } from '@/app/auth/auth.store';
import { generateMessageId, handleApiErrorException } from '@/lib/utils';

import type {
  ApiMessagesResponse,
  ConversationDetail,
  ConversationListItem,
  IncomingRealTimeMessage,
  Message,
  SendMessagePayload,
  SendMessageResponse,
} from './live-desk.type';

import { sendMessageApi } from './live-desk.api';
import { fetchConversationDetail, fetchConversations } from './live-desk.fetch';
import { chatAreaQueryKey, conversationKeys } from './live-desk.keys';

export function useConversationDetailQuery(ticketId: string) {
  const query = useQuery({
    queryKey: conversationKeys.detail(ticketId),
    queryFn: () => fetchConversationDetail(ticketId),
  });
  return query;
}

export function useConversationListQuery(
  liveDeskId: string,
  enabled: boolean = true
) {
  const query = useQuery({
    queryKey: conversationKeys.list(liveDeskId),
    queryFn: () => fetchConversations(liveDeskId),
    enabled,
  });
  return query;
}

export function useOptimisticSendMessageMutation() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);

  const mutation = useMutation<
    SendMessageResponse,
    unknown,
    SendMessagePayload & {
      conversation: ConversationDetail;
      currentUserAsMember: {
        role: Role;
        memberId: string;
      };
    }
  >({
    networkMode: 'always',
    mutationFn: async (payload) => {
      const response = await sendMessageApi(payload);
      return response.data.data as SendMessageResponse;
    },
    onMutate: async (payload) => {
      const messagesPageKey = chatAreaQueryKey(payload.ticketId);
      const conversationDetailKey = conversationKeys.detail(payload.ticketId);
      const conversationListKey = conversationKeys.list(
        payload.conversation.liveDeskId
      );

      await queryClient.cancelQueries({
        queryKey: messagesPageKey,
      });

      await queryClient.cancelQueries({
        queryKey: conversationDetailKey,
      });

      await queryClient.cancelQueries({
        queryKey: conversationListKey,
      });

      const oldMessagesResponse = queryClient.getQueryData<{
        pageParams: string[];
        pages: ApiMessagesResponse[];
      }>(messagesPageKey);

      const oldConversationDetail =
        queryClient.getQueryData<ConversationDetail>(conversationDetailKey);

      const oldConversationList =
        queryClient.getQueryData<ConversationListItem[]>(conversationListKey);

      const timeStamp = new Date().toISOString();

      const newMessage = {
        id: generateMessageId(),
        sender: 'assistant',
        assistantMember: {
          email: currentUser?.email ?? '',
          role: payload.currentUserAsMember.role,
          user: {
            id: currentUser?.id ?? '',
            name: currentUser?.name ?? '',
            avatar: currentUser?.avatar ?? '',
            email: currentUser?.email ?? '',
          },
        },
        assistantMemberId: payload?.currentUserAsMember?.memberId,
        content: payload.content,
        conversationId: payload.conversation.id,
        createdAt: timeStamp,
        traffic: {
          avatar: '',
          id: payload.conversation.trafficId,
          name: '',
        },
        trafficId: payload.conversation.trafficId,
        optimistic: {
          pending: true,
          failed: false,
          error: null,
        },
      } satisfies Message;

      const newLatestMessages = produce(oldMessagesResponse, (draft) => {
        draft?.pages[draft.pages?.length - 1]?.data.push(newMessage);
      });

      const newConversationDetail = produce(oldConversationDetail, (draft) => {
        if (draft) {
          draft.latestMessage = newMessage;
          draft.unread = false;
          draft.updatedAt = timeStamp;
          draft.optimistic = {
            pending: true,
            failed: false,
            error: null,
          };
        }
      });

      let foundConversationIndex = 0;
      const newConversationList = produce(oldConversationList, (draft) => {
        if (!draft) return;
        foundConversationIndex = draft.findIndex(
          (c) => c.ticketId === payload.ticketId
        );
        if (foundConversationIndex === -1) return;

        if (foundConversationIndex > 0) {
          const [conversation] = draft.splice(foundConversationIndex, 1);
          if (conversation) {
            conversation.latestMessage = { ...newMessage };
            conversation.updatedAt = timeStamp;
            conversation.unread = false;
            conversation.optimistic = {
              pending: true,
              failed: false,
              error: null,
            };
            draft.unshift(conversation);
          }
        } else {
          draft[0] = {
            ...payload.conversation,
            latestMessage: newMessage,
            updatedAt: timeStamp,
            unread: false,
            optimistic: {
              pending: true,
              failed: false,
              error: null,
            },
          };
        }
      });

      queryClient.setQueryData(messagesPageKey, newLatestMessages);
      queryClient.setQueryData(conversationDetailKey, newConversationDetail);
      queryClient.setQueryData(conversationListKey, newConversationList);

      return {
        newMessage,
        oldMessagesResponse,
        oldConversationDetail,
        newConversationList,
        keys: {
          messagesPageKey,
          conversationDetailKey,
          conversationListKey,
        },
      };
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    onSettled: async (
      data,
      error,
      _,
      context: {
        newMessage: Message;
        oldMessagesResponse: {
          pageParams: string[];
          pages: ApiMessagesResponse[];
        };
        keys: {
          messagesPageKey: [string, ...string[]];
          conversationDetailKey: [string, ...string[]];
          conversationListKey: [string, ...string[]];
        };
        oldConversationDetail: ConversationDetail;
        newConversationList: ConversationListItem[];
      }
    ) => {
      const finalMessagesResponse = produce(
        context.oldMessagesResponse,
        (draft) => {
          if (!error) {
            if (data) {
              draft.pages[draft.pages?.length - 1]?.data.push(data.newMessage);
            }
          } else {
            const { message } = handleApiErrorException(error);

            draft.pages[draft.pages?.length - 1]?.data.push({
              ...context.newMessage,
              optimistic: {
                pending: false,
                failed: true,
                error: message,
              },
            });
          }
        }
      );

      const finalConversationDetail = produce(
        context.oldConversationDetail,
        (draft) => {
          if (error) {
            const { message } = handleApiErrorException(error);

            draft.latestMessage = context.oldConversationDetail.latestMessage;
            draft.unread = context.oldConversationDetail.unread;
            draft.updatedAt = context.oldConversationDetail.updatedAt;
            draft.optimistic = {
              pending: false,
              failed: true,
              error: message,
            };
          } else {
            if (data) {
              draft.latestMessage = data.newMessage;
              draft.unread = false;
              draft.updatedAt = data.conversation.updatedAt;
            }
          }
        }
      );

      const finalConversationList = produce(
        context.newConversationList,
        (draft) => {
          if (error) {
            const { message } = handleApiErrorException(error);
            const finalConversation = draft[0];
            if (finalConversation) {
              finalConversation.optimistic = {
                pending: false,
                failed: true,
                error: message,
              };
            }
          } else {
            const finalConversation = draft[0];
            if (finalConversation) {
              finalConversation.optimistic = {
                pending: false,
                failed: false,
                error: null,
              };
            }
          }
        }
      );

      queryClient.setQueryData(
        context.keys.messagesPageKey,
        finalMessagesResponse
      );
      queryClient.setQueryData(
        context.keys.conversationDetailKey,
        finalConversationDetail
      );
      queryClient.setQueryData(
        context.keys.conversationListKey,
        finalConversationList
      );
    },
  });

  return {
    sendAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}

export function useMessageMutationState() {
  const queryClient = useQueryClient();

  const sendMessage = useCallback(
    async (messageResponse: IncomingRealTimeMessage) => {
      const messagesPageKey = chatAreaQueryKey(
        messageResponse.conversation.ticketId
      );
      const conversationDetailKey = conversationKeys.detail(
        messageResponse.conversation.ticketId
      );
      const conversationListKey = conversationKeys.list(
        messageResponse.conversation.liveDeskId
      );

      const oldMessagesResponse = queryClient.getQueryData<{
        pageParams: string[];
        pages: ApiMessagesResponse[];
      }>(messagesPageKey);

      const oldConversationDetail =
        queryClient.getQueryData<ConversationDetail>(conversationDetailKey);

      const oldConversationList =
        queryClient.getQueryData<ConversationListItem[]>(conversationListKey);

      const newLatestMessages = produce(oldMessagesResponse, (draft) => {
        draft?.pages[draft.pages?.length - 1]?.data.push(
          messageResponse.message
        );
      });

      const newConversationDetail = produce(oldConversationDetail, (draft) => {
        if (draft) {
          draft.latestMessage = messageResponse.message;
          draft.unread = true;
          draft.updatedAt = messageResponse.message.createdAt;
          draft.optimistic = undefined;
        }
      });

      let foundConversationIndex = 0;
      let newConversationList = produce(oldConversationList, (draft) => {
        if (!draft) return;
        foundConversationIndex = draft.findIndex(
          (c) => c.ticketId === messageResponse.conversation.ticketId
        );
        if (foundConversationIndex === -1) {
          return;
        }

        if (foundConversationIndex > 0) {
          const [conversation] = draft.splice(foundConversationIndex, 1);
          if (conversation) {
            conversation.latestMessage = messageResponse.message;
            conversation.updatedAt = messageResponse.message.createdAt;
            conversation.unread = true;
            conversation.optimistic = undefined;
            draft.unshift(conversation);
          }
        } else {
          draft[0] = {
            ...messageResponse.conversation,
            latestMessage: messageResponse.message,
            updatedAt: messageResponse.message.createdAt,
            unread: true,
            optimistic: undefined,
          };
        }
      });

      if (foundConversationIndex === -1) {
        newConversationList = [
          {
            ...messageResponse.conversation,
            latestMessage: messageResponse.message,
            updatedAt: messageResponse.message.createdAt,
            unread: true,
            optimistic: undefined,
            liveDeskId: messageResponse.conversation.liveDeskId,
          },
          ...(oldConversationList ?? []),
        ];
      }

      queryClient.setQueryData(messagesPageKey, newLatestMessages);
      queryClient.setQueryData(conversationDetailKey, newConversationDetail);
      queryClient.setQueryData(conversationListKey, newConversationList);

      // console.log('👥 Send message:', message);
    },
    [queryClient]
  );

  return {
    sendMessage,
  };
}
