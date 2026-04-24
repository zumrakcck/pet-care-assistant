#!/usr/bin/env bash
set -euo pipefail

# Load local env file automatically if present.
if [[ -f ".env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env
  set +a
fi

if [[ -z "${OPENAI_API_KEY:-}" ]]; then
  echo "ERROR: OPENAI_API_KEY is not set."
  echo "Set it first, example: export OPENAI_API_KEY=your_key"
  exit 1
fi

if [[ -z "${FIREBASE_KEY:-}" ]]; then
  if [[ -f "serviceAccountKey.json" ]]; then
    export FIREBASE_KEY="$(node -e 'process.stdout.write(JSON.stringify(require("./serviceAccountKey.json")))')"
    echo "FIREBASE_KEY loaded from serviceAccountKey.json"
  else
    echo "ERROR: FIREBASE_KEY is not set and serviceAccountKey.json was not found."
    exit 1
  fi
fi

node server.js
