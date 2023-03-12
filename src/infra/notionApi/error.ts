export class NotionApiError extends Error {
  public code: number

  constructor(code: number, message?: string) {
    super(message)
    this.code = code
  }
}

export declare function isNotionApiError(error: unknown): error is NotionApiError
