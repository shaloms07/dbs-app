# TODO — TrafficRewards Consumer App
> Generated from PRD v1.0 + SPECS v1.0 | March 2026
> Feed this into your IDE (Cursor / Copilot / Windsurf) as context.
> Check off items as you complete them. Each task maps to a file path.

---

## SPRINT 0 — Repo & Tooling Setup

### Scaffold
- [ ] Run `npm create vite@latest trafficrewards-consumer -- --template react`
- [ ] Delete boilerplate: `src/App.css`, `src/assets/react.svg`, contents of `src/App.jsx`
- [ ] Replace `index.html` title with `TrafficRewards`

### Install Dependencies
- [ ] `npm install react-router-dom axios recharts`
- [ ] `npm install -D tailwindcss postcss autoprefixer`
- [ ] `npm install -D eslint prettier eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks`
- [ ] `npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event`
- [ ] `npm install -D husky lint-staged`

### Config Files
- [ ] `npx tailwindcss init -p` — generates `tailwind.config.js` and `postcss.config.js`
- [ ] Write `tailwind.config.js` — add font families (Space Grotesk, Nunito), custom colours (brand, score bands, green), custom border radius (`4xl`, `5xl`) — see SPECS §4
- [ ] Write `vite.config.js` — add path aliases (`@`, `@components`, `@screens`, `@hooks`, `@context`, `@services`, `@data`, `@utils`, `@constants`), add vitest config block — see SPECS §4
- [ ] Write `.eslintrc.cjs` — extends recommended + react + react-hooks + prettier — see SPECS §4
- [ ] Write `.prettierrc` — singleQuote, semi, trailingComma es5, printWidth 100 — see SPECS §4
- [ ] Write `.env.example` — `VITE_API_BASE_URL`, `VITE_USE_MOCK_DATA=true`, `VITE_ENABLE_ANALYTICS=false` — see SPECS §3
- [ ] Create `.env.local` from `.env.example` — set `VITE_USE_MOCK_DATA=true`
- [ ] Write `.gitignore` — node_modules, dist, .env, .env.local, .DS_Store, coverage — see SPECS §2
- [ ] Add Google Fonts preconnect + Space Grotesk + Nunito links to `index.html` with `display=swap` — see SPECS §17
- [ ] Add `@tailwind base/components/utilities` directives to `src/index.css`
- [ ] Write `src/test/setup.js` — import `@testing-library/jest-dom`

### Husky + lint-staged
- [ ] `npx husky init`
- [ ] `echo "npx lint-staged" > .husky/pre-commit`
- [ ] Add `lint-staged` config to `package.json` — run eslint + prettier on `src/**/*.{js,jsx}` — see SPECS §4

### npm Scripts
- [ ] Verify these scripts exist in `package.json`: `dev`, `build`, `preview`, `lint`, `lint:fix`, `test`, `test:run`, `test:coverage`

### Folder Structure
- [ ] Create `src/components/ui/` directory
- [ ] Create `src/screens/` directory
- [ ] Create `src/data/` directory
- [ ] Create `src/hooks/` directory
- [ ] Create `src/context/` directory
- [ ] Create `src/services/` directory
- [ ] Create `src/utils/` directory
- [ ] Create `src/constants/` directory
- [ ] Create `src/test/` directory
- [ ] Create `public/` — add `favicon.svg`

### Git
- [ ] `git init`
- [ ] Make first commit: `chore: initial vite + react scaffold`
- [ ] Create `dev` branch: `git checkout -b dev`
- [ ] Push to GitHub/GitLab remote
- [ ] Set branch protection on `main` (require PR + 1 approval)

---

## SPRINT 1 — Auth, Onboarding & Routing Shell

### Constants & Utilities (do these first — everything depends on them)
- [ ] **`src/constants/scoreBands.js`** — define `SCORE_MAX`, `SCORE_BANDS` array with `{ min, max, label, color, tailwind, bgTailwind }`, export `getBand(score)`, `scoreToAngle(score)`, `scoreToStrokeDashOffset(score)` — see SPECS §5
- [ ] **`src/utils/formatters.js`** — export `formatINR()`, `formatDateIN()`, `getGreeting()`, `maskString()`, `daysUntil()` — see SPECS §5
- [ ] **`src/utils/auth.js`** — export `isTokenValid(token)` — decode JWT payload, check `exp` vs `Date.now()` — see SPECS §12
- [ ] **`src/utils/cache.js`** — export `setCache(key, data, ttlMs)`, `getCache(key)` — see SPECS §13
- [ ] **`src/utils/analytics.js`** — export `track(eventName, properties)` — console.log stub when `VITE_ENABLE_ANALYTICS=false` — see SPECS §15
- [ ] **`src/utils/errorMessages.js`** — export `ERROR_MESSAGES` map (Network error, 404, 500, 429, default) — see SPECS §14

