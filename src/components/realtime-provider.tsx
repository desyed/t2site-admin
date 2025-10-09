/* eslint-disable no-console */

import type * as PusherTypes from 'pusher-js';

import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { IncomingRealTimeMessage } from '@/app/features/live-desk/live-desk.type';

import {
  useConversationListQuery,
  useMessageMutationState,
} from '@/app/features/live-desk/live-desk.hooks';
import { useCurrentProjectQuery } from '@/app/project/project.hooks';
import { playNotificationSound } from '@/audio-contenxt/system';
import pusher from '@/lib/pusher-client';

export type ChannelInfo = {
  channelName: string;
  liveDeskChannel: PusherTypes.PresenceChannel | null;
  connected: boolean;
  error: string | null;
};

export type RealtimeContextType = {
  liveDeskId: string;
  isPusherConnected: boolean;
  channelInfo: ChannelInfo;
};

export const RealtimeContext = createContext<RealtimeContextType>(
  {} as RealtimeContextType
);

export default function RealtimeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: currentProject } = useCurrentProjectQuery();

  const { sendMessage } = useMessageMutationState();
  const navigate = useNavigate();

  const liveDeskId = currentProject?.features?.liveDesk.id;

  const {
    isLoading: isConversationsLoading,
    isSuccess: isConversationsSuccess,
  } = useConversationListQuery(liveDeskId ?? '', !!liveDeskId);

  const [isPusherConnected, setIsPusherConnected] = useState(false);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>({
    channelName: '',
    connected: false,
    error: null,
    liveDeskChannel: null,
  });

  useEffect(() => {
    if (isConversationsSuccess && !isConversationsLoading && liveDeskId) {
      const channelName = `presence-liveDesk__${liveDeskId}`;

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

      const liveDeskChannel = pusher.subscribe(
        channelName
      ) as PusherTypes.PresenceChannel;

      liveDeskChannel.bind('pusher:subscription_succeeded', () => {
        setChannelInfo({
          channelName,
          connected: true,
          error: null,
          liveDeskChannel,
        });
      });

      liveDeskChannel.bind('pusher:subscription_error', (error: any) => {
        console.log('❌ Subscription error:', error);
        setChannelInfo({
          channelName,
          connected: false,
          error: error.error ?? 'Failed to connect live-desk',
          liveDeskChannel,
        });
      });

      // channel.bind('pusher:member_added', (member) => {
      //   console.log('User joined:', member.info);
      // });

      // channel.bind('pusher:member_removed', (member) => {
      //   console.log('User left:', member.info);

      // });

      const handleNotification = (data: IncomingRealTimeMessage) => {
        const ticketId = data.conversation.ticketId;
        const message = data.message;

        if (window.location.pathname.includes('/live-desk/live-chat')) {
          return;
        }

        // Extract message preview based on content type
        let messagePreview = '';
        if (message.content.type === 'text') {
          messagePreview =
            message.content.text.length > 50
              ? message.content.text.substring(0, 50) + '...'
              : message.content.text;
        } else if (message.content.type === 'image') {
          messagePreview = '📷 Image';
        } else if (message.content.type === 'audio') {
          messagePreview = '🎵 Audio';
        } else if (message.content.type === 'video') {
          messagePreview = '🎥 Video';
        } else if (message.content.type === 'emojiOrSticker') {
          messagePreview =
            message.content.emoji || message.content.sticker || '😊 Emoji';
        }

        toast.message(`New message from ${ticketId}`, {
          description: messagePreview,
          action: {
            label: 'View',
            onClick: () => {
              navigate(`${currentProject?.id}/live-desk/live-chat/${ticketId}`);
              toast.dismiss();
            },
          },
          position: 'top-right',
        });

        playNotificationSound();
      };

      const handleTrafficMessage = (data: IncomingRealTimeMessage) => {
        handleNotification(data);
        sendMessage(data);
      };

      liveDeskChannel.bind('trafficMessage', handleTrafficMessage);

      return () => {
        // liveDeskChannel.unbind_all();
        // pusher.connection.unbind_all();
        pusher.unsubscribe(channelName);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [liveDeskId, isConversationsSuccess, isConversationsLoading]);

  const isConnected =
    pusher.connection.state === 'connected' || isPusherConnected;

  return (
    <RealtimeContext.Provider
      value={{
        liveDeskId: liveDeskId ?? '',
        isPusherConnected: isConnected,
        channelInfo,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  );
}

export function useRealtime() {
  const context = useContext(RealtimeContext);

  if (!context) {
    throw new Error('RealtimeContext is not found');
  }

  return context;
}
