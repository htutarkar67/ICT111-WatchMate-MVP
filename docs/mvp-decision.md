# Lab 08 - MVP Decision

## 1. Decision

- [x] Continue with the current MVP direction
- [ ] Continue with minor revisions
- [ ] Revise major workflow or feature
- [ ] Collect more evidence before implementation
- [ ] Pivot or change the solution direction

---

## 2. Evidence Supporting the Decision

The validation data from **20 test runs (T001–T020)** provides strong evidence for **continuing with the current MVP direction**:

- **Excellent Task Completion:** All **20 testers successfully completed** their assigned tasks, resulting in a **100% task success rate**.
- **High Ease of Use:** Users rated the prototype highly with an average **Ease of Use score of 4.65/5.0**, indicating that the interface is intuitive and easy to navigate.
- **Positive MVP Signal:** The dashboard shows an **80% "Keep"** decision signal and only **20% "Improve"**, demonstrating that users support the current product direction.
- **Minor Improvement Areas:** Feedback mainly focused on enhancing chatbot guidance, improving navigation, and providing more detailed movie recommendation explanations rather than changing the core functionality.

---

## 3. Requirements to Keep

| Requirement ID | Reason |
|---|---|
| FR-03 | Users successfully interacted with the AI chatbot and received personalized movie recommendations with high satisfaction. |
| FR-04 | Movie search functionality was fast, accurate, and easy for users to use. |
| FR-05 | Personalized movie recommendations were considered valuable and relevant to user preferences. |
| FR-06 | Movie detail pages clearly presented essential information such as ratings, genres, and trailers. |
| FR-12 | The administrator dashboard successfully displayed chatbot usage and validation analytics. |

---

## 4. Requirements to Improve

| Requirement ID | Problem Found | Improvement Needed |
|---|---|---|
| FR-03 | Some first-time users were unsure how to begin chatting with the AI. | Add example prompts and suggested questions on the chatbot screen. |
| FR-04 | Users requested faster searching with smarter suggestions. | Implement autocomplete and improved keyword matching. |
| FR-05 | Users wanted to understand why each movie was recommended. | Display a brief explanation for every AI recommendation. |
| FR-06 | Important movie information could be emphasized more clearly. | Highlight ratings, genres, trailers, and streaming platforms using a better visual layout. |
| FR-12 | Dashboard analytics could be easier to interpret. | Improve chart labels, summaries, and dashboard visualization. |

---

## 5. Prototype Changes Before the Next Lab

1. **Improve AI Chatbot Guidance:** Add suggested prompts and conversation examples for first-time users.
2. **Enhance Movie Search:** Implement autocomplete and smarter keyword matching.
3. **Explain AI Recommendations:** Display a short explanation for each recommended movie.
4. **Improve Movie Details:** Highlight ratings, genres, trailers, and streaming platforms with a clearer layout.
5. **Enhance Dashboard Analytics:** Improve chart labels, summaries, and overall dashboard usability.

---

## 6. GitHub Issues Created

| Issue Title | Requirement ID |
|---|---|
| Add Suggested Prompts for AI Chatbot | FR-03 |
| Implement Autocomplete for Movie Search | FR-04 |
| Display Recommendation Explanations | FR-05 |
| Improve Movie Detail Layout | FR-06 |
| Enhance Dashboard Analytics and Labels | FR-12 |
