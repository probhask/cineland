/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_ACCESS_TOKEN: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
