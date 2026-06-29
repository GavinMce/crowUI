import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './Input'

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  args: { label: 'Email', placeholder: 'you@example.com' },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {}
export const WithHelperText: Story = { args: { helperText: 'We will never share your email.' } }
export const WithError: Story = { args: { error: 'Email is required.' } }
export const Disabled: Story = { args: { disabled: true, value: 'you@example.com' } }
export const NoLabel: Story = { args: { label: undefined, placeholder: 'Search...' } }
