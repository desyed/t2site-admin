import { create } from 'zustand';

import type { FaqDTO } from './faq.types';

type FaqStore = {
  faqs: FaqDTO[];
  pagination: {
    nextCursor: string | null;
    prevCursor: string | null;
    hasMore: boolean;
  };

  setFaqs: (data: FaqDTO[]) => void;
  addFaq: (faq: FaqDTO) => void;
  updateFaq: (faq: FaqDTO) => void;
  removeFaq: (id: string) => void;

  setPagination: (p: FaqStore['pagination']) => void;
};

export const useFaqStore = create<FaqStore>((set) => ({
  faqs: [],
  pagination: {
    nextCursor: null,
    prevCursor: null,
    hasMore: false,
  },

  setFaqs: (faqs) => set({ faqs }),
  addFaq: (faq) => set((s) => ({ faqs: [...s.faqs, faq] })),
  updateFaq: (faq) =>
    set((s) => ({
      faqs: s.faqs.map((f) => (f.id === faq.id ? faq : f)),
    })),
  removeFaq: (id) =>
    set((s) => ({
      faqs: s.faqs.filter((f) => f.id !== id),
    })),

  setPagination: (pagination) => set({ pagination }),
}));
