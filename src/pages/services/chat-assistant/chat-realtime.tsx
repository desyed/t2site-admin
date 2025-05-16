/* eslint-disable no-console */

import type * as PusherTypes from 'pusher-js';

import { createContext, useEffect, useState } from 'react';

import { useConversationListQuery } from '@/app/services/chat-assistant/chat-assistant.hooks';
import pusher from '@/lib/pusher-client';

export type ChannelInfo = {
  channelName: string;
  channel: PusherTypes.Channel | null;
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
  const {
    isLoading: isConversationsLoading,
    isSuccess: isConversationsSuccess,
  } = useConversationListQuery(chatAssistantId, !!chatAssistantId);

  const [isPusherConnected, setIsPusherConnected] = useState(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>({
    channelName: '',
    connected: false,
    error: null,
    channel: null,
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

      const channel = pusher.subscribe(channelName);

      channel.bind('pusher:subscription_succeeded', () => {
        console.log('✅ Subscription succeeded:', channelName);
        setChannelInfo({
          channelName,
          connected: true,
          error: null,
          channel,
        });
      });

      channel.bind('pusher:subscription_error', (error: any) => {
        console.log('❌ Subscription error:', error);
        setChannelInfo({
          channelName,
          connected: false,
          error: error.error ?? 'Failed to connect chat-assistant',
          channel,
        });
      });

      channel.bind('test', (data: any) => {
        console.log('👥 Presence data:', data);
      });

      return () => {
        channel.unbind_all();
        pusher.connection.unbind_all();
        pusher.unsubscribe(channelName);
      };
    }
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