### Mock Data
- [ ] **`src/data/mockUser.js`** — export `mockUser` object with full user shape including vehicles array — see SPECS §11
- [ ] **`src/data/mockScore.js`** — export `mockScore` with current, band, percentile, history (6 months), stats, nextMilestone — see SPECS §11
- [ ] **`src/data/mockViolations.js`** — export `mockViolations` array — minimum 4 violations covering: high/medium/low impact, aged-out, disputed, paid, active statuses — see SPECS §11
- [ ] **`src/data/mockRewards.js`** — export `mockRewards` array — minimum 8 rewards covering: unlocked (fuel, food, auto, shopping) + locked (travel, shopping) — match shape from PRD §7
- [ ] **`src/data/mockInsurance.js`** — export `mockInsurance` with policy, pricing, and insurers array (min 3 insurers) — see PRD §7
- [ ] **`src/data/tips.js`** — export `TIPS` array — 6 tips covering signal, helmet, phone, speed, seatbelt, lane discipline — each with `{ icon, title, description, category }` — see PRD §6.3

### Services Layer
- [ ] **`src/services/api.js`** — create Axios instance with `baseURL`, `timeout: 10000`, request interceptor (attach JWT from localStorage), response interceptor (unwrap `.data`, handle 401 redirect, reject with clean error message) — see SPECS §10
- [ ] **`src/services/authService.js`** — export `authService` with `sendOtp(mobile)`, `verifyOtp(mobile, otp)` — see SPECS §10
- [ ] **`src/services/scoreService.js`** — export `scoreService` with `getScore()`, `getSimulator()` — see SPECS §10
- [ ] **`src/services/violationService.js`** — export `violationService` with `getViolations(page, limit)`, `getViolation(id)` — see SPECS §10
- [ ] **`src/services/rewardsService.js`** — export `rewardsService` with `getRewards(category, page)`, `redeem(rewardId)` — see SPECS §10
- [ ] **`src/services/insuranceService.js`** — export `insuranceService` with `getInsurance()`, `getInsurers()` — see SPECS §10
- [ ] **`src/services/userService.js`** — export `userService` with `getMe()`, `updateMe(data)`, `addVehicle(regNumber, type)` — see PRD §8

### Context
- [ ] **`src/context/UserContext.jsx`** — implement `UserProvider` with `user`, `setUser`, `isAuthenticated`, `loading`, `logout`; on mount check localStorage JWT, validate with `isTokenValid()`, fetch `/user/me`; export `useUser()` hook with null-check — see SPECS §8
- [ ] **`src/context/ScoreContext.jsx`** — implement `ScoreProvider` with `score`, `setScore`; export `useScoreContext()` hook — see SPECS §8
- [ ] **`src/context/UIContext.jsx`** — implement `UIProvider` with `activeModal`, `setActiveModal`, `modalData`, `setModalData`, `openModal(name, data)`, `closeModal()`; export `useUI()` hook

### Custom Hooks
- [ ] **`src/hooks/useScore.js`** — fetch score from mock or API depending on `VITE_USE_MOCK_DATA`, cache result with `setCache('tr_cache_score', data, 1hr)`, implement stale-while-revalidate, return `{ score, loading, error, refetch }` — see SPECS §8
- [ ] **`src/hooks/useViolations.js`** — fetch violations, cache for 6 hours, support pagination (`page`, `limit` params), return `{ violations, loading, error, refetch, loadMore, hasMore }` — see SPECS §8
- [ ] **`src/hooks/useRewards.js`** — fetch rewards, cache for 24 hours, accept `category` filter param, return `{ rewards, loading, error, refetch }` — see SPECS §8
- [ ] **`src/hooks/useInsurance.js`** — fetch insurance data, cache for 24 hours, return `{ insurance, insurers, loading, error, refetch }` — see SPECS §8

### Error Boundary
- [ ] **`src/components/ErrorBoundary.jsx`** — class component, catch render errors, show full-page fallback with refresh button — see SPECS §14

