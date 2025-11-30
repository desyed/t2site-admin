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

export async function updateChatWidgetLogoApi(liveDeskId: string, file: File) {
  const formData = new FormData();
  formData.append('logo', file);

  return api.put(
    `/features/live-desk/${liveDeskId}/chat-widget/config/logo`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
}

export async function updateChatWidgetBannerImageApi(
  liveDeskId: string,
  file: File
) {
  const formData = new FormData();
  formData.append('bannerImage', file);
  return api.put(
    `/features/live-desk/${liveDeskId}/chat-widget/config/banner-image`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}

export async function updateChatWidgetPromotionalImageApi(
  liveDeskId: string,
  file: File
) {
  const formData = new FormData();
  formData.append('promotionalImage', file);
  return api.put(
    `/features/live-desk/${liveDeskId}/chat-widget/config/promotional-image`,
    formData,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}
