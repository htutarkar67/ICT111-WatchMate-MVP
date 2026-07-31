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
| 6604128 | Tar Yar Lin Latt | Product Lead | Defined the product vision, identified target users, prepared the Business Model Canvas, Go-to-Market strategy, sales scenario, and contributed to the final pitch presentation. |
| 6703933 | Bhone Myat Kyaw | Technical Lead | Developed the AI Movie Recommendation System, implemented frontend and backend features, integrated the AI chatbot and TMDB API, created system diagrams and flowcharts, designed the Power BI dashboard, managed the GitHub repository, and deployed the prototype. |
| 6704756 | Htut Arkar Saing | UX/UI & Documentation Lead | Designed the user interface and wireframes, prepared project documentation, coordinated user testing, organized the repository, and completed the final submission documents. |

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
The system is designed for movie enthusiasts, students, and casual viewers who often struggle to decide what to watch. It addresses information overload by providing fast, intelligent, and personalized movie recommendations through a single platform.
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

- [/docs/business-model-canvas.md](/docs/business-model-canvas.md)
- [/docs/feature-value-mapping.md](/docs/feature-value-mapping.md)
- [/docs/technical-architecture.md](/docs/technical-architecture.md)
- [/docs/data-structure.md](/docs/data-structure.md)
- [/diagrams/system-architecture.mmd](/diagrams/system-architecture.mmd)
- [/diagrams/data-flow.md](/diagrams/data-flow.md)
- [/docs/weekly-logbook.md](/docs/weekly-logbook.md)

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

- [/docs/mvp-experiment-plan.md](/docs/mvp-experiment-plan.md)
- [/docs/critical-assumptions.md](/docs/critical-assumptions.md)
- [/docs/experiment-script.md](/docs/experiment-script.md)
- [/docs/success-metrics.md](/docs/success-metrics.md)
- [/docs/feedback-form.md](/docs/feedback-form.md)
- [/docs/weekly-logbook.md](/docs/weekly-logbook.md)

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
- [/data/validation-results.csv](/data/validation-results.csv)
- [/data/test-users.csv](/data/test-users.csv)
- [/docs/customer-validation-summary.md](/docs/customer-validation-summary.md)
- [/docs/analytics-insights.md](/docs/analytics-insights.md)
- [/docs/mvp-decision.md](/docs/mvp-decision.md)
- [/docs/test-user-notes.md](/docs/test-user-notes.md)
- [/docs/weekly-logbook.md](/docs/weekly-logbook.md)
- [/screenshots/project-dashboard.md](/screenshots/project-dashboard.md)

---

## Lab 09 - Responsible IT Check

### Responsible Design Summary

In Lab 09, our group conducted a comprehensive responsible IT design evaluation for **WatchMate - AI Movie Recommendation System**. We evaluated data privacy, ethical AI usage, intellectual property compliance, and basic web security:

* **Privacy & Data Minimization**: Collected only the minimum information required for personalized movie recommendations, such as username, email, and movie preferences. Sensitive information such as national ID numbers, home addresses, payment information, and passwords is not collected.
* **Ethical Transparency**: Included a clear notice explaining that WatchMate is an academic AI prototype and that recommendations are AI-generated suggestions, which may not always match individual preferences.
* **IP & Licensing**: Verified all third-party assets (Tailwind CSS, Plus Jakarta Sans, Google Material Symbols, Mermaid.js, and Express.js) and confirmed they are used under their respective open-source licenses (MIT, SIL OFL, Apache 2.0).
* **Basic Security**: Reviewed chatbot input validation, administrator access control, user privacy, AI recommendation transparency, and account security. Planned improvements include role-based access control (RBAC), stronger input validation, and protection of user chat history.

### Files Added / Updated

