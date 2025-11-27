export interface ChatWidgetPayload<T> {
  liveDeskId: string;
  payload: T;
}

export type ChatWidgetCta = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
};

export type ChatWidgetBanner = {
  title: string;
  subtitle: string;
};

export type ChatWidgetColors = {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
  logoBadgeBackgroundColor: string;
};

export type ChatWidgetCtaPayload = ChatWidgetPayload<ChatWidgetCta>;

export type ChatWidgetBannerPayload = ChatWidgetPayload<ChatWidgetBanner>;

export type ChatWidgetColorsPayload = ChatWidgetPayload<ChatWidgetColors>;
