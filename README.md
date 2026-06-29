# @crow-dev/ui

A React component library for centralized styling across projects. Built with Vite, TypeScript, and CSS Modules.

**[Storybook →](https://gavinmce.github.io/crowUI)**

---

## Installation

```bash
npm install @crow-dev/ui
```

React 18+ is required as a peer dependency.

## Setup

Import the stylesheet once at your app root:

```tsx
import '@crow-dev/ui/dist/style.css'
```

## Usage

```tsx
import { Button, Card, Stack } from '@crow-dev/ui'

function App() {
  return (
    <Stack direction="column" gap={4}>
      <Card header="Hello">
        <Button variant="primary">Click me</Button>
      </Card>
    </Stack>
  )
}
```

## Components

### Layout
| Component | Description |
|---|---|
| `Container` | Max-width page wrapper — `sm / md / lg / xl / full` |
| `Stack` | Flexbox stack with `direction`, `gap`, `align`, `justify` |
| `Grid` / `GridItem` | CSS grid with configurable columns and per-item span |
| `Navbar` | Top navigation bar with logo, links, and actions slot |
| `Sidebar` | Collapsible dark side navigation with groups and active states |
| `PageLayout` | Full page shell composing Navbar + Sidebar + main content |

### UI
| Component | Description |
|---|---|
| `Button` | `primary / secondary / ghost` variants, `sm / md / lg` sizes |
| `Badge` | Status chip — `default / primary / success / warning / danger / info` |
| `Card` | Surface container with optional header and footer slots |
| `Input` | Text input with label, helper text, and error state |
| `Modal` | Portal-rendered dialog with backdrop and close button |
| `Tabs` | Controlled tab bar with disabled tab support |
| `DropdownMenu` | Portal-rendered contextual menu with danger variant |

### Cloud / Dashboard
| Component | Description |
|---|---|
| `Table` | Generic typed table with sortable columns and row selection |
| `Stat` | KPI card with value, label, and trend indicator |

## Theming

All design tokens are CSS custom properties on `:root`. Import `dist/style.css` and override any token:

```css
:root {
  --crow-color-primary: #0f172a;
  --crow-color-accent: #6366f1;
  --crow-font-family: 'Inter', sans-serif;
}
```

Key tokens:

| Token | Default | Description |
|---|---|---|
| `--crow-color-primary` | `#1a1a2e` | Primary brand color |
| `--crow-color-accent` | `#e94560` | Accent / highlight color |
| `--crow-font-family` | system-ui | Base font stack |
| `--crow-navbar-height` | `64px` | Used by PageLayout |
| `--crow-sidebar-width` | `240px` | Expanded sidebar width |
| `--crow-sidebar-width-collapsed` | `64px` | Collapsed sidebar width |

## Development

```bash
# Install dependencies
npm install

# Run Storybook
npm run storybook

# Run tests
npm test

# Type check
npm run type-check

# Build library
npm run build
```

## Release Process

Releases are automated via [knope](https://knope.tech) and GitHub Actions. Use [conventional commits](https://www.conventionalcommits.org):

- `feat: ...` → minor version bump
- `fix: ...` → patch version bump
- `feat!: ...` or `BREAKING CHANGE:` in body → major version bump

**To cut a release:**
1. Go to **Actions → Prepare Release → Run workflow**
2. Review and merge the generated `release/vX.Y.Z` PR
3. The release workflow automatically publishes to npm and creates the GitHub release
