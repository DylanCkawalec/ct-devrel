#!/usr/bin/env bash
# CoreThink Strategy — local demo launcher (install, doctor, health, dev server).
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT"

MIN_NODE_MAJOR=20
HOST="${HOST:-127.0.0.1}"
PORT="${PORT:-3000}"

if [[ -t 1 ]] && command -v tput >/dev/null 2>&1; then
  BOLD="$(tput bold 2>/dev/null || true)"
  DIM="$(tput dim 2>/dev/null || true)"
  RESET="$(tput sgr0 2>/dev/null || true)"
  GREEN="$(tput setaf 2 2>/dev/null || true)"
  YELLOW="$(tput setaf 3 2>/dev/null || true)"
  RED="$(tput setaf 1 2>/dev/null || true)"
else
  BOLD="" DIM="" RESET="" GREEN="" YELLOW="" RED=""
fi

die() {
  printf '%s%s%s\n' "$RED" "$*" "$RESET" >&2
  exit 1
}

warn() {
  printf '%s%s%s\n' "$YELLOW" "$*" "$RESET" >&2
}

info() {
  printf '%s\n' "$*"
}

rule() {
  printf '%s\n' "${BOLD}────────────────────────────────────────────────────────────${RESET}"
}

banner() {
  rule
  printf ' %sCoreThink Strategy%s  ·  local demo\n' "$BOLD" "$RESET"
  rule
  printf '\n'
}

require_node() {
  command -v node >/dev/null 2>&1 || die "Node.js is not installed. Install Node ${MIN_NODE_MAJOR}+ from https://nodejs.org/"
  local major
  major="$(node -p "parseInt(process.versions.node.split('.')[0], 10)" 2>/dev/null || echo 0)"
  if (( major < MIN_NODE_MAJOR )); then
    die "Node.js ${major} is too old. Need Node ${MIN_NODE_MAJOR}+ (current: $(node -v))."
  fi
}

require_npm() {
  command -v npm >/dev/null 2>&1 || die "npm is not installed (bundled with Node.js)."
}

doctor() {
  rule
  printf '%s doctor %s\n' "$BOLD" "$RESET"
  rule
  info "  cwd       $ROOT"
  info "  shell     ${SHELL:-unknown}"
  info "  node      $(command -v node) ($(node -v))"
  info "  npm       $(command -v npm) ($(npm -v))"
  if [[ -f /etc/os-release ]]; then
    info "  os        $(grep -E '^PRETTY_NAME=' /etc/os-release 2>/dev/null | cut -d= -f2- | tr -d '"' || uname -s)"
  else
    info "  os        $(uname -s 2>/dev/null || echo unknown) $(uname -m 2>/dev/null || true)"
  fi
  printf '\n'
}

health() {
  rule
  printf '%s health %s\n' "$BOLD" "$RESET"
  rule
  if [[ ! -f package.json ]]; then
    die "package.json missing in $ROOT"
  fi
  if [[ ! -d data ]]; then
    die "data/ directory missing (strategy JSON)."
  fi
  shopt -s nullglob
  local json_files=(data/*.json)
  shopt -u nullglob
  info "  strategy data: ${#json_files[@]} JSON file(s) under data/"
  if ! npm ls vite --depth=0 >/dev/null 2>&1; then
    die "Vite not installed (npm install may have failed)."
  fi
  info "  vite        $(npm ls vite --depth=0 2>/dev/null | tail -1 | sed 's/^/            /')"
  printf '\n'
  info "${DIM}npm audit (informational):${RESET}"
  set +e
  npm audit --audit-level=high 2>&1 | sed 's/^/  /'
  local audit_ec=$?
  set -e
  if (( audit_ec != 0 )); then
    warn "  Audit reported high/critical issues (exit ${audit_ec}). Review above; continuing to dev server."
  else
    info "${GREEN}  No high/critical vulnerabilities reported.${RESET}"
  fi
  printf '\n'
  if [[ "${SKIP_LINT:-}" != "1" ]]; then
    info "${DIM}eslint (non-blocking):${RESET}"
    set +e
    npm run lint 2>&1 | sed 's/^/  /'
    local lint_ec=$?
    set -e
    if (( lint_ec != 0 )); then
      warn "  ESLint reported issues (exit ${lint_ec}). Set SKIP_LINT=1 to skip. Continuing."
    else
      info "${GREEN}  ESLint passed.${RESET}"
    fi
    printf '\n'
  fi
}

install_deps() {
  rule
  printf '%s install %s\n' "$BOLD" "$RESET"
  rule
  npm install
  printf '\n'
}

main() {
  banner
  require_node
  require_npm
  doctor
  install_deps
  health

  # Clean handoff: strategy runs in the browser; terminal shows Vite only.
  clear 2>/dev/null || true
  rule
  printf '%srun%s · %sCtrl+C to stop%s\n' "$BOLD" "$RESET" "$DIM" "$RESET"
  rule
  info "  ${GREEN}Local:${RESET}   http://${HOST}:${PORT}/"
  info "  ${GREEN}Home:${RESET}    http://${HOST}:${PORT}/#/"
  info "  ${GREEN}Strategy:${RESET} http://${HOST}:${PORT}/#/strategy"
  printf '\n'

  export BROWSER="${BROWSER:-}"
  local -a dev_args=(--host "$HOST" --port "$PORT")
  if [[ -z "${CI:-}" ]] && [[ -t 0 ]]; then
    # Open the plan in the browser (hash routes work on static preview too).
    dev_args+=(--open "http://${HOST}:${PORT}/#/")
  fi

  exec npm run dev -- "${dev_args[@]}"
}

main "$@"
