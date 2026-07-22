import { Play } from 'lucide-react';
import type { FormEvent, MouseEvent, RefObject } from 'react';
import ChatWidget from '../components/ChatWidget';
import MediaCard from '../components/MediaCard';
import Navbar from '../components/Navbar';
import SectionBlock from '../components/SectionBlock';
import MovieDetailModal from '../MovieDetailModal';
import {
  IMAGE_BASE_URL,
  type ChatMessage,
  type ContentTab,
  type TmdbItem,
  type TabKey,
  getDate,
  getTitle,
  trailerConfig,
  popularConfig,
} from '../lib/tmdb';

type HomePageProps = {
  navigate: (path: string) => void;
  user: { role?: string } | null;
  tmdbConfigured: boolean;
  heroMovie: TmdbItem | null;
  searchResults: TmdbItem[];
  loadingSearch: boolean;
  trendingTab: TabKey;
  setTrendingTab: (value: TabKey) => void;
  activeTrending: TmdbItem[];
  trailersTab: ContentTab;
  setTrailersTab: (value: ContentTab) => void;
  trailersData: Record<ContentTab, TmdbItem[]>;
  popularTab: ContentTab;
  setPopularTab: (value: ContentTab) => void;
  popularData: Record<ContentTab, TmdbItem[]>;
  chatOpen: boolean;
  setChatOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  chatInput: string;
  setChatInput: (value: string) => void;
  chatLoading: boolean;
  chatMessages: ChatMessage[];
  movieSessions: Array<{ id: number; title: string; created_at: string }>;
  activeSessionId: number | null;
  panelSize: { width: number; height: number };
  chatBodyRef: RefObject<HTMLDivElement | null>;
  onSearch: (term: string) => void;
  onOpenChat: () => void;
  onOpenTrailer: (item: TmdbItem) => void;
  onSelectMovie: (item: TmdbItem) => void;
  onHandleChatSubmit: (event: FormEvent) => void;
  onNewChat: () => void;
  onOpenSession: (sessionId: number) => void;
  onDeleteSession: (sessionId: number, event: MouseEvent) => void;
  onResizeStart: (event: MouseEvent) => void;
  selectedTrailer: { key: string; title: string } | null;
  setSelectedTrailer: (value: { key: string; title: string } | null) => void;
  selectedMovie: TmdbItem | null;
  setSelectedMovie: (value: TmdbItem | null) => void;
};

