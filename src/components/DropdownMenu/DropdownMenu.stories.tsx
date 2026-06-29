import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { DropdownMenu } from './DropdownMenu'

const items = [
  { id: 'profile', label: 'Profile' },
  { id: 'settings', label: 'Settings' },
  { id: 'divider', label: '', divider: true },
  { id: 'logout', label: 'Sign out', variant: 'danger' as const },
]

const meta: Meta<typeof DropdownMenu> = {
  title: 'Components/DropdownMenu',
  component: DropdownMenu,
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="secondary">Menu ▾</Button>} items={items} />
  ),
}

export const AlignRight: Story = {
  render: () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <DropdownMenu trigger={<Button variant="secondary">Menu ▾</Button>} items={items} align="right" />
    </div>
  ),
}
