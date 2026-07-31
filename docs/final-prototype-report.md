# Final Prototype Report

## 1. Project Information

**Project Title:** WatchMate: AI Movie Recommendation System

**Course:** ICT105 Fundamental Technology Entrepreneurship

**Project Type:** Web-Based AI Movie Recommendation Platform

**Repository:** https://github.com/htutarkar67/ICT111-WatchMate-MVP

**Live Demo:** *(https://final-project-production-e4d4.up.railway.app/)*

---

## 2. Group Members and Roles

| Name | Role | Main Contribution | GitHub Evidence |
|---|---|---|---|
| **Tar Yar Lin Latt** (`taryarlinl66-sys`) | **Product Lead** | Defined the product vision, identified target users, prepared the Business Model Canvas, Go-to-Market strategy, sales scenario, pitch presentation, and startup documentation. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=taryarlinl66-sys) |
| **Bhone Myat Kyaw** (`BhoneMyatKyaw666`) | **Technical Lead** | Designed and developed the WatchMate AI Movie Recommendation System, integrated the AI chatbot and TMDB API, implemented frontend and backend functionality, managed the GitHub repository, and prepared the final prototype implementation. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=BhoneMyatKyaw666) |
| **Htut Arkar Saing** (`htutarkar67`) | **UX/UI Lead & Documentation Lead** | Designed the user interface and wireframes, created system diagrams, prepared project documentation, coordinated user testing, and organized the final repository for submission. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=htutarkar67) |

---

## 3. Project Overview

WatchMate is an AI-powered movie recommendation platform that helps users discover movies quickly and efficiently through natural language conversations.

Instead of spending time searching through multiple streaming services and movie websites, users can interact with an AI chatbot by describing what they want to watch. The chatbot analyzes the user's preferences and recommends suitable movies with detailed information, including ratings, genres, cast members, trailers, and overviews.

The platform combines artificial intelligence with movie database services to create a personalized and user-friendly movie discovery experience.

---

## 4. Problem Statement

Choosing a movie has become increasingly difficult because users have access to thousands of movies across different streaming platforms.

Many existing recommendation systems provide generic suggestions that do not match each user's personal interests or current mood. As a result, users often spend more time deciding what to watch than actually enjoying a movie.

Our customer discovery interviews also found that many university students wanted a faster and more personalized way to receive movie recommendations.

---

## 5. Proposed Solution

WatchMate solves this problem by providing an AI-powered recommendation assistant.

Users simply describe what they want, for example:

- "Recommend a funny action movie."
- "I want a romantic movie similar to La La Land."
- "Suggest a science fiction movie with great visual effects."

The AI chatbot processes the request and recommends suitable movies based on the user's preferences. Users can then view detailed movie information, watch trailers, and save their favorite movies to a personal watchlist.

---

## 6. Target Users

### Primary Users

- University students
- Young adults
- Movie enthusiasts

### Secondary Users

- Casual viewers
- Users looking for personalized recommendations

### Administrator

The administrator monitors user chatbot history, reviews platform usage, and manages the overall system through the administrator dashboard.

---

## 7. Core Features

The final prototype includes the following MVP features:

- AI-powered Movie Recommendation Chatbot
- Movie Search
- Trending Movies
- Movie Detail Page
- Trailer Integration
- User Registration and Login
- Personal Watchlist
- AI Chat History
- Administrator Dashboard
- Analytics Dashboard
- Responsive User Interface

---

## 8. Prototype Workflow

```text
Homepage
      │
      ▼
Browse Trending Movies
      │
      ▼
Start AI Chatbot
      │
      ▼
Enter Movie Preferences
      │
      ▼
Receive AI Recommendations
      │
      ▼
View Movie Details
      │
      ▼
Save to Watchlist
      │
      ▼
Continue Browsing Movies
```

---

## 9. Technology Stack

### Frontend

- HTML5
- CSS3
- JavaScript

### APIs

- Google Gemini API (AI Chatbot)
- TMDB API (Movie Database)

### Storage

- Browser Local Storage
- JSON Data

### Analytics

