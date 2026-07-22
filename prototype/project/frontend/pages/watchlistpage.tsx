import { useState, useEffect } from 'react'
import { Trash2, BookmarkCheck, Clock } from 'lucide-react'
import { apiFetch } from '../lib/api'
import Navbar from '../components/Navbar'
import '../styles/WatchlistPage.css'

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

type WatchlistItem = {
  id: number
  tmdb_id: number
  media_type: 'movie' | 'tv'
  title: string
  poster_path: string | null
  list_type: 'favorites' | 'watch_later'
  added_at: string
}

export default function WatchlistPage() {
  const [items, setItems] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'favorites' | 'watch_later'>('favorites')

  useEffect(() => {
    fetchWatchlist()
  }, [])

  async function fetchWatchlist() {
    setLoading(true)
    try {
      const data = await apiFetch<{ items: WatchlistItem[] }>('/api/watchlist')
      setItems(data.items || [])
    } catch (error) {
      console.error('Failed to fetch watchlist:', error)
    } finally {
      setLoading(false)
    }
  }

  async function removeFromWatchlist(id: number) {
    try {
      await apiFetch(`/api/watchlist/${id}`, { method: 'DELETE' })
      setItems((prev) => prev.filter((item) => item.id !== id))
    } catch (error) {
      console.error('Failed to remove from watchlist:', error)
    }
  }

  async function moveToList(item: WatchlistItem, newListType: 'favorites' | 'watch_later') {
    try {
      await apiFetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({
          tmdb_id: item.tmdb_id,
          media_type: item.media_type,
          title: item.title,
          poster_path: item.poster_path,
          list_type: newListType,
        }),
      })
      setItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, list_type: newListType } : i)),
      )
    } catch (error) {
      console.error('Failed to move item:', error)
    }
  }

  const filteredItems = items.filter((item) => item.list_type === activeTab)
  const favoritesCount = items.filter((item) => item.list_type === 'favorites').length
  const watchLaterCount = items.filter((item) => item.list_type === 'watch_later').length

  return (
    <div className="watchlist-page">
      <Navbar />
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
        <p>Saved movies and TV shows for later</p>
      </div>

      <div className="watchlist-tabs">
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
          <BookmarkCheck size={18} />
          Favorites ({favoritesCount})
        </button>
        <button
          className={`tab ${activeTab === 'watch_later' ? 'active' : ''}`}
          onClick={() => setActiveTab('watch_later')}
        >
          <Clock size={18} />
          Watch Later ({watchLaterCount})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading watchlist...</div>
      ) : filteredItems.length === 0 ? (
        <div className="empty-state">
          <p>
            {activeTab === 'favorites'
              ? 'No favorites yet. Add movies and shows you love!'
              : 'No items to watch later. Add something to come back to!'}
          </p>
        </div>
      ) : (
        <div className="watchlist-grid">
          {filteredItems.map((item) => (
            <div key={item.id} className="watchlist-item">
              {item.poster_path ? (
                <img src={`${IMAGE_BASE_URL}/w342${item.poster_path}`} alt={item.title} />
              ) : (
                <div className="no-poster">No Image</div>
              )}
              <div className="item-overlay">
                <h3>{item.title}</h3>
                <p className="media-type">{item.media_type === 'tv' ? 'TV Show' : 'Movie'}</p>
                <div className="item-actions">
                  {activeTab === 'favorites' ? (
                    <button
                      className="action-btn"
                      onClick={() => moveToList(item, 'watch_later')}
                      title="Move to Watch Later"
                    >
                      <Clock size={16} /> Watch Later
                    </button>
                  ) : (
                    <button
                      className="action-btn"
                      onClick={() => moveToList(item, 'favorites')}
                      title="Move to Favorites"
                    >
                      <BookmarkCheck size={16} /> Favorite
                    </button>
                  )}
                  <button
                    className="action-btn remove"
                    onClick={() => removeFromWatchlist(item.id)}
                    title="Remove from watchlist"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
