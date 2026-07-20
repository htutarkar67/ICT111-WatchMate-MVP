# ICT111-WatchMate-MVP
# WatchMate: Movie Recommendation System

## Course Information
Course Code: ICT111  
Course Name: Fundamental Technology Entrepreneurship  
Instructor: Dr. Herison Surbakti  
Project Type: 14-Labs Continuous IT Startup MVP Development  

## Team Name
WatchMate

## Team Members and Roles

| Student ID | Name | Role | Responsibility |
|---|---|---|---|
| 6604128 | Tar Yar Lin Latt | Product Lead | Define problems, target users, and project direction |
| 6703933 | Bhone Myat Kyaw | Technical Lead | Manage repository and develop the prototype |
| 6704756 | Htut Arkar Saing | UX/UI & Documentation Lead | Design users interface, and maintain project documentation |

## Initial Problem Area
Many movie viewers experience difficulty finding movies that match their interests and preferences. The increasing number of movies available on streaming platforms often causes users to spend excessive time searching for content. Existing recommendation systems may not always provide personalized suggestions that align with users' specific tastes and viewing habit.

## Target Users
The primary target users are university students, young adults, and movie enthusiasts who frequently watch movies through online streaming platforms. These users are interested in discovering new movies quickly and receiving recommendations based on their personal preferences and favorite genres.

## Initial IT Venture Direction
The team plans to develop a web-based movie recommendation platform called MovieMatch. The system will allow users to search for movies, select favorite genres, save watchlists, rate movies, and receive personalized recommendations. The platform aims to improve movie discovery and reduce the time users spend searching for suitable content.

## Technology Possibility
- Web application
- AI-assisted recommendation feature
- Cloud-based system
- SaaS platform
- Digital recommendation platform

## Repository Structure
- docs: team profile, idea logs, and weekly project documentation
- prototype: application prototype and source files
- data: user research, surveys, and validation information
- finance: business model and financial planning
- diagrams: user flow and system design diagrams
- screenshots: evidence of project progress
- pitch: presentation and final pitch materials

## Weekly Progress Log

| Week | Main Activity | Output | Status |
|---|---|---|---|
| Lab 01 | Lab setup and movie idea exploration | Repository, team profile, and initial venture idea | Completed |
| Lab 02 | Opportunity Scanning & Selection | Reviewed several project ideas, applied NUF scoring, and selected the Movie Recommendation System. | Completed |

## Current Status
During Lab 1, the team set up the project repository, selected the Movie Recommendation System concept, defined the target users and problem area, and assigned team responsibilities. The initial project structure was also organized to support future development.

### Current Status

In Lab 02, our team evaluated multiple project ideas and used the NUF scoring method to compare them. Based on the results, we selected the **Movie Recommendation System** as our semester project.

### Next Step

In Lab 03, we will conduct customer discovery interviews to validate the problem and gather feedback from potential users.

| Lab    | Topic                        | Summary                                                                                                                                         | Status    |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Lab 03 | Customer Discovery Workflows | Conducted customer interviews and surveys, validated user problems, and built an assumption-evidence table for the Movie Recommendation System. | Completed |

## Current Status

We completed our customer discovery activities by gathering feedback from university students, movie enthusiasts, and streaming platform users. The insights collected helped us understand user needs, preferences, and challenges related to finding suitable movie recommendations.

We validated that users spend too much time searching for movies.
We confirmed that existing recommendations are not always personalized.
We identified that users value accurate recommendations over complex features.
## Customer Problem Discovery Summary

In Lab 03, our team collected evidence from potential users to determine whether the movie recommendation problem is real and significant.

The interviews revealed that many users struggle to find movies that match their interests due to the overwhelming number of available choices. Users frequently rely on friends, social media, review websites, and streaming platform recommendations, but these sources do not always provide relevant suggestions.

## Target Respondents

Our team gathered customer discovery evidence from:

* University students who regularly watch movies using streaming platforms.
* Movie enthusiasts who frequently search for new movies and recommendations.
* Streaming platform users who experience difficulty selecting suitable content.

