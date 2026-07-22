import { useMemo, useState } from 'react'
import { ArrowLeft, LogIn, UserPlus } from 'lucide-react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuthStore } from '../lib/authStore'
import { getGoogleIdToken } from '../lib/google'

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303C33.701 32.655 29.29 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917Z"/>
      <path fill="#FF3D00" d="M6.306 14.691 12.87 19.5C14.655 15.092 18.959 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691Z"/>
      <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.269 0-9.668-3.318-11.292-7.946l-6.52 5.024C9.505 39.556 16.227 44 24 44Z"/>
      <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.21-2.278 4.083-4.094 5.282l.003-.002 6.19 5.238C36.972 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917Z"/>
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 814 1000" aria-hidden="true">
      <path
        fill="currentColor"
        d="M788 814c-20 45-29 65-55 104-37 55-89 123-154 124-57 1-72-37-150-37-79 0-95 36-151 38-64 2-112-62-149-117-103-149-115-324-50-424 46-71 118-112 185-113 58-1 112 39 151 39 38 0 107-48 181-41 31 1 118 12 173 91-4 3-103 60-92 180 9 144 126 192 131 194Zm-130-719c29-38 51-92 43-147-47 2-103 31-136 69-30 34-55 88-45 140 51 4 108-26 138-62Z"
      />
    </svg>
  )
}

export default function AuthPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const modeFromUrl = params.get('mode')
  const [mode, setMode] = useState<'login' | 'signup'>(modeFromUrl === 'signup' ? 'signup' : 'login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { login, register, googleLogin, loading } = useAuthStore()

  const title = useMemo(() => (mode === 'login' ? 'Welcome back' : 'Create your account'), [mode])

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    try {
      if (mode === 'login') await login(email, password)
      else await register(username, email, password)
      navigate('/', { replace: true })
    } catch (e: unknown) {
      const msg = typeof (e as any)?.error === 'string' ? (e as any).error : 'Something went wrong.'
      setError(msg)
    }
  }

  const onGoogle = async () => {
    setError(null)
    try {
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined
      if (!clientId) {
        setError('Google sign-in needs VITE_GOOGLE_CLIENT_ID in frontend .env.')
        return
      }
      const credential = await getGoogleIdToken(clientId)
      await googleLogin(credential)
      navigate('/', { replace: true })
    } catch (e: unknown) {
      setError((e as any)?.error || (e as Error)?.message || 'Google sign-in failed.')
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-head">
          <h1>{title}</h1>
          <p>Login is optional. If you stay as guest, chat history won’t be saved.</p>
        </div>

        <div className="oauth-row">
          <button type="button" className="oauth-btn brand" onClick={() => void onGoogle()}>
            <GoogleIcon /> Continue with Google
          </button>
          <button type="button" className="oauth-btn brand apple" onClick={() => setError('Apple sign-in needs Apple Developer credentials (Team ID, Service ID, Key ID).')}>
            <AppleIcon /> Continue with Apple
          </button>
        </div>

        <div className="auth-divider"><span>or</span></div>

        <form className="auth-form" onSubmit={submit}>
          {mode === 'signup' && (
            <label>
              Username
              <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. movielover" />
            </label>
          )}
          <label>
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </label>

          {error && <div className="auth-error">{error}</div>}

          <button className="auth-submit" type="submit" disabled={loading}>
            {mode === 'login' ? <LogIn size={16} /> : <UserPlus size={16} />}
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-switch">
          {mode === 'login' ? (
            <button type="button" onClick={() => setMode('signup')}>Need an account? Sign up</button>
          ) : (
            <button type="button" onClick={() => setMode('login')}>Already have an account? Log in</button>
          )}
        </div>

        <div className="auth-guest">
          <button type="button" className="guest-btn" onClick={() => navigate('/', { replace: true })}>
            <ArrowLeft size={16} /> Continue as guest
          </button>
        </div>
      </div>
    </div>
  )
}

