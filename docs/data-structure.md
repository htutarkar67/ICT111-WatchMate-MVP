# Data Structure

## Project Title

WatchMate: AI Movie Recommendation System

---

## 1. Main Data Entities / Tables

| Entity / Table | Purpose | Example Records |
|----------------|---------|-----------------|
| Users | Store registered user information. | U001, U002, U003 |
| Chat History | Store AI chatbot conversations and recommendations. | CH001, CH002, CH003 |
| Watchlist | Store movies saved by users. | W001, W002, W003 |
| Movies | Store movie information retrieved from the movie database (TMDB). | M001, M002, M003 |

---

## 2. Field Definition

### Users

| Field Name | Data Type | Required? | Example Value | Validation Rule | Used For Search/Filter? |
|------------|-----------|-----------|---------------|-----------------|-------------------------|
| UserID | Text | Yes | U001 | Unique value | Yes |
| Username | Text | Yes | johnsmith | Cannot be empty | Yes |
| Email | Email | Yes | john@email.com | Valid email format | Yes |
| Password | Password | Yes | ******** | Minimum 8 characters | No |
| CreatedAt | Date/Time | Yes | 2026-07-10 09:30 | Auto-generated | No |

---

### Chat History

| Field Name | Data Type | Required? | Example Value | Validation Rule | Used For Search/Filter? |
|------------|-----------|-----------|---------------|-----------------|-------------------------|
| ChatID | Text | Yes | CH001 | Unique value | Yes |
| UserID | Text | Yes | U001 | Must exist in Users table | Yes |
| UserMessage | Text | Yes | Recommend me a sci-fi movie like Interstellar | Cannot be empty | Yes |
| AIResponse | Text | Yes | You may enjoy The Martian and Arrival. | Auto-generated | No |
| ChatDate | Date/Time | Yes | 2026-07-10 10:15 | Valid date/time | Yes |

---

### Watchlist

| Field Name | Data Type | Required? | Example Value | Validation Rule | Used For Search/Filter? |
|------------|-----------|-----------|---------------|-----------------|-------------------------|
| WatchlistID | Text | Yes | W001 | Unique value | No |
| UserID | Text | Yes | U001 | Must exist in Users table | Yes |
| MovieID | Text | Yes | M001 | Valid movie ID | Yes |
| DateAdded | Date | Yes | 2026-07-10 | Valid date | No |

---

### Movies

| Field Name | Data Type | Required? | Example Value | Validation Rule | Used For Search/Filter? |
|------------|-----------|-----------|---------------|-----------------|-------------------------|
| MovieID | Text | Yes | M001 | Unique value | Yes |
| Title | Text | Yes | Interstellar | Cannot be empty | Yes |
| Genre | Text | Yes | Science Fiction | Cannot be empty | Yes |
| Rating | Decimal | Yes | 8.7 | 0–10 | Yes |
| ReleaseYear | Number | Yes | 2014 | Valid year | Yes |
| Language | Text | Yes | English | Cannot be empty | Yes |
| Synopsis | Text | No | A team of astronauts travel through a wormhole... | Maximum 1000 characters | No |
| PosterURL | URL | No | https://... | Valid URL | No |
| TrailerURL | URL | No | https://... | Valid URL | No |

---

## 3. Status Values

### Chat Status

| Status | Meaning | Who Can Update? |
|---------|---------|-----------------|
| New | User has started a new conversation. | User |
| Completed | AI has successfully generated movie recommendations. | System |
| Saved | Conversation is stored in chat history. | System |
| Archived | Conversation is archived for future reference. | Administrator |

---

## 4. Sample Records

### Users

| UserID | Username | Email |
|--------|----------|----------------------|
| U001 | johnsmith | john@email.com |
| U002 | alice | alice@email.com |
| U003 | michael | michael@email.com |

### Chat History

| ChatID | UserMessage | AI Recommendation | Status |
|--------|-------------|-------------------|--------|
| CH001 | Recommend a comedy movie | Free Guy, The Mask | Saved |
| CH002 | Movies like Interstellar | Arrival, The Martian | Saved |
| CH003 | Best horror movies | The Conjuring, Smile | Completed |

### Watchlist

| WatchlistID | UserID | Movie |
|-------------|--------|----------------|
| W001 | U001 | Interstellar |
| W002 | U002 | The Dark Knight |
| W003 | U003 | Inception |

---

## 5. Data Privacy Note

This prototype only stores information necessary for user authentication, AI chatbot conversations, and movie watchlists. Passwords are securely protected, and no financial information, national identification numbers, or other sensitive personal data are collected. Movie information is retrieved from TMDB, and all sample records are fictional and used solely for demonstration purposes.
