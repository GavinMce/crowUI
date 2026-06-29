# crowUI — Claude Context

## What this is

`@crow-dev/ui` is a React component library for centralized styling. It will be used across two projects:
- **Personal website** (gavinmce.github.io or similar)
- **Self-hosted Azure-like cloud UI** (dashboard-heavy, server/resource management)

## Tech stack

| Tool | Purpose |
|---|---|
| Vite (library mode) | Builds `dist/crow-ui.js` (ESM), `dist/crow-ui.cjs`, `dist/style.css`, `.d.ts` types |
| TypeScript | Strict mode, `bundler` module resolution |
| CSS Modules | Scoped component styles; design tokens via CSS custom properties |
| Vitest + Testing Library | Unit tests, `jsdom` environment, `non-scoped` CSS module class strategy |
| Storybook (`@storybook/react-vite`) | Component explorer, deployed to GitHub Pages on push to main |
| Knope | Release management — reads conventional commits, bumps version, generates changelog |
| GitHub Actions | CI (type-check + test + build), Storybook deploy, release |

## Repository

- **GitHub:** `GavinMce/crowUI`
- **npm:** `@crow-dev/ui` (public, `crow-dev` org)
- **Storybook:** `https://gavinmce.github.io/crowUI`

## Project structure

```
src/
  components/
    Button/         # Button.tsx, Button.module.css, Button.test.tsx, index.ts, *.stories.tsx
    Badge/
    Card/
    Container/
    DropdownMenu/
    Grid/
    Input/
    Modal/
    Navbar/
    PageLayout/
    Sidebar/
    Stack/
    Stat/
    Table/
    Tabs/
    index.ts        # barrel — re-exports all components
  styles/
    tokens.css      # CSS custom properties on :root — imported by src/index.ts
  index.ts          # library entry — imports tokens.css, re-exports components
  declarations.d.ts # *.module.css type declaration
  test-setup.ts     # @testing-library/jest-dom
scripts/
  create-release-pr.sh   # used by knope prepare-release workflow
  create-github-release.sh # used by knope release workflow
.github/workflows/
  ci.yml             # type-check + test:ci + build on PR/push to main
  prepare-release.yml # manual trigger — runs knope prepare-release
  release.yml        # push to main (package.json changed) — publishes + releases
  storybook.yml      # push to main — builds and deploys Storybook to Pages
.storybook/
  main.ts
  preview.ts         # imports tokens.css
knope.toml           # two workflows: prepare-release and release
```

## Adding a new component

Follow the existing pattern exactly:

```
src/components/MyComponent/
  MyComponent.tsx        # component + type exports
  MyComponent.module.css # scoped styles using --crow-* tokens
  MyComponent.test.tsx   # vitest + @testing-library/react
  MyComponent.stories.tsx
  index.ts               # re-exports from MyComponent.tsx
```

Then add `export * from './MyComponent'` to `src/components/index.ts`.

## Design tokens

All tokens live in `src/styles/tokens.css` as CSS custom properties. Always use tokens in component CSS — never hardcode colors, spacing, or radii. Key namespaces:

- `--crow-color-*` — colors (primary, accent, status, neutral)
- `--crow-font-*` — typography
- `--crow-spacing-*` — spacing scale (1=0.25rem, 2=0.5rem, 3=0.75rem, 4=1rem, 6=1.5rem, 8=2rem...)
- `--crow-radius-*` — border radii
- `--crow-shadow-*` — box shadows
- `--crow-z-*` — z-index scale
- `--crow-navbar-height`, `--crow-sidebar-width*` — layout dimensions
- `--crow-container-*` — max-width breakpoints

## Release workflow

1. Use conventional commits: `feat:`, `fix:`, `feat!:` / `BREAKING CHANGE`
2. **Actions → Prepare Release → Run workflow** — knope reads commits, bumps version in `package.json`, updates `CHANGELOG.md`, opens a `release/vX.Y.Z` PR
3. Review and merge the PR
4. `release.yml` fires on the `package.json` change, runs `knope release`:
   - `npm ci && npm run build && npm publish --access public`
   - `scripts/create-github-release.sh` — creates git tag + GitHub release via `gh release create`

## Important notes

- **knope's `Release` step type does not work in a split two-workflow setup** — it only tracks pending releases within the same session as `PrepareRelease`. We use `gh release create` via a shell script instead.
- The `release.yml` trigger uses `paths: ['package.json']` to avoid firing on every push to main.
- Branch protection is on `main` — all changes go through PRs.
- CSS Modules in Vitest use `classNameStrategy: 'non-scoped'` so test assertions like `toHaveClass('primary')` work against the original class names.
- Storybook requires **Settings → Pages → Source: GitHub Actions** to be enabled in the repo.

## GitHub Actions secrets required

| Secret | Purpose |
|---|---|
| `NPM_TOKEN` | Granular access token for `@crow-dev` org with publish + bypass 2FA |
| `GITHUB_TOKEN` | Auto-provided by GitHub Actions |
