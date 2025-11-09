#!/bin/bash

set -euo pipefail

log() {
  echo "[shadowchain] $1"
}

log "Starting simulation..."
echo

# Ensure Python 3 is available (Railway containers may not have it preinstalled)
if ! command -v python3 >/dev/null 2>&1; then
  log "Python 3 not found. Attempting installation..."
  if command -v apt-get >/dev/null 2>&1; then
    export DEBIAN_FRONTEND=noninteractive
    apt-get update && apt-get install -y python3 python3-pip
  else
    log "apt-get not available; cannot auto-install Python."
  fi
fi

if ! command -v python3 >/dev/null 2>&1; then
  log "Python 3.8+ is required. Please install it and redeploy."
  exit 1
fi

# Ensure Node.js is available
if ! command -v node >/dev/null 2>&1; then
  log "Node.js 16+ is required. Please install it and redeploy."
  exit 1
fi

log "Python: $(python3 --version)"
log "Node: $(node --version)"
echo

# Launch mock backend
log "Starting backend (mock-node.py) on http://localhost:8899 ..."
python3 mock-node.py &
BACKEND_PID=$!
log "Backend PID: $BACKEND_PID"
echo

sleep 2

# Install frontend deps if needed
if [ ! -d "frontend/node_modules" ]; then
  log "Installing frontend dependencies (npm install)..."
  (cd frontend && npm install)
  echo
fi

# Launch frontend
log "Starting frontend on http://localhost:3003 ..."
(cd frontend && PORT=3003 npm start) &
FRONTEND_PID=$!
log "Frontend PID: $FRONTEND_PID"
echo

log "ShadowChain is running."
log "Backend : http://localhost:8899"
log "Frontend: http://localhost:3003"
echo "Press Ctrl+C to stop both services."

trap 'kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit' INT TERM
wait
