# Updated Requirements Note

## Purpose
Document requirement updates resulting from security, privacy, and usability reviews for the **WatchMate - AI Movie Recommendation System**.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-03 | Users can interact with the AI chatbot to request movie recommendations. | The chatbot must provide example prompts, validate user input, and display a loading indicator before showing AI recommendations. | User testing showed that first-time users needed guidance and clearer feedback while waiting for recommendations. | Lab 08 Customer Validation, Test User Notes | Issue #38 | Yes |
| FR-04 | Users can search for movies by title, genre, or keyword. | The search feature should provide autocomplete suggestions and genre filters to improve search efficiency. | Validation feedback indicated users expected search suggestions and better filtering options. | Lab 08 Analytics Insights | Issue #38 | Yes |
| FR-06 | Users can view detailed movie information. | The movie detail page should display recommendation reasons, streaming platforms, ratings, genres, and trailers more clearly. | Users requested more information to understand why movies were recommended and where to watch them. | Lab 08 Customer Validation Summary | Issue #41 | Yes |
| FR-12 | Administrators can access analytics and manage movie data. | Administrator dashboard access must be protected using role-based access control (RBAC) so only authorized administrators can access analytics and management features. | Security review identified administrator access protection as a high-priority improvement. | Basic Security Risk Check, Legal & Ethical Checklist | Issue #38 / Issue #40 | Yes |

## Rule

Do not silently change system requirements. Every requirement change must be documented, justified, supported by validation or security evidence, and linked to the related GitHub Issue or commit.