export default function HomePage({
  navigate,
  user,
  tmdbConfigured,
  heroMovie,
  searchResults,
  loadingSearch,
  trendingTab,
  setTrendingTab,
  activeTrending,
  trailersTab,
  setTrailersTab,
  trailersData,
  popularTab,
  setPopularTab,
  popularData,
  chatOpen,
  setChatOpen,
  chatInput,
  setChatInput,
  chatLoading,
  chatMessages,
  movieSessions,
  activeSessionId,
  panelSize,
  chatBodyRef,
  onSearch,
  onOpenChat,
  onOpenTrailer,
  onSelectMovie,
  onHandleChatSubmit,
  onNewChat,
  onOpenSession,
  onDeleteSession,
  onResizeStart,
  selectedTrailer,
  setSelectedTrailer,
  selectedMovie,
  setSelectedMovie,
}: HomePageProps) {
  return (
    <div className="app" role="presentation">
      {!tmdbConfigured && (
        <div className="warning">
          Add <code>VITE_TMDB_API_KEY</code>/<code>VITE_TMDB_ACCESS_TOKEN</code>{' '}
          to enable live TMDB sections.
        </div>
      )}

      <Navbar onSearch={onSearch} onOpenChat={onOpenChat} />

      <header
        className="hero"
        style={{
          backgroundImage: heroMovie?.backdrop_path
            ? `url(${IMAGE_BASE_URL}/original${heroMovie.backdrop_path})`
            : 'none',
        }}
      >
        <div className="overlay" />
        <div className="hero-content">
          <h1>
            {heroMovie
              ? getTitle(heroMovie)
              : 'Discover Your Next Favorite Story'}
          </h1>
          <p>
            {heroMovie?.overview ||
              'Browse trending titles and ask the AI chatbot for personalized recommendations.'}
          </p>
          <div className="hero-meta">
            <span>
              Release: {heroMovie ? getDate(heroMovie) || 'TBA' : 'TBA'}
            </span>
            <button
              type="button"
              onClick={() => heroMovie && onOpenTrailer(heroMovie)}
            >
              <Play size={16} /> Watch Trailer
            </button>
          </div>
        </div>
      </header>

      {searchResults.length > 0 && (
        <SectionBlock title="Search Results">
          <div className="cards-grid">
            {searchResults.map((item) => (
              <MediaCard
                key={`${item.id}-${getTitle(item)}`}
                item={item}
                onSelect={onSelectMovie}
              />
            ))}
          </div>
        </SectionBlock>
      )}

      <SectionBlock
        title="Trending"
        actions={
          <div className="tabs">
            <button
              type="button"
              className={trendingTab === 'today' ? 'active' : ''}
              onClick={() => setTrendingTab('today')}
            >
              Trending Today
            </button>
            <button
              type="button"
              className={trendingTab === 'week' ? 'active' : ''}
              onClick={() => setTrendingTab('week')}
            >
              Trending This Week
            </button>
          </div>
        }
      >
        <div className="cards-row">
          {activeTrending.slice(0, 12).map((item) => (
            <MediaCard
              key={`${item.id}-${getTitle(item)}`}
              item={item}
              onSelect={onSelectMovie}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="Latest Trailers"
        actions={
          <div className="tabs">
            {(Object.keys(trailerConfig) as ContentTab[]).map((key) => (
              <button
                key={key}
                type="button"
                className={trailersTab === key ? 'active' : ''}
                onClick={() => setTrailersTab(key)}
              >
                {trailerConfig[key].label}
              </button>
            ))}
          </div>
        }
      >
        <div className="cards-row">
          {trailersData[trailersTab].map((item) => (
            <MediaCard
              key={`${item.id}-${getTitle(item)}`}
              item={item}
              onSelect={onSelectMovie}
              variant="trailer"
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        title="What's Popular"
        actions={
          <div className="tabs">
            {(Object.keys(popularConfig) as ContentTab[]).map((key) => (
              <button
                key={key}
                type="button"
                className={popularTab === key ? 'active' : ''}
                onClick={() => setPopularTab(key)}
              >
                {popularConfig[key].label}
              </button>
            ))}
          </div>
        }
      >
        <div className="cards-row">
          {popularData[popularTab].map((item) => (
            <MediaCard
              key={`${item.id}-${getTitle(item)}`}
              item={item}
              onSelect={onSelectMovie}
              showRating
            />
          ))}
        </div>
      </SectionBlock>

      <ChatWidget
        chatOpen={chatOpen}
        onToggle={() => setChatOpen((value) => !value)}
        onClose={() => setChatOpen(false)}
        user={user}
        navigate={navigate}
        chatMessages={chatMessages}
        chatInput={chatInput}
        chatLoading={chatLoading}
        onChatInputChange={setChatInput}
        onSubmit={onHandleChatSubmit}
        onNewChat={onNewChat}
        onOpenSession={onOpenSession}
        onDeleteSession={onDeleteSession}
        movieSessions={movieSessions}
        activeSessionId={activeSessionId}
        panelSize={panelSize}
        onResizeStart={onResizeStart}
        onSelectMovie={onSelectMovie}
        chatBodyRef={chatBodyRef}
      />

      {selectedTrailer && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedTrailer(null)}
          role="presentation"
        >
          <div
            className="modal"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="modal-head">
              <h3>{selectedTrailer.title}</h3>
              <button type="button" onClick={() => setSelectedTrailer(null)}>
                <span style={{ display: 'inline-flex' }} aria-hidden="true">
                  ×
                </span>
              </button>
            </div>
            <iframe
              title={selectedTrailer.title}
              src={`https://www.youtube-nocookie.com/embed/${selectedTrailer.key}?origin=${window.location.origin}&enablejsapi=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {selectedMovie && (
        <MovieDetailModal
          item={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      {loadingSearch && <div className="loading-indicator">Searching...</div>}
    </div>
  );
}
