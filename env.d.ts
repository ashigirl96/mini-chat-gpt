/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly OPEN_AI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