### UI Primitives
- [ ] **`src/components/ui/Button.jsx`** — variants: primary, secondary, ghost, danger; sizes: sm, md, lg; props: loading (spinner), disabled, fullWidth, onClick — see SPECS §6.9
- [ ] **`src/components/ui/Badge.jsx`** — colors: green, blue, amber, red, grey — see SPECS §6.9
- [ ] **`src/components/ui/ProgressBar.jsx`** — props: value (0–100), color (hex), height (px), animated (CSS width transition on mount) — see SPECS §6.9
- [ ] **`src/components/ui/Skeleton.jsx`** — generic skeleton loader — props: `width`, `height`, `rounded`; uses pulse animation via Tailwind `animate-pulse`
- [ ] **`src/components/ui/Modal.jsx`** — bottom sheet style modal; backdrop click to close; trap focus; animated slide-up; controlled via `useUI()` context
- [ ] **`src/components/ui/ErrorState.jsx`** — reusable error display; props: `message`, `onRetry`; shows icon + message + "Try Again" button — see SPECS §14
- [ ] **`src/components/ui/FullPageSpinner.jsx`** — centered spinner for Suspense fallback and auth check loading

### Routing Shell
- [ ] **`src/App.jsx`** — set up `BrowserRouter`, all `Routes`, `ProtectedRoute` wrapper (redirects to login if not authenticated), `Suspense` wrapper with `FullPageSpinner`, lazy imports for all screens — see SPECS §9
- [ ] **`src/main.jsx`** — wrap `<App />` in `<ErrorBoundary>`, `<UserProvider>`, `<ScoreProvider>`, `<UIProvider>`

### Auth Screens
- [ ] **`src/screens/LoginScreen.jsx`**
  - [ ] Mobile number input — numeric, 10 digits, `+91` prefix label, validate starts with 6–9
  - [ ] Inline validation error message ("Enter a valid 10-digit mobile number")
  - [ ] "Send OTP" Button — calls `authService.sendOtp()`, navigates to OTP entry view
  - [ ] Loading state on button while API call in progress
  - [ ] Network error display
  - [ ] OTP entry view (same screen, step 2):
    - [ ] 6-digit OTP input
    - [ ] Auto-submit on 6th digit entered
    - [ ] 30-second countdown timer
    - [ ] "Resend OTP" link — active only after countdown expires, calls `sendOtp()` again
    - [ ] Error: "Invalid OTP" / "OTP expired"
    - [ ] On success: store JWT in localStorage → check `isNewUser` → navigate to `/onboarding/vehicle-setup` or `/home`
  - [ ] Fire analytics: `login_otp_sent` on send, `login_success` on verify

- [ ] **`src/screens/VehicleSetupScreen.jsx`**
  - [ ] Registration number input — auto-uppercase, format hint "e.g. UP32AB1234"
  - [ ] Vehicle type selector — Car / Two-Wheeler / Three-Wheeler (segmented control or radio buttons)
  - [ ] "Continue" Button — calls `userService.addVehicle()`, then `scoreService.getScore()`, navigates to `/home`
  - [ ] "Skip for now" text link — navigates to `/home` with demo data
  - [ ] Loading + error states

---

## SPRINT 2 — Home Screen & Score Gauge

### ScoreGauge Component
- [ ] **`src/components/ScoreGauge.jsx`**
  - [ ] SVG `viewBox="0 0 280 155"`, width prop (default 280)
  - [ ] Background arc path `d="M 22 140 A 118 118 0 0 1 258 140"` — gradient stroke (red→orange→amber→blue→green at 30% opacity)
  - [ ] Active arc — same path, full gradient, `stroke-dasharray="371"`, `stroke-dashoffset` from `scoreToStrokeDashOffset(score)` via CSS variable
  - [ ] On mount if `animated=true`: transition dashoffset from 371 to computed value over 1000ms using CSS `transition: stroke-dashoffset 1s ease-out`
  - [ ] Needle `<line>` — `transform: rotate(${scoreToAngle(score)}deg)` with `transform-origin` at `140px 140px`
  - [ ] Score number display — absolutely positioned HTML overlay centred at bottom of arc — font: Nunito 900, 52px, white
  - [ ] "/900" sub-label — 13px, white 40% opacity
  - [ ] `role="img"` with `aria-label` — "Score X out of 900, {band.label}"
  - [ ] PropTypes: `score` (required number), `animated` (bool, default true), `size` (number, default 280)
