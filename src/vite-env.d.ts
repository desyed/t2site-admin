/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_BACKEND_URL: string;
  readonly VITE_BASE_URL: string;
  readonly VITE_PUSHER_APP_CLUSTER: string;
  readonly VITE_PUSHER_APP_KEY: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
