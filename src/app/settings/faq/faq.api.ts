// path: @/app/settings/chat-widget/faq.api.ts
import { api } from '@/lib/api';

import type {
  GetFaqsResponse,
  CreateFaqBody,
  UpdateFaqBody,
} from './faq.types';

export async function getFaqsApi(
  liveDeskId: string,
  params?: {
    nextCursor?: string | null;
    prevCursor?: string | null;
    limit?: number | null;
  }
) {
  const qp = new URLSearchParams();
  if (params?.nextCursor) qp.set('nextCursor', params.nextCursor);
  if (params?.prevCursor) qp.set('prevCursor', params.prevCursor);
  if (params?.limit != null) qp.set('limit', String(params.limit));

  return api
    .get<GetFaqsResponse>(
      `/features/live-desk/${liveDeskId}/chat-widget/questions${
        qp.toString() ? `?${qp.toString()}` : ''
      }`
    )
    .then((res) => res.data);
}

export const createFaqApi = (liveDeskId: string, body: CreateFaqBody) =>
  api
    .post(`/features/live-desk/${liveDeskId}/chat-widget/question`, body)
    .then((res) => res.data);

export const updateFaqApi = (
  liveDeskId: string,
  id: string,
  body: UpdateFaqBody
) =>
  api
    .put(`/features/live-desk/${liveDeskId}/chat-widget/question/${id}`, body)
    .then((res) => {
      return res.data;
    });

export const deleteFaqApi = (liveDeskId: string, id: string) =>
  api
    .delete(`/features/live-desk/${liveDeskId}/chat-widget/question/${id}`)
    .then((res) => res.data);
