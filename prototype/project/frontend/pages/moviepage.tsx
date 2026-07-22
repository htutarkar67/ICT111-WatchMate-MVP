import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import '../styles/MoviesPage.css'

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN
const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p'

type Movie = {
  id: number
  title: string
  release_date: string
  genre_ids: number[]
  poster_path: string | null
  overview: string
  vote_average: number
}

type Genre = {
  id: number
  name: string
}

interface MoviesPageProps {
  onMovieSelect?: (movie: Movie) => void
}

export default function MoviesPage({ onMovieSelect }: MoviesPageProps) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  // Fetch genres on mount
  useEffect(() => {
    fetchGenres()
  }, [])

  // Fetch movies when page, search, or genre changes
  useEffect(() => {
    fetchMovies()
  }, [currentPage, searchTerm, selectedGenre])

  async function fetchGenres() {
    try {
      if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) return

      const token = (TMDB_ACCESS_TOKEN || TMDB_API_KEY || '').trim().replace(/;+$/, '')
      const looksLikeJwt = typeof token === 'string' && token.split('.').length === 3
      const url = looksLikeJwt
        ? `${TMDB_BASE_URL}/genre/movie/list`
        : `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`

      const response = await fetch(
        url,
        looksLikeJwt ? { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' } } : undefined,
      )
      if (response.ok) {
        const data = (await response.json()) as { genres: Genre[] }
        setGenres(data.genres || [])
      }
    } catch (error) {
      console.error('Failed to fetch genres:', error)
    }
  }

  async function fetchMovies() {
    setLoading(true)
    try {
      if (!TMDB_API_KEY && !TMDB_ACCESS_TOKEN) {
        setLoading(false)
        return
      }

      const token = (TMDB_ACCESS_TOKEN || TMDB_API_KEY || '').trim().replace(/;+$/, '')
      const looksLikeJwt = typeof token === 'string' && token.split('.').length === 3

      let url = ''

      if (searchTerm.trim()) {
        url = looksLikeJwt
          ? `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${currentPage}`
          : `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(searchTerm)}&page=${currentPage}&api_key=${TMDB_API_KEY}`
      } else if (selectedGenre) {
        url = looksLikeJwt
          ? `${TMDB_BASE_URL}/discover/movie?with_genres=${selectedGenre}&page=${currentPage}&sort_by=popularity.desc`
          : `${TMDB_BASE_URL}/discover/movie?with_genres=${selectedGenre}&page=${currentPage}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`
      } else {
        url = looksLikeJwt
          ? `${TMDB_BASE_URL}/discover/movie?page=${currentPage}&sort_by=popularity.desc`
          : `${TMDB_BASE_URL}/discover/movie?page=${currentPage}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`
      }

      const response = await fetch(
        url,
        looksLikeJwt ? { headers: { Authorization: `Bearer ${token}`, accept: 'application/json' } } : undefined,
      )

      if (response.ok) {
        const data = (await response.json()) as { results: Movie[]; total_pages: number }
        setMovies(data.results || [])
        setTotalPages(Math.min(data.total_pages || 1, 500)) // TMDB limits to 500 pages
      }
    } catch (error) {
      console.error('Failed to fetch movies:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGenreNames = (genreIds: number[]) => {
    return genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean)
      .join(', ')
  }

  const getYear = (date: string) => (date ? new Date(date).getFullYear() : 'N/A')

  return (
    <div className="movies-page">
      <Navbar onSearch={(term) => setSearchTerm(term)} />
      <div className="movies-header">
        <h1>Movies</h1>
        <p>Discover thousands of movies from around the world</p>
      </div>

      <div className="movies-filters">
        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        <div className="genre-filter">
          <button
            className={`genre-chip ${selectedGenre === null ? 'active' : ''}`}
            onClick={() => {
              setSelectedGenre(null)
              setCurrentPage(1)
            }}
          >
            All Genres
          </button>
          {genres.slice(0, 8).map((genre) => (
            <button
              key={genre.id}
              className={`genre-chip ${selectedGenre === genre.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedGenre(genre.id)
                setCurrentPage(1)
              }}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : (
        <>
          <div className="movies-grid">
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => onMovieSelect?.(movie)}
                role="button"
                tabIndex={0}
              >
                {movie.poster_path ? (
                  <img src={`${IMAGE_BASE_URL}/w342${movie.poster_path}`} alt={movie.title} />
                ) : (
                  <div className="no-poster">No Image</div>
                )}
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p className="year">{getYear(movie.release_date)}</p>
                  <p className="genres">{getGenreNames(movie.genre_ids)}</p>
                  <p className="rating">⭐ {movie.vote_average.toFixed(1)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                const page = Math.max(1, currentPage - 2) + i
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                  >
                    {page}
                  </button>
                )
              })}
              {totalPages > 5 && currentPage < totalPages - 2 && <span>...</span>}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="pagination-info">
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </div>
  )
}
