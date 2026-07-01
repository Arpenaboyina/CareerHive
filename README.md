# CareerHive

A premium, production-ready **Job Board** web application built with **React.js** (JavaScript ES6+), **React Router DOM v6**, and **pure vanilla CSS3** using custom properties. CareerHive helps engineers discover and apply to the best software engineering roles at world-class companies.

Designed to feel like a modern tech-startup product (think Linear / Wellfound / LinkedIn Jobs) with a custom dark/light theme, polished micro-animations, fully responsive layouts, semantic HTML5, and accessibility baked in.

**Live demo:** [https://career-hive-theta.vercel.app/](https://career-hive-theta.vercel.app/)

---

## Features

- **Light & dark mode** — CSS variable based theming with persistence
- **40 curated jobs** — rich, realistic software-engineering dataset
- **Browse & search** — keyword search across titles, companies, skills
- **Advanced filters** — job type, experience level, work mode, salary, category
- **Pagination** — clean, accessible page navigation
- **Favorites** — save jobs locally (persisted via `localStorage`)
- **Recently viewed** — automatically tracks jobs you open
- **Toasts** — non-blocking feedback for user actions
- **Skeleton loaders & empty states** — graceful loading and zero-result UX
- **Fully responsive** — seamless breakpoints from mobile to desktop
- **Accessible** — semantic markup, focus states, ARIA attributes, keyboard support

---

## Tech Stack

| Layer | Technology |
| ----- | ---------- |
| UI | React.js (functional components + hooks) |
| Routing | React Router DOM v6 |
| Icons | lucide-react |
| Styling | Pure vanilla CSS3 with custom properties |
| Data | Static JSON dataset (no backend) |

No TypeScript, no CSS frameworks, no backend.

---

## Getting Started

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

**Production build:**

```bash
npm run build
```

**Available npm scripts:**

| Command | Description |
| ------- | ----------- |
| `npm start` | Start development server |
| `npm run build` | Create optimized production build |
| `npm test` | Run test suite |
| `npm run ci` | Install, build, and test (same as CI pipeline) |

---

## CI/CD Pipeline

CareerHive includes a **simple, fast CI/CD setup** (~35 seconds per run) that automatically builds, tests, and deploys the app on every push to `main`.

### What the green checkmark means

When you see a ✅ on GitHub Actions, it means the pipeline **passed all steps successfully**:

1. **Install** — dependencies installed with `npm ci`
2. **Build** — production bundle compiled with no errors
3. **Test** — test suite completed
4. **Deploy** — (on push to `main` only) site published to GitHub Pages

A failed run (❌) means one of these steps broke — click **Details** in the Actions tab to see the exact error.

### Automated pipeline (GitHub Actions)

**File:** `.github/workflows/ci.yml`

```
Push / PR to main
       │
       ▼
  npm ci ──► npm run build ──► npm test
       │
       ▼ (push to main only)
  Deploy to gh-pages branch ──► Live on GitHub Pages
```

| Trigger | What runs |
| ------- | --------- |
| Pull request to `main` | Install → Build → Test |
| Push to `main` | Install → Build → Test → **Deploy** |

### Local CI scripts (manual / shareable)

Run the same checks locally before pushing:

```bash
# Linux / Mac / Git Bash
bash scripts/ci.sh

# Windows PowerShell
.\scripts\ci.ps1

# Cross-platform (via npm)
npm run ci
```

These scripts mirror the GitHub Actions steps so anyone can verify the project works on their machine.

### GitHub Pages setup (one time)

1. Go to **Settings → Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `gh-pages` → folder `/ (root)` → Save

After the next push to `main`, the site is live at:
**https://arpenaboyina.github.io/CareerHive/**

### Docker deployment (optional)

```bash
docker build -t careerhive .
docker run -p 8080:80 careerhive
```

Open [http://localhost:8080](http://localhost:8080).

---

## Project Structure

```text
careerhive/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD pipeline
├── public/                     # Static HTML shell + manifest
├── scripts/
│   ├── ci.sh                   # Local CI script (Linux/Mac)
│   └── ci.ps1                  # Local CI script (Windows)
├── src/
│   ├── assets/                 # Image assets
│   ├── components/
│   │   ├── common/             # Navbar, Footer, ThemeToggle, Toast, ScrollToTop
│   │   ├── fallback/           # LoadingSpinner, SkeletonLoader, EmptyState
│   │   └── features/           # Home, Jobs, Pagination feature components
│   ├── context/                # AppContext (global state)
│   ├── data/                   # jobsData (40 static jobs)
│   ├── hooks/                  # useLocalStorage
│   ├── pages/                  # Route-level pages
│   ├── styles/                 # variables.css + global.css
│   ├── App.js                  # Router configuration
│   └── index.js                # Entry point
├── Dockerfile                  # Multi-stage Docker build
├── nginx.conf                  # Nginx config for Docker
├── package.json
└── README.md
```

---

## Repository

**GitHub:** [github.com/Arpenaboyina/CareerHive](https://github.com/Arpenaboyina/CareerHive)
**Live Demo:**[https://career-hive-theta.vercel.app/](https://career-hive-theta.vercel.app/)

---

## License

MIT — built for demonstration purposes.
