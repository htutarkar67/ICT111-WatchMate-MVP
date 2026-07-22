import { Bot, MessageCircle, Send, Trash2 } from 'lucide-react';
import type { FormEvent, MouseEvent, RefObject } from 'react';
import type { ChatMessage, TmdbItem } from '../lib/tmdb';
import { IMAGE_BASE_URL, getTitle, getYear } from '../lib/tmdb';

type ChatWidgetProps = {
  chatOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  user: { role?: string } | null;
  navigate: (path: string) => void;
  chatMessages: ChatMessage[];
  chatInput: string;
  chatLoading: boolean;
  onChatInputChange: (value: string) => void;
  onSubmit: (event: FormEvent) => void;
  onNewChat: () => void;
  onOpenSession: (sessionId: number) => void;
  onDeleteSession: (sessionId: number, event: MouseEvent) => void;
  movieSessions: Array<{ id: number; title: string; created_at: string }>;
  activeSessionId: number | null;
  panelSize: { width: number; height: number };
  onResizeStart: (event: MouseEvent) => void;
  onSelectMovie: (item: TmdbItem) => void;
  chatBodyRef?: RefObject<HTMLDivElement | null>;
};

export default function ChatWidget({
  chatOpen,
  onToggle,
  onClose,
  user,
  navigate,
  chatMessages,
  chatInput,
  chatLoading,
  onChatInputChange,
  onSubmit,
  onNewChat,
  onOpenSession,
  onDeleteSession,
  movieSessions,
  activeSessionId,
  panelSize,
  onResizeStart,
  onSelectMovie,
  chatBodyRef,
}: ChatWidgetProps) {
  if (!chatOpen) {
    return (
      <button className="chat-toggle" type="button" onClick={onToggle}>
        <MessageCircle size={20} /> AI
      </button>
    );
  }

  return (
    <aside
      className="chat-panel"
      style={{ width: panelSize.width, height: panelSize.height }}
    >
      <div className="chat-resize-handle" onMouseDown={onResizeStart} />
      <header>
        <div>
          <Bot size={18} /> Movie AI Assistant
        </div>
        <button type="button" onClick={onClose}>
          <span style={{ display: 'inline-flex' }} aria-hidden="true">
            ×
          </span>
        </button>
      </header>

      {!user ? (
        <div className="chat-shell">
          <div className="chat-sidebar">
            <button type="button" className="new-chat" onClick={onNewChat}>
              New Chat
            </button>
            <div className="recent-title">Guest mode</div>
            <div className="muted">Chat history isn’t saved.</div>
            <button
              type="button"
              className="login-btn"
              onClick={() => navigate('/auth')}
            >
              Login to save chats
            </button>
          </div>

          <div className="chat-main">
            <div className="chat-body" ref={chatBodyRef}>
              {chatMessages.map((message) => (
                <div key={message.id} className={`msg ${message.role}`}>
                  <p>{message.text}</p>
                  {message.recommendations && (
                    <div className="chat-recommendations">
                      {message.recommendations.map((item) => (
                        <article
                          key={`${message.id}-${item.id}`}
                          className="chat-item"
                          onClick={() => onSelectMovie(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={
                              item.poster_path
                                ? `${IMAGE_BASE_URL}/w185${item.poster_path}`
                                : ''
                            }
                            alt={getTitle(item)}
                          />
                          <div>
                            <h4>
                              {getTitle(item)} ({getYear(item)})
                            </h4>
                            <small>
                              {item.overview || 'No description available.'}
                            </small>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div className="msg assistant">
                  <p>Thinking...</p>
                </div>
              )}
            </div>
            <form className="chat-input" onSubmit={onSubmit}>
              <input
                value={chatInput}
                onChange={(event) => onChatInputChange(event.target.value)}
                placeholder="e.g. Recommend horror movies or movies like Interstellar"
              />
              <button type="submit" disabled={chatLoading}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="chat-shell">
          <div className="chat-sidebar">
            <button type="button" className="new-chat" onClick={onNewChat}>
              New Chat
            </button>
            <div className="recent-title">Recent Chats</div>
            <div className="recent-list">
              {movieSessions.length === 0 ? (
                <div className="muted">No chats yet.</div>
              ) : (
                movieSessions.map((s) => (
                  <div
                    key={s.id}
                    className={`recent-item-wrapper ${activeSessionId === s.id ? 'active' : ''}`}
                  >
                    <button
                      type="button"
                      className={`recent-item ${activeSessionId === s.id ? 'active' : ''}`}
                      onClick={() => void onOpenSession(s.id)}
                      title={s.title || 'Untitled Chat'}
                    >
                      {s.title || `Chat ${s.id}`}
                    </button>
                    <button
                      type="button"
                      className="delete-chat-btn"
                      onClick={(e) => void onDeleteSession(s.id, e)}
                      aria-label="Delete chat"
                      title="Delete this chat"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="chat-main">
            <div className="chat-body" ref={chatBodyRef}>
              {chatMessages.map((message) => (
                <div key={message.id} className={`msg ${message.role}`}>
                  <p>{message.text}</p>
                  {message.recommendations && (
                    <div className="chat-recommendations">
                      {message.recommendations.map((item) => (
                        <article
                          key={`${message.id}-${item.id}`}
                          className="chat-item"
                          onClick={() => onSelectMovie(item)}
                          style={{ cursor: 'pointer' }}
                        >
                          <img
                            src={
                              item.poster_path
                                ? `${IMAGE_BASE_URL}/w185${item.poster_path}`
                                : ''
                            }
                            alt={getTitle(item)}
                          />
                          <div>
                            <h4>
                              {getTitle(item)} ({getYear(item)})
                            </h4>
                            <small>
                              {item.overview || 'No description available.'}
                            </small>
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {chatLoading && (
                <div className="msg assistant">
                  <p>Thinking...</p>
                </div>
              )}
            </div>
            <form className="chat-input" onSubmit={onSubmit}>
              <input
                value={chatInput}
                onChange={(event) => onChatInputChange(event.target.value)}
                placeholder="e.g. Recommend horror movies or movies like Interstellar"
              />
              <button type="submit" disabled={chatLoading}>
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      )}
    </aside>
  );
}
