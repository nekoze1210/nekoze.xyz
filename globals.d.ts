declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly NOTION_DATABASE_ID: string
    readonly NOTION_TOKEN: string
  }
}