## Main Evidence Found
Through interviews and surveys, we discovered several important insights:
* Too many choices create decision fatigue: Users often feel overwhelmed when browsing large movie libraries.
* Searching takes too much time: Many respondents reported spending a long time looking for a movie before making a decision.
* Recommendations are not always relevant: Existing recommendation systems often suggest movies that do not match user interests.
* Users want personalized suggestions: Respondents wanted recommendations based on their favorite genres, actors, and viewing preferences.
Updated Problem Statement

Movie viewers often struggle to find movies that match their interests because streaming platforms offer a vast number of choices. Existing recommendation methods, including social media, online reviews, and platform-generated suggestions, are often time-consuming or insufficiently personalized. As a result, users experience frustration, decision fatigue, and difficulty discovering suitable movies.

## Decision for Next Step
The team has decided to proceed with the current problem direction and continue developing the WatchMate Movie Recommendation System based on validated customer feedback and research findings.

---

# Lab 04: User Persona, Requirements, and User Stories

## Primary Target User

Movie viewers who face challenges finding movies that align with their preferences and often spend significant time deciding what to watch because of the overwhelming number of available choices.

## Persona Summary

- **Persona Name:** Alex Tan
- **User Type:** University student and frequent movie watcher
- **Main Goal:** Receive quick personalized movie recommendations through an AI chatbot.
- **Main Pain Point:** Too many movie choices make decisions difficult and time-consuming.
- **Current Workaround:** Uses streaming recommendations, online searches, reviews, and friend suggestions.

## Key Requirements

| Req ID | Requirement                                                                          | Priority | Related Evidence                                                |
| ------ | ------------------------------------------------------------------------------------ | -------- | --------------------------------------------------------------- |
| FR-01  | Users can interact with an AI chatbot to receive personalized movie recommendations. | Must     | Lab 03 respondents reported difficulty finding suitable movies. |
| FR-02  | Users can search for movies by title.                                                | Must     | Users want a faster way to find movies.                         |
| FR-03  | Users can view movie details including synopsis, genre, rating, and release date.    | Must     | Users need more information before deciding what to watch.      |
| FR-04  | Users can browse trending movies and TV shows.                                       | Should   | Users want to discover popular content.                         |
| FR-05  | Chat conversations and recommendation history are stored.                            | Must     | Required for recommendation tracking and admin review.          |
| FR-06  | Administrators can view user chat history.                                           | Must     | Supports monitoring and improvement of recommendation quality.  |
| NFR-01 | The system should provide recommendations within a reasonable response time.         | Must     | Users expect quick recommendations.                             |
| NFR-02 | The interface should be simple and easy to navigate.                                 | Must     | Users prefer a user-friendly experience.                        |
| NFR-03 | The system should be responsive on desktop and mobile devices.                       | Must     | Users may access the platform from different devices.           |

## MVP Feature Scope

| Feature                   | Priority | Included in Final Prototype? |
| ------------------------- | -------- | ---------------------------- |
| AI Chatbot Recommendation | Must     | Yes                          |
| Movie Search              | Must     | Yes                          |
| Movie Detail View         | Must     | Yes                          |
| Trending Movies Section   | Should   | Yes                          |
| Chat History Storage      | Must     | Yes                          |
| Admin View Chat History   | Must     | Yes                          |
| User Account Registration | Could    | No                           |
| Social Sharing Feature    | Could    | No                           |

## Diagram Links

**User Flow Diagram:** [/diagrams/user-flow-diagram.md](/diagrams/user-flow-diagram.md) 

**Use Case Diagram:** [/diagrams/use-case-diagram.md](/diagrams/use-case-diagram.md)

## GitHub Contribution Evidence

#All team members actively contributed to the repository through commits, issue tracking, pull requests, documentation updates, prototype development, and requirement analysis activities. Contribution records can be verified through the repository commit history and issue tracker.

---

# Lab 05: Product Concept and UI/UX Wireframe

## Product Concept

**WatchMate** is a web-based AI movie recommendation system that helps users discover suitable movies and TV shows through natural conversations with an AI chatbot.Instead of spending significant time browsing streaming platforms or searching online, users can simply describe their preferences, favorite genres, mood, or similar movies, and the AI will provide personalized recommendations based on their interests.
The system is designed for movie enthusiasts, students, and casual viewers who often struggle to decide what to watch. It solves the problem of information overload by providing fast, intelligent, and personalized movie suggestions in one platform.

