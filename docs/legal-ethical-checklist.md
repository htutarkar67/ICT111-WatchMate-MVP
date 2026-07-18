# Legal and Ethical Checklist

## Project Title
**WatchMate** - AI Movie Recommendation System

## Ethical Review

| Check Item | Yes/No | Evidence / Notes | Mitigation Action | Owner | GitHub Issue/Commit |
|---|---|---|---|---|---|
| Users are informed about the purpose of the prototype. | **Yes** | The homepage clearly explains that WatchMate provides AI-powered movie recommendations based on user preferences. | None required; keep the project description visible on the landing page. | Product Owner | `#issue-101` |
| The prototype avoids misleading AI claims. | **Yes** | The chatbot recommends movies based on user input and does not claim that recommendations are always accurate or personalized by human experts. | Continue displaying a disclaimer that recommendations are AI-generated suggestions. | QA Tester | `#commit-a12b3c` |
| The prototype does not collect unnecessary personal data. | **Yes** | Users only enter movie preferences or chat prompts. Sensitive personal information is not required. | Maintain minimal data collection and avoid storing unnecessary user information. | Data Manager | `#commit-b45d6e` |
| Users can understand how recommendations are generated. | **No** | Some testers were unsure why specific movies were recommended. | Add a short explanation such as "Recommended because you like Action and Sci-Fi movies." | Frontend Developer | `#issue-112` |
| Administrator features are separated from normal user features. | **Yes** | The administrator dashboard for monitoring chatbot usage is separated from the user interface. | Continue restricting administrator access through role-based authentication. | Full Stack Developer | `#issue-118` |
| The prototype avoids harmful or inappropriate recommendations. | **Yes** | The recommendation list excludes offensive or inappropriate content and focuses on general entertainment. | Continue reviewing recommendation results and apply content filtering when necessary. | AI Developer | `#commit-c78d9f` |

## Summary Decision

- **Safe to continue:** **With minor revision**

- **Required revision before implementation:**
  1. Add explanations for why each movie is recommended to improve user trust (`#issue-112`).
  2. Continue strengthening role-based access control for the administrator dashboard (`#issue-118`).
