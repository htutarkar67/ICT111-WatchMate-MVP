# Legal and Ethical Checklist

## Project Title
**WatchMate** - AI Movie Recommendation System

## Ethical Review

| Check Item | Yes/No | Evidence / Notes | Mitigation Action | Owner | GitHub Issue/Commit |
|---|---|---|---|---|---|
| Users are informed about the purpose of the prototype. | **Yes** | A notice on the homepage explains that WatchMate is an academic AI movie recommendation prototype. | None required; keep the notice visible on the landing page. | Product Lead | `#41` |
| The prototype avoids misleading claims. | **Yes** | The interface states that movie recommendations are AI-generated suggestions and may not always match user preferences. | Continue displaying a disclaimer that recommendations are suggestions only. | Product Lead | `#41` |
| The prototype does not collect unnecessary sensitive data. | **Yes** | Only username, email, and movie preferences are collected. National ID, home address, and payment information are not requested. | Continue following the data minimization policy. | UX Lead | `#38` |
| Users can understand what happens after submitting a request. | **No** | The chatbot currently provides recommendations without indicating how the suggestions are generated or when processing is complete. | Add a loading indicator and a short explanation that recommendations are generated based on user preferences. | Frontend Developer | `#38` |
| Administrator actions are clearly separated from user actions. | **Yes** | Analytics and movie management features are available only through the administrator dashboard. | Implement role-based access control (RBAC) for administrator functions. | Backend Developer | `#38/#40` |
| The prototype avoids unfair or harmful treatment of users. | **Yes** | Recommendations are generated from user preferences and trending movies without considering personal characteristics such as age, gender, or nationality. | Regularly review recommendation quality and monitor for potential AI bias. | AI Developer | `#38` |

## Summary Decision

- **Safe to continue:** **With revision**

- **Required revision before implementation:**
  1. Add a loading indicator and explain how AI recommendations are generated (`#63`).
  2. Implement role-based access control (RBAC) for administrator functions (`#64`).
  3. Review and monitor AI recommendation bias to ensure fair recommendations for all users (`#66`).
