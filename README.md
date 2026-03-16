# TrafficRewards — Consumer App (Driver Behaviour Score)

A React-based mobile web app that helps Indian drivers understand and improve their Driver Behaviour Score (DBS) — a 0–900 composite score calculated from traffic violations and driving patterns.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Create local environment file
cp .env.example .env.local
```

### Development

```bash
# Start dev server (http://localhost:5173)
npm run dev

# Run linter
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run tests once
npm run test:run

# Generate coverage report
npm run test:coverage
```

### Build

```bash
# Build for production
npm build

# Preview production build locally
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable UI components
│   └── ui/           # UI primitives (Button, Badge, etc.)
├── screens/          # Full screen components
├── context/          # React Context providers
├── hooks/            # Custom React hooks
├── services/         # API & service layer
├── data/             # Mock data
├── utils/            # Utility functions
├── constants/        # App-wide constants
└── test/             # Test configuration
```

## Configuration

### Environment Variables

See `.env.example` for all available variables:

- `VITE_API_BASE_URL` — Backend API base URL
- `VITE_USE_MOCK_DATA` — Use mock data instead of API (dev/test)
- `VITE_ENABLE_ANALYTICS` — Enable analytics tracking

### Tailwind CSS

Custom colors, fonts, and extended config in `tailwind.config.js`.

### Path Aliases

- `@` → `src/`
- `@components` → `src/components/`
- `@screens` → `src/screens/`
- `@hooks` → `src/hooks/`
- `@context` → `src/context/`
- `@services` → `src/services/`
- `@data` → `src/data/`
- `@utils` → `src/utils/`
- `@constants` → `src/constants/`

## Tech Stack

- **React** 18 — UI library
- **Vite** 5 — Build tool & dev server
- **React Router** 6 — Client-side routing
- **Tailwind CSS** 3 — Styling
- **Recharts** 2 — Data visualization
- **Axios** — HTTP client
- **Vitest** — Test runner
- **ESLint & Prettier** — Code quality

## Development Workflow

1. Create a feature branch: `git checkout -b feat/feature-name`
2. Make changes and test: `npm run dev` & `npm run test`
3. Lint & format: `npm run lint:fix`
4. Commit with conventional messages: `git commit -m "feat(home): add score gauge"`
5. Push and create a PR against `dev` branch

### Commit Message Format

```
type(scope): message
feat(home): add score gauge animation
fix(rewards): correct locked card opacity
chore(deps): bump recharts to 2.12.0
refactor(hooks): extract useScore from HomeScreen
test(gauge): add unit tests for score band mapping
docs(readme): update setup instructions
```

Types: `feat` | `fix` | `chore` | `refactor` | `test` | `docs` | `style` | `perf`

## Design System

Color palette defined in `tailwind.config.js`:

- **Score Bands**: Poor (red), Below Average (orange), Average (yellow), Good (blue), Excellent (green)
- **Brand Colors**: Shades of blue (primary)
- **Neutral**: Full grayscale for text, borders, backgrounds

Fonts:
- **Nunito** — Body text (400, 600, 700, 900)
- **Space Grotesk** — Display/headings (500, 700)

## License

Proprietary — DBS Insurance Partners Inc.
