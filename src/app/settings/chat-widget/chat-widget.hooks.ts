import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  ChatWidgetBannerPayload,
  ChatWidgetColorsPayload,
  ChatWidgetCtaPayload,
} from './chat-widget.type';

import {
  updateChatWidgetBannerApi,
  updateChatWidgetBannerImageApi,
  updateChatWidgetColorsApi,
  updateChatWidgetCtaApi,
  updateChatWidgetLogoApi,
  updateChatWidgetPromotionalImageApi,
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

export function useUpdateChatWidgetLogo() {
  return useMutation({
    mutationFn: ({ liveDeskId, file }: { liveDeskId: string; file: File }) =>
      updateChatWidgetLogoApi(liveDeskId, file),
  });
}

export function useUpdateChatWidgetBannerImage() {
  return useMutation({
    mutationFn: ({ liveDeskId, file }: { liveDeskId: string; file: File }) =>
      updateChatWidgetBannerImageApi(liveDeskId, file),
  });
}
export function useUpdateChatWidgetPromotionalImage() {
  return useMutation({
    mutationFn: ({ liveDeskId, file }: { liveDeskId: string; file: File }) =>
      updateChatWidgetPromotionalImageApi(liveDeskId, file),
  });
}