- Microsoft Power BI

### Development Tools

- Visual Studio Code
- GitHub
- GitHub Pages

---

## 10. Requirement Implementation Summary

All functional requirements defined in the project documentation have been successfully implemented.

| Requirement | Status |
|------------|--------|
| FR-01 Homepage | ✅ Completed |
| FR-02 Primary User Workflow | ✅ Completed |
| FR-03 AI Chat Input | ✅ Completed |
| FR-04 Data Storage | ✅ Completed |
| FR-05 Movie Browsing | ✅ Completed |
| FR-06 Search & Filter | ✅ Completed |
| FR-07 Movie Detail View | ✅ Completed |
| FR-08 Watchlist & Chat History | ✅ Completed |
| FR-09 Administrator Dashboard | ✅ Completed |
| FR-10 Validation & Feedback | ✅ Completed |
| FR-11 Analytics Dashboard | ✅ Completed |
| FR-12 Requirement Traceability | ✅ Completed |
| FR-13 UI Consistency | ✅ Completed |
| FR-14 Responsive Design | ✅ Completed |
| FR-15 Privacy & Responsible Data Handling | ✅ Completed |
| FR-16 User Testing Integration | ✅ Completed |

---

## 11. User Testing Summary

To evaluate the usability of WatchMate, the prototype was tested by **20 participants**.

### Results

- Number of Testers: **20**
- Task Completion Rate: **Approximately 80%**
- Average Ease of Use: **Approximately 3.5 / 5**
- Average Interest Level: **Approximately 4.0 / 5**

### Most Useful Features

- AI Chatbot
- Personalized Recommendations
- Movie Detail Page
- Watchlist
- Trending Movies

### User Suggestions

- Improve AI response speed
- Add more filtering options
- Make the Watchlist easier to access
- Improve recommendation accuracy

The testing results confirmed that users found the AI chatbot helpful and easy to use while also identifying areas for future improvement.

---

## 12. Key Achievements

During development, the team successfully completed:

- AI chatbot integration
- TMDB API integration
- Responsive website design
- User authentication
- Personalized watchlist
- AI conversation history
- Administrator dashboard
- Analytics dashboard using Power BI
- Complete project documentation
- Requirement traceability
- User testing and validation

---

## 13. Challenges and Solutions

| Challenge | Solution |
|-----------|----------|
| AI chatbot integration | Implemented Google Gemini API for natural language recommendations. |
| Large movie database | Integrated TMDB API to retrieve movie information dynamically. |
| Maintaining project structure | Organized the project into separate HTML, CSS, JavaScript, assets, and documentation folders. |
| Responsive interface | Applied responsive layouts and mobile-friendly navigation. |
| User feedback | Conducted usability testing with 20 participants and refined the interface based on their feedback. |

---

## 14. Future Improvements

Future versions of WatchMate may include:

- AI recommendations based on watch history
- Machine learning recommendation engine
- Streaming platform integration
- Mobile application
- Voice-enabled AI assistant
- Social recommendation features
- Personalized user profiles
- Multi-language support

---

## 15. Conclusion

WatchMate successfully demonstrates how artificial intelligence can simplify the movie discovery process.

By combining an AI-powered chatbot with comprehensive movie information and personalized features such as watchlists and chat history, the platform helps users find suitable movies more efficiently than traditional search methods.

The prototype fulfills all functional requirements, successfully completed user validation, and is ready for the final project presentation.

---

## 16. Repository Structure

```text
prototype/
│
├── index.html
├── login.html
├── register.html
├── movies.html
├── movie-detail.html
├── chat.html
├── watchlist.html
├── dashboard.html
├── admin.html
├── css/
├── js/
├── assets/
└── Shared/

docs/
wireframes/
diagrams/
screenshots/
data/
```

---

## 17. References

- Google Gemini API Documentation
- TMDB API Documentation
- Microsoft Power BI Documentation
- HTML5 Documentation
- CSS3 Documentation
- JavaScript Documentation
- GitHub Documentation
- ICT105 Fundamental Technology Entrepreneurship Course Materials