## Requirement-Driven Screens

| Screen | Related Requirement IDs | Wireframe File |
|--------|--------------------------|----------------|
| Homepage / Landing | FR-01, FR-02 | `/wireframes/homepage.md` |
| AI Movie Recommendation Chatbot | FR-02, FR-03, FR-11 | `/wireframes/ai-chatbot.md` |
| Search Results | FR-04, FR-05 | `/wireframes/search-results.md` |
| Movie Detail View | FR-06 | `/wireframes/movie-detail.md` |
| Watchlist | FR-05 | `/wireframes/watchlist.md` |
| Chat History | FR-05 | `/wireframes/chat-history.md` |
| Admin Dashboard | FR-06, FR-12 | `/wireframes/admin-dashboard.md` |

## User Flow

The user begins on the **Homepage**, where they can browse trending movies or search for a specific title. Users can also open the **AI Movie Recommendation Chatbot** and enter their preferences, mood, favorite genre, or a movie they enjoyed. The AI chatbot analyzes the request and provides personalized movie recommendations. Users can then view detailed movie information, watch the trailer, and save movies to their watchlist. Logged-in users can access previous chatbot conversations through the chat history, while administrators can monitor chatbot usage and review user chat history through the admin dashboard.

**User Flow Diagram:** `/diagrams/user-flow-diagram.md`

## Team Contribution
All team members contributed to the development of **WatchMate** using the shared GitHub repository. Contributions included product concept development, user persona creation, system requirements, user stories, MVP feature planning, UI/UX wireframe design, user flow design, clickable prototype development, documentation updates, commits, issues, and pull requests.

---

# Lab 06 Update - Business Model Canvas and Technical Architecture

## Lab 06 Summary

In Lab 06, our group connected the product concept, system requirements, user stories, MVP feature lists, and UI/UX wireframes into a complete business model and technical architecture for **WatchMate: AI Movie Recommendation System**. We also designed the system's data structure and architecture diagrams to guide the implementation of the final prototype.

## Files Added or Updated

- `/docs/business-model-canvas.md`
- `/docs/feature-value-mapping.md`
- `/docs/technical-architecture.md`
- `/docs/data-structure.md`
- `/diagrams/system-architecture.mmd`
- `/diagrams/data-flow.md`
- `/docs/weekly-logbook.md`

## Technical Direction
For this prototype, we will use a **React frontend**, **Node.js and Express.js backend**, **SQLite database**, **TMDB API**, and an **AI chatbot API** (such as Google Gemini) to build the movie recommendation system.

The frontend will offer an interactive interface where users can explore trending movies, search for titles, chat with the AI assistant, manage their watchlist, and review previous conversations.The backend will handle user requests, communicate with the AI chatbot and TMDB API, and manage user data stored in SQLite.This architecture offers a simple yet scalable solution that supports the project's MVP while allowing future enhancements.

## Final Prototype Connection
The documentation and planning completed during Lab 06 provide the foundation for developing the final WatchMate prototype.

### UI/UX Translation
The completed wireframes, including the homepage, AI chatbot, search results, movie details, watchlist, chat history, and admin dashboard, provide a clear blueprint for the final user interface. These designs guide React frontend development and help maintain a consistent and user-friendly experience.

### Structural Foundation
The frontend pages and React components form the structure of the application. During development, these components will be connected to backend APIs to provide dynamic content, AI-powered recommendations, user authentication, and watchlist management.

### Architectural Blueprint
The system architecture and data flow diagrams define how information moves between the frontend, backend, AI chatbot API, TMDB API, and SQLite database. These diagrams guide the implementation of movie searches, AI recommendations, user authentication, watchlist storage, and chat history management.

### Feature Prioritization
The MVP feature list, system requirements, and user stories define the development priorities. The first implementation phase focuses on the core features:

- AI-powered movie recommendation chatbot
- Movie search functionality
- Trending movies and TV shows
- Movie detail pages with trailers
- User login and authentication
- Watchlist management
- Chat history for logged-in users
- Admin dashboard for viewing chatbot conversations

