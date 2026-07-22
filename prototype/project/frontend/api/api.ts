export type ApiError = {
  error: string
  details?: string
  detail?: string
}

function getToken() {
  return localStorage.getItem('mm_token') || ''
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers || {})
  headers.set('Content-Type', 'application/json')
  const token = getToken()
  if (token) headers.set('Authorization', `Bearer ${token}`)

  const response = await fetch(path, { ...init, headers })
  const data = (await response.json().catch(() => ({}))) as unknown
  if (!response.ok) {
    throw data as ApiError
  }
  return data as T
}

