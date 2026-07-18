# Updated Requirements Note

## Purpose
Use this file only if Lab 09 review requires a change to `system-requirements.md`.

| Requirement ID | Original Requirement | Proposed Update | Reason for Change | Supporting Evidence | GitHub Issue/Commit | Approved by Team? |
|---|---|---|---|---|---|---|
| FR-03 | Users can interact with the AI chatbot to receive movie recommendations. | Users must accept the privacy notice before starting a chat, and the chatbot should display example prompts for first-time users. | Lab 09 privacy and usability review identified the need for clearer user consent and guidance. | Privacy Review; Customer Validation Results | Issue #12 / Commit `abc1234` | Yes |
| FR-05 | The system displays personalized movie recommendations. | The system should provide a brief explanation for why each movie is recommended based on the user's preferences. | User testing showed that participants wanted more transparency and trust in AI-generated recommendations. | Customer Validation Summary; Test User Notes | Issue #13 / Commit `def5678` | Yes |
| FR-12 | Administrators can monitor chatbot usage and recommendation analytics. | Access to the administrator dashboard must require administrator authentication and role-based authorization. | Lab 09 security review identified a risk of unauthorized access to administrative functions. | Security Risk Assessment | Issue #14 / Commit `ghi9012` | Yes |

## Rule

Do not silently change system requirements. Every change must be justified, documented, and traceable.