- [ ] **`src/components/ScoreGauge.test.jsx`**
  - [ ] Test: renders score number
  - [ ] Test: correct aria-label for Good band (score 742)
  - [ ] Test: correct aria-label for Poor band (score 0)
  - [ ] Test: correct aria-label for Excellent band (score 850)

### Score Strip / Band Display
- [ ] **`src/components/ScoreStrip.jsx`** — shows band label (e.g. "Good Driver"), live pulse dot (green animated dot), percentile text ("Top 28%"), all derived from `score` prop using `getBand()`

### VehicleChip Component
- [ ] **`src/components/VehicleChip.jsx`**
  - [ ] Registration number in monospace / Space Grotesk font, larger weight
  - [ ] Vehicle type label
  - [ ] Sync freshness: "Just now" if < 1 hour, "X hours ago" if < 24h, "X days ago" otherwise — computed from `lastSynced`
  - [ ] Tappable — calls `onTap` prop if provided
  - [ ] PropTypes — see SPECS §6.8

### Home Screen Skeletons
- [ ] **`src/components/skeletons/GaugeSkeleton.jsx`** — grey semicircle placeholder, 280×155px, pulse animation
- [ ] **`src/components/skeletons/StatCardSkeleton.jsx`** — 2×2 grid of grey rounded rectangles
- [ ] **`src/components/skeletons/ChipRowSkeleton.jsx`** — horizontal row of 4 grey rounded chips

### HomeScreen
- [ ] **`src/screens/HomeScreen.jsx`**
  - [ ] Import and call `useScore()`, `useUser()`, `useRewards()`
  - [ ] Render `GaugeSkeleton`, `StatCardSkeleton`, `ChipRowSkeleton` while loading
  - [ ] Render `ErrorState` with refetch if error
  - [ ] App header: "Traffic**Rewards**" logo (Rewards in green), notification bell icon, unread count dot (red, shows when `notifications.unreadCount > 0`)
  - [ ] Personalised greeting: `getGreeting()` + `, ` + `user.firstName` + ` 👋`
  - [ ] `<ScoreGauge score={score.current} animated={true} />`
  - [ ] `<ScoreStrip score={score.current} percentile={score.percentile} />`
  - [ ] `<VehicleChip vehicle={user.vehicles[0]} />` — margin top 16px
  - [ ] Quick stats 2×2 grid:
    - [ ] Card 1: "Clean Days" — `score.stats.cleanDays` value, green colour
    - [ ] Card 2: "Violations This Year" — `score.stats.violationsThisYear`, amber if > 0 else green
    - [ ] Card 3: "Rewards Available" — `rewards.filter(r => r.isUnlocked).length`
    - [ ] Card 4: "Points to Next Unlock" — min `pointsNeeded` across locked rewards
  - [ ] Improve banner — dark blue gradient card, rocket icon, "Boost your score" text, arrow → navigate to `/improve` on tap — fire analytics `tab_switched`
  - [ ] Rewards preview section header — "Your Rewards" + "View All" link → `/rewards`
  - [ ] Horizontal scrolling reward chips — map first 5 rewards, show locked chips at reduced opacity
  - [ ] Empty state: if no vehicle, show "Add your vehicle" CTA card
  - [ ] `<BottomNav />` sticky at bottom
  - [ ] Fire analytics `score_viewed` on mount with `{ score, band, percentile }`

---

## SPRINT 3 — Score Breakdown Screen

### TrendChart Component
- [ ] **`src/components/TrendChart.jsx`**
  - [ ] Recharts `<BarChart>`, `<ResponsiveContainer width="100%" height={80}>`
  - [ ] Each bar fill colour from `getBand(score).color` using `<Cell>` per bar
  - [ ] Active/current month bar: slightly taller or with border highlight
  - [ ] `<XAxis>` — tick fontSize 9px, colour `#9aa5b8`, no axis line
  - [ ] No Y-axis
  - [ ] `<Tooltip>` — shows score value only, custom styled (dark bg, white text, small)
  - [ ] PropTypes: `data` (required array of `{ month, score }`), `activeMonth` (string)