Additional features, including advanced AI personalization, recommendation analytics, and streaming platform integration, will be considered for future versions after the MVP has been successfully completed. These enhancements will help improve the overall recommendation experience and system capabilities.

---

# Lab 07: MVP Experiment Design

## Lab 07 Summary

In Lab 07, our team planned an MVP experiment to evaluate whether WatchMate is easy to use and provides a smooth movie recommendation experience. Before continuing development, we wanted to collect feedback from potential users and identify areas for improvement.

## Experiment Objective

The goal of this experiment is to test whether:

- Users can interact with the AI chatbot naturally.
- Users can receive personalized movie recommendations based on their preferences.
- Users can easily view movie details and browse trending movies.
- The prototype is simple, intuitive, and easy to navigate.

## MVP Experiment Type

**Selected Experiment Type:** Interactive Clickable Prototype

**Reason:**  
Our prototype is an interactive frontend application designed to demonstrate the AI movie recommendation workflow. It enables users to complete the main tasks and provides an effective way to assess usability before developing the full system.
## Critical Assumptions

During the experiment, we will validate the following assumptions:

- Users prefer AI-powered movie recommendations over manually searching multiple platforms.
- Users can easily communicate their movie preferences through the chatbot.
- Users understand and trust the personalized recommendations provided.
- Users can navigate the system without additional instructions.

## Success Metrics

The experiment will be considered successful if:

- Most users successfully completed the assigned tasks.
- Users can use the chatbot without confusion.
- Users can receive personalized movie recommendations.
- Users find the prototype useful, easy to use, and helpful for movie discovery.
- Feedback helps identify improvements for the next version.

## Files Added in Lab 07

- `/docs/mvp-experiment-plan.md`
- `/docs/critical-assumptions.md`
- `/docs/experiment-script.md`
- `/docs/success-metrics.md`
- `/docs/feedback-form.md`
- `/docs/weekly-logbook.md`

## Connection to the Final Prototype

The experiment results will help improve WatchMate before implementation. User feedback will be used to refine chatbot interactions, enhance the recommendation workflow, improve the user interface, and ensure the final prototype delivers an effective and personalized movie recommendation experience.

---

## Lab 08: Customer Validation and Analytics Sheet

### Validation Objective
Evaluated the usability, task completion, and user satisfaction of WatchMate’s core features, including AI chatbot interactions, personalized movie recommendations, movie searches, movie details, and chatbot activity monitoring through the admin dashboard.

### Prototype Version Tested
- **Version:** v1
- **Link:** [/prototype/index.html](/prototype/index.html) , [/prototype/style.css](/prototype/style.css)
- **Screenshots:** [/screenshots/project-dashboard.md](/screenshots/project-dashboard.md)

### Analytics Summary

| Metric | Result |
|---|---:|
| Total test users | 20 Testers (T001 - T020) |
| Task success rate | **100.00% (20 / 20)** |
| Average ease of use | **4.65 / 5.0** |
| MVP decision signal | **80% Keep, 20% Improve** |
| Main confusion point | AI chatbot prompts and navigation between Chat History and Trending Movies |

### MVP Decision

**Continue with minor revisions.** The MVP direction is validated by positive customer feedback and a **100% task completion rate**. Most users successfully completed the required tasks and found the AI chatbot useful for discovering movies. The team will implement the following improvements before the next iteration:

1. **Improve AI Chatbot Interaction (FR-03):** Add example prompts and suggested questions to help first-time users communicate their movie preferences more effectively.
2. **Enhance Movie Search (FR-04):** Improve the search feature with better keyword matching, autocomplete suggestions, and more accurate search results.
3. **Improve Personalized Movie Recommendations (FR-05):** Display more relevant recommendations and include a short explanation of why each movie is suggested based on the user's preferences.
4. **Enhance Movie Details (FR-06):** Improve the movie detail page by highlighting ratings, genres, cast, trailers, and streaming platform information for easier decision-making.
5. **Enhance Admin Dashboard (FR-12):** Enhance dashboard analytics and user activity monitoring to help administrators evaluate chatbot performance and recommendation usage.

