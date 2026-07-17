# Lab 08 - Customer Validation Summary

## 1. Project Title
WatchMate – AI Movie Recommendation System

## 2. Prototype Tested

- **Prototype version:** v1
- **Prototype link or screenshot location:** `screenshots/project-dashboard.png`
- **Main task tested:** Asking the AI chatbot for movie recommendations, searching movies by title, browsing recommended movies, viewing movie details, and monitoring chatbot usage through the admin dashboard.
- **Related requirements from `system-requirements.md`:** FR-03, FR-04, FR-05, FR-06, FR-12

## 3. Test Users

| Test User ID | User Role | Why this user is relevant |
|---|---|---|
| U001 – U017, U020 | Student | Primary target users seeking personalized movie recommendations. |
| U018 – U019 | Movie Enthusiast | Evaluates recommendation quality and movie information. |
| U010 | Administrator | Evaluates dashboard analytics and chatbot monitoring features. |

## 4. Validation Method

- **Testing method:** Scenario-based usability testing on mobile, laptop, and desktop devices.
- **Date/time:** July 20 – 24, 2026
- **Location or online platform:** Online prototype usability testing.
- **Number of testers:** 20 Test Users (T001 – T020)
- **Data collected:** Task completion status, completion time, ease of use score (1–5), usefulness score (1–5), confusion points, interest level (1–5), and qualitative user feedback.

## 5. Summary of Results

| Metric | Result | Interpretation |
|---|---:|---|
| Total test users | 20 | Complete sample evaluating the core WatchMate features. |
| Task success rate | 100.00% | All testers successfully completed their assigned tasks. |
| Average ease of use | 4.65 / 5.0 | Users found the prototype easy and intuitive to use. |
| MVP decision signal | 80% Keep, 20% Improve | Most users supported the current MVP direction while suggesting minor improvements. |
| Most common confusion point | AI chatbot prompts and navigation between Chat History and Trending Movies | Minor usability improvements are needed for first-time users. |

## 6. Key User Comments

- **AI Chatbot (FR-03):** *"The chatbot provided useful movie recommendations,"* but several users suggested adding example prompts for first-time users.
- **Movie Search (FR-04):** *"Searching by movie title was fast and accurate,"* although some users requested autocomplete suggestions.
- **Movie Recommendations (FR-05):** Users appreciated the personalized recommendations but wanted a short explanation of why each movie was suggested.
- **Movie Details (FR-06):** Users found the ratings, genres, and trailers helpful, but suggested highlighting important information more clearly.
- **Admin Dashboard (FR-12):** Administrators found the dashboard useful for monitoring chatbot usage but recommended improving the visualization of analytics.

## 7. Affected Requirements

| Requirement ID | Evidence Found | Required Prototype Improvement |
|---|---|---|
| FR-03 | Users successfully received AI movie recommendations but requested example prompts. | Add suggested prompts and improve chatbot guidance for new users. |
| FR-04 | Users completed movie searches successfully but requested smarter search suggestions. | Add autocomplete and improve keyword matching. |
| FR-05 | Personalized recommendations were well received, but users wanted recommendation explanations. | Display a brief explanation for each recommended movie. |
| FR-06 | Movie details were useful, but important informations could be emphasized better. | Improve the layout of ratings, genres, trailers, and streaming information. |
| FR-12 | Administrators successfully monitored chatbot activity but requested clearer dashboard analytics. | Improve dashboard charts and analytics visualization. |

## 8. Conclusion

The current MVP direction is **validated** through positive user feedback and a **100% task success rate**. Overall, users found WatchMate easy to use and valuable for discovering movies through AI-powered recommendations. The team will continue with **minor revisions**, focusing on improving chatbot guidance, movie search, recommendation explanations, movie detail presentation, and dashboard analytics before the next development phase.
