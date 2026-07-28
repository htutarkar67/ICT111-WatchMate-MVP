# Improvement Log

The following issues were identified during usability testing, prototype evaluation, and quality assurance for the **WatchMate: AI Movie Recommendation System**. These improvements help enhance the user experience and support the continuous development of the MVP.

| Issue ID | Issue Description | Severity | Related Requirement | Evidence Source | Proposed Fix | Owner | Status |
|----------|-------------------|----------|---------------------|-----------------|--------------|-------|--------|
| IMP-01 | AI chatbot response is slower than expected for some recommendation requests. | Important | FR-03 | Tester U01 | Optimize AI request handling and improve loading indicators during recommendation generation. | Bhone Myat Kyaw | Completed |
| IMP-02 | Homepage layout is not fully responsive on smaller mobile devices. | Critical | FR-01, FR-14 | Lab 11 QA | Improve responsive layout and optimize the navigation menu for mobile screens. | Bhone Myat Kyaw | Completed |
| IMP-03 | Watchlist button is difficult for users to locate on the movie detail page. | Important | FR-05 | Tester U02 | Increase button visibility and place it near the primary action buttons. | Htut Arkar Saing | Completed |
| IMP-04 | Movie genre and filter options are not immediately noticeable. | Important | FR-06 | Tester U08 | Redesign the filter section with clearer labels, icons, and improved spacing. | Htut Arkar Saing | Completed |
| IMP-05 | Some AI recommendations are too general for specific moods or genres. | Important | FR-03 | Tester U05 | Refine AI prompts and include additional TMDB movie metadata to improve recommendation quality. | Bhone Myat Kyaw | Completed |
| IMP-06 | Movie trailers occasionally load slowly on slower internet connections. | Useful | FR-07 | Tester U03 | Add loading animations and optimize trailer loading performance. | Bhone Myat Kyaw | Completed |
| IMP-07 | Guest users do not realize that chat history is only available after logging in. | Useful | FR-02 | Tester U06 | Display an information message explaining that chat history is available for registered users only. | Tar Yar Lin Latt | Completed |
| IMP-08 | Administrator dashboard does not provide search or filter options for chat history. | Useful | FR-09 | Lab 11 QA | Add search and filter functionality based on user name and conversation date. | Bhone Myat Kyaw | Completed |
| IMP-09 | Dashboard analytics do not automatically refresh after new chatbot interactions. | Useful | FR-12 | Lab 11 QA | Implement automatic data refresh when new chatbot sessions are created. | Bhone Myat Kyaw | Completed |
| IMP-10 | Personalized movie recommendations based on watch history have not been implemented. | Future | FR-04 | Architecture Review | Develop a personalized recommendation engine using user watch history and preferences. | Bhone Myat Kyaw | Pending |
| IMP-11 | The system currently relies only on TMDB data for recommendations. | Future | US-08, NFR-01 | Project Scope Review | Integrate additional movie databases and improve the recommendation algorithm for better accuracy. | Bhone Myat Kyaw | Pending |

---

## Summary

### Completed Improvements
- Improved AI chatbot performance and loading experience.
- Enhanced responsive design for mobile devices.
- Increased visibility of the Watchlist feature.
- Improved movie search and filtering interface.
- Enhanced AI recommendation quality.
- Optimized trailer loading performance.
- Added guidance for guest users regarding chat history.
- Improved administrator dashboard functionality.
- Added automatic dashboard data refresh.

### Planned Future Improvements
- Develop personalized recommendations based on user preferences and watch history.
- Integrate additional movie databases to improve recommendation accuracy.
- Continue enhancing the AI recommendation model based on user feedback and testing results.
