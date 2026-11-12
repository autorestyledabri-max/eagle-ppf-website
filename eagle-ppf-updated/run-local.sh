#!/usr/bin/env bash
# EAGLE PPF — local server (mac / linux)
cd "$(dirname "$0")" || exit 1
PORT=5173
echo
echo "  EAGLE PPF — local server"
echo "  http://localhost:$PORT"
echo "  Band karne ke liye Ctrl+C"
echo
( sleep 1; command -v open >/dev/null && open "http://localhost:$PORT/" || true ) &
if command -v python3 >/dev/null; then exec python3 -m http.server "$PORT"
elif command -v python  >/dev/null; then exec python  -m http.server "$PORT"
elif command -v npx     >/dev/null; then exec npx --yes serve -l "$PORT" .
else echo "Python/Node nahi mila — index.html direct kholo."; fi
