#!/bin/bash

echo "🌑 ShadowChain - Starting Simulation..."
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found! Please install Python 3.8+"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Please install Node.js 16+"
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo "✅ Node.js found: $(node --version)"
echo ""

# Start backend in background
echo "🚀 Starting Backend (Mock Node)..."
python3 mock-node.py &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"
echo "   Running on http://localhost:8899"
echo ""

# Wait for backend to start
sleep 2

# Check if frontend dependencies are installed
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies (first time only)..."
    echo "   This will take 1-2 minutes..."
    cd frontend
    npm install
    cd ..
    echo ""
fi

# Start frontend
echo "🚀 Starting Frontend..."
echo "   Opening on http://localhost:3003"
echo ""
cd frontend
PORT=3003 npm start &
FRONTEND_PID=$!

echo ""
echo "════════════════════════════════════════════════════"
echo "✅ ShadowChain is running!"
echo ""
echo "   Backend:  http://localhost:8899"
echo "   Frontend: http://localhost:3003"
echo ""
echo "   Backend PID:  $BACKEND_PID"
echo "   Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both services"
echo "════════════════════════════════════════════════════"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT TERM
wait

