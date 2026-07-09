# Technical Architecture

## Project Title

WatchMate: AI Movie Recommendation System

---

## 1. Selected Prototype Platform

**React Frontend + Node.js Backend + TMDB API + AI API + SQLite Database**

---

## 2. Architecture Decision

This architecture is suitable for our project because it separates the frontend, backend, AI services, and database, making the application easier to develop, maintain, and extend.

The frontend is built using **React**, providing a responsive and interactive user interface. The backend is developed with **Node.js and Express.js**, which handles communication between the frontend, the AI chatbot, the TMDB API, and the database. **SQLite** is used to store user accounts, watchlists, and chatbot conversation history without requiring a complex database server. Movie information is retrieved from **The Movie Database (TMDB) API**, while the AI chatbot uses an AI API to generate personalized movie recommendations based on user conversations.

This architecture supports our MVP while allowing future expansion to cloud databases and more advanced AI features.

---

## 3. Main Components

| Component | Description | Tool / Technology | Related Requirement |
|-----------|-------------|-------------------|---------------------|
| User Interface | Homepage, navigation, movie pages, AI chatbot, login, watchlist, and admin dashboard. | React, HTML5, CSS3, JavaScript | FR-01, FR-02 |
| AI Chatbot | Accepts natural language prompts and generates personalized movie recommendations. | AI API (Gemini/OpenAI), Node.js | FR-03 |
| Movie Search | Searches movies and TV shows using TMDB data. | TMDB API, React | FR-04 |
| Movie Detail View | Displays movie information including synopsis, rating, genre, release date, cast, and trailer. | React, TMDB API | FR-06 |
| User Authentication | Allows users to register, log in, and access personalized features. | Node.js, Express.js, SQLite | FR-05 |
| Watchlist & Chat History | Stores users' favorite movies and previous chatbot conversations. | SQLite Database | FR-05 |
| Admin Dashboard | Allows administrators to view user chat history and chatbot activity. | React, Node.js, SQLite | FR-12 |

---

## 4. What Will Be Fully Implemented?

- Responsive homepage displaying trending movies and TV shows.
- AI-powered movie recommendation chatbot.
- Movie search functionality.
- Movie detail pages with trailer, synopsis, genre, and ratings.
- User registration and login.
- Watchlist management.
- Chat history for logged-in users.
- Admin dashboard for viewing chatbot conversations.
- Database storage using SQLite.

---

## 5. What Will Be Simulated?

- AI responses may use predefined prompts or API-generated responses depending on API availability.
- Streaming platform integration (Netflix, Disney+, etc.) will be simulated with external links rather than direct playback.
- Recommendation analytics will be demonstrated using sample data.
- Administrator statistics may use sample chatbot activity during the prototype stage.

---

## 6. Final Prototype Risk

### Biggest Technical Risk

The biggest technical risk is the dependency on external APIs. If the AI API or TMDB API becomes unavailable, reaches its usage limit, or experiences network issues, some system features such as movie recommendations or movie information retrieval may not function correctly.

### Mitigation Strategy

To reduce this risk:

- Cache frequently accessed movie information locally when possible.
- Implement error handling and user-friendly fallback messages when APIs are unavailable.
- Store user chat history and watchlists in SQLite to prevent data loss.
- Design the backend using a modular architecture so AI providers or movie APIs can be replaced with minimal code changes in the future.
