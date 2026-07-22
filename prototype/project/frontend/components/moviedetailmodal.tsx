import { useEffect, useRef, useState } from 'react'
import { Bookmark, BookmarkCheck, Play, X, Star, Clock, Calendar, Globe, Film, Users } from 'lucide-react'
import './MovieDetailModal.css'
import { apiFetch } from './lib/api'
import { useAuthStore } from './lib/authStore'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

// ─── Types ──────────────────────────────────────────────────────────────────

export type TmdbListItem = {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path?: string | null
  backdrop_path?: string | null
  release_date?: string
  first_air_date?: string
  vote_average?: number
  media_type?: 'movie' | 'tv'
}

type Genre = { id: number; name: string }
type ProductionCompany = { id: number; name: string; logo_path: string | null }

type MovieDetails = {
  id: number
  title?: string
  name?: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date?: string
  first_air_date?: string
  vote_average: number
  vote_count: number
  runtime?: number
  episode_run_time?: number[]
  genres: Genre[]
  status: string
  original_language: string
  production_companies: ProductionCompany[]
  tagline?: string
}

type CastMember = {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

type CrewMember = {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

type VideoResult = {
  key: string
  type: string
  site: string
  name: string
  official: boolean
}

// ─── API Util ────────────────────────────────────────────────────────────────

async function tmdbFetch<T>(path: string): Promise<T> {
  const token = (TMDB_ACCESS_TOKEN || TMDB_API_KEY || '').trim().replace(/;+$/, '')
  const looksLikeJwt = typeof token === 'string' && token.split('.').length === 3
  const url = looksLikeJwt
    ? `${TMDB_BASE_URL}${path}`
    : `${TMDB_BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${TMDB_API_KEY}`

  const response = await fetch(
    url,
    looksLikeJwt
      ? { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' } }
      : undefined,
  )
  if (!response.ok) throw new Error(`TMDB ${response.status}`)
  return response.json() as Promise<T>
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getTitle = (item: TmdbListItem | MovieDetails) => item.title ?? item.name ?? 'Untitled'
const getDate = (item: TmdbListItem | MovieDetails) =>
  item.release_date ?? (item as MovieDetails).first_air_date ?? ''

const formatRuntime = (minutes?: number) => {
  if (!minutes) return null
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

const LANG_MAP: Record<string, string> = {
  en: 'English', ko: 'Korean', ja: 'Japanese', fr: 'French',
  es: 'Spanish', de: 'German', zh: 'Chinese', hi: 'Hindi',
  it: 'Italian', pt: 'Portuguese', th: 'Thai', ar: 'Arabic',
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`mdm-skeleton ${className}`} />
}

// ─── Component ────────────────────────────────────────────────────────────────

type Props = {
  item: TmdbListItem
  onClose: () => void
}

export default function MovieDetailModal({ item, onClose }: Props) {
  const { user } = useAuthStore()
  const [details, setDetails] = useState<MovieDetails | null>(null)
  const [cast, setCast] = useState<CastMember[]>([])
  const [crew, setCrew] = useState<CrewMember[]>([])
  const [trailer, setTrailer] = useState<VideoResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [trailerOpen, setTrailerOpen] = useState(false)
  const [watchlistStatus, setWatchlistStatus] = useState<'favorites' | 'watch_later' | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const mediaType: 'movie' | 'tv' =
    item.media_type ?? (item.first_air_date ? 'tv' : 'movie')

  // Fetch all data in parallel
  useEffect(() => {
    setLoading(true)
    setTrailerOpen(false)
    setTrailer(null)

    const fetchAll = async () => {
      try {
        const [detailData, creditsData, videosData] = await Promise.all([
          tmdbFetch<MovieDetails>(`/${mediaType}/${item.id}`),
          tmdbFetch<{ cast: CastMember[]; crew: CrewMember[] }>(`/${mediaType}/${item.id}/credits`),
          tmdbFetch<{ results: VideoResult[] }>(`/${mediaType}/${item.id}/videos`),
        ])

        setDetails(detailData)
        setCast((creditsData.cast ?? []).slice(0, 15))
        setCrew(creditsData.crew ?? [])

        const videos = videosData.results ?? []
        const found =
          videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer' && v.official) ??
          videos.find((v) => v.site === 'YouTube' && v.type === 'Trailer') ??
          videos.find((v) => v.site === 'YouTube' && v.type === 'Teaser') ??
          null
        setTrailer(found)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    void fetchAll()
  }, [item.id, mediaType])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Check watchlist status
  useEffect(() => {
    if (!user) {
      setWatchlistStatus(null)
      return
    }

    const checkWatchlist = async () => {
      try {
        const data = await apiFetch<{ inWatchlist: boolean; listType: string | null }>(
          `/api/watchlist/check/${item.id}/${mediaType}`,
        )
        setWatchlistStatus(data.inWatchlist ? (data.listType as 'favorites' | 'watch_later') : null)
      } catch (e) {
        console.error('Failed to check watchlist:', e)
      }
    }

    void checkWatchlist()
  }, [item.id, mediaType, user])

  const addToWatchlist = async (listType: 'favorites' | 'watch_later') => {
    if (!user) return
    try {
      await apiFetch('/api/watchlist', {
        method: 'POST',
        body: JSON.stringify({
          tmdb_id: item.id,
          media_type: mediaType,
          title: getTitle(details ?? item),
          poster_path: (details ?? item).poster_path,
          list_type: listType,
        }),
      })
      setWatchlistStatus(listType)
    } catch (e) {
      console.error('Failed to add to watchlist:', e)
    }
  }

  const removeFromWatchlist = async () => {
    if (!user) return
    try {
      await apiFetch(`/api/watchlist/by-tmdb/${item.id}/${mediaType}`, { method: 'DELETE' })
      setWatchlistStatus(null)
    } catch (e) {
      console.error('Failed to remove from watchlist:', e)
    }
  }

  const director = crew.find((c) => c.job === 'Director')
  const producers = crew.filter((c) => c.job === 'Producer' || c.job === 'Executive Producer').slice(0, 3)
  const runtime = details?.runtime ?? details?.episode_run_time?.[0]
  const releaseYear = getDate(details ?? item)
    ? new Date(getDate(details ?? item)).getFullYear()
    : 'N/A'
  const backdropUrl = details?.backdrop_path ?? item.backdrop_path
  const posterUrl = details?.poster_path ?? item.poster_path

  return (
    <div
      className="mdm-backdrop"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      role="presentation"
    >
      <div className="mdm-container" ref={modalRef} role="dialog" aria-modal="true" aria-label={getTitle(item)}>

        {/* ── Close button ───────────────────────────────────── */}
        <button className="mdm-close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>

        {/* ── Backdrop / Banner ──────────────────────────────── */}
        <div
          className="mdm-backdrop-img"
          style={{
            backgroundImage: backdropUrl
              ? `url(${IMAGE_BASE_URL}/original${backdropUrl})`
              : 'none',
          }}
        >
          <div className="mdm-backdrop-gradient" />
        </div>

        {/* ── Scroll body ────────────────────────────────────── */}
        <div className="mdm-body">

          {/* ── Overview section ─────────────────────────────── */}
          <div className="mdm-overview">
            {/* Poster */}
            <div className="mdm-poster-wrap">
              {loading ? (
                <Skeleton className="mdm-poster-skeleton" />
              ) : posterUrl ? (
                <img
                  className="mdm-poster"
                  src={`${IMAGE_BASE_URL}/w500${posterUrl}`}
                  alt={getTitle(item)}
                />
              ) : (
                <div className="mdm-poster-placeholder">
                  <Film size={48} />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="mdm-info">
              {loading ? (
                <>
                  <Skeleton className="mdm-sk-title" />
                  <Skeleton className="mdm-sk-meta" />
                  <Skeleton className="mdm-sk-desc" />
                  <Skeleton className="mdm-sk-desc" />
                </>
              ) : (
                <>
                  {details?.tagline && (
                    <p className="mdm-tagline">{details.tagline}</p>
                  )}
                  <h1 className="mdm-title">{getTitle(details ?? item)}</h1>

                  {/* Meta row */}
                  <div className="mdm-meta-row">
                    {releaseYear !== 'N/A' && (
                      <span className="mdm-meta-chip">
                        <Calendar size={13} /> {releaseYear}
                      </span>
                    )}
                    {runtime && (
                      <span className="mdm-meta-chip">
                        <Clock size={13} /> {formatRuntime(runtime)}
                      </span>
                    )}
                    {details?.status && (
                      <span className={`mdm-meta-chip mdm-status ${details.status === 'Released' || details.status === 'Ended' ? 'released' : 'upcoming'}`}>
                        {details.status}
                      </span>
                    )}
                  </div>

                  {/* Watchlist Buttons */}
                  {user && (
                    <div className="mdm-watchlist-buttons">
                      {watchlistStatus ? (
                        <>
                          <button
                            className={`mdm-watchlist-btn ${watchlistStatus === 'favorites' ? 'active' : ''}`}
                            onClick={() => addToWatchlist('favorites')}
                          >
                            <BookmarkCheck size={16} /> Favorite
                          </button>
                          <button
                            className={`mdm-watchlist-btn ${watchlistStatus === 'watch_later' ? 'active' : ''}`}
                            onClick={() => addToWatchlist('watch_later')}
                          >
                            <Bookmark size={16} /> Watch Later
                          </button>
                          <button
                            className="mdm-watchlist-btn remove"
                            onClick={removeFromWatchlist}
                          >
                            Remove
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="mdm-watchlist-btn"
                            onClick={() => addToWatchlist('favorites')}
                          >
                            <BookmarkCheck size={16} /> Favorite
                          </button>
                          <button
                            className="mdm-watchlist-btn"
                            onClick={() => addToWatchlist('watch_later')}
                          >
                            <Bookmark size={16} /> Watch Later
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Rating */}
                  <div className="mdm-rating-row">
                    <div className="mdm-rating">
                      <Star size={16} fill="#f5c518" color="#f5c518" />
                      <span className="mdm-rating-score">
                        {(details?.vote_average ?? item.vote_average ?? 0).toFixed(1)}
                      </span>
                      <span className="mdm-rating-max">/10</span>
                    </div>
                    {details?.vote_count && (
                      <span className="mdm-vote-count">
                        {details.vote_count.toLocaleString()} votes
                      </span>
                    )}
                  </div>

                  {/* Genres */}
                  {details?.genres && details.genres.length > 0 && (
                    <div className="mdm-genres">
                      {details.genres.map((g) => (
                        <span key={g.id} className="mdm-genre-tag">{g.name}</span>
                      ))}
                    </div>
                  )}

                  {/* Overview */}
                  <p className="mdm-overview-text">
                    {details?.overview || item.overview || 'No overview available.'}
                  </p>

                  {/* Director */}
                  {director && (
                    <p className="mdm-crew-line">
                      <span className="mdm-crew-label">Director:</span> {director.name}
                    </p>
                  )}
                  {producers.length > 0 && (
                    <p className="mdm-crew-line">
                      <span className="mdm-crew-label">Producer{producers.length > 1 ? 's' : ''}:</span>{' '}
                      {producers.map((p) => p.name).join(', ')}
                    </p>
                  )}

                  {/* Trailer CTA */}
                  {trailer && !trailerOpen && (
                    <button
                      className="mdm-trailer-btn"
                      onClick={() => setTrailerOpen(true)}
                    >
                      <Play size={17} fill="white" /> Watch Trailer
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* ── Inline Trailer Player ──────────────────────────── */}
          {trailerOpen && trailer && (
            <div className="mdm-player-wrap">
              <div className="mdm-player-head">
                <h2 className="mdm-section-title">Trailer</h2>
                <button
                  className="mdm-player-close"
                  onClick={() => setTrailerOpen(false)}
                >
                  <X size={16} /> Close Player
                </button>
              </div>
              <div className="mdm-player">
                <iframe
                  title={trailer.name}
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1&rel=0&origin=${window.location.origin}&enablejsapi=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* ── Cast Section ──────────────────────────────────── */}
          <section className="mdm-section">
            <h2 className="mdm-section-title">
              <Users size={18} /> Cast
            </h2>
            {loading ? (
              <div className="mdm-cast-row">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="mdm-cast-card mdm-cast-skeleton">
                    <Skeleton className="mdm-sk-cast-img" />
                    <Skeleton className="mdm-sk-cast-name" />
                    <Skeleton className="mdm-sk-cast-char" />
                  </div>
                ))}
              </div>
            ) : cast.length > 0 ? (
              <div className="mdm-cast-row">
                {cast.map((member) => (
                  <div key={`${member.id}-${member.character}`} className="mdm-cast-card">
                    {member.profile_path ? (
                      <img
                        className="mdm-cast-img"
                        src={`${IMAGE_BASE_URL}/w185${member.profile_path}`}
                        alt={member.name}
                      />
                    ) : (
                      <div className="mdm-cast-img-placeholder">
                        <Users size={28} />
                      </div>
                    )}
                    <p className="mdm-cast-name">{member.name}</p>
                    <p className="mdm-cast-char">{member.character}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mdm-empty">No cast information available.</p>
            )}
          </section>

          {/* ── Additional Details ────────────────────────────── */}
          {!loading && details && (
            <section className="mdm-section mdm-details-grid">
              <h2 className="mdm-section-title">
                <Film size={18} /> Additional Details
              </h2>
              <div className="mdm-details-table">
                <div className="mdm-detail-row">
                  <span className="mdm-detail-label">
                    <Globe size={14} /> Language
                  </span>
                  <span className="mdm-detail-value">
                    {LANG_MAP[details.original_language] ?? details.original_language.toUpperCase()}
                  </span>
                </div>
                <div className="mdm-detail-row">
                  <span className="mdm-detail-label">
                    <Calendar size={14} /> Release Date
                  </span>
                  <span className="mdm-detail-value">
                    {getDate(details) || 'TBA'}
                  </span>
                </div>
                {runtime && (
                  <div className="mdm-detail-row">
                    <span className="mdm-detail-label">
                      <Clock size={14} /> Runtime
                    </span>
                    <span className="mdm-detail-value">{formatRuntime(runtime)}</span>
                  </div>
                )}
                <div className="mdm-detail-row">
                  <span className="mdm-detail-label">Status</span>
                  <span className="mdm-detail-value">{details.status}</span>
                </div>
                {details.production_companies.length > 0 && (
                  <div className="mdm-detail-row">
                    <span className="mdm-detail-label">Production</span>
                    <span className="mdm-detail-value">
                      {details.production_companies.slice(0, 3).map((c) => c.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  )
}
