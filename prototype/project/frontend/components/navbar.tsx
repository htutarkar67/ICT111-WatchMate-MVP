import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bookmark, ChevronDown, Film, LogOut, Moon, Search, Settings, Sun, User, MessageCircle } from 'lucide-react'
import { useAuthStore } from '../lib/authStore'
import { getStoredTheme, saveThemePreference } from '../lib/theme'
import '../App.css'

interface NavbarProps {
  onSearch?: (term: string) => void;
  onOpenChat?: () => void;
}

export default function Navbar({ onSearch, onOpenChat }: NavbarProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [theme, setTheme] = useState<'dark' | 'light'>(getStoredTheme())
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const toggleTheme = async () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    await saveThemePreference(next, Boolean(user))
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchTerm)
    } else {
      // Default behavior if onSearch not provided: maybe redirect to a search results page
      // For now, we'll just go home if not on home page
      navigate('/')
    }
  }

  return (
    <nav className="navbar" onClick={(e) => e.stopPropagation()}>
      <button type="button" className="logo-btn" onClick={() => navigate('/')}>
        <div className="logo-container">
          <img className="logo-img" src="/logo.png" alt="What2Watch" />
        </div>
      </button>

      <div className="menu">
        <button type="button" className="menu-link" onClick={() => navigate('/movies')}>
          <Film size={16} /> Movies
        </button>
        <button type="button" className="menu-link" onClick={() => navigate('/tv')}>
          <Film size={16} /> TV Shows
        </button>
        {user && (
          <button type="button" className="menu-link" onClick={() => navigate('/watchlist')}>
            <Bookmark size={16} /> Watchlist
          </button>
        )}
      </div>

      <form className="search" onSubmit={handleSearch}>
        <Search size={16} />
        <input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search Movies, TV Shows, People..."
        />
      </form>

      <div className="nav-actions">
        <button type="button" className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {!user ? (
          <button type="button" className="login-btn" onClick={() => navigate('/auth')}>
            Login
          </button>
        ) : (
          <div className="profile">
            <button type="button" className="profile-btn" onClick={(e) => { e.stopPropagation(); setProfileOpen((v) => !v) }}>
              <User size={16} />
              {user.username}
              <ChevronDown size={16} />
            </button>
            {profileOpen && (
              <div className="profile-menu" onClick={(e) => e.stopPropagation()} role="menu">
                <div className="profile-item muted">{user.email}</div>
                {user.role === 'admin' && (
                  <button type="button" className="profile-item" onClick={() => { setProfileOpen(false); navigate('/admin') }}>
                    <Settings size={16} /> Admin Dashboard
                  </button>
                )}
                <button type="button" className="profile-item" onClick={() => { setProfileOpen(false); navigate('/watchlist') }}>
                  <Bookmark size={16} /> My Watchlist
                </button>
                <button type="button" className="profile-item" onClick={() => { setProfileOpen(false); onOpenChat?.() }}>
                  <MessageCircle size={16} /> Open Chat
                </button>
                <button type="button" className="profile-item" onClick={() => { setProfileOpen(false); logout(); }}>
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
