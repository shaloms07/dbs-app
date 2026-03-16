# Product Requirements Document
## TrafficRewards — Consumer App (Driver Behaviour Score)

**Version:** 1.0 (MVP)
**Status:** Draft
**Last Updated:** March 2026
**Author:** [Your Name]
**Stakeholders:** Product, Engineering, Design, Insurance Partners, Rewards Team

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement](#2-problem-statement)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [User Personas](#4-user-personas)
5. [Scope — MVP vs Future](#5-scope--mvp-vs-future)
6. [Screens & Features (Detailed)](#6-screens--features-detailed)
   - 6.1 Home / Score Screen
   - 6.2 Score Breakdown Screen
   - 6.3 Improve My Score Screen
   - 6.4 My Rewards Screen
   - 6.5 Insurance Renewal Screen
   - 6.6 Profile Screen
7. [Data Models & Fields](#7-data-models--fields)
8. [API Contracts (Frontend ↔ Backend)](#8-api-contracts-frontend--backend)
9. [Navigation & Routing](#9-navigation--routing)
10. [Non-Functional Requirements](#10-non-functional-requirements)
11. [Tech Stack Decision](#11-tech-stack-decision)
12. [Project Structure](#12-project-structure)
13. [Open Questions](#13-open-questions)

---

## 1. Overview

**TrafficRewards** is a consumer-facing mobile application that presents a driver's **Driver Behaviour Score (DBS)** — a 0–900 composite score calculated from traffic violation data (challans), driving patterns, and compliance history.

The app motivates safer driving behaviour by:
- Making the DBS score visible and understandable
- Linking score improvement to tangible rewards (fuel, food, shopping discounts)
- Connecting DBS to insurance TP premium pricing (no loading for good scores, discounts for excellent scores)
- Showing drivers exactly what hurt their score and how to recover it

The primary data source is challan (traffic violation) records pulled from official government systems (e.g., Vahan/NCRB/Parivahan). Additional signals may include telematics or self-reported data in future phases.

---

## 2. Problem Statement

Indian road traffic fatalities remain among the highest globally. Existing enforcement (challans) is reactive and punitive, but drivers receive no positive incentive to improve. Insurance premiums for third-party (TP) cover are uniform by vehicle class under MoRTH — a safe driver and a reckless driver pay the same amount.

**For drivers:** There is no single place to see their complete violation history, understand its impact, or get rewarded for clean records.

**For insurers:** There is no standardised consumer-facing interface to communicate DBS-linked pricing or drive renewal conversions.

**For the ecosystem:** Good drivers have no visibility into their "safety reputation" and no motivation to maintain it.

TrafficRewards solves this by creating a **score identity** for every driver — visible, actionable, and tied to real financial benefits.

---

## 3. Goals & Success Metrics

### Product Goals (MVP)
| Goal | Metric | Target (3 months post-launch) |
|------|--------|-------------------------------|
| Driver engagement | DAU/MAU ratio | ≥ 25% |
| Score comprehension | % users who view Score Breakdown after onboarding | ≥ 60% |
| Rewards engagement | % users who tap at least one Redeem CTA | ≥ 40% |
| Insurance CTA | % users who tap "Get a Quote" on Insurance screen | ≥ 20% |
| Retention | D30 retention | ≥ 35% |

### Business Goals
- Sign ≥ 5 insurance partners who accept DBS-linked pricing at launch
- Sign ≥ 50 reward brand partners within 6 months
- Achieve ≥ 10,000 registered users in month 1

---

## 4. User Personas

### Persona 1 — Vikram, 34, Private Car Owner (Primary)
- Drives daily in an urban metro (Delhi, Mumbai, Nagpur)
- Has received 1–3 challans in the past 2 years, often unaware until renewal
- Wants lower insurance premium; price-sensitive
- Tech-comfortable, uses UPI, Paytm, Google Pay regularly
- **Goal:** Understand his score, dispute a wrong challan, unlock fuel discounts

### Persona 2 — Priya, 27, Two-Wheeler Rider (Secondary)
- Rides a scooter for daily commute; occasional helmet challan
- Younger demographic, highly reward-motivated
- Discovers app via referral or insurer SMS
- **Goal:** Collect points, redeem food/shopping rewards, stay violation-free

### Persona 3 — Ramesh, 52, Commercial Fleet Owner (Future Scope)
- Manages 5–20 vehicles
- Needs aggregate view across fleet
- Primarily B2B — out of MVP scope

---

## 5. Scope — MVP vs Future

### ✅ In MVP Scope
- Driver registration & onboarding (mobile + vehicle number)
- DBS score display (gauge, band, percentile)
- Score history (6-month trend chart)
- Challan / violation list (from Parivahan or mock data)
- Score breakdown (per-violation impact)
- "What If" simulator (score recovery projection)
- Improve My Score tips + driving streak
- Rewards catalogue (locked/unlocked by score band)
- Reward redemption CTA (deep link or code reveal)
- Insurance renewal screen (premium comparison + insurer list)
- Bottom navigation (5 tabs)
- Push notifications (score change, renewal reminder)
- Profile screen (vehicle, licence details)

### 🚫 Out of MVP Scope
- In-app challan payment
- Telematics / real-time driving tracking (accelerometer, GPS)
- Fleet / multi-vehicle management
- Peer comparison / leaderboard
- Social sharing of score badge
- In-app insurance purchase flow (just referral/quote link for MVP)
- Dispute resolution workflow (show CTA, no in-app flow in MVP)
- Hindi / regional language support (English only in MVP)

---

## 6. Screens & Features (Detailed)

---

### 6.1 Home / Score Screen

**Purpose:** First thing a user sees on app open. Communicates score at a glance and provides entry points to all other sections.

#### UI Components
| Component | Description |
|-----------|-------------|
| App Header | Logo "TrafficRewards", notification bell with unread dot |
| Greeting | Personalised — "Good morning, [First Name]" |
| Score Gauge | Semicircular SVG gauge, colour-coded Red→Orange→Amber→Blue→Green, needle pointer, score number (e.g. 742), "/900" label |
| Score Strip | Band label (e.g. "Good Driver"), percentile text (e.g. "Top 28%"), live pulse dot |
| Vehicle Chip | Registration number, vehicle type, last data sync timestamp |
| Quick Stats Grid | 2×2 cards: Clean Days streak, Violations this year, Rewards available, Nearest unlock goal |
| Improve Banner | CTA card linking to Improve My Score screen |
| Rewards Preview | Horizontal scroll of reward chips (locked/unlocked) |
| Bottom Navigation | Home · Score · Rewards · Insurance · Profile |

#### Data Fields Required (from API)
- `user.firstName`, `user.lastName`
- `user.vehicle.registrationNumber`, `user.vehicle.type`, `user.vehicle.cc`
- `score.current` (0–900 integer)
- `score.band` (string: "Poor" / "Below Average" / "Average" / "Good" / "Excellent")
- `score.percentile` (0–100)
- `score.lastUpdated` (ISO timestamp)
- `stats.cleanDays` (integer)
- `stats.violationsThisYear` (integer)
- `rewards.availableCount` (integer)
- `notifications.unreadCount` (integer)

#### Behaviour
- Score gauge animates on load (needle sweeps from 0 to current score in ~1s)
- Score band colour changes the gauge fill dynamically
- Tapping vehicle chip → opens vehicle detail modal (MVP: static)
- Tapping Improve Banner → navigates to Improve Screen
- Tapping "View All" on Rewards Preview → navigates to Rewards Screen

---

### 6.2 Score Breakdown Screen

**Purpose:** Explain exactly how the DBS score is calculated — which violations dragged it down and by how much.

#### UI Components
| Component | Description |
|-----------|-------------|
| Screen Header | Back button, title "Score Breakdown", subtitle with vehicle reg |
| Score Trend Chart | 6-month bar chart, each bar = monthly DBS score, active bar highlighted |
| Rolling Window Info | Explains the scoring window (e.g. "Last 12 months of data") |
| Violations List | Each row: violation type, date, location, impact (−pts), time hazard zone badge, dispute link |
| Aged-Out Note | Shows violations that have expired out of the scoring window |
| "What If" Simulator | Shows score recovery projections: "If no new violations in 90 days → +X pts" |

#### Data Fields Required
- `score.history[]` — array of `{ month: "MMM YY", score: integer }` (6 items)
- `violations[]`:
  - `id` (UUID)
  - `type` (string — e.g. "Signal Jumping", "Helmet Violation")
  - `date` (ISO date)
  - `location` (string)
  - `challanNumber` (string)
  - `scoreImpact` (negative integer, e.g. −85)
  - `impactLevel` ("high" | "medium" | "low")
  - `timeHazardZone` (boolean — if violation occurred during peak/night hours)
  - `isAgedOut` (boolean)
  - `isDisputed` (boolean)
  - `status` ("active" | "paid" | "disputed" | "expired")
- `simulator.projections[]` — `{ scenario: string, daysFromNow: integer, scoreGain: integer }`

#### Behaviour
- Tapping a violation row expands to show full challan details
- "Dispute This" link → MVP: opens external Parivahan dispute URL in webview
- Bar chart bars are tappable — shows tooltip with exact score for that month
- Aged-out violations shown in greyed, collapsed section

---

### 6.3 Improve My Score Screen

**Purpose:** Forward-looking guidance. Converts the score from a report card into a motivational tool.

#### UI Components
| Component | Description |
|-----------|-------------|
| Hero Banner | Green gradient, "Improve My Score" heading, current score summary |
| Driving Streak Card | Flame icon, streak count in days, personal best, progress subtext |
| Countdown Card | "Next score milestone" — days remaining until a violation ages out, projected score gain shown |
| Goal Progress Bar | Current score → Target score (e.g. 742 → 800), % filled, label |
| Safety Tips List | Cards with icon, tip title, tip description, colour-coded left border by category |

#### Data Fields Required
- `score.current`, `score.target` (user-set or system-suggested)
- `streak.currentDays`, `streak.bestDays`
- `nextMilestone.daysUntilExpiry` (integer — days until oldest active violation ages out)
- `nextMilestone.scoreGainOnExpiry` (integer)
- `nextMilestone.violationType` (string)
- `tips[]` — `{ icon: string, title: string, description: string, category: "signal"|"helmet"|"speed"|"phone"|"other" }`

#### Behaviour
- Goal progress bar fills proportionally between `score.current` and `score.target`
- Countdown card updates daily (computed on frontend from `nextMilestone.daysUntilExpiry`)
- Tips are static (CMS-driven in Phase 2; hardcoded JSON in MVP)

---

### 6.4 My Rewards Screen

**Purpose:** The monetisation and retention engine. Shows score-gated rewards catalogue. Motivates score improvement through visible locked/unlocked state.

#### UI Components
| Component | Description |
|-----------|-------------|
| Hero Banner | Purple gradient, rewards count, locked count messaging |
| Score Unlock Prompt | "Reach 800 to unlock 12 more premium rewards" |
| TP Premium Discount Banner | Shield icon, discount amount (₹0 for good score / ₹X for poor score), "Renew Now" CTA |
| Category Tabs | All · Fuel · Food · Auto · Travel · Shopping (horizontally scrollable) |
| Rewards Grid | 2-column grid of reward cards |
| Reward Card (Unlocked) | Brand logo placeholder, brand name, offer text, conditions, "Redeem" button |
| Reward Card (Locked) | Same layout, 60% opacity, lock overlay with "Need X more points" |

#### Data Fields Required
- `rewards[]`:
  - `id` (UUID)
  - `brand` (string)
  - `offerTitle` (string — e.g. "₹50 off per fill")
  - `offerCondition` (string)
  - `category` ("fuel" | "food" | "auto" | "travel" | "shopping")
  - `minimumScore` (integer)
  - `isUnlocked` (boolean — computed from user's current score)
  - `pointsNeeded` (integer — 0 if unlocked)
  - `brandLogoUrl` (string — URL or emoji fallback)
  - `redemptionType` ("code" | "deeplink" | "qr")
  - `redemptionValue` (string — code string or URL, only populated if unlocked)
- `insurance.tpPremiumDiscount` (integer, in ₹)
- `insurance.discountReason` (string)

#### Behaviour
- Active tab filters `rewards[]` by `category` (All = unfiltered)
- Tapping "Redeem" on unlocked card → reveals code / opens deep link / shows QR modal
- Tapping locked card → shows bottom sheet: "Improve your score to X to unlock"
- "Renew Now" → navigates to Insurance Renewal Screen
- Rewards list is paginated (20 per page); infinite scroll in MVP

---

### 6.5 Insurance Renewal Screen

**Purpose:** Show the user how their DBS score directly affects their TP insurance premium. Drive insurer referral conversions.

#### UI Components
| Component | Description |
|-----------|-------------|
| Hero Banner | Orange gradient, "Insurance Renewal" title, subtitle |
| Policy Renewal Due Widget | Policy expiry date, countdown ("34 days away") |
| Premium Comparison Card | Side-by-side: Standard rate vs DBS-adjusted rate, savings banner |
| Score Impact Info Box | Blue info box: "Reach 800+ for premium discount" |
| Insurer List | Each row: insurer logo, name, TP premium + OD estimate, DBS badge, tap → quote |

#### Data Fields Required
- `vehicle.registrationNumber`, `vehicle.make`, `vehicle.cc`, `vehicle.fuelType`
- `policy.expiryDate` (ISO date)
- `policy.renewalDaysLeft` (integer — computed)
- `pricing.standardTPPremium` (integer, ₹)
- `pricing.dbsAdjustedPremium` (integer, ₹)
- `pricing.loadingAmount` (integer, ₹ — 0 for good scores)
- `pricing.discountAmount` (integer, ₹ — 0 unless score ≥ 800)
- `insurers[]`:
  - `id` (UUID)
  - `name` (string)
  - `logoUrl` (string)
  - `tpPremium` (integer, ₹)
  - `odFromPremium` (integer, ₹)
  - `dbsParticipating` (boolean)
  - `quoteUrl` (string — partner deep link)

#### Behaviour
- "Renew Now" or insurer row tap → opens partner deep link in-app browser (WebView) or external browser
- Premium comparison highlights savings in green; loading shown in red
- If `policy.renewalDaysLeft` ≤ 30 → show urgent pulsing indicator

---

### 6.6 Profile Screen *(MVP — basic)*

#### UI Components
- User name, mobile number, profile photo (avatar fallback)
- Linked vehicles list (reg number, type)
- Driving licence number (masked)
- DBS score badge
- App settings (notifications toggle)
- Logout

#### Data Fields Required
- `user.id`, `user.firstName`, `user.lastName`, `user.mobile`, `user.email`
- `user.profilePhotoUrl`
- `user.licence.number` (string, masked except last 4)
- `user.licence.dob` (ISO date)
- `user.vehicles[]` — array of vehicle objects
- `user.createdAt`

---

## 7. Data Models & Fields

### User Object
```json
{
  "id": "uuid",
  "firstName": "Vikram",
  "lastName": "Sharma",
  "mobile": "+91-98XXXXXXXX",
  "email": "vikram@example.com",
  "profilePhotoUrl": "https://...",
  "createdAt": "2025-01-15T00:00:00Z",
  "licence": {
    "number": "UP14-XXXXXXXX",
    "dob": "1990-03-22"
  },
  "vehicles": [
    {
      "id": "uuid",
      "registrationNumber": "UP32AB1234",
      "make": "Maruti Suzuki",
      "model": "Swift",
      "cc": 1197,
      "type": "Private Car",
      "fuelType": "Petrol"
    }
  ]
}
```

### Score Object
```json
{
  "current": 742,
  "max": 900,
  "band": "Good",
  "percentile": 72,
  "lastUpdated": "2026-03-14T06:30:00Z",
  "target": 800,
  "history": [
    { "month": "Oct 25", "score": 810 },
    { "month": "Nov 25", "score": 785 },
    { "month": "Dec 25", "score": 760 },
    { "month": "Jan 26", "score": 742 },
    { "month": "Feb 26", "score": 742 },
    { "month": "Mar 26", "score": 742 }
  ]
}
```

### Violation Object
```json
{
  "id": "uuid",
  "challanNumber": "DL2024CH00123",
  "type": "Signal Jumping",
  "date": "2024-09-12T18:45:00Z",
  "location": "Connaught Place, Delhi",
  "scoreImpact": -85,
  "impactLevel": "high",
  "timeHazardZone": true,
  "isAgedOut": false,
  "isDisputed": false,
  "status": "active",
  "fine": 1000
}
```

### Reward Object
```json
{
  "id": "uuid",
  "brand": "IndianOil XTRAPOWER",
  "offerTitle": "₹50 off per fill",
  "offerCondition": "Valid at 500+ outlets",
  "category": "fuel",
  "minimumScore": 600,
  "isUnlocked": true,
  "pointsNeeded": 0,
  "brandLogoUrl": "https://...",
  "redemptionType": "code",
  "redemptionValue": "TRFUEL50"
}
```

### Insurance Object
```json
{
  "policy": {
    "expiryDate": "2026-04-15",
    "renewalDaysLeft": 34
  },
  "pricing": {
    "standardTPPremium": 2094,
    "dbsAdjustedPremium": 2094,
    "loadingAmount": 0,
    "discountAmount": 0
  },
  "insurers": [
    {
      "id": "uuid",
      "name": "Bajaj Allianz General",
      "logoUrl": "https://...",
      "tpPremium": 2094,
      "odFromPremium": 3200,
      "dbsParticipating": true,
      "quoteUrl": "https://partner.bajajfinserv.in/?ref=trafficrewards"
    }
  ]
}
```

---

## 8. API Contracts (Frontend ↔ Backend)

> All endpoints are REST, JSON, Bearer token auth (JWT). Base URL: `https://api.trafficrewards.in/v1`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/send-otp` | Send OTP to mobile number |
| `POST` | `/auth/verify-otp` | Verify OTP, return JWT |
| `GET` | `/user/me` | Get logged-in user profile |
| `PATCH` | `/user/me` | Update profile fields |
| `GET` | `/score` | Get current DBS score + history |
| `GET` | `/violations` | Get paginated violation list (`?page=1&limit=20`) |
| `GET` | `/violations/:id` | Get single violation detail |
| `GET` | `/score/simulator` | Get "what if" score projections |
| `GET` | `/rewards` | Get rewards catalogue (`?category=fuel&page=1`) |
| `POST` | `/rewards/:id/redeem` | Redeem a reward, returns code/link |
| `GET` | `/insurance` | Get policy + premium comparison data |
| `GET` | `/insurance/insurers` | Get list of partner insurers with quotes |
| `POST` | `/vehicles` | Add a vehicle by registration number |
| `GET` | `/notifications` | Get notification list |
| `PATCH` | `/notifications/:id/read` | Mark notification as read |

---

## 9. Navigation & Routing

```
App
├── /onboarding
│   ├── /login          (mobile OTP entry)
│   └── /vehicle-setup  (add vehicle reg number)
├── /home               (tab: Home)
├── /score              (tab: Score — breakdown)
├── /improve            (tab: Score sub-route)
├── /rewards            (tab: Rewards)
├── /insurance          (tab: Insurance)
└── /profile            (tab: Profile)
```

The bottom navigation bar is persistent across all 5 main tabs. Back navigation (within a tab) uses React Router `useNavigate(-1)`.

---

## 10. Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Performance | Initial load (LCP) < 2.5s on 4G; score gauge animation at 60fps |
| Offline | Score and last-fetched violation list available offline (cached via localStorage/IndexedDB) |
| Security | JWT tokens in httpOnly cookies; vehicle & licence data masked in transit; HTTPS only |
| Accessibility | WCAG 2.1 AA; minimum tap target 44×44px; colour not the only indicator |
| Responsiveness | Optimised for 375px–430px viewport (iPhone SE to Pro Max); tablet is out of MVP scope |
| Error States | Empty state UI for zero violations, zero rewards, API errors; retry CTAs throughout |
| Internationalisation | English only in MVP; INR currency formatting; Indian date format (DD MMM YYYY) |
| Analytics | Event tracking on: score_viewed, reward_tapped, redeem_tapped, insurer_tapped, tab_switched, dispute_tapped |

---

## 11. Tech Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend Framework | **React 18 + Vite** | Fast DX, component model suits repeating UI (cards, tabs, nav), easy Git collaboration, straightforward migration to Next.js when SSR is needed |
| Routing | **React Router v6** | Declarative, supports nested routes, no SSR complexity yet |
| Styling | **Tailwind CSS** | Utility-first maps directly to the wireframe's design tokens; consistent across team |
| State Management | **React Context + useState** (MVP) → Zustand (Phase 2) | Lightweight for MVP; no over-engineering |
| API Client | **Axios** with interceptors for JWT refresh | Centralised error handling |
| Charts | **Recharts** | React-native, SVG, responsive — suits score trend bars |
| Mock Data | JSON files in `/src/data/` | Swap with real API calls in Phase 2 |
| Testing | **Vitest + React Testing Library** | Matches Vite ecosystem |
| Linting | **ESLint + Prettier** | Enforced on pre-commit via Husky |
| Version Control | **Git + GitHub** | Feature branches per screen: `feat/home-screen`, `feat/rewards-screen` etc. |

---

## 12. Project Structure

```
trafficrewards-consumer/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── fonts/
│   ├── components/
│   │   ├── BottomNav.jsx
│   │   ├── ScoreGauge.jsx          ← SVG gauge, takes score prop
│   │   ├── ScoreGauge.test.jsx
│   │   ├── RewardCard.jsx          ← locked/unlocked states
│   │   ├── ViolationItem.jsx
│   │   ├── InsurerRow.jsx
│   │   ├── TipCard.jsx
│   │   ├── TrendChart.jsx          ← Recharts bar chart wrapper
│   │   ├── VehicleChip.jsx
│   │   └── ui/
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       └── ProgressBar.jsx
│   ├── screens/
│   │   ├── HomeScreen.jsx
│   │   ├── ScoreBreakdownScreen.jsx
│   │   ├── ImproveScreen.jsx
│   │   ├── RewardsScreen.jsx
│   │   ├── InsuranceScreen.jsx
│   │   └── ProfileScreen.jsx
│   ├── data/                       ← mock JSON, replaced by API in Phase 2
│   │   ├── mockUser.js
│   │   ├── mockScore.js
│   │   ├── mockViolations.js
│   │   ├── mockRewards.js
│   │   └── mockInsurance.js
│   ├── hooks/
│   │   ├── useScore.js             ← fetches + caches score
│   │   ├── useViolations.js
│   │   ├── useRewards.js
│   │   └── useInsurance.js
│   ├── context/
│   │   ├── UserContext.jsx
│   │   └── ScoreContext.jsx
│   ├── services/                   ← Axios API calls (wired in Phase 2)
│   │   ├── api.js                  ← Axios instance + interceptors
│   │   ├── authService.js
│   │   ├── scoreService.js
│   │   ├── rewardsService.js
│   │   └── insuranceService.js
│   ├── utils/
│   │   ├── scoreUtils.js           ← band → colour mapping, percentile calc
│   │   └── formatters.js           ← INR formatting, date formatting
│   ├── constants/
│   │   └── scoreBands.js           ← { min, max, label, colour } config
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 13. Open Questions

| # | Question | Owner | Priority |
|---|----------|-------|----------|
| 1 | What is the exact DBS scoring algorithm? (weights per violation type, time hazard zone multiplier, rolling window duration) | Product / Data Science | 🔴 Critical |
| 2 | Which API does the backend use to pull challan data — Parivahan sandbox, Vahan API, or third-party aggregator (e.g. IDfy, Karza)? | Backend | 🔴 Critical |
| 3 | What is the minimum score threshold for "no loading" and what score triggers a discount vs a loading? Is this insurer-specific? | Insurance Partners | 🔴 Critical |
| 4 | For reward redemption — does TrafficRewards host its own redemption engine or deep-link to brand apps? Who manages coupon inventory? | Business / Rewards Team | 🟠 High |
| 5 | Is OTP-only login sufficient for MVP or do we need Google/Apple Sign-In? | Product | 🟠 High |
| 6 | What happens if a user has multiple vehicles? Does each vehicle have its own DBS score or is it the driver's score? | Product / Data Science | 🟠 High |
| 7 | What is the data retention and privacy policy for challan data? Is explicit consent required beyond app T&C? | Legal / Compliance | 🟠 High |
| 8 | Should the "Dispute This" challan flow be in-app (Phase 2) or always redirect to Parivahan? | Product | 🟡 Medium |
| 9 | Are safety tips static (content team manages) or algorithm-driven per driver profile? | Product | 🟡 Medium |
| 10 | Do we need multi-language support (Hindi) at launch or is English sufficient for initial pilot cities? | Product | 🟡 Medium |

---

*End of Document*
