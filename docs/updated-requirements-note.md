# Updated Requirements Note

## Purpose
Document requirement updates resulting from security, privacy, and usability reviews for the **WatchMate - AI Movie Recommendation System**.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-03 | Users can interact with the AI chatbot to request movie recommendations. | The chatbot must validate user input, display a loading indicator, and provide example prompts for first-time users before generating recommendations. | Usability testing showed new users were unsure how to begin conversations with the AI chatbot. | Lab 08 Customer Validation Results, `docs/test-user-notes.md` | Issue #63 / Issue #64 | Yes |
| FR-04 | Users can search for movies by title, genre, or keyword. | The search feature must provide autocomplete suggestions, genre filters, and validate search input before displaying results. | User feedback indicated that search suggestions and filters would improve usability and efficiency. | Lab 08 Analytics Insights, `data/validation-results.csv` | Issue #65 | Yes |
| FR-06 | Users can view detailed movie information. | The movie detail page must clearly display ratings, genres, streaming platforms, trailers, and explain why the movie was recommended. | Validation results showed users wanted more complete movie information and recommendation transparency. | Lab 08 Customer Validation Summary | Issue #66 | Yes |
| FR-12 | Administrators can access analytics and manage movie data. | Administrator features must be protected using role-based access control (RBAC), and analytics pages must be inaccessible to normal users. | Security and privacy review identified administrator access as a high-risk area requiring stronger protection. | `docs/basic-security-risk-check.md`, `docs/legal-ethical-checklist.md` | Issue #64 / Issue #67 | Yes |

## Rule

Do not silently change system requirements. Every requirement update must be documented, justified, supported by validation or security evidence, and tracked through GitHub Issues or commits.
