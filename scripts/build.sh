#!/usr/bin/env bash
set -euC -o pipefail
shopt -s nullglob globstar dotglob
this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$this_dir/.." || exit
log() { printf '%s\n' "$@" || true; }
err() { printf '%s\n' "$@" >&2 || true; }
abort() { err "$1" && exit "${2:-1}"; }
has() { command -v "$1" &>/dev/null; }

has silicon || abort "Silicon is a required dependency"

for sol in ./public/solutions/*/; do
  pushd "$sol" >/dev/null || abort "Could not change directory to $sol"
  id=$(basename "$sol")
  log "Building $id"
  [ -f "$id.js" ] || abort "Missing $id.js"
  silicon "$id.js" -o "$id.png"

  popd >/dev/null || exit
done
