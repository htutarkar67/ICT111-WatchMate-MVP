# Prototype Testing Notes

## Test Environment & Device Matrix

- **Prototype Live Link:** https://htutarkar67.github.com/ICT111-WatchMate-MVP/
- **Repository Path:** `htutarkar67/ICT111-WatchMate-MVP`
- **Testing Session:** Lab 11 Final QA & Verification Sprint
- **Test Date:** July 25, 2026

### Device & Browser Coverage Matrix

- Desktop: Google Chrome v126 (Windows 11, 1920×1080)
- Desktop: Mozilla Firefox v127 (macOS Sonoma, 1440×900)
- Mobile: Google Chrome for Android (Google Pixel 7, 412×915)
- Mobile: Safari Mobile (iPhone 14 Pro, 393×852)
- Tablet: iPad Safari (820×1180)

---

# System Requirements Traceability & Main Test Cases

| Test ID | Mapped Req | User Flow / Feature | Steps to Test | Expected Result | Actual Result | Status | Issue Found & Severity | Technical Fix / Action Taken |
|---------|------------|---------------------|---------------|-----------------|---------------|--------|------------------------|------------------------------|
| **T-01** | FR-01 | Open Homepage | Launch the prototype and verify the homepage layout. | Homepage loads with project title, navigation bar, and featured movies. | Homepage loaded correctly. | **Pass** | Low: Banner image spacing on small screens. | Adjusted responsive spacing using CSS media queries. |
| **T-02** | FR-02 | User Registration | Create a new account with valid information. | Registration succeeds and confirmation message appears. | Registration completed successfully. | **Pass** | Medium: Password validation message unclear. | Improved validation message and placeholder text. |
| **T-03** | FR-03 | User Login | Log in using a registered account. | User successfully logs into the system. | Login worked correctly. | **Pass** | None | No changes required. |
| **T-04** | FR-04 | Enter Movie Preferences | Select favorite genres and submit preferences. | Preferences are saved and used for recommendations. | Preferences saved successfully. | **Pass** | Low: Genre buttons too close together on mobile. | Increased spacing between buttons. |
| **T-05** | FR-05 | AI Movie Recommendation | Request movie recommendations. | AI recommends movies based on user preferences. | Recommendations displayed correctly. | **Pass** | Medium: Loading indicator missing. | Added a loading spinner while recommendations are generated. |
| **T-06** | FR-06 | Search & Filter Movies | Search movies by title or genre. | Matching movies are displayed instantly. | Search results were accurate. | **Pass** | Low: Search box width on mobile. | Updated responsive search field width. |
| **T-07** | FR-07 | Movie Details | Select a recommended movie. | Movie details page displays synopsis, genre, rating, and poster. | Details displayed correctly. | **Pass** | None | No issues found. |
| **T-08** | FR-08 | Save Favorite Movies | Add a movie to Favorites. | Movie appears in the Favorites list. | Favorite saved successfully. | **Pass** | Low: Favorite icon refresh delay. | Updated the UI immediately after saving. |
| **T-09** | FR-10 | Input Validation | Submit an empty login or registration form. | Required field validation prevents submission. | Validation worked correctly. | **Pass** | None | No issues found. |
| **T-10** | FR-11 | User Feedback Messages | Complete login and recommendation actions. | Success notifications appear after each action. | Notifications displayed correctly. | **Pass** | Low: Notification position on mobile. | Improved toast notification positioning. |
| **T-11** | FR-13, FR-14 | Responsive UI | Test on desktop, tablet, and mobile devices. | Interface adapts correctly to different screen sizes. | Responsive layout displayed correctly. | **Pass** | Low: Movie cards slightly overlapped on small screens. | Adjusted the responsive grid layout. |
| **T-12** | FR-15, FR-16 | Privacy & End-to-End Flow | Register → Login → Select Preferences → Receive Recommendations → Save Favorite. | Complete workflow executes without errors. | Full workflow completed successfully. | **Pass** | None | Verified all navigation and feature links. |