- [/docs/legal-ethical-checklist.md](/docs/legal-ethical-checklist.md)
- [/docs/privacy-and-data-protection.md](/docs/privacy-and-data-protection.md)
- [/docs/ip-and-third-party-assets.md](/docs/ip-and-third-party-assets.md)
- [/docs/basic-security-risk-check.md](/docs/basic-security-risk-check.md)
- [/docs/risk-register.md](/docs/risk-register.md)
- [/docs/updated-requirements-note.md](/docs/updated-requirements-note.md)
- [/docs/user-consent-statement.md](/docs/user-consent-statement.md)
- [/docs/data-handling-policy.md](/docs/data-handling-policy.md)
- [/docs/weekly-logbook.md](/docs/weekly-logbook.md)
- [/data/data-inventory.csv](/data/data-inventory.csv)
- [/data/risk-register.csv](/data/risk-register.csv)
- [/data/third-party-assets-register.csv](/data/third-party-assets-register.csv)
- [/diagrams/privacy-security-review.mmd](/diagrams/privacy-security-review.mmd)
- [/screenshots/privacy-security-review.md](/screenshots/privacy-security-review.md)

### Requirement Update

Core system requirements (`FR-01` through `FR-12` in `/docs/system-requirements.md`) remain active. Responsible design updates were formally documented in `docs/updated-requirements-note.md`:

