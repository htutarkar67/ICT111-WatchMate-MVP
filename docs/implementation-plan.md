# Lab 10 - Implementation Plan

## 1. Project Information

- **Group Name:** WatchMate
- **Project Title:** WatchMate – AI Movie Recommendation System
- **Repository Link:** https://github.com/htutarkar67/ICT111-WatchMate-MVP
- **Selected Platform/Tools:** React (TypeScript), Tailwind CSS, Node.js, Express.js, TMDB API
- **Backend Status:** Real backend using Node.js Express API with database integration and TMDB API services.

## 2. Prototype Scope for Sprint 1

| Feature | Requirement ID | User Story ID | Screen/Module | Sprint 1 Status |
|---|---|---|---|---|
| Homepage | FR-01 | US-01 | Homepage | Completed |
| User Authentication | FR-02 | US-02 | Authentication | Completed |
| AI Movie Recommendation | FR-03 | US-03 | AI Recommendation | Completed |
| Movie Browsing | FR-04 | US-04 | Movies | Completed |
| TV Show Browsing | FR-05 | US-05 | TV Shows | Completed |
| Watchlist Management | FR-06 | US-06 | Watchlist | Completed |
| AI Chat Assistant | FR-07 | US-07 | AI Chat | Completed |
| Admin Management | FR-08 | US-08 | Admin Dashboard | Completed |

## 3. Implementation Approach

- **Frontend:** Developed using React with TypeScript and Tailwind CSS to create a responsive, modern, and user-friendly interface across all devices.
- **Backend:** Implemented with Node.js and Express.js to handle user authentication, AI chat requests, watchlist management, and administrator functions through REST APIs.
- **Movie Recommendation:** Integrated with the TMDB API to retrieve movie and TV show information and generate personalized recommendations based on user preferences.
- **Database:** User accounts, watchlists, and application data are managed through the database connection configured in the backend.
- **Admin Management:** The administrator dashboard allows administrators to manage movie information, monitor users, and maintain system content.
- **Validation & Security:** Client-side and server-side validation are applied to user authentication, input forms, and API requests to improve reliability and security.
- **Screenshots/Evidence:** Implementation progress is supported by GitHub commits, project documentation, screenshots, and the working prototype.

## 4. Member Responsibilities

| Member | Responsibility | Evidence of Contribution |
|---|---|---|
| **Bhone Myat Kyaw** | Developed the frontend pages, AI movie recommendation features, and integrated TMDB API functionality. | `prototype/project/frontend/`, `controller/tmdb.js` |
| **Bhone Myat Kyaw** | Implemented backend controllers, user authentication, AI chat, watchlist management, and administrator functions. | [prototype/project/controller/](/prototype/project/controller), `prototype/project/routes/` |
| **Htut Arkar Saing** | Feature status tracking, implementation plan, & system flow diagrams. | `docs/implementation-plan.md`, `docs-feature-implementation-status.md`, `/diagrams/implementation-flow.mmd` |
| **Tar Yar Lin Latt** | Prepared weekly logbook, and README updates. | `docs/weekly-logbook.md`, [README.md](../README.md) |

## 5. Risks or Blockers

1. **TMDB API Dependency**
   - The recommendation system depends on external TMDB API availability and network connectivity.
   - **Solution:** Implement API error handling and display user-friendly fallback messages when requests fail.

2. **Recommendation Accuracy**
   - Personalized recommendations are based on user preferences and available movie metadata, which may not always perfectly match user interests.
   - **Solution:** Improve the recommendation algorithm by incorporating additional user behavior and preference data in future versions.

3. **Authentication & Data Security**
   - User authentication and account management require secure handling of credentials and user sessions.
   - **Solution:** Apply password encryption, authentication middleware, and role-based access control for administrator features.

4. **Performance**
   - Fetching large movie datasets from external APIs may increase loading time.
   - **Solution:** Implement caching, pagination, and optimized API requests to improve application performance.
