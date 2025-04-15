export interface ProviderRpcError extends Error {
  code: number
  data?: unknown
}

export function createProviderRpcError (
  message: string,
  code: number,
  data?: unknown,
): ProviderRpcError {
  const error = new Error(message) as ProviderRpcError
  error.code = code
  if (data !== undefined) {
    error.data = data
  }
  return error
}
