import { useEffect, useRef, useState } from 'react';
import type { FormEvent, MouseEvent } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import AuthPage from './pages/AuthPage';
import MoviesPage from './pages/MoviesPage';
import TVShowsPage from './pages/TVShowsPage';
import WatchlistPage from './pages/WatchlistPage';
import AdminPage from './pages/AdminPage';
import HomePage from './pages/HomePage';
import { apiFetch } from './lib/api';
import { useAuthStore } from './lib/authStore';
import { syncThemeFromUser } from './lib/theme';
import {
  fetchCollection,
  getTitle,
  tmdbFetch,
  type ChatMessage,
  type MediaType,
  type TmdbItem,
  MOOD_TO_GENRE,
} from './lib/tmdb';
import { useMediaData } from './hooks/useMediaData';

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

function App() {
  const navigate = useNavigate();
  const { user, token, loadMe } = useAuthStore();
  const [searchResults, setSearchResults] = useState<TmdbItem[]>([]);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedTrailer, setSelectedTrailer] = useState<{
    key: string;
    title: string;
  } | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<TmdbItem | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      role: 'assistant',
      text: 'Tell me your mood, favorite genres, or a movie/TV title you like, and I will recommend something great.',
    },
  ]);
  const [movieSessions, setMovieSessions] = useState<
    Array<{ id: number; title: string; created_at: string }>
  >([]);
  const [activeSessionId, setActiveSessionId] = useState<number | null>(null);
  const [panelSize, setPanelSize] = useState({ width: 420, height: 540 });
  const isDragging = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const {
    trendingTab,
    setTrendingTab,
    trailersTab,
    setTrailersTab,
    popularTab,
    setPopularTab,
    activeTrending,
    heroMovie,
    trailersData,
    popularData,
  } = useMediaData(TMDB_API_KEY, TMDB_ACCESS_TOKEN);

  useEffect(() => {
    void loadMe();
  }, [token]);

  useEffect(() => {
    void syncThemeFromUser(user);
  }, [user]);

  const runSearch = async (term: string) => {
    if (!term.trim() || !TMDB_API_KEY) {
      return;
    }
    setLoadingSearch(true);
    try {
      const data = await tmdbFetch<{ results: TmdbItem[] }>(
        `/search/multi?query=${encodeURIComponent(term.trim())}`,
        TMDB_API_KEY,
        TMDB_ACCESS_TOKEN,
      );
      setSearchResults((data.results ?? []).slice(0, 8));
    } catch (error) {
      console.error(error);
      setSearchResults([]);
    } finally {
      setLoadingSearch(false);
    }
  };

  const openTrailer = async (item: TmdbItem) => {
    if (!TMDB_API_KEY) {
      return;
    }
    const mediaType: MediaType =
      item.media_type ?? (item.first_air_date ? 'tv' : 'movie');
    try {
      const data = await tmdbFetch<{
        results: Array<{ key: string; type: string; site: string }>;
      }>(`/${mediaType}/${item.id}/videos`, TMDB_API_KEY, TMDB_ACCESS_TOKEN);
      const trailer = data.results.find(
        (video) => video.site === 'YouTube' && video.type === 'Trailer',
      );
      if (trailer) {
        setSelectedTrailer({ key: trailer.key, title: getTitle(item) });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openMovieDetail = (item: TmdbItem) => {
    setSelectedMovie(item);
  };

  const pushChatMessage = (payload: Omit<ChatMessage, 'id'>) => {
    setChatMessages((previous) => [
      ...previous,
      { ...payload, id: Date.now() + Math.floor(Math.random() * 1000) },
    ]);
  };

  const handleChatSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!chatInput.trim()) {
      return;
    }

    const prompt = chatInput.trim();
    setChatInput('');
    pushChatMessage({ role: 'user', text: prompt });
    setChatLoading(true);

    try {
      if (user) {
        const data = await apiFetch<{
          reply: string;
          recommendations: TmdbItem[];
          session_id: number;
        }>('/api/movie-chat', {
          method: 'POST',
          body: JSON.stringify({
            message: prompt,
            session_id: activeSessionId,
          }),
        });
        setActiveSessionId(data.session_id);
        pushChatMessage({
          role: 'assistant',
          text: data.reply,
          recommendations: data.recommendations,
        });
      } else {
        const normalized = prompt.toLowerCase();
        let recommendations: TmdbItem[] = [];
        let reply = 'Here are some picks you might enjoy.';

        const similarMatch = normalized.match(/(?:like|similar to)\s+(.+)/i);
        if (similarMatch?.[1]) {
          const query = similarMatch[1].trim();
          const searchData = await tmdbFetch<{ results: TmdbItem[] }>(
            `/search/multi?query=${encodeURIComponent(query)}`,
            TMDB_API_KEY,
            TMDB_ACCESS_TOKEN,
          );
          const source = (searchData.results ?? []).find(
            (item) => item.media_type === 'movie' || item.media_type === 'tv',
          );
          if (source) {
            const mediaType =
              (source.media_type as MediaType) ??
              (source.first_air_date ? 'tv' : 'movie');
            recommendations = (
              await fetchCollection(
                `/${mediaType}/${source.id}/similar`,
                TMDB_API_KEY,
                TMDB_ACCESS_TOKEN,
              )
            ).slice(0, 5);
            reply = `Because you like "${getTitle(source)}", try these similar titles.`;
          }
        }

        if (recommendations.length === 0) {
          const mood = Object.keys(MOOD_TO_GENRE).find((word) =>
            normalized.includes(word),
          );
          if (mood) {
            recommendations = (
              await fetchCollection(
                '/discover/movie?sort_by=popularity.desc',
                TMDB_API_KEY,
                TMDB_ACCESS_TOKEN,
              )
            ).slice(0, 5);
            reply = `Guest mode: if you're feeling ${mood}, try these popular picks.`;
          }
        }

        if (recommendations.length === 0) {
          recommendations = (
            await fetchCollection(
              `/search/multi?query=${encodeURIComponent(prompt)}`,
              TMDB_API_KEY,
              TMDB_ACCESS_TOKEN,
            )
          )
            .filter((x) => x.media_type === 'movie' || x.media_type === 'tv')
            .slice(0, 5);
          reply = 'Guest mode: here are matches based on what you asked for.';
        }

        pushChatMessage({ role: 'assistant', text: reply, recommendations });
      }
    } catch (error) {
      console.error(error);
      const msg =
        typeof (error as { error?: string })?.error === 'string'
          ? (error as { error?: string }).error
          : null;
      pushChatMessage({
        role: 'assistant',
        text:
          msg ||
          'I had trouble saving or fetching recommendations. Please try again.',
      });
    } finally {
      setChatLoading(false);
    }
  };

  const loadSessions = async () => {
    if (!user) return;
    try {
      const data = await apiFetch<{
        sessions: Array<{ id: number; title: string; created_at: string }>;
      }>('/api/movie-chat/sessions');
      setMovieSessions(data.sessions);
    } catch (error) {
      console.error(error);
    }
  };

  const startNewChat = () => {
    setActiveSessionId(null);
    setChatMessages([
      {
        id: 1,
        role: 'assistant',
        text: 'Tell me your mood, favorite genres, or a movie/TV title you like, and I will recommend something great.',
      },
    ]);
  };

  const openSession = async (sessionId: number) => {
    if (!user) return;
    try {
      const data = await apiFetch<{
        chats: Array<{
          message: string;
          response: string;
          response_json?: string;
        }>;
      }>(`/api/movie-chat/sessions/${sessionId}`);
      const msgs: ChatMessage[] = [
        {
          id: 1,
          role: 'assistant',
          text: 'Loaded your previous chat. Continue anytime.',
        },
      ];
      for (const chat of data.chats) {
        msgs.push({
          id: Date.now() + Math.random(),
          role: 'user',
          text: chat.message,
        });
        let recs: TmdbItem[] | undefined;
        if (chat.response_json) {
          try {
            const parsed = JSON.parse(chat.response_json) as {
              recommendations?: TmdbItem[];
            };
            recs = parsed.recommendations;
          } catch {
            // ignore
          }
        }
        msgs.push({
          id: Date.now() + Math.random(),
          role: 'assistant',
          text: chat.response,
          recommendations: recs,
        });
      }
      setChatMessages(msgs);
      setActiveSessionId(sessionId);
      setChatOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSession = async (sessionId: number, event: MouseEvent) => {
    if (!user) return;
    event.stopPropagation();
    try {
      await apiFetch(`/api/movie-chat/sessions/${sessionId}`, {
        method: 'DELETE',
      });
      setMovieSessions((prev) => prev.filter((item) => item.id !== sessionId));
      if (activeSessionId === sessionId) {
        setActiveSessionId(null);
        startNewChat();
      }
    } catch (error) {
      console.error('Failed to delete session:', error);
    }
  };

  useEffect(() => {
    if (chatOpen && user) void loadSessions();
  }, [chatOpen, user]);

  useEffect(() => {
    const onMove = (event: globalThis.MouseEvent) => {
      if (!isDragging.current) return;
      const dx = dragOrigin.current.x - event.clientX;
      const dy = dragOrigin.current.y - event.clientY;
      setPanelSize({
        width: Math.min(700, Math.max(300, dragOrigin.current.w + dx)),
        height: Math.min(
          Math.round(window.innerHeight * 0.88),
          Math.max(320, dragOrigin.current.h + dy),
        ),
      });
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const onResizeStart = (event: MouseEvent) => {
    isDragging.current = true;
    dragOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      w: panelSize.width,
      h: panelSize.height,
    };
    event.preventDefault();
  };

  const homeElement = (
    <HomePage
      navigate={navigate}
      user={user}
      tmdbConfigured={Boolean(TMDB_API_KEY || TMDB_ACCESS_TOKEN)}
      heroMovie={heroMovie}
      searchResults={searchResults}
      loadingSearch={loadingSearch}
      trendingTab={trendingTab}
      setTrendingTab={setTrendingTab}
      activeTrending={activeTrending}
      trailersTab={trailersTab}
      setTrailersTab={setTrailersTab}
      popularTab={popularTab}
      setPopularTab={setPopularTab}
      trailersData={trailersData}
      popularData={popularData}
      chatOpen={chatOpen}
      setChatOpen={setChatOpen}
      chatInput={chatInput}
      setChatInput={setChatInput}
      chatLoading={chatLoading}
      chatMessages={chatMessages}
      movieSessions={movieSessions}
      activeSessionId={activeSessionId}
      panelSize={panelSize}
      chatBodyRef={chatBodyRef}
      onSearch={runSearch}
      onOpenChat={() => {
        startNewChat();
        setChatOpen(true);
      }}
      onOpenTrailer={openTrailer}
      onSelectMovie={openMovieDetail}
      onHandleChatSubmit={handleChatSubmit}
      onNewChat={startNewChat}
      onOpenSession={openSession}
      onDeleteSession={deleteSession}
      onResizeStart={onResizeStart}
      selectedTrailer={selectedTrailer}
      setSelectedTrailer={setSelectedTrailer}
      selectedMovie={selectedMovie}
      setSelectedMovie={setSelectedMovie}
    />
  );

  return (
    <Routes>
      <Route path="/" element={homeElement} />
      <Route path="/auth" element={<AuthPage />} />
      <Route
        path="/movies"
        element={<MoviesPage onMovieSelect={openMovieDetail} />}
      />
      <Route
        path="/tv"
        element={<TVShowsPage onShowSelect={openMovieDetail} />}
      />
      <Route
        path="/watchlist"
        element={user ? <WatchlistPage /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={user?.role === 'admin' ? <AdminPage /> : homeElement}
      />
    </Routes>
  );
}

export default App;
