/* eslint-disable no-console */

import type * as PusherTypes from 'pusher-js';

import { createContext, useContext, useEffect, useState } from 'react';

import type { IncommingRealTimeMessage } from '@/app/services/chat-assistant/chat-assistant.type';

import {
  useConversationListQuery,
  useMessageMutationState,
} from '@/app/services/chat-assistant/chat-assistant.hooks';
import pusher from '@/lib/pusher-client';

export type ChannelInfo = {
  channelName: string;
  chatAssistantChannel: PusherTypes.PresenceChannel | null;
  connected: boolean;
  error: string | null;
};

export type ChatRealtimeContextType = {
  chatAssistantId: string;
  isPusherConnected: boolean;
  channelInfo: ChannelInfo;
};

export const ChatRealtimeContext = createContext<ChatRealtimeContextType>(
  {} as ChatRealtimeContextType
);

export default function ChatRealtimeProvider({
  chatAssistantId,
  children,
}: {
  chatAssistantId: string;
  children: React.ReactNode;
}) {
  const { sendMessage } = useMessageMutationState();

  const {
    isLoading: isConversationsLoading,
    isSuccess: isConversationsSuccess,
  } = useConversationListQuery(chatAssistantId, !!chatAssistantId);

  const [isPusherConnected, setIsPusherConnected] = useState(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>({
    channelName: '',
    connected: false,
    error: null,
    chatAssistantChannel: null,
  });

  useEffect(() => {
    if (isConversationsSuccess && !isConversationsLoading && chatAssistantId) {
      const channelName = `presence-chatassistant__${chatAssistantId}`;

      pusher.connection.bind('error', (error: any) => {
        if (error.data.code === 4004) {
          console.log('Over limit!');
        }
      });

      pusher.connection.bind('connected', () => {
        console.log('Connected to Pusher');
      });

      pusher.connection.bind('state_change', (states: any) => {
        setIsPusherConnected(states.current === 'connected');
      });

      const chatAssistantChannel = pusher.subscribe(
        channelName
      ) as PusherTypes.PresenceChannel;

      chatAssistantChannel.bind('pusher:subscription_succeeded', () => {
        setChannelInfo({
          channelName,
          connected: true,
          error: null,
          chatAssistantChannel,
        });
      });

      chatAssistantChannel.bind('pusher:subscription_error', (error: any) => {
        console.log('❌ Subscription error:', error);
        setChannelInfo({
          channelName,
          connected: false,
          error: error.error ?? 'Failed to connect chat-assistant',
          chatAssistantChannel,
        });
      });

      // channel.bind('pusher:member_added', (member) => {
      //   console.log('User joined:', member.info);
      // });

      // channel.bind('pusher:member_removed', (member) => {
      //   console.log('User left:', member.info);
      // });

      const handleTrafficMessage = (data: IncommingRealTimeMessage) => {
        console.log('👥 Traffic message:', data);
        sendMessage(data);
      };

      chatAssistantChannel.bind('trafficMessage', handleTrafficMessage);

      return () => {
        chatAssistantChannel.unbind_all();
        pusher.connection.unbind_all();
        pusher.unsubscribe(channelName);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatAssistantId, isConversationsSuccess, isConversationsLoading]);

  const isConnected =
    pusher.connection.state === 'connected' || isPusherConnected;

  return (
    <ChatRealtimeContext.Provider
      value={{ chatAssistantId, isPusherConnected: isConnected, channelInfo }}
    >
      {children}
    </ChatRealtimeContext.Provider>
  );
}

export function useChatRealtime() {
  const context = useContext(ChatRealtimeContext);

  if (!context) {
    throw new Error('ChatRealtimeContext is not found');
  }

  return context;
}
