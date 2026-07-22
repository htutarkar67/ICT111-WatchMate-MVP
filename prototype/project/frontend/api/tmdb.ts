export type MediaType = 'movie' | 'tv';

export type TmdbItem = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  media_type?: MediaType;
};

export type TabKey = 'today' | 'week';
export type ContentTab = 'streaming' | 'on_tv' | 'for_rent' | 'in_theaters';

export type ChatMessage = {
  id: number;
  role: 'user' | 'assistant';
  text: string;
  recommendations?: TmdbItem[];
};

export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const MOOD_TO_GENRE: Record<string, string[]> = {
  sad: ['drama', 'romance'],
  emotional: ['drama'],
  exciting: ['action', 'adventure', 'thriller'],
  romantic: ['romance', 'comedy'],
  scary: ['horror', 'thriller'],
  tense: ['thriller', 'mystery'],
  funny: ['comedy'],
  inspiring: ['documentary', 'family'],
  dark: ['crime', 'thriller'],
};

export const trailerConfig: Record<
  ContentTab,
  { label: string; movieEndpoint?: string; tvEndpoint?: string }
> = {
  streaming: {
    label: 'Streaming',
    movieEndpoint:
      '/discover/movie?sort_by=popularity.desc&with_watch_monetization_types=flatrate&watch_region=US',
  },
  on_tv: { label: 'On TV', tvEndpoint: '/tv/on_the_air' },
  for_rent: {
    label: 'For Rent',
    movieEndpoint:
      '/discover/movie?sort_by=popularity.desc&with_watch_monetization_types=rent&watch_region=US',
  },
  in_theaters: { label: 'In Theaters', movieEndpoint: '/movie/now_playing' },
};

export const popularConfig: Record<
  ContentTab,
  { label: string; movieEndpoint?: string; tvEndpoint?: string }
> = {
  streaming: { label: 'Streaming', movieEndpoint: '/movie/popular' },
  on_tv: { label: 'On TV', tvEndpoint: '/tv/popular' },
  for_rent: {
    label: 'For Rent',
    movieEndpoint:
      '/discover/movie?sort_by=popularity.desc&with_watch_monetization_types=rent&watch_region=US',
  },
  in_theaters: { label: 'In Theaters', movieEndpoint: '/movie/now_playing' },
};

export const getTitle = (item: TmdbItem) =>
  item.title ?? item.name ?? 'Untitled';
export const getDate = (item: TmdbItem) =>
  item.release_date ?? item.first_air_date ?? '';
export const getYear = (item: TmdbItem) =>
  getDate(item) ? new Date(getDate(item)).getFullYear() : 'N/A';

export async function tmdbFetch<T>(
  path: string,
  apiKey?: string,
  accessToken?: string,
): Promise<T> {
  const token = (accessToken || apiKey || '').trim().replace(/;+$/, '');
  const looksLikeJwt =
    typeof token === 'string' && token.split('.').length === 3;
  const url = looksLikeJwt
    ? `${TMDB_BASE_URL}${path}`
    : `${TMDB_BASE_URL}${path}${path.includes('?') ? '&' : '?'}api_key=${apiKey}`;

  const response = await fetch(
    url,
    looksLikeJwt
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: 'application/json',
          },
        }
      : undefined,
  );

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function fetchCollection(
  path: string,
  apiKey?: string,
  accessToken?: string,
): Promise<TmdbItem[]> {
  const data = await tmdbFetch<{ results: TmdbItem[] }>(
    path,
    apiKey,
    accessToken,
  );
  return data.results ?? [];
}
