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

API_HOST=${API_HOST:-127.0.0.1}
API_PORT=${API_PORT:-8899}
APP_PORT=${PORT:-3000}

# Launch mock backend
log "Starting backend (mock-node.py) on http://${API_HOST}:${API_PORT} ..."
API_HOST=$API_HOST API_PORT=$API_PORT python3 mock-node.py &
BACKEND_PID=$!
log "Backend PID: $BACKEND_PID"
echo

sleep 2

# Install & build frontend
log "Installing frontend dependencies..."
(cd frontend && npm install)
echo

log "Building frontend..."
(cd frontend && npm run build)
echo

# Launch Express proxy/server
log "Starting frontend proxy on port ${APP_PORT} ..."
PORT=$APP_PORT API_HOST=$API_HOST API_PORT=$API_PORT node frontend/server.js &
SERVER_PID=$!
log "Frontend PID: $SERVER_PID"
echo

log "ShadowChain is running."
log "Backend : http://${API_HOST}:${API_PORT}"
log "Frontend: http://0.0.0.0:${APP_PORT}"
echo "Press Ctrl+C to stop both services."

trap 'kill $BACKEND_PID $SERVER_PID 2>/dev/null; exit' INT TERM
wait $SERVER_PID
