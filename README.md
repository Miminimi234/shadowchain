# 🌑 ShadowChain - Deployment Package

Privacy-Native High-Performance Blockchain Simulation

---

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Setup (Takes 10 seconds - Ready to Run!)

```bash
# 1. Start Backend (Mock Node)
python3 mock-node.py
# Runs on http://localhost:8899

# 2. Start Frontend (in new terminal)
cd frontend
PORT=3003 npm start
# Opens at http://localhost:3003

# NO npm install needed - dependencies included!
```

---

## 📁 What's Included

```
shadowchainzip/
├── mock-node.py              # Backend simulation (Python)
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # Main application
│   │   ├── shadow-theme.css # Complete UI theme
│   │   ├── pages/           # 6 page components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Consensus.tsx
│   │   │   ├── Privacy.tsx
│   │   │   ├── Transactions.tsx
│   │   │   ├── Wallet.tsx
│   │   │   └── Validators.tsx
│   │   └── hooks/           # React hooks
│   │       ├── useChainMetrics.ts
│   │       └── useWebSocket.ts
│   ├── public/              # Static assets
│   ├── package.json         # Dependencies
│   └── tsconfig.json        # TypeScript config
└── README.md                # This file
```

---

## 🎨 Features

### Backend (mock-node.py)
- **Simulated Proof of History** - Hash chain updates every 400ms
- **Tower BFT Consensus** - Validator voting simulation
- **Sapling Privacy Pool** - Shielded transaction tracking
- **Real-time Metrics** - Slot counter, TPS, privacy stats
- **21 Validators** - Stake-weighted leader rotation

### Frontend (React + TypeScript)
- **6 Complete Pages:**
  1. Dashboard - Live PoH ticker, metrics, activity
  2. Consensus - PoH visualizer, Tower BFT, slot production
  3. Privacy Pool - Sapling stats, Merkle tree, nullifiers
  4. Transactions - All 4 types (t→t, t→z, z→t, z→z)
  5. Wallet - Generate transparent + shielded addresses
  6. Validators - 21 validator grid with stake distribution

- **UI Features:**
  - Dark terminal aesthetic (black + electric cyan)
  - Montserrat font (clean, professional)
  - Real-time updates every 2 seconds
  - Monaco monospace for technical data
  - Responsive design
  - Smooth animations

---

## 🔧 Configuration

### Backend Port
Change in `mock-node.py`:
```python
PORT = 8899  # Change this line
```

### Frontend Port
Change when starting:
```bash
PORT=3003 npm start  # Use any port
```

### Update Frequency
In `frontend/src/hooks/useChainMetrics.ts`:
```typescript
const interval = setInterval(fetchMetrics, 2000); // Change 2000 = 2 seconds
```

---

## 📊 Architecture

```
┌─────────────────┐         HTTP/JSON          ┌─────────────────┐
│                 │ <──────────────────────────> │                 │
│  React Frontend │    localhost:8899/shadow/*  │   Mock Node     │
│  (Port 3003)    │                              │   (Port 8899)   │
│                 │                              │   (Python)      │
└─────────────────┘                              └─────────────────┘
        │                                                │
        │                                                │
    Browser UI                                     Simulated
    • 6 Pages                                      • PoH Ticker
    • Real-time                                    • Block Counter
    • Metrics                                      • TPS Simulation
                                                   • Privacy Pool
                                                   • Validators
```

---

## 🌐 API Endpoints

The mock node provides these endpoints:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Node health check |
| `/shadow/info` | GET | Chain metrics, PoH, consensus, privacy |
| `/shadow/explorer` | GET | Recent transactions |
| `/shadow/privacy-stats` | GET | Privacy metrics |
| `/shadow/zkp-stats` | GET | Sapling circuit performance |
| `/shadow/validators` | GET | Validator list |
| `/shadow/balance` | GET/POST | Account balance queries |
| `/shadow/tx` | POST | Submit transaction |

---

## 🎯 Key Concepts

### Proof of History (PoH)
- Cryptographic clock (SHA256 hash chain)
- Verifiable time ordering
- 100 hashes per tick
- Slot advances every 400ms

### Tower BFT
- Stake-weighted voting
- 66.67% supermajority for finality
- Leader rotates every 4 slots (1.6s)
- 21 validators with different stakes

### Sapling Privacy
- Shielded pool with note commitments
- Nullifier set for double-spend prevention
- 4 transaction types:
  - **t→t** Transparent (public)
  - **t→z** Shield (hide funds)
  - **z→t** Unshield (reveal funds)
  - **z→z** Private transfer (fully hidden)

---

## 🔨 Building From Source

If you want to rebuild everything:

```bash
# Backend (no build needed - Python)
python3 mock-node.py

# Frontend (rebuild if you modify code)
cd frontend
npm install     # Install dependencies
npm start       # Development server
npm run build   # Production build (creates /build folder)
```

---

## 📝 Customization

### Change Colors
Edit `frontend/src/shadow-theme.css`:
```css
:root {
  --accent-cyan: #00d4ff;    /* Primary color */
  --accent-purple: #6366f1;  /* Shielded operations */
}
```

### Add New Page
1. Create `frontend/src/pages/NewPage.tsx`
2. Add route in `App.tsx`
3. Add nav button in sidebar
4. Add CSS styles

### Modify Mock Data
Edit `mock-node.py` - all simulation logic is in one file!

---

## 🐛 Troubleshooting

**Frontend won't start:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
PORT=3003 npm start
```

**Backend port in use:**
```bash
# Kill process on port 8899
lsof -ti:8899 | xargs kill -9

# Or change port in mock-node.py
```

**CORS errors:**
- Check backend is running on port 8899
- Check CORS headers in mock-node.py

---

## 📦 Package Info

**Size:**
- Complete package: ~400 MB (includes node_modules)
- Source code only: ~1 MB
- No Rust compilation needed!
- No npm install needed - ready to run!

**Stack:**
- Backend: Python 3 (zero dependencies)
- Frontend: React 18 + TypeScript + Vite
- Styling: Custom CSS (no framework)

---

## 🌟 Features Demonstrated

### Solana Architecture
✅ Proof of History hash chain  
✅ Tower BFT consensus  
✅ 400ms slot time  
✅ Leader schedule rotation  
✅ Epoch system  
✅ 21 validators  
✅ 50K+ TPS simulation  

### Privacy Features
✅ Sapling shielded pool  
✅ Note commitment tree  
✅ Nullifier set  
✅ 4 transaction types  
✅ Shadow addresses  
✅ Privacy metrics  
✅ Circuit performance  

---

## 📄 License

Educational simulation project.

---

## 🚀 Next Steps

1. Start both backend and frontend
2. Visit http://localhost:3003
3. Explore all 6 pages
4. Generate wallet addresses
5. View validator grid
6. Check privacy pool stats

---

**🌑 ShadowChain - Privacy-Native Blockchain Simulation**

Built with React + TypeScript + Python

