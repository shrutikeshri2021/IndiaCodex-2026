# 🌌 AI Choice Adventure

Welcome to the **AI Choice Adventure**! This is a state-of-the-art, interactive text-adventure game where your decisions literally bend the fabric of the story. Driven by real-time generative AI and secured with decentralized Web3 certifications, it is a showcase of how gaming, artificial intelligence, and blockchain technology can merge into a seamless user experience.

---

## 🌟 What makes this game so fun?

* **Endless Replayability**: No two games are ever the same. The narrative is generated on-the-fly by AI based on your unique choices.
* **Curated Realms**: Embark on quests across four distinct universes:
  * 🧙‍♂️ **Fantasy**: Cross magical arches, invoke elder runes, and explore forgotten sanctuaries.
  * 🚀 **Space**: Drift through voids, track rogue signals, and navigate asteroid fields.
  * 🧟‍♂️ **Zombie**: Raid pharmacies, hold the line at Mall gates, and track eerie food court melodies.
  * 🏴‍☠️ **Pirate**: Board shadow ships, dive for sunken treasure bells, and chase ocean depths.
* **Fate Point Scores**: Your choices have weight! Gain or lose "Fate Points" dynamically depending on how daring, clever, or disastrous your decisions are.
* **Micro-Animations & Audio**: Complete with smooth Framer Motion transitions, responsive hover card states, typewriter text effects, and custom, retro audio-synth click feedback mapped to each realm.
* **On-Chain Trophies**: Survived 5 rounds? Mint your adventure story directly onto the Cardano Testnet as a permanent cryptographic certificate!

---

## 🛠️ Tech Stack: What I Used

The application is built on a modern, high-performance web development stack:
1. **Frontend Core**: **React 18** with **TypeScript** for rock-solid type safety and reusable component architecture.
2. **Build Tooling**: **Vite** for fast hot module replacement (HMR) and optimized building.
3. **Styling**: **Tailwind CSS** for a premium glassmorphic dark mode design and responsive layouts.
4. **Animations**: **Framer Motion** for card transitions and layout layout fades.
5. **Generative AI**: **Google Gemini 3.5 Flash** to power the story beats, generate option tags, and calculate dynamic score impacts.
6. **Database & Leaderboard**: **Supabase** (PostgREST + Postgres) to retrieve, order, and save high scores.
7. **Web3 Cardano Integration**: **Mesh SDK** (Core & React hooks) to interface with CIP-30 wallets (like Eternl or Lace) and structure metadata transactions.

---

## ⚙️ How It Works (Under the Hood)

```
[ Player makes a Choice ]
           │
           ▼
[ Vite Middleware (Express-like Server-side Handler) ]
           │
           ▼
[ Gemini 3.5 Flash API (Evaluates game history & choice consequences) ]
           │
           ▼
[ Story Beat Generated ] ➔ Returns:
  ├── 📖 2-4 sentences of new story text
  ├── 🧭 Exactly 3 custom choice options
  └── 📊 A dynamic scoreDelta (integer between -10 and 10)
           │
           ▼
[ Game Completes (5 rounds) ]
  ├── 🏆 Scores saved to Supabase Leaderboard
  └── 📜 Certificate minted on-chain using Cardano Mesh SDK (attaching recap to Tx metadata)
```

1. **AI Narrative Loop**: The frontend maintains a history array of prior decisions. On each turn, this history is sent to a server-side handler (`/api/generate-story`) running inside Vite. The handler queries the Gemini API with structured instructions, returning a cohesive, continuous story beat with exactly three unique paths and a score modifier.
2. **On-Chain Minting**: When minting a certificate, the Mesh SDK builds a testnet transaction on the Cardano Preprod network, setting the recipient as your own address. The game results—realm theme, final score, and choice history recap—are serialized directly into the transaction metadata block (Label `674`), creating a permanent on-chain record of your adventure.
3. **Leaderboard Tracking**: The final score is recorded in a Supabase table. The leaderboard dynamically queries the top 10 players based on score, showing their wallet addresses alongside custom identicon avatars generated from their address string hashes.

---

## 💡 Use Cases & Utility: Why is it useful?

* **Web3 Onboarding & Education**: Demonstrates a frictionless way to introduce users to Cardano wallets (Lace, Eternl, etc.) and transaction metadata creation.
* **On-Chain Achievements**: Showcases how metadata can be used as a cost-effective, decentralized database for game achievement systems, replacing standard server verification with ledger-based validity.
* **Generative Gaming Framework**: Provides a blueprint for building game loops where content is generated programmatically on demand, removing the need for pre-written script trees.
* **AI-Web3 Middleware Integration**: Serves as a reference implementation for securely combining client-side dApps, server-side AI middlewares, and database systems.

---

## 🚀 Getting Started

### 1. Environment Setup
Create a `.env.local` file inside the `codex/` directory containing:
```env
GOOGLE_AI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Installation
Navigate into the `codex/` directory and install dependencies:
```bash
cd codex
npm install
```

### 3. Run Development Server
Boot up the application:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to begin your adventure!