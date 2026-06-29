import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Navbar } from '../Navbar'
import { Sidebar } from '../Sidebar'
import { PageLayout } from './PageLayout'

const groups = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'compute', label: 'Compute' },
      { id: 'storage', label: 'Storage' },
      { id: 'network', label: 'Network' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'billing', label: 'Billing' },
      { id: 'team', label: 'Team' },
    ],
  },
]

const meta: Meta<typeof PageLayout> = {
  title: 'Layout/PageLayout',
  component: PageLayout,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof PageLayout>

export const DashboardShell: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return (
      <PageLayout
        navbar={
          <Navbar
            logo="MyCloud"
            actions={<Button size="sm" variant="secondary">Gavin</Button>}
          />
        }
        sidebar={
          <Sidebar
            groups={groups}
            collapsed={collapsed}
            onCollapse={setCollapsed}
          />
        }
      >
        <h2 style={{ marginTop: 0 }}>Dashboard</h2>
        <p style={{ color: 'var(--crow-color-text-muted)' }}>Main content area</p>
      </PageLayout>
    )
  },
}