### Files Added / Updated
- `/data/validation-results.csv`
- `/data/test-users.csv`
- `/docs/customer-validation-summary.md`
- `/docs/analytics-insights.md`
- `/docs/mvp-decision.md`
- `/docs/test-user-notes.md`
- `/docs/weekly-logbook.md`
- `/screenshots/project-dashboard.md`

---

## Lab 09 - Responsible IT Check

### Responsible Design Summary

In Lab 09, our group conducted a comprehensive responsible IT design evaluation for **WatchMate - AI Movie Recommendation System**. We evaluated data privacy, ethical AI usage, intellectual property compliance, and basic web security:

* **Privacy & Data Minimization**: Collected only the minimum information required for personalized movie recommendations, such as username, email, and movie preferences. Sensitive information such as national ID numbers, home addresses, payment information, and passwords is not collected.
* **Ethical Transparency**: Included a clear notice explaining that WatchMate is an academic AI prototype and that recommendations are AI-generated suggestions, which may not always match individual preferences.
* **IP & Licensing**: Verified all third-party assets (Tailwind CSS, Plus Jakarta Sans, Google Material Symbols, Mermaid.js, and Express.js) and confirmed they are used under their respective open-source licenses (MIT, SIL OFL, Apache 2.0).
* **Basic Security**: Reviewed chatbot input validation, administrator access control, user privacy, AI recommendation transparency, and account security. Planned improvements include role-based access control (RBAC), stronger input validation, and protection of user chat history.

### Files Added / Updated

- `/docs/legal-ethical-checklist.md`
- `/docs/privacy-and-data-protection.md`
- `/docs/ip-and-third-party-assets.md`
- `/docs/basic-security-risk-check.md`
- `/docs/risk-register.md`
- `/docs/updated-requirements-note.md`
- `/docs/user-consent-statement.md`
- `/docs/data-handling-policy.md`
- `/docs/weekly-logbook.md`
- `/data/data-inventory.csv`
- `/data/risk-register.csv`
- `/data/third-party-assets-register.csv`
- `/diagrams/privacy-security-review.mmd`
- `/screenshots/privacy-security-review.md`

### Requirement Update

Core system requirements (`FR-01` through `FR-12` in `/docs/system-requirements.md`) remain active. Responsible design updates were formally documented in `docs/updated-requirements-note.md`:

- **FR-03**: Added chatbot input validation, example prompts for new users, and a loading indicator while AI recommendations are being generated (Issue **#45**).
- **FR-04**: Added autocomplete search suggestions and genre filters to improve the movie search experience (Issue **#45**).
- **FR-06**: Enhanced the movie detail page by displaying recommendation reasons, ratings, genres, streaming platforms, and trailers more clearly (Issue **#48**).
- **FR-12**: Restricted administrator analytics and movie management features using role-based access control (RBAC) (Issue **#45** & **#47**).

### Team Contributions

| Member Name | Role | Contribution | GitHub Evidence |
|---|---|---|---|
| **Bhone Myat Kyaw** (`Kreazx`) | Technical Lead | Authored `/docs/legal-ethical-checklist.md`, `/docs/privacy-and-data-protection.md`, and `/docs/basic-security-risk-check.md`. | [Issue #45](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/45) |
| **Htut Arkar Saing** (`htutarkar67`) | UX/UI Lead | Prepared `/data/data-inventory.csv`, `/data/risk-register.csv`, `/data/third-party-assets-register.csv`, and created `/diagrams/privacy-security-review.mmd` and `/screenshots/privacy-security-review.md`. | [Issue #46](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/46) |
| **Htut Arkar Saing** (`htutarkar67`) | Documentation Lead | Authored `/docs/risk-register.md`, `/docs/updated-requirements-note.md`, and `/docs/user-consent-statement.md`. | [Issue #47](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/47) |
| **Tar Yar Lin Latt** (`taryarlinl66-sys`) | Product Lead | Authored `/docs/data-handling-policy.md`, `/docs/ip-and-third-party-assets.md`, updated `/docs/weekly-logbook.md`, and `README.md`. | [Issue #48](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/48) |

---

