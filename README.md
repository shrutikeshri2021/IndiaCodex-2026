# AI Choice Adventure

React + Vite game scaffold with Mesh wallet connect, Gemini-backed story generation, Supabase leaderboard storage, and an on-chain testnet certificate flow.

## Environment

Create a `.env` file at the project root with:

```env
GEMINI_API_KEY=your_key_here
VITE_SUPABASE_URL=your_url_here
VITE_SUPABASE_ANON_KEY=your_key_here
```

## Run

Install dependencies with your local Node toolchain, then run `npm run dev`.

The Vite dev server includes a local `/api/generate-story` handler, so the Gemini call stays server-side while the client only talks to the local API route.

## Notes

If the environment variables are missing, the app falls back to a deterministic story generator and still keeps the game playable.