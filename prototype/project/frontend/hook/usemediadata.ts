import { useEffect, useState } from 'react';
import {
  fetchCollection,
  type ContentTab,
  type TmdbItem,
  type TabKey,
  trailerConfig,
  popularConfig,
  type MediaType,
} from '../lib/tmdb';

export function useMediaData(apiKey?: string, accessToken?: string) {
  const [trendingTab, setTrendingTab] = useState<TabKey>('today');
  const [trailersTab, setTrailersTab] = useState<ContentTab>('streaming');
  const [popularTab, setPopularTab] = useState<ContentTab>('streaming');
  const [trendingToday, setTrendingToday] = useState<TmdbItem[]>([]);
  const [trendingWeek, setTrendingWeek] = useState<TmdbItem[]>([]);
  const [heroMovie, setHeroMovie] = useState<TmdbItem | null>(null);
  const [trailersData, setTrailersData] = useState<
    Record<ContentTab, TmdbItem[]>
  >({
    streaming: [],
    on_tv: [],
    for_rent: [],
    in_theaters: [],
  });
  const [popularData, setPopularData] = useState<
    Record<ContentTab, TmdbItem[]>
  >({
    streaming: [],
    on_tv: [],
    for_rent: [],
    in_theaters: [],
  });

  useEffect(() => {
    if (!apiKey) return;

    const load = async () => {
      try {
        const [today, week] = await Promise.all([
          fetchCollection('/trending/all/day', apiKey, accessToken),
          fetchCollection('/trending/all/week', apiKey, accessToken),
        ]);
        setTrendingToday(today);
        setTrendingWeek(week);
        setHeroMovie(
          (today.find((item) => item.backdrop_path) ?? today[0]) || null,
        );

        const trailerEntries = await Promise.all(
          (Object.keys(trailerConfig) as ContentTab[]).map(async (key) => {
            const source = trailerConfig[key];
            const endpoint =
              source.movieEndpoint ?? source.tvEndpoint ?? '/movie/popular';
            const results = await fetchCollection(
              endpoint,
              apiKey,
              accessToken,
            );
            return [key, results.slice(0, 12)] as const;
          }),
        );
        setTrailersData(
          Object.fromEntries(trailerEntries) as Record<ContentTab, TmdbItem[]>,
        );

        const popularEntries = await Promise.all(
          (Object.keys(popularConfig) as ContentTab[]).map(async (key) => {
            const source = popularConfig[key];
            const endpoint =
              source.movieEndpoint ?? source.tvEndpoint ?? '/movie/popular';
            const results = await fetchCollection(
              endpoint,
              apiKey,
              accessToken,
            );
            return [key, results.slice(0, 12)] as const;
          }),
        );
        setPopularData(
          Object.fromEntries(popularEntries) as Record<ContentTab, TmdbItem[]>,
        );
      } catch (error) {
        console.error(error);
      }
    };

    void load();
  }, [apiKey, accessToken]);

  const activeTrending = trendingTab === 'today' ? trendingToday : trendingWeek;

  return {
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
  };
}

export function getMediaType(item: TmdbItem): MediaType {
  return item.media_type ?? (item.first_air_date ? 'tv' : 'movie');
}
