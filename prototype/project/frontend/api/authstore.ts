import { create } from 'zustand'
import { apiFetch } from './api'

export type User = {
  id: number
  username: string
  email: string
  role: 'user' | 'admin'
  theme?: 'dark' | 'light'
}

type AuthState = {
  token: string | null
  user: User | null
  loading: boolean
  setToken: (token: string | null) => void
  loadMe: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (username: string, email: string, password: string) => Promise<void>
  googleLogin: (credential: string) => Promise<void>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: localStorage.getItem('mm_token'),
  user: null,
  loading: false,
  setToken: (token) => {
    if (token) localStorage.setItem('mm_token', token)
    else localStorage.removeItem('mm_token')
    set({ token })
  },
  loadMe: async () => {
    const token = get().token
    if (!token) {
      set({ user: null })
      return
    }
    set({ loading: true })
    try {
      const data = await apiFetch<{ user: User }>('/api/auth/me')
      set({ user: data.user })
    } catch {
      get().logout()
    } finally {
      set({ loading: false })
    }
  },
  login: async (email, password) => {
    set({ loading: true })
    try {
      const data = await apiFetch<{ token: string; user: User }>('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })
      get().setToken(data.token)
      set({ user: data.user })
    } finally {
      set({ loading: false })
    }
  },
  register: async (username, email, password) => {
    set({ loading: true })
    try {
      const data = await apiFetch<{ token: string; user: User }>('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      })
      get().setToken(data.token)
      set({ user: data.user })
    } finally {
      set({ loading: false })
    }
  },
  googleLogin: async (credential) => {
    set({ loading: true })
    try {
      const data = await apiFetch<{ token: string; user: User }>('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({ credential }),
      })
      get().setToken(data.token)
      set({ user: data.user })
    } finally {
      set({ loading: false })
    }
  },
  logout: () => {
    localStorage.removeItem('mm_token')
    set({ token: null, user: null })
  },
}))