### ViolationItem Component
- [ ] **`src/components/ViolationItem.jsx`**
  - [ ] Collapsed state: violation type, formatted date, impact badge (`−85 pts` in red/amber/grey by impactLevel), time hazard zone badge if `timeHazardZone=true`
  - [ ] Expanded state (toggle on tap): adds challan number, location, fine amount, status badge, dispute link
  - [ ] Dispute link: only if `!isAgedOut && !isDisputed` — calls `onDisputeTap(challanNumber)` — fire analytics `dispute_tapped`
  - [ ] Aged-out state: 60% opacity, italic font, "Expired — no longer affecting your score" label
  - [ ] Disputed state: blue "Dispute Pending" badge instead of dispute link
  - [ ] PropTypes — see SPECS §6.5
- [ ] **`src/components/ViolationItem.test.jsx`**
  - [ ] Test: expands on tap
  - [ ] Test: dispute link visible for active non-disputed violations
  - [ ] Test: dispute link hidden for aged-out violations
  - [ ] Test: aged-out styling applied

### ScoreBreakdownScreen
- [ ] **`src/screens/ScoreBreakdownScreen.jsx`**
  - [ ] Import and call `useScore()`, `useViolations()`
  - [ ] Screen header: back button (`useNavigate(-1)`), title "Score Breakdown", vehicle reg subtitle
  - [ ] `<TrendChart data={score.history} activeMonth={currentMonth} />`
  - [ ] Rolling window info box: "Your score is based on violations in the last 12 months" — blue tinted box
  - [ ] Violations list header: "Violations" title + violation count badge
  - [ ] Map `violations.filter(v => !v.isAgedOut)` → `<ViolationItem />` (most recent first)
  - [ ] "Load more" button — calls `loadMore()` from `useViolations()`, shown only if `hasMore=true`
  - [ ] Aged-out section — collapsed by default, expand toggle — maps `violations.filter(v => v.isAgedOut)` → `<ViolationItem />`
  - [ ] "What If" Simulator card:
    - [ ] Title "Score Recovery Simulator"
    - [ ] Map `simulator.projections` → each row: scenario text, days label, `+X pts` in green
    - [ ] Loading state for simulator data
  - [ ] Empty state: if no violations, show "🎉 No violations in your record" card
  - [ ] Fire analytics `breakdown_viewed` on mount with `{ score, violationCount }`

### scoreBands Unit Tests
- [ ] **`src/constants/scoreBands.test.js`**
  - [ ] `getBand(0)` → Poor
  - [ ] `getBand(299)` → Poor
  - [ ] `getBand(300)` → Below Average
  - [ ] `getBand(649)` → Average (boundary check)
  - [ ] `getBand(650)` → Good
  - [ ] `getBand(800)` → Excellent
  - [ ] `getBand(900)` → Excellent
  - [ ] `scoreToAngle(0)` → -90
  - [ ] `scoreToAngle(900)` → 90
  - [ ] `scoreToAngle(450)` → 0

### formatters Unit Tests
- [ ] **`src/utils/formatters.test.js`**
  - [ ] `formatINR(2094)` → "₹2,094"
  - [ ] `formatINR(0)` → "₹0"
  - [ ] `maskString("UP14123456789", 4)` → "•••••••••6789"
  - [ ] `maskString("", 4)` → ""

---

## SPRINT 4 — Improve Screen & Rewards Screen

### TipCard Component
- [ ] **`src/components/TipCard.jsx`**
  - [ ] Left border colour by category: signal→red, helmet→amber, speed→orange, phone→blue, other→green — see SPECS §6.7
  - [ ] Icon (emoji), title (bold 13px), description (11px, line-height 1.5)
  - [ ] PropTypes — see SPECS §6.7

### ImproveScreen
- [ ] **`src/screens/ImproveScreen.jsx`**
  - [ ] Import and call `useScore()`
  - [ ] Green gradient hero banner — "Improve My Score" + current score subtitle
  - [ ] Streak card: flame icon (orange gradient bg), `score.stats.streak.currentDays` large number, "day streak" label, "Personal best: X days" — if `currentDays === 0` show motivational message instead
  - [ ] Next milestone countdown card (dark blue gradient):
    - [ ] Days until `score.nextMilestone.daysUntilExpiry` — large number
    - [ ] "days until [violationType] expires" label
    - [ ] "+X pts" score gain on right side in green
  - [ ] Goal progress section:
    - [ ] "Your Goal" header + "On Track" green badge (or "Behind" amber)
    - [ ] `<ProgressBar value={(score.current / score.target) * 100} animated={true} />`
    - [ ] Labels: `score.current` on left, `score.target` on right
  - [ ] Tips section header: "Safety Tips"
  - [ ] Map `TIPS` from `src/data/tips.js` → `<TipCard />` for each
  - [ ] Fire analytics `improve_screen_viewed` on mount with `{ score, streak: stats.streak.currentDays }`

