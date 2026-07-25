# Startup / Product Metrics

> Define metrics that show useful product activity. Metrics should not be random numbers. Each metric should help the team understand usage, value, recommendation quality, user engagement, validation, or system performance.

## 1. Metrics Summary

| Metric ID | Metric Name | Metric Type | Why This Metric Matters | Formula / How to Calculate | Data Source | Prototype Screen |
|---|---|---|---|---|---|---|
| M-01 | Total Recommendation Requests | Usage | Measures how frequently users request AI movie recommendations. | Count of all recommendation requests | Recommendation history | Recommendation Page |
| M-02 | Movies Recommended | Usage | Measures the total number of movies recommended by the AI system. | Count of recommended movies displayed | Recommendation results | Recommendation Results |
| M-03 | Favorite Movies Saved | Engagement | Tracks how many recommended movies users save to their Favorites list. | Count of favorite movies | Favorites data | Favorites Page |
| M-04 | Watchlist Growth | Engagement | Measures how many movies users add to their Watchlist. | Count of watchlist entries | Watchlist data | Watchlist Page |
| M-05 | Search Success Rate | Usability | Evaluates how successfully users find movies using search and filters. | (Successful Searches ÷ Total Searches) × 100 | Search history | Search Page |
| M-06 | Genre Distribution | Insights | Identifies the movie genres most frequently recommended or selected. | Count of recommendations grouped by genre | Movie dataset | Recommendation Results |
| M-07 | Average Recommendation Rating | Validation | Measures user satisfaction with AI-generated recommendations. | Sum of recommendation ratings ÷ Total ratings | User ratings | Movie Details |
| M-08 | Recommendation Acceptance Rate | Validation | Measures how often users choose or save an AI-recommended movie. | (Accepted Recommendations ÷ Total Recommendations) × 100 | Recommendation history | Recommendation Results |
| M-09 | Recommendation Processing Time | Performance | Measures how quickly the recommendation system generates results. | Average recommendation response time | Recommendation engine | Recommendation Results |
| M-10 | User Return Rate | Retention | Measures how many users return to use the system again. | (Returning Users ÷ Total Users) × 100 | User activity logs | Home Page |
| M-11 | Most Popular Genre | Insights | Identifies the genre most frequently viewed or recommended. | Count of recommendations by genre | Recommendation history | Recommendation Results |

---

## 2. Metrics Interpretation

### Core Validation Signals & Product-Market Fit

Customer validation testing (Lab 08) conducted with **20 participants** showed positive feedback toward the WatchMate AI Movie Recommendation System.

- **Recommendation Acceptance Rate (M-08)** reached **82.00%**, indicating that most users selected or saved at least one AI-recommended movie.
- **Average Recommendation Rating (M-07)** was **4.4 / 5.0**, showing high satisfaction with the recommendation quality.
- **Task Completion Rate (M-05)** exceeded **85.00%**, meaning users were able to search for movies, receive recommendations, and save favorites without difficulty.

These results suggest that users find the AI recommendation process useful, easy to understand, and valuable for discovering movies that match their preferences.

### Usability Bottlenecks & Friction Points

Although overall feedback was positive, several usability issues were identified during testing.

- **Search Accuracy:** Some users expected more specific recommendations when entering very short keywords.
- **Recommendation Explanation:** Users wanted a brief explanation of why each movie was recommended.
- **Filter Visibility:** Genre and year filters were not immediately noticeable on smaller mobile screens.
- **Loading Feedback:** Some users expected a loading animation while AI recommendations were being generated.

### User Behavior Insights

Prototype usage data indicates that users frequently explored multiple movie genres before selecting a recommendation.

- **Action** and **Science Fiction** were the most frequently recommended genres.
- Most users viewed **3–5 movie recommendations** before choosing a movie to save.
- The **Favorites** feature was used more often than the **Watchlist**, indicating that users preferred saving movies they intended to watch later.

These insights help the development team understand user preferences and improve future recommendation quality.

### Sprint 2 Action Plan Based on Metrics

Based on the evaluation results, the following improvements were identified for the next sprint:

1. **Improve Recommendation Accuracy (FR-05):** Enhance the recommendation algorithm by considering multiple user preferences such as genre, mood, and language.
2. **Add Recommendation Explanation (FR-06):** Display short AI-generated reasons explaining why each movie is recommended.
3. **Enhance Mobile User Experience (FR-08):** Improve responsive layouts and make search filters easier to access on mobile devices.
4. **Optimize Recommendation Performance (FR-07):** Reduce recommendation processing time and add a loading indicator while recommendations are being generated.
5. **Expand Movie Database (FR-03):** Increase the number of available movies to provide more diverse recommendations.

---

## 3. Link to Final Prototype

These product metrics are collected, displayed, and updated throughout the WatchMate AI Movie Recommendation System to evaluate user engagement, recommendation quality, and system performance.

| Metric ID & Name | Prototype View | Source Code & Data Logic | Interactive UI Demonstration |
|---|---|---|---|
| **M-01: Total Recommendation Requests** | `Home`, `Recommendation Page` | Recommendation history data | Displays the total number of recommendation requests submitted by users. |
| **M-02: Movies Recommended** | `Recommendation Results` | AI recommendation engine | Shows the total number of movies recommended based on user preferences. |
| **M-03: Favorite Movies Saved** | `Favorites` | Favorites database | Updates automatically whenever a user saves or removes a favorite movie. |
| **M-04: Watchlist Growth** | `Watchlist` | Watchlist data | Displays the number of movies added to the user's watchlist. |
| **M-05: Search Success Rate** | `Search Page` | Search history | Calculates successful movie searches compared with total searches. |
| **M-06: Genre Distribution** | `Recommendation Results` | Movie recommendation dataset | Shows the percentage of recommendations for each movie genre. |
| **M-07: Average Recommendation Rating** | `Movie Details` | User rating data | Calculates the average user rating for AI-generated recommendations. |
| **M-08: Recommendation Acceptance Rate** | `Recommendation Results` | Recommendation history | Measures how often users accept or save AI recommendations. |
| **M-09: Recommendation Processing Time** | `Recommendation Results` | Recommendation engine | Displays the average time required to generate recommendations. |
| **M-10: User Return Rate** | `Home` | User activity logs | Tracks the percentage of users who return to use WatchMate again. |
| **M-11: Most Popular Genre** | `Recommendation Results` | Recommendation history | Identifies the movie genre most frequently viewed or recommended. |

### Data Storage & Recommendation Processing

- **Client-Side Storage:** User preferences, favorites, watchlist, and recommendation history are stored using browser storage during prototype testing.
- **AI Recommendation Engine:** Movie recommendations are generated based on user-selected genres, moods, ratings, and other preference inputs.
- **Validation Data:** User feedback, recommendation ratings, and usability testing results are stored in the project dataset and summarized in the validation documents.
