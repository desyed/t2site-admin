import { api } from '@/lib/api';

import type {
  ChatWidgetBannerPayload,
  ChatWidgetColorsPayload,
  ChatWidgetCtaPayload,
} from './chat-widget.type';

function updateChatWidgetConfig<T>(
  liveDeskId: string,
  key: 'cta' | 'banner' | 'colors',
  data: T
) {
  return api.put(
    `/features/live-desk/${liveDeskId}/chat-widget/config/${key}`,
    data
  );
}

export function updateChatWidgetCtaApi({
  liveDeskId,
  payload,
}: ChatWidgetCtaPayload) {
  return updateChatWidgetConfig(liveDeskId, 'cta', payload);
}

export function updateChatWidgetBannerApi({
  liveDeskId,
  payload,
}: ChatWidgetBannerPayload) {
  return updateChatWidgetConfig(liveDeskId, 'banner', payload);
}

export function updateChatWidgetColorsApi({
  liveDeskId,
  payload,
}: ChatWidgetColorsPayload) {
  return updateChatWidgetConfig(liveDeskId, 'colors', payload);
}
