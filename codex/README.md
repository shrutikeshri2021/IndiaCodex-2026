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

## 🎮 Core Gameplay & Web3 Features

### 📈 Dynamic Fate Scoring (Based on Your Story Decisions)
The game tracks your "Fate Points" throughout the 5-round adventure. Each time you choose a path:
* The Gemini AI evaluates the situation and the consequence of your choice.
* The score increases or decreases dynamically (by up to 10 points per round) based on the danger, magic, or wisdom of your action.
* Your final cumulative score represents your survival rating and serves as the baseline for your certificate's value and your ranking on the global leaderboard.

### ⛓️ On-Chain Metadata Transactions
Upon completing all five rounds, you can write your unique adventure history to the blockchain:
* The app connects to your Cardano wallet (Lace, Eternl, etc.) on the Preprod Testnet.
* It constructs a transaction sending a small ADA fee (1.5 tADA) to your own address.
* Crucially, the transaction includes custom **metadata** (Label `674`). This metadata embeds your final score, the adventure realm, the date/time, and a chronological recap of all five round choices you made.
* Once you sign the transaction, it is broadcast to the ledger, creating a permanent, cryptographically verified record of your accomplishment.

### 📜 Automated Certificate Generation
Once the transaction is successfully submitted to the ledger:
* The app retrieves the transaction hash (`txHash`).
* It automatically compiles a premium **Quest Certificate** card in the UI.
* The certificate binds your player name, the realm theme, the final score, the date, and the transaction hash into a premium glassmorphic display.

### 📥 High-Resolution Certificate Downloads
Beside the leaderboard at the bottom of the screen, you can instantly download a physical copy of your certificate:
* Clicking the **"Download PNG"** button triggers a background canvas renderer.
* It draws a high-resolution (`1200x800`) certificate featuring custom theme gradients (e.g. golden for fantasy, cosmic blue for space, neon green for cyberpunk), ornamental patterns, a verified seal, and the transaction hash.
* It exports this canvas as a high-quality PNG image and downloads it automatically to your device.

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

---

## ☁️ Deployment on Vercel

You can deploy this project to Vercel in just a few clicks by linking your GitHub repository:

### Step 1: Import Project to Vercel
1. Go to the [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New" ➔ "Project"**.
2. Link your GitHub account and import the repository `shrutikeshri2021/IndiaCodex-2026`.

### Step 2: Configure Project Settings
In the configuration screen, make sure to adjust these settings:
1. **Root Directory**: Click "Edit" and select the **`codex`** folder. (This tells Vercel to build the frontend and run the serverless function relative to the `codex/` subfolder).
2. **Framework Preset**: Vercel will automatically detect **Vite**.
3. **Environment Variables**: Expand the environment variables section and add the following keys:
   * `GOOGLE_AI_API_KEY` = *[Your Gemini API Key]*
   * `VITE_SUPABASE_URL` = *[Your Supabase URL]*
   * `VITE_SUPABASE_ANON_KEY` = *[Your Supabase Anon Key]*

### Step 3: Deploy!
Click **"Deploy"**. Vercel will build the frontend assets, host the `/api/generate-story` serverless function, and generate a live URL for your choice adventure game.