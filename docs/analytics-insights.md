# Lab 08 - Analytics Insights

## 1. Analytics Question

What did users do, say, and prove when testing the WatchMate MVP?

## 2. Metrics Calculated

| Metric | Formula / Method | Result |
|---|---|---|
| Total test users | Count testers (T001 - T020 dataset) | 20 Testers (T001 - T020) |
| Completed tasks | Count TaskCompleted = Yes | 20 / 20 (100.00%) |
| Task success rate | Completed tasks / total testers | 100.00% |
| Average ease of use score | Average of EaseOfUseScore (1-5) | 4.65 / 5.0 |
| MVP decision signal | Percentage of "Keep" vs "Improve" decisions | 80% Keep, 20% Improve |
| Most useful feature | Count user selections | AI Chatbot (Highest), followed by Movie Search, Movie Details, Chat History, Watchlist, Trending Movies, User Login, Trailer Feature, and Admin Dashboard |
| Confusion points | Count repeated confusion categories | None (Majority), Minor delay (4 testers) |

---

## 3. Findings

1. **Excellent Task Completion and Ease of Use:** All 20 testers successfully completed their assigned tasks, resulting in a **100% task success rate**. Users found WatchMate easy to use, achieving an average ease-of-use score of **4.65 out of 5**, demonstrating that the interface is intuitive and user-friendly.

2. **AI Chatbot Was the Most Valuable Feature:** The AI chatbot received the highest number of positive responses and was considered the most useful feature. Users appreciated receiving personalized movie recommendations through natural language conversations instead of manually browsing large movie collections.

3. **Minor Navigation Improvements Are Needed:** Although testers completed every task successfully, a few experienced minor delays when navigating between Chat History, Trending Movies, and Movie Details. These observations indicate opportunities to improve navigation and provide better guidance for first-time users.

---

## 4. Interpretation

The validation results strongly support the WatchMate MVP. The **100% task completion rate**, **4.65/5 average ease of use**, and **80% "Keep" MVP decision signal** indicate that users clearly understood how to use the prototype and found value in its AI-powered recommendation system.

The remaining **20% "Improve"** feedback focuses mainly on usability enhancements rather than functional problems. Users suggested clearer chatbot prompts, smoother navigation between pages, and additional explanations for why movies were recommended. These improvements will further enhance the overall user experience without changing the core MVP direction.

---

## 5. Requirements Affected

| Requirement ID | Evidence | Action Needed |
|---|---|---|
| **FR-03** | Users successfully received AI movie recommendations, but several requested example chatbot prompts. | Add suggested prompts and conversation examples for first-time users. |
| **FR-04** | All testers successfully searched for movies by title with minimal difficulty. | Improve search by adding autocomplete and smarter keyword suggestions. |
| **FR-05** | Personalized recommendations were highly valued by users. | Display brief explanations showing why each movie is recommended. |
| **FR-06** | Movie detail pages were completed successfully and users appreciated the available information. | Improve the presentation of ratings, genres, trailers, and streaming platforms. |
| **FR-12** | Administrators successfully viewed dashboard analytics but suggested clearer data visualization. | Improve dashboard charts, labels, and analytics presentation. |

---

## 6. Next Prototype Improvement

1. **Improve AI Chatbot Guidance (FR-03):** Add recommended prompts and example questions to help new users begin conversations with the chatbot.

2. **Enhance Movie Search (FR-04):** Implement autocomplete and improve keyword matching for faster movie searches.

3. **Explain Personalized Recommendations (FR-05):** Show a short explanation describing why each movie is recommended based on the user's preferences.

4. **Improve Movie Detail Presentation (FR-06):** Highlight ratings, genres, streaming platforms, trailers, and other important information using a clearer layout.

5. **Enhance Dashboard Analytics (FR-12):** Improve dashboard charts, labels, and navigation so administrators can monitor chatbot usage more efficiently.
