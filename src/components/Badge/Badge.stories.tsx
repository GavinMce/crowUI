import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './Badge'

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  args: { children: 'Badge' },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = { args: { variant: 'default' } }
export const Primary: Story = { args: { variant: 'primary' } }
export const Success: Story = { args: { variant: 'success', children: 'Success' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Warning' } }
export const Danger: Story = { args: { variant: 'danger', children: 'Danger' } }
export const Info: Story = { args: { variant: 'info', children: 'Info' } }
export const Small: Story = { args: { size: 'sm' } }
