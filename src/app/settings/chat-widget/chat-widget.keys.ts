export const chatWidgetQueryKeys = {
  root: (liveDeskId: string) => ['chat-widget', liveDeskId],
  cta: (liveDeskId: string) => [...chatWidgetQueryKeys.root(liveDeskId), 'cta'],
  banner: (liveDeskId: string) => [
    ...chatWidgetQueryKeys.root(liveDeskId),
    'banner',
  ],
  colors: (liveDeskId: string) => [
    ...chatWidgetQueryKeys.root(liveDeskId),
    'colors',
  ],
};
