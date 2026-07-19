# Risk Register

## Project Title
**WatchMate** - AI Movie Recommendation System

| Risk ID | Category | Risk Description | Affected Feature / Requirement | Severity | Likelihood | Mitigation Action | Owner | GitHub Evidence | Status |
|---|---|---|---|---|---|---|---|---|---|
| R-01 | Privacy | Users may enter personal information while chatting with the AI chatbot. | AI Chatbot (FR-03) | High | Medium | Display a privacy notice and advise users not to share sensitive personal information in chat. | WatchMate Team | `/docs/privacy.md` | Open |
| R-02 | Ethical | The AI chatbot may generate inaccurate or unsuitable movie recommendations. | AI Movie Recommendation (FR-03, FR-05) | Medium | Medium | Add content moderation and display a disclaimer that recommendations are AI-generated suggestions. | WatchMate Team | `/docs/risk-register.md` | Open |
| R-03 | Intellectual Property | Movie posters, trailers, or descriptions may be used without proper authorization. | Movie Details (FR-06) | High | Medium | Use licensed APIs and properly attribute all movie information and media sources. | WatchMate Team | `/README.md` | Open |
| R-04 | Security | Unauthorized users may gain access to the administrator dashboard and analytics. | Administrator Dashboard (FR-12) | High | Medium | Implement user authentication, role-based access control, and secure session management. | WatchMate Team | `/docs/security.md` | In Progress |
| R-05 | Legal | Collecting user information without consent may violate privacy regulations. | User Registration and Chat History | High | Low | Obtain user consent before collecting personal information and clearly explain how data is stored and used. | WatchMate Team | `/docs/consent.md` | Open |
| R-06 | Data Quality | AI recommendations may become outdated or inconsistent if movie data is incomplete or not updated. | Movie Search & Recommendations (FR-04, FR-05) | Medium | Medium | Regularly update movie datasets and validate recommendation results before displaying them. | WatchMate Team | `/docs/validation.md` | In Progress |

---

# Overall Risk Decision

The **WatchMate MVP prototype** is **safe to continue developing** because the identified risks are manageable and do not prevent further usability testing or prototype evaluation.

Before implementation, the project team should:

1. Display a privacy notice and advise users not to share sensitive information in AI conversations.
2. Add content moderation and recommendation disclaimers for AI-generated responses.
3. Use licensed movie data sources and provide proper attribution.
4. Implement secure authentication and role-based access control for the administrator dashboard.
5. Obtain user consent before collecting or storing chat history and personal information.
6. Regularly update movie data to improve recommendation quality and accuracy.

Once these mitigation measures are implemented, the WatchMate prototype will be more secure, reliable, and suitable for deployment.
