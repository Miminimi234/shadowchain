#!/bin/sh

set -eu
if [ -n "${BASH_VERSION:-}" ]; then
  set -o pipefail
fi

APT_UPDATED=0

apt_install() {
  if ! command -v apt-get >/dev/null 2>&1; then
    return 1
  fi

  export DEBIAN_FRONTEND=noninteractive
  if [ "${APT_UPDATED}" -eq 0 ]; then
    apt-get update
    APT_UPDATED=1
  fi
  apt-get install -y "$@"
}

log() {
  echo "[shadowchain] $1"
}

log "Starting simulation..."
echo

# Ensure Python 3 is available (Railway containers may not have it preinstalled)
if ! command -v python3 >/dev/null 2>&1; then
  log "Python 3 not found. Attempting installation..."
  if ! apt_install python3 python3-pip; then
    log "apt-get not available; cannot auto-install Python."
  fi
fi

if ! command -v python3 >/dev/null 2>&1; then
  log "Python 3.8+ is required. Please install it and redeploy."
  exit 1
fi

# Ensure Node.js (>=16) is available
node_major_version() {
  if ! command -v node >/dev/null 2>&1; then
    echo "0"
    return
  fi
  node -p "parseInt(process.versions.node.split('.')[0], 10)" 2>/dev/null || echo "0"
}

NODE_MAJOR="$(node_major_version)"
if [ "${NODE_MAJOR}" -lt 16 ]; then
  if [ "${NODE_MAJOR}" -eq 0 ]; then
    log "Node.js not found. Attempting installation..."
  else
    log "Node.js version $(node -v 2>/dev/null) detected (<16). Attempting upgrade..."
  fi
  if ! apt_install nodejs npm; then
    log "apt-get not available; cannot auto-install Node.js."
  fi
  NODE_MAJOR="$(node_major_version)"
fi

if [ "${NODE_MAJOR}" -lt 16 ]; then
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
