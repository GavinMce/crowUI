#!/usr/bin/env bash
set -euo pipefail

VERSION=$(node -p "require('./package.json').version")
BRANCH="release/v${VERSION}"

git checkout -b "${BRANCH}"
git add package.json CHANGELOG.md
git commit -m "chore: release v${VERSION}"
git push --force-with-lease origin "${BRANCH}"

# Open PR, or print the URL if it already exists
gh pr create \
  --title "Release v${VERSION}" \
  --body "Automated release PR for **v${VERSION}**. Merge to publish to npm and create a GitHub release." \
  --base main \
  || gh pr view "${BRANCH}" --web
