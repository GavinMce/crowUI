import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { Navbar } from './Navbar'

const links = [
  { label: 'Home', href: '#', active: true },
  { label: 'About', href: '#' },
  { label: 'Projects', href: '#' },
]

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: { layout: 'fullscreen' },
}

export default meta
type Story = StoryObj<typeof Navbar>

export const Default: Story = {
  args: { logo: 'CrowUI', links },
}

export const WithActions: Story = {
  args: {
    logo: 'CrowUI',
    links,
    actions: <Button size="sm">Sign in</Button>,
  },
}

export const Sticky: Story = {
  args: { logo: 'CrowUI', links, sticky: true },
}
