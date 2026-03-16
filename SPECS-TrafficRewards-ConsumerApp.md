# Technical Specification
## TrafficRewards — Consumer App (Driver Behaviour Score)

**Version:** 1.0 (MVP)
**Status:** Draft
**Last Updated:** March 2026
**Author:** [Your Name]
**Companion Document:** `PRD-TrafficRewards-ConsumerApp.md`
**Audience:** Frontend Engineers, Backend Engineers, DevOps, QA

---

## Table of Contents

1. [System Architecture Overview](#1-system-architecture-overview)
2. [Repository Setup & Git Conventions](#2-repository-setup--git-conventions)
3. [Environment Configuration](#3-environment-configuration)
4. [Tech Stack — Detailed Versions & Config](#4-tech-stack--detailed-versions--config)
5. [Design System & Tokens](#5-design-system--tokens)
6. [Component Specifications](#6-component-specifications)
   - 6.1 ScoreGauge
   - 6.2 TrendChart
   - 6.3 BottomNav
   - 6.4 RewardCard
   - 6.5 ViolationItem
   - 6.6 InsurerRow
   - 6.7 TipCard
   - 6.8 VehicleChip
   - 6.9 UI Primitives (Button, Badge, ProgressBar)
7. [Screen Specifications](#7-screen-specifications)
   - 7.1 Onboarding / Auth
   - 7.2 Home Screen
   - 7.3 Score Breakdown Screen
   - 7.4 Improve My Score Screen
   - 7.5 Rewards Screen
   - 7.6 Insurance Renewal Screen
   - 7.7 Profile Screen
8. [State Management Architecture](#8-state-management-architecture)
9. [Routing Architecture](#9-routing-architecture)
10. [API Integration Layer](#10-api-integration-layer)
11. [Mock Data Layer (MVP)](#11-mock-data-layer-mvp)
12. [Authentication Flow](#12-authentication-flow)
13. [Caching & Offline Strategy](#13-caching--offline-strategy)
14. [Error Handling Strategy](#14-error-handling-strategy)
15. [Analytics & Event Tracking](#15-analytics--event-tracking)
16. [Testing Strategy](#16-testing-strategy)
17. [Build, Bundling & Performance](#17-build-bundling--performance)
18. [Git Workflow & Branching](#18-git-workflow--branching)
19. [README Template](#19-readme-template)

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│                  CLIENT (React SPA)                 │
│  Vite + React 18 + React Router v6 + Tailwind CSS  │
│                                                     │
│  ┌──────────┐  ┌──────────┐  ┌────────────────┐   │
│  │  Screens │  │Components│  │  Custom Hooks  │   │
│  └────┬─────┘  └────┬─────┘  └───────┬────────┘   │
│       │              │                │             │
│  ┌────▼──────────────▼────────────────▼────────┐   │
│  │           Context / State Layer              │   │
│  │     UserContext · ScoreContext · UIContext   │   │
│  └────────────────────┬─────────────────────────┘   │
│                       │                             │
│  ┌────────────────────▼─────────────────────────┐   │
│  │              Services Layer (Axios)           │   │
│  │  authService · scoreService · rewardsService │   │
│  └────────────────────┬─────────────────────────┘   │
└───────────────────────┼─────────────────────────────┘
                        │ HTTPS / REST / JSON
                        │ JWT Bearer Token
┌───────────────────────▼─────────────────────────────┐
│                  BACKEND API                        │
│         https://api.trafficrewards.in/v1            │
│  (Node.js/Express or equivalent — backend team)     │
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐  │
│  │  Auth /OTP  │  │ Score Engine │  │ Challan   │  │
│  └─────────────┘  └──────────────┘  │ Ingestion │  │
│  ┌─────────────┐  ┌──────────────┐  └───────────┘  │
│  │   Rewards   │  │  Insurance   │                  │
│  └─────────────┘  └──────────────┘                  │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
  ┌──────────┐   ┌────────────┐  ┌──────────────┐
  │ Parivahan│   │  Database  │  │ SMS / Push   │
  │  API /   │   │ (Postgres) │  │  (Firebase   │
  │  Vahan   │   │            │  │   / Twilio)  │
  └──────────┘   └────────────┘  └──────────────┘
```

**Frontend is a pure SPA for MVP.** No SSR, no server-side rendering. The React app is a static build served from a CDN (e.g., Vercel, Netlify, or S3 + CloudFront). All data fetching is client-side.

---

## 2. Repository Setup & Git Conventions

### Initialise the Repository

```bash
# Scaffold with Vite
npm create vite@latest trafficrewards-consumer -- --template react
cd trafficrewards-consumer
npm install

# Install all dependencies (see Section 4)
npm install react-router-dom axios recharts
npm install -D tailwindcss postcss autoprefixer
npm install -D eslint prettier eslint-config-prettier
npm install -D vitest @testing-library/react @testing-library/jest-dom
npm install -D husky lint-staged

# Init Tailwind
npx tailwindcss init -p

# Init Husky
npx husky init
echo "npx lint-staged" > .husky/pre-commit
```

### `.gitignore`

```
node_modules/
dist/
.env
.env.local
.env.production
.DS_Store
*.log
coverage/
```

### Commit Message Convention (Conventional Commits)

```
feat(home): add score gauge animation
fix(rewards): correct locked card opacity
chore(deps): bump recharts to 2.12.0
refactor(hooks): extract useScore from HomeScreen
test(gauge): add unit tests for score band mapping
docs(readme): update setup instructions
```

Format: `type(scope): description`
Types: `feat` | `fix` | `chore` | `refactor` | `test` | `docs` | `style` | `perf`

---

## 3. Environment Configuration

### `.env.example` (commit this; never commit `.env`)

```env
# API
VITE_API_BASE_URL=https://api.trafficrewards.in/v1

# Feature Flags
VITE_USE_MOCK_DATA=true          # Set false when real API is ready
VITE_ENABLE_ANALYTICS=false      # Set true in staging/prod

# Firebase Push Notifications (Phase 2)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_PROJECT_ID=
```

### Environment Files per Stage

| File | Used For |
|------|----------|
| `.env.local` | Local dev (mock data on) |
| `.env.staging` | Staging server (real API, analytics off) |
| `.env.production` | Production (real API, analytics on) |

### Accessing Env Vars in Code

```js
// Always use import.meta.env in Vite (not process.env)
const API_BASE = import.meta.env.VITE_API_BASE_URL;
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';
```

---

## 4. Tech Stack — Detailed Versions & Config

### `package.json` — Key Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-router-dom": "^6.22.0",
    "axios": "^1.6.8",
    "recharts": "^2.12.0"
  },
  "devDependencies": {
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.4.1",
    "postcss": "^8.4.35",
    "autoprefixer": "^10.4.18",
    "eslint": "^8.57.0",
    "eslint-plugin-react": "^7.34.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "prettier": "^3.2.5",
    "eslint-config-prettier": "^9.1.0",
    "vitest": "^1.4.0",
    "@testing-library/react": "^14.2.2",
    "@testing-library/jest-dom": "^6.4.2",
    "@testing-library/user-event": "^14.5.2",
    "husky": "^9.0.11",
    "lint-staged": "^15.2.2"
  }
}
```

### `vite.config.js`

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@context': path.resolve(__dirname, './src/context'),
      '@services': path.resolve(__dirname, './src/services'),
      '@data': path.resolve(__dirname, './src/data'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@constants': path.resolve(__dirname, './src/constants'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
  },
});
```

### `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        display: ['Nunito', 'sans-serif'],
      },
      colors: {
        brand: {
          bg: '#f0f4ff',
          surface: '#ffffff',
          surface2: '#f7f9ff',
          surface3: '#eef2ff',
        },
        score: {
          poor: '#ef4444',
          below: '#f97316',
          average: '#f59e0b',
          good: '#3b82f6',
          excellent: '#00b86b',
        },
        green: {
          DEFAULT: '#00b86b',
          light: '#e6fff4',
          mid: '#34c77b',
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
    },
  },
  plugins: [],
};
```

### `.eslintrc.cjs`

```js
module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  settings: { react: { version: '18.3' } },
  rules: {
    'react/prop-types': 'warn',
    'react/react-in-jsx-scope': 'off',
    'no-unused-vars': 'warn',
  },
};
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2
}
```

### `lint-staged` config (in `package.json`)

```json
"lint-staged": {
  "src/**/*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "src/**/*.{css,json,md}": ["prettier --write"]
}
```

---

## 5. Design System & Tokens

### `src/constants/scoreBands.js`

This is the single source of truth for all score-to-colour and score-to-label mappings. Every component that renders score-related colours must import from here — never hardcode hex values.

```js
export const SCORE_MAX = 900;

export const SCORE_BANDS = [
  { min: 0,   max: 299, label: 'Poor',          color: '#ef4444', tailwind: 'text-red-500',    bgTailwind: 'bg-red-50'    },
  { min: 300, max: 499, label: 'Below Average',  color: '#f97316', tailwind: 'text-orange-500', bgTailwind: 'bg-orange-50' },
  { min: 500, max: 649, label: 'Average',         color: '#f59e0b', tailwind: 'text-amber-500',  bgTailwind: 'bg-amber-50'  },
  { min: 650, max: 799, label: 'Good',            color: '#3b82f6', tailwind: 'text-blue-500',   bgTailwind: 'bg-blue-50'   },
  { min: 800, max: 900, label: 'Excellent',       color: '#00b86b', tailwind: 'text-green-600',  bgTailwind: 'bg-green-50'  },
];

/**
 * Returns the band object for a given score.
 * @param {number} score
 * @returns {object} band
 */
export function getBand(score) {
  return SCORE_BANDS.find((b) => score >= b.min && score <= b.max) ?? SCORE_BANDS[0];
}

/**
 * Returns the needle angle (degrees) for the semicircular gauge.
 * 0 score = -90deg (far left), 900 score = +90deg (far right)
 * @param {number} score
 * @returns {number} angle in degrees
 */
export function scoreToAngle(score) {
  const clamped = Math.max(0, Math.min(score, SCORE_MAX));
  return -90 + (clamped / SCORE_MAX) * 180;
}

/**
 * Returns stroke-dashoffset for the SVG arc path.
 * Total arc path length = 371 (measured from wireframe SVG).
 * @param {number} score
 * @returns {number} dashoffset
 */
export function scoreToStrokeDashOffset(score) {
  const ARC_LENGTH = 371;
  const clamped = Math.max(0, Math.min(score, SCORE_MAX));
  return ARC_LENGTH - (clamped / SCORE_MAX) * ARC_LENGTH;
}
```

### `src/utils/formatters.js`

```js
/**
 * Format a number as Indian Rupees.
 * e.g. 2094 → "₹2,094"
 */
export function formatINR(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format ISO date string to Indian display format.
 * e.g. "2026-04-15" → "15 Apr 2026"
 */
export function formatDateIN(isoString) {
  return new Date(isoString).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Returns time-of-day greeting based on current hour.
 */
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

/**
 * Mask a string, showing only the last N characters.
 * e.g. maskString("UP14XXXXXXXX", 4) → "••••••••1234"
 */
export function maskString(str, visibleChars = 4) {
  if (!str) return '';
  const visible = str.slice(-visibleChars);
  const masked = '•'.repeat(Math.max(0, str.length - visibleChars));
  return masked + visible;
}

/**
 * Returns days between today and a future ISO date.
 */
export function daysUntil(isoDate) {
  const today = new Date();
  const target = new Date(isoDate);
  const diff = target - today;
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
```

---

## 6. Component Specifications

All components live in `src/components/`. Each component:
- Receives data via **props only** (no direct context reads, except BottomNav for active route)
- Has **PropTypes** defined
- Has a **named export** (not default) for easier tree-shaking
- Follows the naming convention `ComponentName.jsx` and `ComponentName.test.jsx`

---

### 6.1 ScoreGauge

**File:** `src/components/ScoreGauge.jsx`

**Purpose:** Renders the semicircular SVG gauge with animated needle and score display.

```jsx
// Props
ScoreGauge.propTypes = {
  score: PropTypes.number.isRequired,   // 0–900
  animated: PropTypes.bool,             // default: true — sweeps needle on mount
  size: PropTypes.number,               // default: 280 (width in px)
};
```

**Implementation notes:**
- SVG `viewBox="0 0 280 155"`, two `<path>` elements: background arc (grey/gradient) and active arc
- Active arc uses `stroke-dasharray: 371` and `stroke-dashoffset` computed from `scoreToStrokeDashOffset(score)`
- On mount, if `animated=true`: animate dashoffset from 371 → computed value over 1000ms using a CSS transition or `requestAnimationFrame` loop
- Needle is an SVG `<line>` rotated with a CSS `transform: rotate(Xdeg)` computed from `scoreToAngle(score)`, transform-origin at arc centre `(140, 140)`
- Score number rendered as `<text>` inside SVG at `x=140 y=130` (or absolutely positioned HTML overlay for better font rendering)
- Stroke colour pulled from `getBand(score).color`

**Accessibility:** `<svg role="img" aria-label={Score ${score} out of 900, ${getBand(score).label}}>` with a `<title>` child element.

---

### 6.2 TrendChart

**File:** `src/components/TrendChart.jsx`

**Purpose:** 6-month bar chart of monthly DBS scores using Recharts.

```jsx
TrendChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,  // "Oct 25"
      score: PropTypes.number.isRequired,
    })
  ).isRequired,
  activeMonth: PropTypes.string,  // highlighted bar month label
};
```

**Implementation notes:**
- Uses Recharts `<BarChart>` with `<Bar>`, `<XAxis>`, `<Tooltip>`, `<ResponsiveContainer>`
- `<ResponsiveContainer width="100%" height={80}>`
- Bar fill: `getBand(score).color` per bar using a custom `<Cell>` per entry
- Active bar (current month) rendered slightly taller or with a border via `activeBar` prop
- Tooltip shows score value only (no axis label clutter)
- No Y-axis rendered (minimalist style matching wireframe)
- X-axis tick font: 9px, color: `#9aa5b8`

---

### 6.3 BottomNav

**File:** `src/components/BottomNav.jsx`

**Purpose:** Persistent 5-tab bottom navigation bar.

```jsx
// No props — reads active route from useLocation()
const NAV_TABS = [
  { path: '/home',      icon: '🏠', label: 'Home'      },
  { path: '/score',     icon: '📊', label: 'Score'     },
  { path: '/rewards',   icon: '🎁', label: 'Rewards'   },
  { path: '/insurance', icon: '🛡️', label: 'Insurance' },
  { path: '/profile',   icon: '👤', label: 'Profile'   },
];
```

**Implementation notes:**
- Uses `useLocation()` to determine active tab (match `location.pathname.startsWith(tab.path)`)
- Uses `useNavigate()` for tab switching
- Active tab: blue background chip + blue label colour
- Inactive tab: grey label
- Min tap target: 44×44px per tab
- `position: sticky; bottom: 0` — never scrolls away
- Fire analytics event `tab_switched` with `{ from, to }` on every tab change

---

### 6.4 RewardCard

**File:** `src/components/RewardCard.jsx`

**Purpose:** Displays a single reward in the grid. Handles both locked and unlocked states.

```jsx
RewardCard.propTypes = {
  reward: PropTypes.shape({
    id: PropTypes.string.isRequired,
    brand: PropTypes.string.isRequired,
    offerTitle: PropTypes.string.isRequired,
    offerCondition: PropTypes.string,
    brandLogoUrl: PropTypes.string,
    brandEmoji: PropTypes.string,           // fallback if no logoUrl
    isUnlocked: PropTypes.bool.isRequired,
    pointsNeeded: PropTypes.number,         // 0 if unlocked
    redemptionType: PropTypes.oneOf(['code', 'deeplink', 'qr']),
  }).isRequired,
  onRedeem: PropTypes.func.isRequired,      // (rewardId) => void
  onLockedTap: PropTypes.func,              // (rewardId) => void — opens bottom sheet
};
```

**States:**
- **Unlocked:** Full opacity, "Redeem" button active, green offer text
- **Locked:** 60% opacity, lock overlay badge ("🔒 Need X more pts"), no Redeem button

**onRedeem callback flow:** Parent screen calls `rewardsService.redeem(id)`, receives `{ type, value }`, then shows appropriate modal (code reveal, opens URL, or QR display).

---

### 6.5 ViolationItem

**File:** `src/components/ViolationItem.jsx`

**Purpose:** Single row in the violation/challan list with expandable detail.

```jsx
ViolationItem.propTypes = {
  violation: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,         // ISO string
    location: PropTypes.string,
    challanNumber: PropTypes.string,
    scoreImpact: PropTypes.number.isRequired,  // negative integer e.g. -85
    impactLevel: PropTypes.oneOf(['high', 'medium', 'low']).isRequired,
    timeHazardZone: PropTypes.bool,
    isAgedOut: PropTypes.bool,
    isDisputed: PropTypes.bool,
    status: PropTypes.oneOf(['active', 'paid', 'disputed', 'expired']),
    fine: PropTypes.number,
  }).isRequired,
  onDisputeTap: PropTypes.func,               // (challanNumber) => void
};
```

**States:**
- **Default (collapsed):** Shows type, date, impact badge, hazard zone badge if applicable
- **Expanded (tap to toggle):** Adds challan number, location, fine amount, dispute link
- **Aged out:** Greyed out, italic, "Expired — no longer affecting score" label
- **Disputed:** Blue "Dispute Pending" badge

**Impact badge colours:** `high` → red, `medium` → amber, `low` → grey. Score impact shown as `−85 pts` in matching colour.

---

### 6.6 InsurerRow

**File:** `src/components/InsurerRow.jsx`

```jsx
InsurerRow.propTypes = {
  insurer: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    logoUrl: PropTypes.string,
    logoFallbackText: PropTypes.string,        // e.g. "BAJAJ\nALLIANZ"
    logoFallbackBg: PropTypes.string,          // hex colour
    tpPremium: PropTypes.number.isRequired,
    odFromPremium: PropTypes.number.isRequired,
    dbsParticipating: PropTypes.bool.isRequired,
    quoteUrl: PropTypes.string.isRequired,
  }).isRequired,
  onGetQuote: PropTypes.func.isRequired,       // (quoteUrl) => void
};
```

**Behaviour:** `onGetQuote` opens the URL in an in-app browser modal (MVP: `window.open(url, '_blank')`). Fire analytics event `insurer_tapped` with insurer name.

---

### 6.7 TipCard

**File:** `src/components/TipCard.jsx`

```jsx
TipCard.propTypes = {
  tip: PropTypes.shape({
    icon: PropTypes.string.isRequired,       // emoji
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.oneOf(['signal', 'helmet', 'speed', 'phone', 'other']),
  }).isRequired,
};
```

**Left border colour by category:**
- `signal` → `var(--red)` / `#ef4444`
- `helmet` → `var(--amber)` / `#f59e0b`
- `speed` → `var(--orange)` / `#f97316`
- `phone` → `var(--blue)` / `#3b82f6`
- `other` → `var(--green)` / `#00b86b`

---

### 6.8 VehicleChip

**File:** `src/components/VehicleChip.jsx`

```jsx
VehicleChip.propTypes = {
  vehicle: PropTypes.shape({
    registrationNumber: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    make: PropTypes.string,
    model: PropTypes.string,
    lastSynced: PropTypes.string,            // ISO timestamp
  }).isRequired,
  onTap: PropTypes.func,
};
```

Displays reg number in monospace font, vehicle type, and sync freshness ("Just now" / "X hours ago" / "X days ago" computed from `lastSynced`).

---

### 6.9 UI Primitives

**`src/components/ui/Button.jsx`**

```jsx
Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
};
```

**`src/components/ui/Badge.jsx`**

```jsx
Badge.propTypes = {
  color: PropTypes.oneOf(['green', 'blue', 'amber', 'red', 'grey']),
  children: PropTypes.node.isRequired,
};
```

**`src/components/ui/ProgressBar.jsx`**

```jsx
ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,   // 0–100 (percentage)
  color: PropTypes.string,              // hex, default: green
  height: PropTypes.number,             // px, default: 8
  animated: PropTypes.bool,             // CSS width transition on mount
};
```

---

## 7. Screen Specifications

### 7.1 Onboarding / Auth

**Files:** `src/screens/LoginScreen.jsx`, `src/screens/VehicleSetupScreen.jsx`

**Flow:**
```
App open
  └── Check localStorage for JWT token
       ├── Token exists + valid → navigate('/home')
       └── No token / expired → navigate('/onboarding/login')
            └── User enters mobile → POST /auth/send-otp
                 └── OTP screen → POST /auth/verify-otp
                      └── First time user → navigate('/onboarding/vehicle-setup')
                      └── Returning user → navigate('/home')
```

**Login Screen fields:**
- Mobile number input (numeric, 10-digit validation, `+91` prefix shown)
- "Send OTP" CTA button
- Input validation: exactly 10 digits, starts with 6–9 (Indian mobile)
- Error states: invalid number, rate limited, network error

**OTP Screen fields:**
- 6-digit OTP (individual digit boxes or single input)
- Auto-submit on last digit entry
- 30-second resend countdown
- "Resend OTP" link (active after countdown)
- Error: invalid OTP, expired OTP

**Vehicle Setup Screen fields:**
- Vehicle registration number input (uppercase enforced, format hint: `UP32AB1234`)
- Vehicle type selector (Car / Two-Wheeler / Three-Wheeler)
- "Continue" CTA — POST /vehicles, then GET /score to fetch initial DBS
- Skip option (for MVP — allows exploring app with demo data)

---

### 7.2 Home Screen

**File:** `src/screens/HomeScreen.jsx`

**Data dependencies:** `useUser()`, `useScore()`, `useRewards()` (for preview chips)

**Loading state:** Show skeleton loaders for gauge (grey semicircle placeholder) and stat cards while API resolves. Never block the entire screen.

**Skeleton components needed:**
- `GaugeSkeleton` — grey semicircle, 280×155px
- `StatCardSkeleton` — 2×2 grey rounded rectangles
- `ChipSkeleton` — horizontal row of 4 grey rounded chips

**Empty states:**
- No vehicle added: Show "Add your vehicle to see your DBS score" with CTA
- Score not yet computed: "Your score is being calculated — check back in 24 hours"

---

### 7.3 Score Breakdown Screen

**File:** `src/screens/ScoreBreakdownScreen.jsx`

**Data dependencies:** `useScore()` (history), `useViolations()`

**Pagination:** Violations list loads first 10 items. "Load more" button (not infinite scroll) to keep initial performance fast.

**Violation sort order:** Most recent first (descending by `date`). Aged-out violations always at the bottom in a collapsed section.

**"What If" Simulator logic (client-side computed):**
```js
// projections are static scenarios computed from violation data
const projections = [
  {
    scenario: `If the ${oldestViolation.type} (${formatDateIN(oldestViolation.date)}) ages out`,
    daysFromNow: daysUntil(addMonths(oldestViolation.date, 12)),
    scoreGain: Math.abs(oldestViolation.scoreImpact),
  },
  {
    scenario: 'If you maintain a clean record for 90 days',
    daysFromNow: 90,
    scoreGain: 15,   // from API /score/simulator
  },
];
```

In MVP, projections are pre-fetched from `GET /score/simulator`. In Phase 2, make the simulator interactive (user inputs hypothetical scenarios).

---

### 7.4 Improve My Score Screen

**File:** `src/screens/ImproveScreen.jsx`

**Data dependencies:** `useScore()`, `useViolations()` (for oldest violation date)

**Streak counter:** `stats.cleanDays` from score API. If `cleanDays === 0`, show "Start your streak today — no violations in the last 24h needed."

**Tips data source (MVP):** Static JSON in `src/data/tips.js` — no API call. Array of 6–8 tips covering: signal, helmet, phone, speed, seatbelt, drunk driving, lane discipline.

---

### 7.5 Rewards Screen

**File:** `src/screens/RewardsScreen.jsx`

**Data dependencies:** `useRewards(category)`

**Category tab state:** Managed with `useState('all')`. On tab change, re-filter the already-fetched reward list client-side (no new API call for each tab — fetch all at once and filter in memory).

**Redemption modal:** When "Redeem" is tapped, call `POST /rewards/:id/redeem`. Response:
```json
{ "type": "code", "value": "TRFUEL50", "expiresAt": "2026-04-15T23:59:59Z" }
```
Show modal with:
- Brand name + offer title
- Code in large monospace font with "Copy" button
- Expiry date
- Usage instructions

**Locked card bottom sheet:** Triggered by tapping a locked card. Shows:
- Lock icon + "This reward is locked"
- "You need X more points to unlock [Brand]"
- Score progress bar from current → required
- "How to improve your score" → navigates to ImproveScreen

**Pagination:** Fetch all rewards in one call for MVP (assume ≤ 50 rewards). Paginate in Phase 2.

---

### 7.6 Insurance Renewal Screen

**File:** `src/screens/InsuranceScreen.jsx`

**Data dependencies:** `useInsurance()`

**Renewal countdown:** Computed client-side from `policy.expiryDate` using `daysUntil()`. Show urgency styling when ≤ 30 days.

**Premium comparison logic (display only — computation is backend's job):**
```
Savings = standardTPPremium - dbsAdjustedPremium
Loading = max(0, dbsAdjustedPremium - standardTPPremium)
Discount = max(0, standardTPPremium - dbsAdjustedPremium)
```

**"Get Quote" tap:** Opens `insurer.quoteUrl` + appends UTM params:
```js
const url = `${insurer.quoteUrl}&utm_source=trafficrewards&utm_medium=app&utm_campaign=renewal`;
window.open(url, '_blank');
```
Fire analytics: `insurer_tapped` with `{ insurerName, score: currentScore }`.

---

### 7.7 Profile Screen

**File:** `src/screens/ProfileScreen.jsx`

**Data dependencies:** `useUser()`

**Fields displayed:**
- Name (editable in Phase 2 — read-only in MVP)
- Mobile number (masked: `+91 ••••••7890`)
- Licence number (masked via `maskString`)
- Linked vehicles list (registration + type chip)
- DBS score badge (small, colour-coded)
- Notifications toggle (local preference stored in `localStorage`)
- App version number
- "Logout" button

**Logout flow:**
1. Clear JWT from localStorage
2. Clear all context state
3. Navigate to `/onboarding/login`
4. Do NOT call a backend logout endpoint in MVP (stateless JWT — just delete client-side token)

---

## 8. State Management Architecture

### Context Structure

```
<UserProvider>           ← user profile, auth state
  <ScoreProvider>        ← current score, history, violations
    <UIProvider>         ← loading states, modal visibility, active modals
      <App />
    </UIProvider>
  </ScoreProvider>
</UserProvider>
```

### `UserContext`

```js
// src/context/UserContext.jsx
const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // On mount: check localStorage for JWT, validate, fetch /user/me
  useEffect(() => {
    const token = localStorage.getItem('tr_jwt');
    if (token) {
      authService.validateToken(token)
        .then(() => userService.getMe())
        .then(setUser)
        .then(() => setIsAuthenticated(true))
        .catch(() => localStorage.removeItem('tr_jwt'))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('tr_jwt');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, loading, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used within UserProvider');
  return ctx;
};
```

### `ScoreContext`

```js
// Holds: score, violations, loading, error, refetch
// Does NOT auto-fetch — screens trigger fetch via useScore() hook
```

### Custom Hooks Pattern

All API fetching happens in custom hooks, not directly in screen components.

```js
// src/hooks/useScore.js
export function useScore() {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScore = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';
      const data = USE_MOCK
        ? await import('@data/mockScore').then(m => m.mockScore)
        : await scoreService.getScore();
      setScore(data);
    } catch (err) {
      setError(err.message ?? 'Failed to load score');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchScore(); }, [fetchScore]);

  return { score, loading, error, refetch: fetchScore };
}
```

The same pattern is used for `useViolations`, `useRewards`, `useInsurance`.

---

## 9. Routing Architecture

### `src/App.jsx`

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@context/UserContext';

// Screens
import LoginScreen from '@screens/LoginScreen';
import VehicleSetupScreen from '@screens/VehicleSetupScreen';
import HomeScreen from '@screens/HomeScreen';
import ScoreBreakdownScreen from '@screens/ScoreBreakdownScreen';
import ImproveScreen from '@screens/ImproveScreen';
import RewardsScreen from '@screens/RewardsScreen';
import InsuranceScreen from '@screens/InsuranceScreen';
import ProfileScreen from '@screens/ProfileScreen';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useUser();
  if (loading) return <AppLoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/onboarding/login" replace />;
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Onboarding */}
        <Route path="/onboarding/login" element={<LoginScreen />} />
        <Route path="/onboarding/vehicle-setup" element={<VehicleSetupScreen />} />

        {/* Protected App Routes */}
        <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
        <Route path="/score" element={<ProtectedRoute><ScoreBreakdownScreen /></ProtectedRoute>} />
        <Route path="/improve" element={<ProtectedRoute><ImproveScreen /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><RewardsScreen /></ProtectedRoute>} />
        <Route path="/insurance" element={<ProtectedRoute><InsuranceScreen /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
```

---

## 10. API Integration Layer

### `src/services/api.js` — Axios Instance

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor — attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('tr_jwt');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor — handle 401 globally
api.interceptors.response.use(
  (response) => response.data,          // unwrap .data automatically
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('tr_jwt');
      window.location.href = '/onboarding/login';
    }
    return Promise.reject(
      new Error(error.response?.data?.message ?? 'Network error')
    );
  }
);

export default api;
```

### `src/services/authService.js`

```js
import api from './api';

export const authService = {
  sendOtp: (mobile) => api.post('/auth/send-otp', { mobile }),
  verifyOtp: (mobile, otp) => api.post('/auth/verify-otp', { mobile, otp }),
  // Returns { token, user } — caller stores token in localStorage
};
```

### `src/services/scoreService.js`

```js
import api from './api';

export const scoreService = {
  getScore: () => api.get('/score'),
  getSimulator: () => api.get('/score/simulator'),
};
```

### `src/services/violationService.js`

```js
import api from './api';

export const violationService = {
  getViolations: (page = 1, limit = 20) =>
    api.get('/violations', { params: { page, limit } }),
  getViolation: (id) => api.get(`/violations/${id}`),
};
```

### `src/services/rewardsService.js`

```js
import api from './api';

export const rewardsService = {
  getRewards: (category = 'all', page = 1) =>
    api.get('/rewards', { params: { category, page } }),
  redeem: (rewardId) => api.post(`/rewards/${rewardId}/redeem`),
};
```

### `src/services/insuranceService.js`

```js
import api from './api';

export const insuranceService = {
  getInsurance: () => api.get('/insurance'),
  getInsurers: () => api.get('/insurance/insurers'),
};
```

---

## 11. Mock Data Layer (MVP)

When `VITE_USE_MOCK_DATA=true`, all hooks import from `src/data/` instead of calling services. The data shape **must be identical** to what the real API will return so the swap is a one-line change per hook.

### `src/data/mockUser.js`

```js
export const mockUser = {
  id: 'user-001',
  firstName: 'Vikram',
  lastName: 'Sharma',
  mobile: '+919876543210',
  email: 'vikram.sharma@example.com',
  profilePhotoUrl: null,
  createdAt: '2025-01-15T00:00:00Z',
  licence: { number: 'UP14-19800000000', dob: '1990-03-22' },
  vehicles: [
    {
      id: 'v-001',
      registrationNumber: 'UP32AB1234',
      make: 'Maruti Suzuki',
      model: 'Swift',
      cc: 1197,
      type: 'Private Car',
      fuelType: 'Petrol',
    },
  ],
};
```

### `src/data/mockScore.js`

```js
export const mockScore = {
  current: 742,
  max: 900,
  band: 'Good',
  percentile: 72,
  lastUpdated: '2026-03-14T06:30:00Z',
  target: 800,
  history: [
    { month: 'Oct 25', score: 810 },
    { month: 'Nov 25', score: 785 },
    { month: 'Dec 25', score: 760 },
    { month: 'Jan 26', score: 742 },
    { month: 'Feb 26', score: 742 },
    { month: 'Mar 26', score: 742 },
  ],
  stats: {
    cleanDays: 12,
    violationsThisYear: 2,
    streak: { currentDays: 12, bestDays: 34 },
  },
  nextMilestone: {
    daysUntilExpiry: 87,
    scoreGainOnExpiry: 85,
    violationType: 'Signal Jumping',
  },
};
```

### `src/data/mockViolations.js`

```js
export const mockViolations = [
  {
    id: 'v-001',
    challanNumber: 'DL2024CH00123',
    type: 'Signal Jumping',
    date: '2024-09-12T18:45:00Z',
    location: 'Connaught Place, Delhi',
    scoreImpact: -85,
    impactLevel: 'high',
    timeHazardZone: true,
    isAgedOut: false,
    isDisputed: false,
    status: 'active',
    fine: 1000,
  },
  {
    id: 'v-002',
    challanNumber: 'UP2025CH00456',
    type: 'Helmet Violation',
    date: '2025-03-20T09:15:00Z',
    location: 'Hazratganj, Lucknow',
    scoreImpact: -60,
    impactLevel: 'medium',
    timeHazardZone: false,
    isAgedOut: false,
    isDisputed: false,
    status: 'paid',
    fine: 500,
  },
  // ...more violations
];
```

---

## 12. Authentication Flow

### Token Storage

```
JWT stored in: localStorage key "tr_jwt"
```

> **Note:** For MVP, localStorage is acceptable. For production, migrate to httpOnly cookies with a `/auth/refresh` endpoint to eliminate XSS token theft risk.

### Token Lifecycle

```
Login → store token in localStorage
Every API request → attach as Authorization: Bearer <token>
401 response → clear token → redirect to /onboarding/login
App mount → check token exists → validate (decode expiry locally) → fetch user
Token expiry → handle in response interceptor (see Section 10)
Logout → remove token → clear context → redirect to login
```

### JWT Local Validation (client-side, no network call)

```js
// src/utils/auth.js
export function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}
```

---

## 13. Caching & Offline Strategy

### MVP Caching (localStorage)

| Data | Cache Key | TTL | Strategy |
|------|-----------|-----|----------|
| Score | `tr_cache_score` | 1 hour | Stale-while-revalidate |
| Violations | `tr_cache_violations` | 6 hours | Cache-first, show stale |
| Rewards | `tr_cache_rewards` | 24 hours | Cache-first |
| Insurance | `tr_cache_insurance` | 24 hours | Cache-first |
| User | `tr_cache_user` | 24 hours | Cache-first |

### Cache Utility

```js
// src/utils/cache.js
export function setCache(key, data, ttlMs) {
  localStorage.setItem(key, JSON.stringify({
    data,
    expiresAt: Date.now() + ttlMs,
  }));
}

export function getCache(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
}
```

### Hook Integration Pattern

```js
// In useScore.js — stale-while-revalidate
const CACHE_KEY = 'tr_cache_score';
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

const cached = getCache(CACHE_KEY);
if (cached) setScore(cached); // show immediately

const fresh = await scoreService.getScore();
setCache(CACHE_KEY, fresh, CACHE_TTL);
setScore(fresh); // update with fresh data
```

---

## 14. Error Handling Strategy

### Error Boundary

Wrap the entire app in an `<ErrorBoundary>` that catches uncaught React render errors:

```jsx
// src/components/ErrorBoundary.jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // In Phase 2: send to Sentry / error tracking service
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen p-8 text-center">
          <p className="text-2xl mb-2">⚠️</p>
          <p className="font-bold text-gray-800 mb-1">Something went wrong</p>
          <p className="text-sm text-gray-500 mb-4">Please refresh the app</p>
          <button onClick={() => window.location.reload()}>Refresh</button>
        </div>
      );
    }
    return this.props.children;
  }
}
```

### Per-Screen Error States

Every screen that fetches data renders three states:

```jsx
if (loading) return <ScreenSkeleton />;
if (error) return <ErrorState message={error} onRetry={refetch} />;
return <ScreenContent data={data} />;
```

### `ErrorState` Component

```jsx
// Reusable across all screens
ErrorState.propTypes = {
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
// Shows icon, message, "Try Again" button
```

### Network Error Codes to User Messages

```js
// src/utils/errorMessages.js
export const ERROR_MESSAGES = {
  'Network error': 'No internet connection. Check your network and try again.',
  '404': 'Data not found. It may have been moved.',
  '500': 'Our servers are having issues. Please try again in a few minutes.',
  '429': 'Too many requests. Please wait a moment.',
  default: 'Something went wrong. Please try again.',
};
```

---

## 15. Analytics & Event Tracking

### Setup (MVP: console.log stub → swap for Mixpanel/Amplitude in Phase 2)

```js
// src/utils/analytics.js
const ENABLED = import.meta.env.VITE_ENABLE_ANALYTICS === 'true';

export function track(eventName, properties = {}) {
  if (!ENABLED) {
    console.log('[Analytics]', eventName, properties);
    return;
  }
  // Phase 2: mixpanel.track(eventName, properties);
}
```

### Events to Track

| Event Name | Trigger | Properties |
|---|---|---|
| `app_open` | App mounts with valid session | `{ score, band }` |
| `score_viewed` | HomeScreen mounts | `{ score, band, percentile }` |
| `breakdown_viewed` | ScoreBreakdownScreen mounts | `{ score, violationCount }` |
| `violation_expanded` | ViolationItem tapped | `{ violationType, scoreImpact }` |
| `dispute_tapped` | Dispute link tapped | `{ challanNumber, violationType }` |
| `tab_switched` | BottomNav tab tapped | `{ from, to }` |
| `reward_tapped` | RewardCard tapped | `{ rewardId, brand, isUnlocked }` |
| `redeem_tapped` | Redeem button tapped | `{ rewardId, brand, category }` |
| `reward_locked_tap` | Locked card tapped | `{ rewardId, brand, pointsNeeded }` |
| `insurer_tapped` | InsurerRow tapped | `{ insurerName, tpPremium, score }` |
| `improve_screen_viewed` | ImproveScreen mounts | `{ score, streak }` |
| `login_otp_sent` | OTP dispatched | `{ — }` (no PII) |
| `login_success` | JWT stored | `{ isNewUser }` |
| `logout` | Logout tapped | `{ — }` |

---

## 16. Testing Strategy

### Test File Co-location

```
src/components/ScoreGauge.jsx
src/components/ScoreGauge.test.jsx    ← unit test lives next to component
```

### Test Setup — `src/test/setup.js`

```js
import '@testing-library/jest-dom';
```

### What to Test

**Unit tests (Vitest + RTL):**
- `ScoreGauge`: renders correct band label, correct needle angle, animates on mount
- `RewardCard`: shows Redeem button when `isUnlocked=true`, shows lock overlay when false, calls `onRedeem` with correct id
- `ViolationItem`: expands on click, renders dispute link only for non-aged-out violations
- `BottomNav`: highlights active tab based on current route
- `scoreUtils.js`: `getBand()` returns correct band for boundary values (0, 299, 300, 649, 650, 800, 900)
- `formatters.js`: `formatINR(2094)` → "₹2,094", `maskString("UP14123", 4)` → "•••4123"

**Integration tests:**
- `HomeScreen`: renders skeleton during loading, renders score after mock data resolves, renders error state on API failure
- Auth flow: OTP entry → submit → navigates to vehicle setup for new user

**What NOT to test in MVP:**
- Recharts internals (trust the library)
- CSS / visual styling
- Third-party service integrations (mock them)

### Example Test

```jsx
// ScoreGauge.test.jsx
import { render, screen } from '@testing-library/react';
import { ScoreGauge } from './ScoreGauge';

describe('ScoreGauge', () => {
  it('renders the score number', () => {
    render(<ScoreGauge score={742} animated={false} />);
    expect(screen.getByText('742')).toBeInTheDocument();
  });

  it('has correct accessible label for Good band', () => {
    render(<ScoreGauge score={742} animated={false} />);
    expect(screen.getByRole('img')).toHaveAccessibleName(
      'Score 742 out of 900, Good'
    );
  });

  it('renders Poor band for score 0', () => {
    render(<ScoreGauge score={0} animated={false} />);
    expect(screen.getByRole('img')).toHaveAccessibleName(
      'Score 0 out of 900, Poor'
    );
  });
});
```

### Running Tests

```bash
npm run test            # watch mode
npm run test:run        # single run (CI)
npm run test:coverage   # coverage report
```

---

## 17. Build, Bundling & Performance

### Vite Build Config

```js
// vite.config.js — build section
build: {
  target: 'es2015',           // wide browser support
  outDir: 'dist',
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom', 'react-router-dom'],
        charts: ['recharts'],
        axios: ['axios'],
      },
    },
  },
},
```

### Performance Targets

| Metric | Target | How |
|--------|--------|-----|
| LCP (Largest Contentful Paint) | < 2.5s on 4G | Skeleton loaders, lazy load non-critical screens |
| TTI (Time to Interactive) | < 3.5s | Small initial JS bundle, defer Recharts |
| Score gauge animation | 60fps | Use CSS transition, not JS animation loop |
| JS bundle size (initial) | < 200KB gzipped | Manual chunks, tree-shaking |

### Lazy Loading Screens

```jsx
// App.jsx — lazy load all screens except Home (critical path)
import { lazy, Suspense } from 'react';

const HomeScreen = lazy(() => import('@screens/HomeScreen'));
const ScoreBreakdownScreen = lazy(() => import('@screens/ScoreBreakdownScreen'));
// ... all screens lazy loaded

// Wrap Routes in Suspense
<Suspense fallback={<FullPageSpinner />}>
  <Routes> ... </Routes>
</Suspense>
```

### Font Loading

```html
<!-- index.html — preconnect + display=swap for both fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 18. Git Workflow & Branching

### Branch Strategy

```
main          ← production-ready, protected. No direct pushes.
dev           ← integration branch. All feature branches merge here first.
  └── feat/home-screen
  └── feat/score-breakdown
  └── feat/improve-screen
  └── feat/rewards-screen
  └── feat/insurance-screen
  └── feat/profile-screen
  └── feat/auth-onboarding
  └── fix/gauge-animation-safari
  └── chore/setup-eslint
```

### Pull Request Rules
- PR must target `dev` (not `main`)
- At least 1 reviewer approval required
- All lint checks must pass (`npm run lint`)
- All tests must pass (`npm run test:run`)
- PR description must reference the screen/component it implements

### Merge to `main`
- Only from `dev`, by tech lead, after QA sign-off
- Tag the release: `git tag v0.1.0`

### Suggested Sprint Breakdown

| Sprint | Duration | Scope |
|--------|----------|-------|
| Sprint 0 | 3 days | Repo setup, Vite + Tailwind + ESLint + Husky + mock data scaffolding |
| Sprint 1 | 5 days | Auth / Onboarding screens + BottomNav + routing |
| Sprint 2 | 5 days | Home Screen + ScoreGauge component |
| Sprint 3 | 5 days | Score Breakdown + TrendChart + ViolationItem |
| Sprint 4 | 5 days | Improve Screen + Rewards Screen + RewardCard |
| Sprint 5 | 5 days | Insurance Screen + Profile Screen |
| Sprint 6 | 5 days | API integration (swap mock → real endpoints) |
| Sprint 7 | 3 days | QA, bug fixes, performance audit, README |

---

## 19. README Template

The README lives at the repo root and must be filled in before the first commit is pushed to a shared remote.

```markdown
# TrafficRewards — Consumer App

Driver Behaviour Score (DBS) consumer application for TrafficRewards.

## Tech Stack
- React 18 + Vite
- React Router v6
- Tailwind CSS
- Recharts
- Axios

## Prerequisites
- Node.js >= 18.x
- npm >= 9.x

## Getting Started

# 1. Clone the repo
git clone https://github.com/your-org/trafficrewards-consumer.git
cd trafficrewards-consumer

# 2. Install dependencies
npm install

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local — set VITE_USE_MOCK_DATA=true for local dev

# 4. Start dev server
npm run dev
# App runs at http://localhost:5173

## Available Scripts
npm run dev          # Start dev server
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
npm run test         # Vitest watch mode
npm run test:run     # Single test run
npm run test:coverage # Coverage report

## Project Structure
See PRD-TrafficRewards-ConsumerApp.md → Section 12

## Branching
- Feature work: branch off dev → feat/your-feature-name
- Target PRs at dev, not main
- See SPECS for full Git conventions

## Companion Documents
- PRD: PRD-TrafficRewards-ConsumerApp.md
- Tech Spec: SPECS-TrafficRewards-ConsumerApp.md

## Environment Variables
See .env.example for all variables and documentation.

## Mock Data
All screens use mock data by default (VITE_USE_MOCK_DATA=true).
To connect to the real API, set VITE_USE_MOCK_DATA=false and
configure VITE_API_BASE_URL in your .env.local.
```

---

*End of Document*
