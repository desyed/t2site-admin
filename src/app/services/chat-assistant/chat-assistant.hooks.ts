import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

import { useAuthStore } from '@/app/auth/auth.store';
import { generateMessageId, handleApiErrorException } from '@/lib/utils';

import type {
  ApiMessagesResponse,
  ConversationDetail,
  ConversationListItem,
  Message,
  SendMessagePayload,
  SendMessageResponse,
} from './chat-assistant.type';

import { sendMessageApi } from './chat-assistant.api';
import {
  fetchConversationDetail,
  fetchConversations,
} from './chat-assistant.fetch';
import { chatAreaQueryKey, conversationKeys } from './chat-assistant.keys';

export function useConversationDetailQuery(ticketId: string) {
  const query = useQuery({
    queryKey: conversationKeys.detail(ticketId),
    queryFn: () => fetchConversationDetail(ticketId),
  });
  return query;
}

export function useConversationListQuery(
  chatAssistantId: string,
  enabled: boolean = true
) {
  const query = useQuery({
    queryKey: conversationKeys.list(chatAssistantId),
    queryFn: () => fetchConversations(chatAssistantId),
    enabled,
  });
  return query;
}

export function useOptimisticSendMessageMutation() {
  const queryClient = useQueryClient();
  const currentUser = useAuthStore((state) => state.user);
  const userOrganization = useAuthStore((state) => state.userOrganization);

  const mutation = useMutation<
    SendMessageResponse,
    unknown,
    SendMessagePayload & {
      conversation: ConversationDetail;
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
        payload.conversation.chatAssistantId
      );

      await queryClient.cancelQueries({
        queryKey: messagesPageKey,
      });

      await queryClient.cancelQueries({
        queryKey: conversationDetailKey,
      });

      const oldMessagesResponse = queryClient.getQueryData<{
        pageParams: string[];
        pages: ApiMessagesResponse[];
      }>(messagesPageKey);

      const oldConversationDetail =
        queryClient.getQueryData<ConversationDetail>(conversationDetailKey);

      const oldConversationList =
        queryClient.getQueryData<ConversationDetail[]>(conversationListKey);

      const timeStamp = new Date().toISOString();

      const newMessage = {
        id: generateMessageId(),
        sender: 'assistant',
        assistantMember: {
          email: currentUser?.email ?? '',
          role: userOrganization?.currentOrganization?.role ?? '',
          user: {
            id: currentUser?.id ?? '',
            name: currentUser?.name ?? '',
            avatar: currentUser?.avatar ?? '',
            email: currentUser?.email ?? '',
          },
        },
        assistantMemberId:
          userOrganization?.currentOrganization?.memberId ?? '',
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
        }
      });

      queryClient.setQueryData(messagesPageKey, newLatestMessages);
      queryClient.setQueryData(conversationDetailKey, newConversationDetail);
      // queryClient.setQueryData(conversationListKey, [...newConversationList]);

      return {
        newMessage,
        oldMessagesResponse,
        oldConversationDetail,
        oldConversationList,
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
        oldConversationList: ConversationListItem[];
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
            draft.latestMessage = context.oldConversationDetail.latestMessage;
            draft.unread = context.oldConversationDetail.unread;
            draft.updatedAt = context.oldConversationDetail.updatedAt;
          } else {
            if (data) {
              draft.latestMessage = data.newMessage;
              draft.unread = false;
              draft.updatedAt = data.conversation.updatedAt;
            }
          }
        }
      );

      // if (error) {
      //   queryClient.setQueryData(
      //     context.keys.conversationDetailKey,
      //     context.oldConversationDetail
      //   );
      // }

      queryClient.setQueryData(
        context.keys.messagesPageKey,
        finalMessagesResponse
      );
      queryClient.setQueryData(
        context.keys.conversationDetailKey,
        finalConversationDetail
      );
    },
  });

  return {
    sendAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
  };
}
