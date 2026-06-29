import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Sidebar } from './Sidebar'

const groups = [
  {
    items: [
      { id: 'dashboard', label: 'Dashboard', active: true },
      { id: 'compute', label: 'Compute' },
      { id: 'storage', label: 'Storage' },
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

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ height: '100vh', display: 'flex' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Sidebar>

export const Default: Story = { args: { groups } }

export const Collapsed: Story = { args: { groups, collapsed: true } }

export const Collapsible: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false)
    return <Sidebar groups={groups} header="MyCloud" collapsed={collapsed} onCollapse={setCollapsed} />
  },
}
