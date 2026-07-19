# Data Handling Policy

## Data Collection

The prototype collects only the information necessary to provide personalized movie recommendations and improve the user experience.

| Data Field | Required | Purpose |
|-------------|:--------:|---------|
| Username | Yes | Identify the user account |
| Email Address | Yes | User login and account notifications |
| Movie Preferences | Yes | Generate personalized movie recommendations |
| Favorite Genres | Yes | Improve recommendation accuracy |
| Chatbot Conversation | Optional | Enhance AI responses and recommendation quality |
| Watchlist | Optional | Save movies for future viewing |
| Search History | Optional | Improve future recommendations and search results |
| Feedback Rating | Optional | Evaluate recommendation quality and improve the AI model |

---

## Data Storage

User information is stored using a simulated data source suitable for the prototype.

| Storage Method | Usage |
|----------------|-------|
| JSON Sample Dataset | Stores sample user profiles and movie information for demonstration |
| Browser `localStorage` | Saves user preferences, watchlist, and chat history locally during testing |
| Firebase / Cloud Database | Optional storage for future full-system implementation |

> **Note:** This prototype is developed for academic demonstration purposes only. All stored data is sample or simulated and is not intended for production use.

---

## Data Access

| User Role | Permissions |
|-----------|-------------|
| User | View movie recommendations, search movies, manage watchlist, and view chat history |
| Administrator | View system analytics, manage movie data, and monitor chatbot performance |
| Visitor (if allowed) | Browse public movie information without personalized recommendations |

---

## Data Minimization

To protect user privacy, the prototype minimizes personal data collection by:

- Using a unique User ID instead of displaying personal identifiers whenever possible.
- Storing only the minimum information required to provide personalized recommendations.
- Keeping email addresses visible only to authorized administrators.
- Allowing users to delete their watchlist and chatbot conversation history.
- Not collecting unnecessary sensitive information such as:
  - National ID or Passport Number
  - Home Address
  - Date of Birth
  - Financial or Payment Information

---

## Responsible Data Rule

The prototype follows responsible data handling practices by:

- Gathering only the data necessary for movie recommendations.
- Using synthetic or masked data during demonstrations whenever possible.
- Avoiding unnecessary sensitive personal data.
- Restricting data modification to authorized personnel and administrators.
- Clearly notifying users how their data is used to generate personalized recommendations.
- Using collected data only for academic purposes as part of the ICT105 project.
