import type { Meta, StoryObj } from '@storybook/react'
import { Card } from './Card'

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  args: { children: 'Card body content goes here.' },
  decorators: [(Story) => <div style={{ maxWidth: '400px' }}><Story /></div>],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {}
export const WithHeader: Story = { args: { header: 'Card Title' } }
export const WithFooter: Story = { args: { footer: 'Last updated 2 hours ago' } }
export const WithHeaderAndFooter: Story = {
  args: { header: 'Card Title', footer: 'Last updated 2 hours ago' },
}