- **FR-03**: Added chatbot input validation, example prompts for new users, and a loading indicator while AI recommendations are being generated (Issue **#45**).
- **FR-04**: Added autocomplete search suggestions and genre filters to improve the movie search experiences (Issue **#45**).
- **FR-06**: Enhanced the movie detail page by displaying recommendation reasons, ratings, genres, streaming platforms, and trailers more clearly (Issue **#48**).
- **FR-12**: Restricted administrator analytics and movie management features using role-based access controls (RBAC) (Issue **#45** & **#47**).

### Team Contributions

| Member Name | Role | Contribution | GitHub Evidence |
|---|---|---|---|
| **Bhone Myat Kyaw** (`BhoneMyatKyaw666`) | Technical Lead | Authored `/docs/legal-ethical-checklist.md`, `/docs/privacy-and-data-protection.md`, and `/docs/basic-security-risk-check.md`. | [Issue #45](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/45) |
| **Htut Arkar Saing** (`htutarkar67`) | UX/UI Lead | Prepared `/data/data-inventory.csv`, `/data/risk-register.csv`, `/data/third-party-assets-register.csv`, and created `/diagrams/privacy-security-review.mmd` and `/screenshots/privacy-security-review.md`. | [Issue #46](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/46) |
| **Htut Arkar Saing** (`htutarkar67`) | Documentation Lead | Authored `/docs/risk-register.md`, `/docs/updated-requirements-note.md`, and `/docs/user-consent-statement.md`. | [Issue #47](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/47) |
| **Tar Yar Lin Latt** (`taryarlinl66-sys`) | Product Lead | Authored `/docs/data-handling-policy.md`, `/docs/ip-and-third-party-assets.md`, updated `/docs/weekly-logbook.md`, and `README.md`. | [Issue #48](https://github.com/htutarkar67/ICT111-WatchMate-MVP/issues/48) |

---

# Lab 10 - MVP Implementation Sprint 1

### Sprint Goal
Lab 10 focused on developing the first functional version of the WatchMate MVP prototype based on the approved requirements, wireframes, and technical architecture. The objective was to implement the core features that allow users to search for movies, receive recommendations, and browse movie information through a responsive web application.

### Implementation Approach
- **Development Stack:** Tailwind CSS, Vanilla JavaScript
- **Frontend Implementation:** Responsive web application with client-side JavaScript
- **Data Source:** `data/movies-sample-records.csv` and local sample movie dataset
- **Prototype Location:** `prototype/project/`

### Features Completed in Sprint 1

| Feature | Requirement ID | Status | Evidence |
|---|---|---|---|
| Homepage | FR-01 | Completed | `prototype/project/` |
| User Registration/Login UI | FR-02 | Completed | `prototype/project/` |
| Movie Preference Form | FR-03 | Completed | `prototype/project/` |
| Movie Recommendation Engine | FR-04 | Completed | `prototype/project/` |
| Movie Recommendation List | FR-05 | Completed | `prototype/project/` |
| Search & Filter | FR-06 | Completed | `prototype/project/` |
| Movie Detail View | FR-07 | Completed | `prototype/project/` |
| Recommendation Status | FR-08 | Completed | `prototype/project/` |
| User Dashboard | FR-12 | Completed | `prototype/project/` |

### Prototype Screenshots
- Homepage – `screenshots/homepage.md`
- Login – `screenshots/login.md`
- Registration – `screenshots/register.md`
- AI Chatbot / Movie Preference  – `screenshots/ai-chatbot.md`
- Recommendation List – `screenshots/search-results.md`
- Movie Detail – `screenshots/movie-detail.md`
- Admin Dashboard – `screenshots/admin-dashboard.md`

### Team Contribution

| Member Name | Role | Deliverables & Artifact Evidence |
|---|---|---|
| **Htut Arkar Saing** | Product Lead | `/data/movies-sample-records.csv`, `/data/movies-status-categories.csv` |
| **Htut Arkar Saing** | UX/UI Lead | `/docs/feature-implementation-status.md`, `/docs/implementation-plan.md`, `/diagrams/implementation-flow.mmd` |
| **Bhone Myat Kyaw** | Technical Lead | `/prototype/project/` |
| **Tar Yar Lin Latt** | Documentation Lead | `/docs/weekly-logbook.md`, `README.md` |

---

## Lab 11: MVP Implementation Sprint 2 and Startup Metrics

### Prototype Progress
The core prototype UI design remained consistent from Lab 10 to Lab 11, with Sprint 2 focused on improving **responsiveness**, **usability**, and **user experience** across desktop and mobile devices:
- **Responsive Navigation :** Enhanced the navigation bar to provide a smoother browsing experience across different screen sizes.
- **Homepage Optimization :** Improved the hero section and movie recommendation cards with a responsive layout for mobile and tablet devices.
- **Search & Filter Enhancement :** Improved movie search and filtering functionality, making it easier for users to discover recommended movies.
- **Dashboard & Recommendation Improvements :** Refined the dashboard layout and recommendation summary to improve readability and user interaction.

### Implemented / Improved Features

| Requirement ID | Feature | Status | Evidence |
|---|---|---|---|
| FR-03 | Movie Preference Form Enhancement | Completed | `prototype/project/` (Improved form layout, validation, and responsive design) |
| FR-06 | Search & Filter Optimization | Completed | `prototype/project/` (Enhanced search and filtering functions) |
| FR-07 | Movie Detail Page Enhancement | Completed | `prototype/project/` (Improved movie information layout and recommendation details) |
| FR-08 | Recommendation Status Display | Completed | `prototype/project/` (Enhanced recommendation status and user feedback display) |
| FR-12 | Dashboard Analytics | Completed | `prototype/project/` (Updated recommendation statistics and user activity summary) |
| FR-14 | Responsive User Interface | Completed | `prototype/project/` (Responsive layouts for desktop, tablet, and mobile devices) |

### Startup/Product Metrics

Documented startup and product metrics in `docs/startup-metrics.md`, including user activity, recommendation success rate, search effectiveness, recommendation category distribution, user satisfaction, and customer validation results collected during prototype testing.

### Prototype Screenshots

- Homepage – `screenshots/homepage.md`
- Login – `screenshots/login.md`
- Registration – `screenshots/register.md`
- AI Chatbot / Movie Preference – `screenshots/ai-chatbot.md`
- Search Results (Recommendation List) – `screenshots/search-results.md`
- Movie Detail – `screenshots/movie-detail.md`
- Watchlist – `screenshots/watchlist.md`
- Chat History – `screenshots/chat-history.md`
- Admin Dashboard – `screenshots/admin-dashboard.md`

### Member Contributions

| Member | Role | Sprint 2 Contribution |
|---|---|---|
| **Tar Yar Lin Latt** | Product Lead | Prepared startup metrics, customer validation analysis, and business documentation. |
| **Bhone Myat Kyaw** | Technical Lead | Improved the web prototype, optimized responsive layouts, and enhanced recommendation features. |
| **Htut Arkar Saing** | UX/UI & Documentation Lead | Updated project documentation, prototype testing notes, feature implementation status, README, and weekly logbook. |

### Remaining Work

- Integrate a live Movie Database API for real-time movie information.
- Develop personalized recommendation algorithms based on user preferences.
- Add user authentication and profile management.
- Improve analytics dashboard with interactive charts and recommendation insights.
- Prepare the final project presentation and demonstration video.

---

# Lab 12 - Landing Page and Digital Go-to-Market

## Landing Page

**Landing page folder/link:**  
`prototype/project` *https://watchmate-mvp.up.railway.app/*

**Main CTA:**  
**Start Chat with AI** (Primary) & **Browse Trending Movies** (Secondary)

**Prototype/demo link:**  
https://watchmate-mvp.up.railway.app/


## Go-to-Market Plan

**Target early users:**  
University students, young adults, and movie enthusiasts who want personalized movie recommendations and an easier way to discover movies and TV shows.

**Selected channels:**  
University LINE/Discord groups, Facebook, Instagram, TikTok, GitHub, QR-code posters around campus, and word-of-mouth recommendations.

**Main marketing message:**  
*"Not sure what to watch? Let WatchMate's AI recommend the perfect movie for you in seconds."*


## Acquisition Metrics

**Landing Page Views (M-01):**  
Recorded **420** total landing page views across all marketing channels (Target ≥ 100).

**CTA Click Rate (M-02):**  
Achieved a **39.8%** click-through rate (**167 clicks / 420 views**).

**Demo Attempts & Active Testers (M-03 / M-05):**  
Recorded **118** AI chatbot demo attempts and **62** active testers, resulting in a **14.8%** conversion rate.


## Screenshots

**Landing page screenshot:**  
[/screenshots/homepage.md](/screenshots/homepage.md)

**AI Chatbot screenshot:**  
[/screenshots/ai-chatbot.md](/screenshots/ai-chatbot.md)


## Requirement Alignment

The landing page directly supports **FR-01** by presenting the WatchMate value proposition, featured movies, and AI chatbot entry point. The primary call-to-action directs users to the AI Movie Recommendation Chatbot (**FR-03**), while the secondary action allows users to browse trending movies and search the movie catalog (**FR-05** and **FR-06**). This ensures alignment with the system requirements defined in [/docs/system-requirements.md](/docs/system-requirements.md).


## Member Contributions

| Member Name | Role | Contribution | File / Feature Evidence |
|-------------|------|--------------|-------------------------|
| **Tar Yar Lin Latt** | Product Lead | Prepared the product concept, user persona, MVP feature planning, Go-to-Market strategy, marketing content, and validation documentation. | `docs/product-concept.md`, `docs/go-to-market-plan.md`, `docs/marketing-message.md`, `docs/user-persona.md` |
| **Bhone Myat Kyaw** | Technical Lead | Developed the AI chatbot, movie search, TMDB API integration, watchlist, chat history, authentication, homepage, admin dashboard and Power BI validation datasets. | `prototype/`, `server.js`, `js/`, `css/`, `database/` |
| **Htut Arkar Saing** | UX/UI & Documentation Lead | Designed the UI/UX wireframes, user flow diagram, system architecture, GitHub documentation, and weekly reports. | `wireframes/`, `diagrams/`, `docs/`, `README.md`, `data/` |

---

# Lab 13: Sales Scenario, Demo Script, and User Testing

## Lab 13 Objective

This lab focused on preparing the final presentation materials for the **WatchMate: AI Movie Recommendation System**. Our team completed the sales scenario, demo script, user testing plan, user testing results, and final improvement list to ensure the prototype is ready for the final demonstration in Lab 14.

## Files Completed

- [/docs/sales-scenario.md](/docs/sales-scenario.md)
- [/docs/demo-script.md](/docs/demo-script.md)
- [/docs/user-testing-plan.md](/docs/user-testing-plan.md)
- [/docs/user-testing-results.md](/docs/user-testing-results.md)
- [/docs/final-improvement-list.md](/docs/final-improvement-list.md)
- [/docs/weekly-logbook.md](/docs/weekly-logbook.md)

## Prototype / Demo Link

**Live Demo:**  
https://watchmate-mvp.up.railway.app/

**GitHub Repository:**  
https://github.com/BhoneMyatKyaw666/final-project

## Final Preparation Status

The **WatchMate** prototype is **ready for Lab 14**. All core MVP features have been implemented, including the AI movie recommendation chatbot, movie search, trending movies, movie detail pages, watchlist, user authentication, administrator dashboard, and analytics dashboard.

User testing was completed with **20 participants**, and the feedback was analyzed to identify usability improvements. Minor issues such as AI response speed, watchlist visibility, and filter usability have been addressed or documented for future enhancement.

The team has completed all required documentation, diagrams, screenshots, and testing evidence. The project is now ready for the final demonstration, evaluation, and Lab 14 presentation.

---

# Lab 14: Final Prototype Submission & Presentation

## Project Title
**WatchMate - AI Movie Recommendation System**

## Group Members

| Name | Role | Main Contribution | GitHub Evidence |
| --- | --- | --- | --- |
| **Tar Yar Lin Latt** (`taryarlinl66-sys`) | Product Lead | Co-authored the final pitch slides, prepared the Go-to-Market strategy, Business Model Canvas, acquisition metrics, sales scenario, final demo script, and presentation materials in `/pitch/` and `/docs/`. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=taryarlinl66-sys) |
| **Bhone Myat Kyaw** (`BhoneMyatKyaw666`) | Technical Lead | Co-authored the final pitch slides, finalized the AI Movie Recommendation System prototype, updated the prototype implementation, captured the final screenshots (`/screenshots/`), authored `docs/feature-implementation-status.md` and `docs/final-prototype-report.md`, and verified all functional requirements. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=BhoneMyatKyaw666) |
| **Htut Arkar Saing** (`htutarkar67`) | UX/UI Lead & Documentation Lead | Co-authored the final pitch slides, designed the user interface, prepared `docs/final-reflection.md`, `docs/final-submission-checklist.md`, `docs/user-testing-plan.md`, `docs/marketing-message.md`, `docs/landing-page-content.md`, maintained `docs/weekly-logbook.md`, updated `README.md`, and organized the final project documentation for submission. | [Commits](https://github.com/htutarkar67/ICT111-WatchMate-MVP/commits?author=htutarkar67) |

## Project Overview

WatchMate is an AI-powered movie recommendation system that helps users discover movies based on their personal preferences. Instead of spending time browsing through hundreds of titles on different streaming platforms, users can interact with an AI chatbot, select their favorite genres and preferences, and receive personalized movie recommendations. The system also provides movie details, search functionality, watchlist management, and recommendation history in an easy-to-use web interface.

## Target Users

- **Movie Lovers:** Receive personalized movie recommendations based on genres, moods, languages, and viewing preferences.
- **Students and Casual Viewers:** Quickly discover suitable movies without spending time searching multiple platforms.
- **Administrators:** Manage movie categories, recommendation data, and monitor overall system activity.

---

## Problem Statement

Many users spend too much time searching for movies across multiple streaming platforms and often struggle to decide what to watch. Generic recommendation lists may not match individual preferences, leading to decision fatigue. WatchMate addresses this problem by providing AI-generated personalized movie recommendations through an interactive chatbot and intelligent filtering system.

---

## Final Prototype Links

- **Prototype Folder:** [/prototype/project](/prototype/project)
- **Live Demo:** https://watchmate-mvp.up.railway.app

---

## Demo Accounts for Testing

| Account Type | Username / Email | Password | Access Role |
| :--- | :--- | :--- | :--- |
| **Student User** | `student@watchmate.com` | `password123` | Member |
| **Movie Enthusiast** | `movie@watchmate.com` | `password123` | Member |
| **Administrator** | `admin@watchmate.com` | `admin123` | Administrator |

---

## Final Documentation

- System Requirements: [/docs/system-requirements.md](/docs/system-requirements.md)
- User Stories: [/docs/user-stories.md](/docs/user-stories.md)
- MVP Feature List: [/docs/mvp-feature-list.md](/docs/mvp-feature-list.md)
- Feature Implementation Status: [/docs/feature-implementation-status.md](/docs/feature-implementation-status.md)
- Final Prototype Report: [/docs/final-prototype-report.md](/docs/final-prototype-report.md)
- Final Demo Script: [/docs/final-demo-script.md](/docs/final-demo-script.md)
- Final Reflection: [/docs/final-reflection.md](/docs/final-reflection.md)
- Final Submission Checklist: [/docs/final-submission-checklist.md](/docs/final-submission-checklist.md)

---

## Screenshots

- Homepage – [/screenshots/homepage.md](/screenshots/homepage.md)
- Login – [/screenshots/login.md](/screenshots/login.md)
- Register – [/screenshots/register.md](/screenshots/register.md)
- AI Chatbot – [/screenshots/ai-chatbot.md](/screenshots/ai-chatbot.md)
- Search Results – [/screenshots/search-results.md](/screenshots/search-results.md)
- Movie Detail – [/screenshots/movie-detail.md](/screenshots/movie-detail.md)
- Watchlist – [/screenshots/watchlist.md](/screenshots/watchlist.md)
- Chat History – [/screenshots/chat-history.md](/screenshots/chat-history.md)
- Admin Dashboard – [/screenshots/admin-dashboard.md](/screenshots/admin-dashboard.md)

---

## Pitch Materials

- Final Pitch Slides: [WatchMate-Group-presentation-slides](/pitch/presentation/WatchMate_presentation_slides.pdf)
- Demo Outline: [/pitch/demo-outline.md](/pitch/demo-outline.md)

---

## Data and Diagrams

### Data

- [/data/final-sample-data.csv](/data/final-sample-data.csv)
- [/data/final-testing-results.csv](/data/final-testing-results.csv)
- [/data/lab11-activity-log.csv](/data/lab11_activity_log.csv)
- [/data/lab11-prototype-records.csv](/data/lab11_prototype_records.csv)
- [/data/acquisition-metrics.csv](/data/acquisition-metrics.csv)
- [/data/channel-plan.csv](/data/channel-plan.csv)

### Diagrams

- [/diagrams/system-architecture.mmd](/diagrams/system-architecture.mmd)
- [/diagrams/final-demo-flow.mmd](/diagrams/final-demo-flow.mmd)
- [/diagrams/implementation-flow.mmd](/diagrams/implementation-flow.mmd)

---

## Final Submission Notes

The **WatchMate – AI Movie Recommendation System** prototype has been completed for the ICT111 Fundamental Technology Entrepreneurship course. The project includes the web prototype, screenshots, documentation, sample datasets, diagrams, marketing materials, testing documents, and presentation materials prepared for the final Lab 14 submission.

The prototype implements all required functional requirements and demonstrates the core features of an AI-powered movie recommendation system, including AI chatbot interaction, personalized recommendations, movie search, movie details, watchlist management, recommendation history, and administrator functions.
