export const ServiceType = [
  'chat_assistant',
  'cookie_consent',
  'web_analytics',
] as const;

export type TServiceType = (typeof ServiceType)[number];
