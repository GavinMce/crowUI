import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './Container'

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  args: { children: <div style={{ background: '#e0e0e0', padding: '1rem', borderRadius: 4 }}>Content</div> },
}

export default meta
type Story = StoryObj<typeof Container>

export const Small: Story  = { args: { maxWidth: 'sm' } }
export const Medium: Story = { args: { maxWidth: 'md' } }
export const Large: Story  = { args: { maxWidth: 'lg' } }
export const XLarge: Story = { args: { maxWidth: 'xl' } }
export const Full: Story   = { args: { maxWidth: 'full' } }
