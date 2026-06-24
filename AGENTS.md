# web-portofolio

This is a **Next.js 16.2.4** (App Router) + **React 19.2.4** single-page portfolio.

## Framework quirks

- Next.js 16 has breaking changes from your training data. Before writing code, read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.
- Tailwind CSS **v4** — uses `@import "tailwindcss"` in CSS, **not** the old `@tailwind` directives. PostCSS plugin is `@tailwindcss/postcss`.
- Plain JavaScript (no TypeScript). Path alias `@/*` maps to project root via `jsconfig.json`.

## Architecture

- **`app/layout.js`** — root layout (metadata, global `<html>`/`<body>`).
- **`app/page.js`** — the only page. `"use client"` component. Single monolithic file (~425 lines) containing all sections (hero, about, projects, certificates, contact).
- **`public/`** — static assets including `profile.jpg` (referenced in the page).
- Data fetched client-side from **Supabase** (`projects` and `certificates` tables).

## Required environment

Create `.env.local` with these vars (currently gitignored by `.env*`):

```
NEXT_PUBLIC_SUPABASE_URL=<url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<key>
```

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint (`eslint-config-next/core-web-vitals`) |

## Database — `reviews` table

Created in Supabase via SQL Editor:

```sql
CREATE TABLE reviews (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  project_id BIGINT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  reviewer_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (project_id, reviewer_id)
);
```

- No Row Level Security (public anon key handles all operations).
- `UNIQUE(project_id, reviewer_id)` prevents double-vote at DB level.
- Reviewer ID is a UUID stored in `localStorage('reviewer_id')`.

## API — `app/api/reviews/route.js`

| Method | Query | Headers | Returns |
|--------|-------|---------|---------|
| `GET` | — | — | `{ projects: { [project_id]: { average, count } } }` |
| `GET` | `?project_id=X` | `X-Reviewer-ID` | `{ average, count, userRating }` |
| `POST` | — | `X-Reviewer-ID`, `Content-Type: application/json` | `{ success, average, count }` |

Body: `{ project_id, rating }` (1–5)

## Gotchas

- **No test runner** configured.
- Contact form is **visual-only** — button has `type="button"` and no `onSubmit` handler. Not functional.
- `.env.local` is gitignored — but you'll need it locally to run the app (Supabase client errors otherwise).