### RewardCard Component
- [ ] **`src/components/RewardCard.jsx`**
  - [ ] Brand logo: `<img>` if `brandLogoUrl` exists, emoji fallback if not
  - [ ] Offer title in green (unlocked) or grey (locked)
  - [ ] Offer condition text in grey
  - [ ] Unlocked state: full opacity, "Redeem" `<Button>` — calls `onRedeem(reward.id)` — fire analytics `redeem_tapped`
  - [ ] Locked state: 60% opacity, no Redeem button, lock overlay badge: "🔒 Need X more pts" — tapping card calls `onLockedTap(reward.id)` — fire analytics `reward_locked_tap`
  - [ ] PropTypes — see SPECS §6.4
- [ ] **`src/components/RewardCard.test.jsx`**
  - [ ] Test: Redeem button visible when `isUnlocked=true`
  - [ ] Test: lock overlay visible when `isUnlocked=false`
  - [ ] Test: `onRedeem` called with correct id
  - [ ] Test: `onLockedTap` called when locked card tapped

### Redemption Modal
- [ ] **`src/components/RedemptionModal.jsx`**
  - [ ] Triggered from RewardsScreen after `rewardsService.redeem()` returns
  - [ ] Code variant: brand name, offer title, code in large monospace font, "Copy Code" button (uses `navigator.clipboard.writeText()`), expiry date with `formatDateIN()`
  - [ ] Deeplink variant: brand name, offer title, "Open Offer" button → `window.open(url, '_blank')`
  - [ ] Close button + backdrop click to dismiss

### Locked Reward Bottom Sheet
- [ ] **`src/components/LockedRewardSheet.jsx`**
  - [ ] Shows when locked card tapped
  - [ ] Lock icon + "This reward is locked"
  - [ ] "You need X more points to unlock [Brand]"
  - [ ] Mini progress bar: current score → required score
  - [ ] "Improve your score →" link → navigate to `/improve`

### RewardsScreen
- [ ] **`src/screens/RewardsScreen.jsx`**
  - [ ] Import and call `useRewards()`
  - [ ] Purple gradient hero: "🎁 Your Rewards" title, brand partners count, locked count subtitle
  - [ ] Score unlock prompt card: "Reach [nextUnlockScore] to unlock X more premium rewards" — computed from locked rewards
  - [ ] TP Premium Discount banner: shield icon, discount amount from `insurance.tpPremiumDiscount`, "Renew Now" → navigate `/insurance`
  - [ ] Category tabs: All · Fuel · Food · Auto · Travel · Shopping — `useState('all')` for active tab
  - [ ] Tab change: filter `rewards` array client-side by `category` — no new API call
  - [ ] 2-column grid: map filtered rewards → `<RewardCard onRedeem={handleRedeem} onLockedTap={handleLockedTap} />`
  - [ ] `handleRedeem`: call `rewardsService.redeem(id)`, open `<RedemptionModal>` with response data — loading state on card during API call, error toast on failure
  - [ ] `handleLockedTap`: open `<LockedRewardSheet>` with reward data via `useUI()` context
  - [ ] Empty state for each category tab: "No [category] rewards available right now"
  - [ ] Fire analytics `reward_tapped` on any card tap

---

## SPRINT 5 — Insurance Screen & Profile Screen

### InsurerRow Component
- [ ] **`src/components/InsurerRow.jsx`**
  - [ ] Logo: `<img>` if `logoUrl`, fallback coloured box with `logoFallbackText` and `logoFallbackBg` — see wireframe (BAJAJ ALLIANZ, ICICI LOMBARD style)
  - [ ] Insurer name (bold 13px), TP premium + "OD from ₹X" line — both formatted with `formatINR()`
  - [ ] "DBS ✓" green badge if `dbsParticipating=true`
  - [ ] Tap → calls `onGetQuote(quoteUrl)` — fire analytics `insurer_tapped`
  - [ ] Subtle hover/press lift effect (`translateY(-1px)`)
  - [ ] PropTypes — see SPECS §6.6

