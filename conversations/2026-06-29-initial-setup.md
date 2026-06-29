# Session: Initial Setup — 2026-06-29

## What we built

Set up the `@crow-dev/ui` React component library from scratch, including tooling, CI/CD, release automation, and the first set of components.

---

## Project bootstrap

- Initialized `crowUI` repo at `github.com/GavinMce/crowUI`
- Package name: `@crow-dev/ui` (scoped to `crow-dev` npm org)
- Stack: Vite library mode, TypeScript strict, CSS Modules, Vitest
- Build outputs: `dist/crow-ui.js` (ESM), `dist/crow-ui.cjs` (CJS), `dist/style.css`, `.d.ts` declarations via `vite-plugin-dts`
- Git global config set: `Gavin <gmcellistrem@gmail.com>`

---

## Release pipeline

Significant iteration getting this right. Final working state:

### Tools
- **Knope** for conventional commit parsing, version bumping, and changelog generation
- **GitHub Actions** for CI, Storybook deploy, and release

### Workflows
| Workflow | Trigger | Does |
|---|---|---|
| `ci.yml` | Push/PR to main | type-check, test:ci, build |
| `prepare-release.yml` | `workflow_dispatch` | Runs `knope prepare-release` → opens `release/vX.Y.Z` PR |
| `release.yml` | Push to main (package.json changed) | Builds, publishes to npm, creates tag + GitHub release |
| `storybook.yml` | Push to main | Builds and deploys Storybook to GitHub Pages |

### Key issues resolved
1. **knope download** — asset extension is `.tgz` not `.tar.gz`; binary is nested in a subdirectory requiring `--strip-components=1`. Replaced both with `knope-dev/action@v2.1.2`.
2. **knope Release step** — does not work in a split two-workflow setup (only tracks pending releases within the same session as PrepareRelease). Replaced with `gh release create` via `scripts/create-github-release.sh`.
3. **npm 2FA** — required a Granular Access Token with bypass 2FA enabled for the `crow-dev` npm org.
4. **git user config** — missing from `release.yml`; knope needs `user.name` and `user.email` to create tags.
5. **release workflow firing too broadly** — scoped trigger to `paths: ['package.json']`.
6. **release label missing** — `--label release` in `create-release-pr.sh` caused errors; removed.
7. **force push on re-run** — `release/vX.Y.Z` branch already existed on retry; added `--force-with-lease`.
8. **branch protection** — main requires PRs; all fixes had to go through branches.

### Release flow (final)
1. Commit using conventional commits (`feat:`, `fix:`, `feat!:`)
2. Actions → Prepare Release → Run workflow
3. Review and merge the `release/vX.Y.Z` PR
4. `release.yml` auto-fires, publishes to npm, creates GitHub release

### Published versions
- `0.1.0` — npm published, GitHub release missing (knope Release step was no-op)
- `0.1.1` — npm published, GitHub release missing (same issue)
- `0.1.2` — npm published, GitHub release manually backfilled after fix

---

## Components built

### First batch (PR #13)
| Component | Notes |
|---|---|
| `Button` | primary/secondary/ghost variants, sm/md/lg sizes |
| `Badge` | 6 variants including status colors |
| `Card` | header/body/footer slots |
| `Input` | label, helper text, error state, full a11y |
| `Modal` | portal-rendered, backdrop, close button |

### Second batch (PR #15)
| Component | Notes |
|---|---|
| `Container` | max-width wrapper sm/md/lg/xl/full |
| `Stack` | flexbox with direction/gap/align/justify |
| `Grid` / `GridItem` | CSS grid, configurable cols and span |
| `Navbar` | logo, links, actions slot, sticky option |
| `Sidebar` | collapsible dark nav, groups, active states |
| `PageLayout` | full dashboard shell (Navbar + Sidebar + main) |
| `Table` | generic `Table<T>`, sort, row selection, empty state |
| `Stat` | KPI card with trend indicator |
| `Tabs` | controlled tab bar, disabled support |
| `DropdownMenu` | portal-rendered, left/right align, danger variant |

---

## Storybook

- `@storybook/react-vite` with stories for all 15 components
- `npm run storybook` for local dev (port 6006)
- GitHub Pages deploy via `storybook.yml` on push to main
- Requires: **Settings → Pages → Source: GitHub Actions**

---

## Design tokens

CSS custom properties on `:root` in `src/styles/tokens.css`. Key namespaces:
- `--crow-color-*` — primary, accent, status (success/warning/danger/info), neutral
- `--crow-font-*`, `--crow-spacing-*`, `--crow-radius-*`, `--crow-shadow-*`, `--crow-z-*`
- `--crow-navbar-height: 64px`, `--crow-sidebar-width: 240px`, `--crow-container-*`

---

## Decisions made

| Decision | Choice | Reason |
|---|---|---|
| Styling | CSS Modules | Zero runtime, fully portable |
| Package name | `@crow-dev/ui` | Matches `crow-dev` npm org |
| Build tool | Vite library mode | First-class CSS Modules + DTS support |
| Release tool | Knope | Conventional commit parsing, changelog generation |
| GitHub Packages | Skipped | Only shows packages on GitHub's registry, not npm; adds complexity with minimal benefit for a public library |
| knope Release step | Replaced with `gh release create` | Release step is a no-op without PrepareRelease in the same session |
