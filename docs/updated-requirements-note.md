# Updated Requirements Note

## Purpose
Document requirement updates resulting from security, privacy, and usability reviews for the **WatchMate - AI Movie Recommendation System**.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-03 | Users can interact with the AI chatbot to receive movie recommendations. | The AI chatbot must display example prompts, validate user input, and show a loading indicator while generating recommendations. | Usability testing showed that first-time users needed guidance and clearer feedback during recommendation generation. | `docs/customer-validation-summary.md`, `docs/test-user-notes.md` | Issue #38 | Yes |
| FR-04 | Users can search for movies by title, genre, or keyword. | The search feature must include autocomplete suggestions and genre filters to improve search accuracy and efficiency. | Lab 08 usability testing found that users expected search suggestions and additional filtering options. | `docs/analytics-insights.md`, `data/validation-results.csv` | Issue #38 | Yes |
| FR-06 | Users can view detailed information about recommended movies. | The movie detail page must clearly display ratings, genres, streaming platforms, trailers, and explain why each movie is recommended. | Customer validation showed users wanted more detailed information before deciding what to watch. | `docs/customer-validation-summary.md` | Issue #41 | Yes |
| FR-12 | Administrators can manage movie data and view system analytics. | Administrator dashboard access must be protected using role-based access control (RBAC), allowing only authorized administrators to access analytics and management features. | Security and ethical reviews identified administrator access control as a high-priority improvement. | `docs/security-risk-check.md`, `docs/legal-ethical-checklist.md` | Issue #38 / Issue #40 | Yes |

## Rule

Do not silently change system requirements. Every requirement update must be justified, documented, supported by validation or security evidence, and linked to the related GitHub Issue or commit.
