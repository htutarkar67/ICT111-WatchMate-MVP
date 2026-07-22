import type { TmdbItem } from '../lib/tmdb';
import { IMAGE_BASE_URL, getDate, getTitle, getYear } from '../lib/tmdb';

type MediaCardProps = {
  item: TmdbItem;
  onSelect: (item: TmdbItem) => void;
  variant?: 'default' | 'trailer';
  showRating?: boolean;
  showYear?: boolean;
};

export default function MediaCard({
  item,
  onSelect,
  variant = 'default',
  showRating = false,
  showYear = false,
}: MediaCardProps) {
  return (
    <article
      className={`card ${variant === 'trailer' ? 'trailer-card' : ''}`}
      onClick={() => onSelect(item)}
    >
      <img
        src={
          item.poster_path ? `${IMAGE_BASE_URL}/w342${item.poster_path}` : ''
        }
        alt={getTitle(item)}
      />
      {variant === 'trailer' && (
        <button
          type="button"
          className="play-button"
          aria-label={`Play trailer for ${getTitle(item)}`}
        >
          ▶
        </button>
      )}
      <div className="card-info">
        <h3>{getTitle(item)}</h3>
        {showRating ? (
          <p>★ {item.vote_average?.toFixed(1) || 'N/A'}</p>
        ) : (
          <p>{showYear ? getYear(item) : getDate(item) || 'Unknown date'}</p>
        )}
      </div>
    </article>
  );
}