### InsuranceScreen
- [ ] **`src/screens/InsuranceScreen.jsx`**
  - [ ] Import and call `useInsurance()`
  - [ ] Orange-red gradient hero banner: "Insurance Renewal" title, "Your DBS score affects your TP premium" subtitle
  - [ ] Policy renewal due widget (in hero):
    - [ ] Policy expiry date formatted with `formatDateIN()`
    - [ ] Days countdown computed with `daysUntil(policy.expiryDate)`
    - [ ] Urgency styling (amber pulse) when `renewalDaysLeft ≤ 30`
  - [ ] Premium comparison card:
    - [ ] Title "How DBS Affects Your Premium"
    - [ ] Vehicle info subtitle: reg + make + cc
    - [ ] "Without DBS" row — red bg, `formatINR(pricing.standardTPPremium)`
    - [ ] "With your DBS (score)" row — green bg + border, `formatINR(pricing.dbsAdjustedPremium)`, score in parenthesis
    - [ ] Savings/loading banner: if `pricing.loadingAmount > 0` → red "Extra loading: ₹X" | if `pricing.discountAmount > 0` → green "You save: ₹X" | else green "No extra loading 🎉"
    - [ ] Blue info box: "Reach 800+ score to qualify for a premium discount" — show only if `score.current < 800`
  - [ ] "Get a Quote" section header + "DBS-participating insurers" subtitle
  - [ ] Map `insurers` → `<InsurerRow onGetQuote={handleGetQuote} />`
  - [ ] `handleGetQuote(quoteUrl)`: append UTM params → `window.open(url, '_blank')`
  - [ ] Empty state if no insurers
  - [ ] Loading skeleton for premium card + insurer list

### ProfileScreen
- [ ] **`src/screens/ProfileScreen.jsx`**
  - [ ] Import `useUser()`
  - [ ] Avatar: profile photo if `profilePhotoUrl`, else initials avatar (first + last name initial, coloured circle)
  - [ ] User name (read-only in MVP)
  - [ ] Mobile number: masked display — "+91 ••••••" + last 4 digits
  - [ ] Licence number: `maskString(licence.number, 4)` display
  - [ ] Linked vehicles section: map `user.vehicles` → registration chip + type label
  - [ ] DBS score badge: small coloured badge matching current band
  - [ ] Notifications toggle: `useState` initialized from `localStorage.getItem('tr_notifs_enabled')`, persists to localStorage on change
  - [ ] App version: pull from `package.json` via `import.meta.env.VITE_APP_VERSION` or hardcode "v1.0.0" for MVP
  - [ ] Logout button: calls `logout()` from `useUser()`, navigates to `/onboarding/login`, fire analytics `logout`

### BottomNav Component
- [ ] **`src/components/BottomNav.jsx`**
  - [ ] `NAV_TABS` array: Home (`/home`), Score (`/score`), Rewards (`/rewards`), Insurance (`/insurance`), Profile (`/profile`) — see SPECS §6.3
  - [ ] Use `useLocation()` to detect active tab — `location.pathname.startsWith(tab.path)`
  - [ ] Use `useNavigate()` for navigation
  - [ ] Active tab: blue-light background, blue label colour
  - [ ] Inactive tab: grey label
  - [ ] Min tap target 44×44px per tab enforced with padding
  - [ ] `position: sticky; bottom: 0; z-index: 50`
  - [ ] Fire analytics `tab_switched` with `{ from: currentPath, to: tab.path }` on every tab change

---

## SPRINT 6 — API Integration (Swap Mock → Real)

### Wire Up Real API
- [ ] Set `VITE_USE_MOCK_DATA=false` in `.env.staging`
- [ ] **`src/hooks/useScore.js`** — swap mock import for `scoreService.getScore()` call
- [ ] **`src/hooks/useViolations.js`** — swap mock import for `violationService.getViolations()` call
- [ ] **`src/hooks/useRewards.js`** — swap mock import for `rewardsService.getRewards()` call
- [ ] **`src/hooks/useInsurance.js`** — swap mock import for `insuranceService.getInsurance()` + `getInsurers()` calls
- [ ] **`src/hooks/useScore.js`** — add `scoreService.getSimulator()` call for What If projections
- [ ] **`src/context/UserContext.jsx`** — wire `userService.getMe()` on mount for authenticated users

### Auth Integration
- [ ] **`src/screens/LoginScreen.jsx`** — wire `authService.sendOtp()` + `authService.verifyOtp()` real calls
- [ ] Verify JWT is stored in `localStorage` key `tr_jwt` on successful login
- [ ] Test 401 redirect flow end-to-end

