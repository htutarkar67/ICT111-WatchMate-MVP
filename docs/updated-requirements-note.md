# Updated Requirements Note

## Purpose
Document requirement updates resulting from security, privacy, and usability reviews for the **WatchMate - AI Movie Recommendation System**.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-03 | Users can interact with the AI chatbot to receive movie recommendations. | The AI chatbot must validate user input, display a loading indicator while generating recommendations, and provide example prompts for first-time users. | Usability testing showed that users needed clearer guidance and feedback when using the chatbot. | `docs/user-consent-statement.md`, `docs/legal-ethical-checklist.md` | Issue #38 | Yes |
| FR-04 | Users can search for movies by title, genre, or keyword. | The search feature must provide autocomplete suggestions, genre filters, and validate search input before displaying results. | Customer validation showed users expected faster searching and improved filtering options. | `docs/customer-validation-summary.md`, `data/validation-results.csv` | Issue #38 | Yes |
| FR-06 | Users can view detailed movie information. | The movie detail page must display recommendation reasons, ratings, genres, streaming platforms, and trailers in a clear layout. | User feedback indicated that additional movie information would improve decision-making and trust in AI recommendations. | `docs/customer-validation-summary.md`, `docs/analytics-insights.md` | Issue #41 | Yes |
| FR-12 | Administrators can manage movie data and view analytics. | Administrator functions must be protected with role-based access control (RBAC), allowing only authorized administrators to access analytics and management features. | Security and privacy reviews identified administrator access control as a high-priority improvement. | `docs/basic-security-risk-check.md`, `docs/legal-ethical-checklist.md` | Issue #38 / Issue #40 | Yes |

## Rule

Do not silently change system requirements. Every change must be justified, documented, and traceable.
