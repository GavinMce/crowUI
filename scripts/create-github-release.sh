#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -p "require('./package.json').version")

# Extract the changelog section for this version (everything between this
# version header and the next one)
NOTES=$(awk "
  BEGIN { found=0 }
  /^## ${VERSION}/ { found=1; next }
  found && /^## / { exit }
  found { print }
" CHANGELOG.md)

gh release create "v${VERSION}" \
  --title "v${VERSION}" \
  --notes "${NOTES}"
