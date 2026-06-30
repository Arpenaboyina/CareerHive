# CareerHive

A premium, production-ready **Job Board** web application built with **React.js** (JavaScript ES6+), **React Router DOM v6**, and **pure vanilla CSS3** using custom properties. CareerHive helps engineers discover and apply to the best software engineering roles at world-class companies.

Designed to feel like a modern tech-startup product (think Linear / Wellfound / LinkedIn Jobs) with a custom dark/light theme, polished micro-animations, fully responsive layouts, semantic HTML5, and accessibility baked in.

## Features

- **Light & dark mode** — CSS variable based theming with persistence.
- **40 curated jobs** — rich, realistic software-engineering dataset.
- **Browse & search** — keyword search across titles, companies, skills.
- **Advanced filters** — job type, experience level, work mode, salary, category.
- **Pagination** — clean, accessible page navigation.
- **Favorites** — save jobs locally (persisted via `localStorage`).
- **Recently viewed** — automatically tracks jobs you open.
- **Toasts** — non-blocking feedback for user actions.
- **Skeleton loaders & empty states** — graceful loading and zero-result UX.
- **Fully responsive** — seamless breakpoints from mobile to desktop.
- **Accessible** — semantic markup, focus states, ARIA attributes, keyboard support.

## Tech Stack

- React.js (functional components + hooks)
- React Router DOM v6
- lucide-react (SVG icons)
- Pure vanilla CSS3 with custom properties

No TypeScript, no CSS frameworks, no backend.

## Getting Started

```bash
npm install
npm start
```

The app runs at [http://localhost:3000](http://localhost:3000).

To create an optimized production build:

```bash
npm run build
```

## CI/CD

A GitHub Actions pipeline lives in `.github/workflows/ci.yml`:

- **CI** runs on every push and pull request to `main`/`master`:
  - installs dependencies with `npm ci` (reproducible, lockfile-based),
  - runs a production build with `CI=true` so any warning fails the build,
  - runs the test suite, across a Node 18.x / 20.x matrix,
  - uploads the `build/` output as an artifact.
- **CD** deploys to **GitHub Pages** automatically on pushes to the default branch
  (configures Pages, sets the correct `PUBLIC_URL` sub-path, adds a `404.html`
  SPA fallback, and publishes).

> This workflow assumes `careerhive/` is the repository root. To enable Pages
> deploys, go to **Settings → Pages → Build and deployment → Source: GitHub Actions**.

### Containerized deployment (optional)

A multi-stage `Dockerfile` builds the app and serves it with nginx (with SPA
history fallback and asset caching configured in `nginx.conf`):

```bash
docker build -t careerhive .
docker run -p 8080:80 careerhive
```

Then open [http://localhost:8080](http://localhost:8080).

## Project Structure

```text
careerhive/
├── public/                  # Static HTML shell + manifest
└── src/
    ├── assets/              # Image assets
    ├── components/
    │   ├── common/          # Navbar, Footer, ThemeToggle, Toast, ScrollToTop
    │   ├── fallback/        # LoadingSpinner, SkeletonLoader, EmptyState
    │   └── features/        # Home, Jobs, Pagination feature components
    ├── context/             # AppContext (global state)
    ├── data/                # jobsData (static dataset)
    ├── hooks/               # useLocalStorage
    ├── pages/               # Route-level pages
    ├── styles/              # variables.css + global.css
    ├── App.js               # Router configuration
    └── index.js             # Entry point
```

## License

MIT — built for demonstration purposes.
