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
| 6704756 | Htut Arkar Saing | UX/UI Lead | Design the user interface |
| 6709705 | Adisak Sengsouvanh | Documentation Lead | Maintain project documentation |

## Initial Problem Area
Many movie viewers experience difficulty finding movies that match their interests and preferences. The increasing number of movies available on streaming platforms often causes users to spend excessive time searching for content. Existing recommendation systems may not always provide personalized suggestions that align with users' specific tastes and viewing habits.

## Target Users
The primary target users are university students, young adults, and movie enthusiasts who regularly watch movies through online streaming platforms. These users are interested in discovering new movies quickly and receiving recommendations based on their personal preferences and favorite genres.

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
| Lab 1 | Lab setup and movie idea exploration | Repository, team profile, and initial venture idea | Completed |
| Lab 02 | Opportunity Scanning & Selection | Reviewed several project ideas, applied NUF scoring, and selected the Movie Recommendation System. | Completed |

## Current Status
During Lab 1, the team created the project repository, selected the Movie Recommendation System idea, identified the target users and problem area, and assigned team roles. The initial project structure was also prepared.

### Current Status

In Lab 02, our team evaluated multiple project ideas and used the NUF scoring method to compare them. Based on the results, we selected the **Movie Recommendation System** as our semester project.

### Next Step

In Lab 03, we will conduct customer discovery interviews to validate the problem and gather feedback from potential users.

| Lab    | Topic                        | Summary                                                                                                                                         | Status    |
| ------ | ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Lab 03 | Customer Discovery Workflows | Conducted customer interviews and surveys, validated user problems, and built an assumption-evidence table for the Movie Recommendation System. | Completed |

## Current Status

We have completed our customer discovery activities and collected feedback from university students, movie enthusiasts, and streaming platform users.

We validated that users often spend too much time searching for movies.
We confirmed that existing recommendation methods are not always personalized.
We identified that users value accurate recommendations more than complex features.

## Customer Problem Discovery Summary

In Lab 03, our team collected evidence from potential users to determine whether the movie recommendation problem is real and significant.

The interviews showed that many users struggle to find movies that match their interests because of the large number of available choices. Users frequently rely on friends, social media, review websites, and streaming platform suggestions, but these methods do not always provide relevant recommendations.

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
* Users want personalized suggestions: Respondents preferred recommendations based on their favorite genres, actors, and viewing preferences.
Updated Problem Statement

Movie viewers often struggle to find movies that match their interests because streaming platforms offer a large number of choices. Existing recommendation methods, including social media, online reviews, and platform-generated suggestions, are often time-consuming or insufficiently personalized. As a result, users experience frustration, decision fatigue, and difficulty discovering suitable movies.

Decision for Next Step

The team has decided to proceed with the current problem direction and continue developing the WatchMate Movie Recommendation System based on validated customer evidence.

# Lab 04: User Persona, Requirements, and User Stories

## Primary Target User

Movie viewers who have difficulty finding movies that match their preferences and spend too much time deciding what to watch.

---

## Persona Summary

**Persona Name:** Alex Tan

**User Type:** University student and frequent movie viewer

**Main Goal:** Receive personalized movie recommendations quickly through an AI chatbot.

**Main Pain Point:** Too many movie choices make it difficult and time-consuming to decide what to watch.

**Current Workaround:** Uses Netflix recommendations, Google searches, movie review websites, and asks friends for suggestions.

---

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

---

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

---

## Diagram Links

**User Flow Diagram:** [https://github.com/htutarkar67/ICT111-WatchMate-MVP/blob/main/diagrams/user-flow-diagram.md]

**Use Case Diagram:** [https://github.com/htutarkar67/ICT111-WatchMate-MVP/blob/main/diagrams/use-case-diagram.md]

---

## GitHub Contribution Evidence

#All members contributed to this repository through commits, issues, pull requests, documentation updates, prototype design activities, or requirement analysis tasks. Evidence can be viewed in the repository commit history and issue tracker.

# Lab 05: Product Concept and UI/UX Wireframe

## Product Concept

**WatchMate** is a web-based AI movie recommendation system that helps users discover movies and TV shows through natural conversations with an AI chatbot. Instead of spending a long time browsing streaming platforms or searching online, users can describe their preferences, favorite genres, mood, or similar movies, and the AI will generate personalized recommendations.

The system is designed for movie enthusiasts, students, and casual viewers who often struggle to decide what to watch. It solves the problem of information overload by providing fast, intelligent, and personalized movie suggestions in one platform.

---

## Requirement-Driven Screens

| Screen | Related Requirement IDs | Wireframe File |
|--------|--------------------------|----------------|
| Homepage / Landing | FR-01, FR-02 | `/wireframes/homepage.png` |
| AI Movie Recommendation Chatbot | FR-02, FR-03, FR-11 | `/wireframes/ai-chatbot.png` |
| Search Results | FR-04, FR-05 | `/wireframes/search-results.png` |
| Movie Detail View | FR-06 | `/wireframes/movie-detail.png` |
| Watchlist | FR-05 | `/wireframes/watchlist.png` |
| Chat History | FR-05 | `/wireframes/chat-history.png` |
| Admin Dashboard | FR-06, FR-12 | `/wireframes/admin-dashboard.png` |

---

## User Flow

The user begins on the **Homepage**, where they can browse trending movies or search for a specific title. Users can also open the **AI Movie Recommendation Chatbot** and enter their preferences, mood, favorite genre, or a movie they enjoyed. The AI chatbot analyzes the request and provides personalized movie recommendations. Users can then view detailed movie information, watch the trailer, and save movies to their watchlist. Logged-in users can access previous chatbot conversations through the chat history, while administrators can monitor chatbot usage and review user chat history through the admin dashboard.

**User Flow Diagram:** `/diagrams/user-flow.png`

---

## Team Contribution

All team members contributed to the development of **WatchMate** using the shared GitHub repository. Contributions included product concept development, user persona creation, system requirements, user stories, MVP feature planning, UI/UX wireframe design, user flow design, clickable prototype development, documentation updates, commits, issues, and pull requests.

