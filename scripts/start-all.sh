#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MODE="${1:-render}"
BACKEND_PID=""

cleanup() {
  if [[ -n "${BACKEND_PID}" ]] && kill -0 "${BACKEND_PID}" 2>/dev/null; then
    echo "Stopping backend (PID: ${BACKEND_PID})..."
    kill "${BACKEND_PID}" 2>/dev/null || true
  fi
}

trap cleanup EXIT INT TERM

if [[ "${MODE}" != "render" && "${MODE}" != "local" ]]; then
  echo "Usage: ./scripts/start-all.sh [render|local]"
  exit 1
fi

if [[ "${MODE}" == "local" ]]; then
  echo "Starting backend (local mode)..."
  (
    cd "${ROOT_DIR}/backend"
    npm run start:local
  ) &
  BACKEND_PID=$!

  for _ in {1..15}; do
    if curl -fsS "http://localhost:5001/health" >/dev/null 2>&1; then
      break
    fi
    sleep 1
  done

  if ! curl -fsS "http://localhost:5001/health" >/dev/null 2>&1; then
    echo "Backend failed to become healthy on http://localhost:5001/health"
    echo "Check backend logs above."
    exit 1
  fi
fi

echo "Starting mobile (${MODE})..."
cd "${ROOT_DIR}/mobile"
if [[ "${MODE}" == "local" ]]; then
  npm run start:local
else
  npm run start:render
fi
