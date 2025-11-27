import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  ChatWidgetBannerPayload,
  ChatWidgetColorsPayload,
  ChatWidgetCtaPayload,
} from './chat-widget.type';

import {
  updateChatWidgetBannerApi,
  updateChatWidgetColorsApi,
  updateChatWidgetCtaApi,
} from './chat-widget.api';
import { chatWidgetQueryKeys } from './chat-widget.keys';

export function useUpdateChatWidgetCta() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChatWidgetCtaPayload) => updateChatWidgetCtaApi(data),

    onSuccess: (_, { liveDeskId }) => {
      queryClient.invalidateQueries({
        queryKey: chatWidgetQueryKeys.cta(liveDeskId),
      });
    },
  });
}

export function useUpdateChatWidgetBanner() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChatWidgetBannerPayload) =>
      updateChatWidgetBannerApi(data),

    onSuccess: (_, { liveDeskId }) => {
      queryClient.invalidateQueries({
        queryKey: chatWidgetQueryKeys.banner(liveDeskId),
      });
    },
  });
}

export function useUpdateChatWidgetColors() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ChatWidgetColorsPayload) =>
      updateChatWidgetColorsApi(data),

    onSuccess: (_, { liveDeskId }) => {
      queryClient.invalidateQueries({
        queryKey: chatWidgetQueryKeys.colors(liveDeskId),
      });
    },
  });
}
