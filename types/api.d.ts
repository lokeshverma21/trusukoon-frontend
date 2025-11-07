// types/api.d.ts
export interface ApiErrorResponse {
  statusCode: number
  data: unknown | null
  success: boolean
  message: string
  errors: string[] | Record<string>[]
}
