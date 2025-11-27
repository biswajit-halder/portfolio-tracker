# Portfolio Tracker

A simple MERN-style portfolio tracker for monitoring stock holdings, alerts, transactions and portfolio performance. This repository contains a Node/Express backend and a Vite + React frontend.

**Tech stack:** Node.js, Express, MongoDB (Mongoose), React, Vite, Tailwind CSS

**Contents:**

- `backend/` — Express API, MongoDB models, controllers, and background jobs
- `frontend/` — Vite + React application (UI, services, pages)

## Quick Start

Prerequisites:

- Node.js (v16+ recommended)
- npm (or yarn)
- MongoDB (Atlas or local)

1. Backend

- Copy `backend/.env.example` to `backend/.env` and fill in the values (do NOT commit secrets). The backend now reads the MongoDB connection from `MONGO_URI`.

Example `backend/.env`:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.example.mongodb.net/portfolio-tracker
JWT_SECRET=your_jwt_secret
PORT=5000
```

- Install dependencies and run in development (PowerShell):

```powershell
cd backend
npm install
npm run dev
```

- `npm run dev` uses `nodemon index.js`. For production run:

```powershell
npm start
```

2. Frontend

- Copy `frontend/.env.example` to `frontend/.env` and (optionally) set `VITE_API_URL` to point at your backend.

Example `frontend/.env`:

```
VITE_API_URL=http://localhost:5000
```

- Install dependencies and run the dev server:

```powershell
cd frontend
npm install
npm run dev
```

- Open the app in your browser at the address shown by Vite (usually `http://localhost:5173`).

## Environment variables

- Backend: `MONGO_URI`, `JWT_SECRET`, `PORT`. (See `backend/.env.example`.)
- Frontend: `VITE_API_URL` — used by the frontend to call the backend (see `frontend/.env.example`). The frontend falls back to `http://localhost:5000` when `VITE_API_URL` is not provided.

## Project structure (high level)

- `backend/`

  - `controllers/` — API route handlers
  - `models/` — Mongoose schemas
  - `routes/` — Express route definitions
  - `jobs/` — scheduled/sync jobs
  - `config/db.js` — DB connection (reads `MONGO_URI` from env)

- `frontend/`
  - `src/` — React app source
  - `src/pages/` — Screens and views
  - `src/services/` — API calls (reads `import.meta.env.VITE_API_URL`)

## Notes & Recommendations

- `frontend/src/services/api.js` reads `VITE_API_URL` (fallback `http://localhost:5000`) so the frontend can be pointed at different backends.
- A `backend/.env.example` and `frontend/.env.example` are included — copy them to `.env` and fill values.
- Add `.env` to `.gitignore` to avoid committing secrets.

- A `start` script was added to `backend/package.json` (`node index.js`) for running in production.

## Run both (quick examples)

Run backend and frontend in separate terminals (simple):

```powershell
# Terminal 1
cd backend
npm run dev

# Terminal 2
cd frontend
npm run dev
```

Run both with a single command using `concurrently` (no permanent changes required):

```powershell
# from the repo root (temporary, uses npx to run concurrently)
npx concurrently "npm run dev --prefix backend" "npm run dev --prefix frontend"
```

If you'd rather add a permanent script, install `concurrently` as a dev dependency and add a root script that runs both dev scripts.

## Contributing

- Feel free to open issues or PRs. If contributing, include clear descriptions and test steps.

## License

This project does not include a license. Add a `LICENSE` file if you intend to open-source it.

---
