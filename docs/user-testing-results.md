# User Testing Results

## 1. Testing Summary

- **Date:** 28 July 2026
- **Number of testers:** 20 users
- **Prototype link:** https://watchmate-mvp.up.railway.app/
- **Testing location/platform:** Web application tested on Google Chrome and Microsoft Edge using desktop and mobile devices.

---

## 2. Task Completion Summary

| Task ID | Task | Completed? | Main Issue Found | Evidence / Comment |
| --- | --- | --- | --- | --- |
| T01 | Understand the homepage and project purpose | Yes | None | Users quickly understood the purpose of WatchMate and how to start using the AI chatbot. |
| T02 | Ask the AI chatbot for movie recommendations | Partial | AI response was occasionally slower than expected | Most users received useful recommendations, but some experienced slight response delays. |
| T03 | Search for a movie by title | Yes | None | Users successfully searched for movies with minimal confusion. |
| T04 | Browse movies using genre filters | Partial | Genre filters were not immediately noticeable | Several users suggested making the filter section more visible. |
| T05 | View movie details and watch trailers | Yes | Trailer loading delay on slower connections | Users appreciated the detailed movie information and trailers. |
| T06 | Save a movie to the watchlist | Partial | Watchlist button was difficult to locate | Users recommended placing the button closer to the main action area. |
| T07 | Continue previous AI conversation after login | Yes | None | Logged-in users successfully accessed their chat history. |
| T08 | Administrator views user chat history | Yes | Search/filter options missing | Admin users requested additional filtering features for chat history. |

---

## 3. Common Usability Issues

| Issue ID | Issue Description | Severity | Related Requirement | Proposed Fix |
| --- | --- | --- | --- | --- |
| UI-01 | AI chatbot responses occasionally take longer than expected. | Important | FR-03 | Optimize AI requests and improve loading indicators. |
| UI-02 | Homepage layout is not fully responsive on small mobile screens. | Critical | FR-01, FR-14 | Improve responsive layout and mobile navigation. |
| UI-03 | Watchlist button is difficult to locate on the movie detail page. | Important | FR-05 | Increase button visibility and move it near the primary action buttons. |
| UI-04 | Genre and filter options are not immediately noticeable. | Important | FR-06 | Redesign the filter panel using clearer labels and icons. |
| UI-05 | Dashboard analytics do not automatically refresh after new chatbot sessions. | Useful | FR-12 | Implement automatic dashboard refresh using real-time updates. |

---

## 4. User Feedback Summary

Overall, users found the AI chatbot easy to use and appreciated receiving personalized movie recommendations. The movie search function, trending movie section, and detailed movie information were considered the most useful features. Several users suggested improving the visibility of the watchlist button, making genre filters easier to find, and reducing AI response time. Administrator users also requested additional search and filtering options when viewing user chat history.

---

## 5. Evidence-Based Decision

**Decision:**  Ready for final improvement

The prototype successfully demonstrates all core MVP features, including AI-powered movie recommendations, movie search, movie details, watchlist functionality, user authentication, and administrator chat history management. User testing identified only minor usability improvements that can be completed before the final presentation. No critical functionality prevents users from completing the main workflow, making the system ready for final refinement before Lab 14.
