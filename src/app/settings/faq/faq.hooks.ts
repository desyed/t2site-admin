import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import type { CreateFaqBody, UpdateFaqBody } from './faq.types';

import {
  getFaqsApi,
  createFaqApi,
  updateFaqApi,
  deleteFaqApi,
} from './faq.api';
import { useFaqStore } from './faq.store';

export function useFaqsQuery(liveDeskId: string) {
  const setFaqs = useFaqStore((s) => s.setFaqs);
  const setPagination = useFaqStore((s) => s.setPagination);

  const query = useQuery({
    queryKey: ['faqs', liveDeskId],
    queryFn: () => getFaqsApi(liveDeskId),
  });

  if (query.data) {
    setFaqs(query.data.data.questions);
    setPagination({
      nextCursor: query.data.pagination.nextCursor,
      prevCursor: query.data.pagination.prevCursor,
      hasMore: query.data.pagination.hasMore,
    });
  }

  return query;
}

export function useCreateFaq(liveDeskId: string) {
  const qc = useQueryClient();
  const addFaq = useFaqStore((s) => s.addFaq);

  return useMutation({
    mutationFn: (body: CreateFaqBody) => createFaqApi(liveDeskId, body),
    onSuccess: (faq) => {
      addFaq(faq.data);
      qc.invalidateQueries({ queryKey: ['faqs', liveDeskId] });
    },
  });
}

export function useUpdateFaq(liveDeskId: string) {
  const qc = useQueryClient();
  const updateFaq = useFaqStore((s) => s.updateFaq);

  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: UpdateFaqBody }) =>
      updateFaqApi(liveDeskId, id, body),
    onSuccess: (faq) => {
      updateFaq(faq.updatedQuestion);
      qc.invalidateQueries({ queryKey: ['faqs', liveDeskId] });
    },
  });
}

export function useDeleteFaq(liveDeskId: string) {
  const qc = useQueryClient();
  const removeFaq = useFaqStore((s) => s.removeFaq);

  return useMutation({
    mutationFn: (id: string) => deleteFaqApi(liveDeskId, id),
    onSuccess: (_, id) => {
      removeFaq(id);
      qc.invalidateQueries({ queryKey: ['faqs', liveDeskId] });
    },
  });
}
