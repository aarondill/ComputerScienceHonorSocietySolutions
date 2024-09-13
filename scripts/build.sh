#!/usr/bin/env bash
set -euC -o pipefail
shopt -s nullglob globstar dotglob
this_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
cd "$this_dir/.." || exit
log() { printf '%s\n' "$@" || true; }
err() { printf '%s\n' "$@" >&2 || true; }
abort() { err "$1" && exit "${2:-1}"; }
has() { command -v "$1" &>/dev/null; }
cmd_path() { command -v "$1" 2>/dev/null; }

SILICON="${SILICON:-$(cmd_path silicon)}" || true

_silicon_dest="$PWD/node_modules/silicon"
if [ -f "$_silicon_dest" ]; then
  log "Using cached silicon at $_silicon_dest"
  SILICON="$_silicon_dest"
fi
if [ -z "$SILICON" ]; then
  destination=$(dirname -- "$_silicon_dest")/silicon.tar.gz
  if ! [ -f "$destination" ]; then
    log "Downloading Silicon from GitHub"
    has jq || abort "jq is a required dependency"
    has curl || abort "curl is a required dependency"
    log "Finding latest Silicon release"
    github_repo=Aloxaf/silicon
    version=$(curl -sSfL -- "https://api.github.com/repos/$github_repo/releases/latest" | jq -r '.tag_name')
    [ -n "$version" ] || abort "Failed while attempting to install $github_repo. Please manually install at https://github.com/$github_repo/releases"
    asset="silicon-$version-x86_64-unknown-linux-gnu.tar.gz"
    silicon_url="https://github.com/$github_repo/releases/download/$version/$asset"

    # trap 'rm -f -- "$destination"' EXIT
    log "Downloading $silicon_url to $destination"
    curl -fL -o "$destination" -- "$silicon_url"
  fi

  log "Extracting silicon to $_silicon_dest"
  tar -xzf "$destination" -C "$(dirname -- "$_silicon_dest")" silicon
  chmod +x -- "$_silicon_dest"
  SILICON="$_silicon_dest"

  rm -f -- "$destination"
  trap - EXIT
fi
[ -n "$SILICON" ] || abort "Failed to find silicon"

for sol in ./public/solutions/*/; do
  pushd "$sol" >/dev/null || abort "Could not change directory to $sol"
  id=$(basename "$sol")
  log "Building $id"
  [ -f "$id.js" ] || abort "Missing $id.js"
  "$SILICON" "$id.js" -o "$id.png"

  popd >/dev/null || exit
done
