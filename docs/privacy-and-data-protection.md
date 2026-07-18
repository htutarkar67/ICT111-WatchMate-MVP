# Privacy and Data Protection

## Data Collection Summary

| Data Field | Why It Is Needed | Personal Data? | Sensitive Data? | Keep / Remove / Replace | Notes |
|---|---|---|---|---|---|
| **Username / Display Name** | Personalize the user experience and identify chat history | Yes | No | **Keep** | Users may choose a display name instead of using their real name. |
| **Email Address** | User login, account recovery, and notifications | Yes | No | **Keep** | Store securely and encrypt where possible. |
| **Chat Prompts** | Generate personalized movie recommendations | Yes | No | **Keep** | Use only to improve recommendations and avoid storing unnecessary personal information. |
| **Watchlist** | Save users' favorite movies for future viewing | No | No | **Keep** | Essential for providing a personalized experience. |
| **Date of Birth** | Originally considered for age-based recommendations | Yes | No | **Remove** | Not required for the MVP; users can choose content preferences instead. |

## Privacy Rule for Prototype

This prototype collects only the minimum information necessary to provide personalized movie recommendations. User data includes a display name or username, email address for authentication, chat prompts entered into the AI chatbot, and optional watchlist information. Chat history and recommendation data are visible only to the individual user, while administrators can access system analytics without viewing unnecessary personal information. The prototype avoids collecting sensitive personal data and follows the principle of data minimization.

## Data Minimization Decision

- **Removed:** `Date of Birth` and other unnecessary personal information are not collected in the prototype.
- **Changed:** Users are encouraged to use a **Username/Display Name** instead of their real full name to reduce personal data exposure.
- **Kept:** `Email Address`, `Chat Prompts`, and `Watchlist` because they are required for authentication and providing personalized movie recommendations.
