import { apiFetch } from './api'
import type { User } from './authStore'

export type Theme = 'dark' | 'light'

const STORAGE_KEY = 'mm_theme'

export function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(STORAGE_KEY, theme)
}

export function getStoredTheme(): Theme {
  const raw = localStorage.getItem(STORAGE_KEY)
  return raw === 'light' ? 'light' : 'dark'
}

export async function syncThemeFromUser(user: User | null) {
  const stored = getStoredTheme()
  const theme = (user?.theme === 'light' || user?.theme === 'dark') ? user.theme : stored
  applyTheme(theme)
}

export async function saveThemePreference(theme: Theme, isLoggedIn: boolean) {
  applyTheme(theme)
  if (!isLoggedIn) return
  try {
    await apiFetch('/api/auth/preferences', {
      method: 'PUT',
      body: JSON.stringify({ theme }),
    })
  } catch {
    // local preference still applied
  }
}