### Validate Response Shapes
- [ ] Verify `GET /score` response matches `mockScore` shape — adjust hook if fields differ
- [ ] Verify `GET /violations` response matches `mockViolations` shape — adjust if paginated differently
- [ ] Verify `GET /rewards` response matches `mockRewards` shape
- [ ] Verify `GET /insurance` response matches `mockInsurance` shape
- [ ] Verify `POST /rewards/:id/redeem` response matches expected `{ type, value, expiresAt }` shape

### Error State Testing
- [ ] Test each screen with API returning 500 — verify `<ErrorState>` renders
- [ ] Test each screen with API returning 401 — verify redirect to login
- [ ] Test app on slow network (throttle to Slow 3G in devtools) — verify skeletons show

---

## SPRINT 7 — QA, Polish & README

### Cross-Screen QA Checklist
- [ ] Navigate to every screen via BottomNav — verify active tab highlights correctly
- [ ] Verify `ProtectedRoute` redirects unauthenticated users to `/onboarding/login`
- [ ] Verify `ProtectedRoute` allows authenticated users through
- [ ] Verify logout clears JWT and redirects to login
- [ ] Test back navigation on Score Breakdown — `useNavigate(-1)` works

### Responsiveness QA
- [ ] Test at 375px viewport (iPhone SE) — no horizontal overflow
- [ ] Test at 390px viewport (iPhone 14) — matches wireframe layout
- [ ] Test at 430px viewport (iPhone 14 Pro Max) — no layout breaks

### Accessibility QA
- [ ] `<ScoreGauge>` has `role="img"` and `aria-label` with score + band
- [ ] All interactive elements are keyboard focusable (Tab key navigation)
- [ ] All buttons have accessible labels — no icon-only buttons without `aria-label`
- [ ] Colour is never the only indicator (violation impact shows text label AND colour)
- [ ] Minimum tap targets are 44×44px — check BottomNav, Redeem buttons, ViolationItem

### Performance QA
- [ ] Run `npm run build` — check bundle sizes in terminal output
- [ ] Verify `vendor`, `charts`, `axios` chunks are split correctly
- [ ] Open Lighthouse in Chrome DevTools — LCP target < 2.5s on simulated 4G
- [ ] Verify score gauge needle animation is smooth (60fps) — check in Chrome Performance tab

### Final Test Run
- [ ] `npm run test:run` — all tests pass
- [ ] `npm run lint` — zero errors
- [ ] `npm run build` — build succeeds with no errors

### README
- [ ] Fill in `README.md` using template from SPECS §19
- [ ] Add actual team members to contributors section
- [ ] Verify all setup steps work on a fresh `git clone` (test on a second machine or clean directory)
- [ ] Add link to PRD and SPECS documents in README

### Final Git
- [ ] Merge `dev` → `main` via PR
- [ ] Tag release: `git tag v0.1.0`
- [ ] Push tags: `git push origin --tags`
- [ ] Share repo URL with all team members

---

## BACKLOG — Post-MVP / Phase 2
> Do not start these until MVP is shipped and validated.

- [ ] Challan dispute in-app flow (currently external link to Parivahan)
- [ ] In-app insurance purchase (currently just referral deep link)
- [ ] Push notifications via Firebase (score change, renewal reminder)
- [ ] Hindi language support (i18n setup with `react-i18next`)
- [ ] Telematics / real-time driving tracking (GPS + accelerometer)
- [ ] Multi-vehicle management (add/remove vehicles, per-vehicle score)
- [ ] Score sharing — shareable badge image (Canvas API)
- [ ] Peer leaderboard / percentile comparison
- [ ] Interactive "What If" simulator (user-input hypothetical scenarios)
- [ ] Migrate to Zustand for state management (replace Context)
- [ ] Migrate to Next.js App Router when SSR / SEO needed
- [ ] JWT httpOnly cookies (replace localStorage — security upgrade)
- [ ] Error tracking with Sentry
- [ ] Analytics with Mixpanel or Amplitude
- [ ] Fleet / B2B dashboard (separate app)
- [ ] Admin CMS for managing tips content and reward catalogue

---

*Last updated: March 2026 | Companion docs: PRD-TrafficRewards-ConsumerApp.md · SPECS-TrafficRewards-ConsumerApp.md*
