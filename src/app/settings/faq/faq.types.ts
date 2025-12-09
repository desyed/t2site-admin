// faq.types.ts
export type FaqDTO = {
  id: string;
  cursor: string;
  liveDeskId: string;
  question: string;
  answer: string;
  createdAt: string;
};

export type GetFaqsResponse = {
  data: {
    questions: FaqDTO[];
  };
  pagination: {
    prevCursor: string | null;
    nextCursor: string | null;
    hasMore: boolean;
    limit: number;
    maxLimit: number;
    paginationType: 'cursor';
  };
};

export type CreateFaqBody = {
  question: string;
  answer: string;
};

export type UpdateFaqBody = Partial<CreateFaqBody>;
