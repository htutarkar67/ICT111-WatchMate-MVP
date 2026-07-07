# Wireframe Specification

## Required Wireframe Screens

Each group must create the following minimum wireframes and export each screen as PNG.

| Wireframe File                    | Purpose                            | Minimum Elements to Show                                                                                            | Related Requirements |
| --------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `/wireframes/homepage.png`        | Landing page of WatchMate          | Project title, navigation bar, search bar, trending movies, popular TV shows, AI chatbot button, login              | FR-01, FR-02         |
| `/wireframes/ai-chatbot.png`      | AI movie recommendation interface  | Chat window, user message input, AI responses, send button, recommendation cards                                    | FR-02, FR-03, FR-11  |
| `/wireframes/search-results.png`  | Search and recommendation results  | Search bar, movie cards, filters (genre, rating, year), AI recommended section                                      | FR-04, FR-05         |
| `/wireframes/movie-detail.png`    | Display detailed movie information | Movie poster, title, synopsis, genre, rating, release year, trailer button, favorite/watchlist button               | FR-06                |
| `/wireframes/chat-history.png`    | View previous AI conversations     | Conversation list, recommendation history, timestamps                                            | FR-05                |
| `/wireframes/admin-dashboard.png` | Administrator dashboard            | Total chatbot conversations, total users, recent chat history, recommendation statistics            | FR-06, FR-12         |

---

# Wireframe Quality Rules

* Use a consistent navigation bar, colors, and layout across all screens.
* Display realistic movie posters, titles, ratings, and AI conversation examples.
* Every screen should represent a functional part of the user journey.
* The AI chatbot should be the primary recommendation method.
* Ensure the interface is responsive for desktop and mobile devices.
* Every wireframe should directly support the functional requirements and MVP features.

---

# Suggested User Flow

Homepage

↓

Search for a movie **or** Open AI Chatbot

↓

User asks for movie recommendations

↓

AI returns recommendations

↓

User views movie details

↓

User saves movie to favorites or continues chatting

↓

Admin views chatbot conversation history and recommendation statistics
