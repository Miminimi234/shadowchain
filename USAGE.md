# 🌑 ShadowChain - Complete Usage Guide

## 🚀 Quick Start

### Start the System
```bash
# Terminal 1 - Backend
python3 mock-node.py

# Terminal 2 - Frontend  
cd frontend
PORT=3003 npm start
```

**Or use the launcher:**
```bash
./start.sh
```

---

## 🌐 Access Points

**Landing Page:** http://localhost:3003 (first visit)  
**Dashboard:** http://localhost:3003 (after clicking "Launch App")  
**Backend API:** http://localhost:8899  

---

## 📍 Features

### Landing Page (10 Sections)
1. **Hero** - Animated PoH background
2. **Problem** - Why privacy matters
3. **Solution** - ShadowChain's approach
4. **Features** - 8 core features
5. **How It Works** - Technical deep dive
6. **Privacy** - Cryptographic guarantees
7. **Use Cases** - Who needs this
8. **Tech Specs** - Full specifications
9. **Comparison** - vs Other chains
10. **CTA** - Launch buttons

### Dashboard (7 Pages)
1. **Dashboard** - Overview, PoH ticker, metrics
2. **Consensus** - PoH + Tower BFT visualization
3. **Privacy Pool** - Sapling shielded pool stats
4. **Transactions** - 4 transaction types (t→t, t→z, z→t, z→z)
5. **Wallet** - Generate transparent + shielded addresses
6. **Validators** - 21 validator grid
7. **Bridge** ⭐ NEW! - Transaction obfuscation

---

## 🌉 Using the Bridge

### Step 1: Deposit
1. Click "Bridge" in sidebar
2. Enter amount (e.g., 100 SHOL)
3. Enter from address
4. Choose privacy level:
   - **Fast:** 5 hops, 1 minute
   - **Standard:** 10 hops, 1 hour
   - **Maximum:** 20 hops, 24 hours
5. Click "DEPOSIT & SHIELD"
6. **SAVE YOUR BRIDGE ID!**

### Step 2: Monitor
- Watch real-time mixing progress
- See anonymity set grow
- Check privacy score
- View timeline progression

### Step 3: Withdraw
1. Go to "Withdraw" tab
2. Enter your Bridge ID
3. Click "Check Status"
4. When ready, enter withdrawal address
5. Click "WITHDRAW PRIVATELY"
6. Done! No on-chain link to deposit!

---

## 🎯 Privacy Levels Explained

| Level | Hops | Time | Decoys | Privacy Score | Best For |
|-------|------|------|--------|---------------|----------|
| Fast | 5 | 1 min | 5x | ~65 | Quick privacy |
| Standard | 10 | 1 hour | 10x | ~85 | Balanced |
| Maximum | 20 | 24 hours | 20x | ~98 | Maximum anonymity |

---

## 🔄 Viewing Landing Page Again

**Method 1: Clear localStorage**
```javascript
// In browser console:
localStorage.clear()
location.reload()
```

**Method 2: Incognito Window**
- Open http://localhost:3003 in incognito/private mode

**Method 3: Add Query Parameter**
```
http://localhost:3003?landing=true
```

---

## 📊 What Each Page Does

### Dashboard
- Live block counter (top right header)
- Real-time TPS
- Transaction type breakdown
- Recent activity
- Network health

### Consensus
- PoH hash display (updates live)
- Tower BFT statistics
- Slot production details
- Validator preview
- Leader info

### Privacy Pool
- Shielded pool statistics
- Shield/Private/Unshield operation counts
- Merkle tree visualization
- Nullifier set
- Sapling circuit performance

### Transactions
- 4 transaction type forms
- Submit transactions
- Real-time simulation

### Wallet
- Generate sol1... addresses
- Generate shadow1... addresses
- View spending + viewing keys
- Balance display

### Validators
- 21 validator grid
- Stake distribution
- Current leader highlighting
- Stake percentage bars

### Bridge ⭐
- Deposit funds
- Real-time mixing progress
- Withdraw to unlinked address
- Transaction history

---

## 🎨 UI Features

- **Font:** Montserrat (body) + Monaco (terminal/technical data)
- **Theme:** Pure black + electric cyan
- **Updates:** Real-time (2-3 second intervals)
- **Responsive:** Works on mobile/tablet/desktop
- **Network Badge:** Shows "TESTNET"

---

## 🧪 Testing Bridge Feature

**Test Deposit:**
```bash
curl -X POST http://localhost:8899/bridge/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "depositor": "sol1abc123",
    "amount": 100000000000,
    "privacy_level": "fast"
  }'
```

**Check Status:**
```bash
curl http://localhost:8899/bridge/status/bridge_a1b2c3d4
```

**View Stats:**
```bash
curl http://localhost:8899/bridge/stats
```

---

## 📦 Package Info

**Size:** ~400 MB (includes node_modules)  
**Source code:** ~2 MB  
**Ready to run:** Yes (no npm install needed)  

**Files:**
- `mock-node.py` - Backend simulation
- `frontend/` - Complete React app
- `README.md` - Setup instructions
- `start.sh` - One-click launcher

---

## 🌑 ShadowChain Complete System

Privacy-native blockchain with:
✅ Landing page  
✅ 7 dashboard pages  
✅ Bridge/obfuscation  
✅ Real-time updates  
✅ Complete privacy features  
✅ Production-ready UI  

**Everything in shadowchainzip/ - Ready to deploy!** 🚀
