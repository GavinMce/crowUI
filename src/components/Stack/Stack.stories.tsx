import type { Meta, StoryObj } from '@storybook/react'
import { Stack } from './Stack'

const Box = ({ label }: { label: string }) => (
  <div style={{ background: 'var(--crow-color-primary)', color: '#fff', padding: '0.5rem 1rem', borderRadius: 4, fontSize: 14 }}>
    {label}
  </div>
)

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  args: { children: [<Box key="a" label="A" />, <Box key="b" label="B" />, <Box key="c" label="C" />] },
}

export default meta
type Story = StoryObj<typeof Stack>

export const Vertical: Story   = { args: { direction: 'column', gap: 4 } }
export const Horizontal: Story = { args: { direction: 'row', gap: 4 } }
export const Centered: Story   = { args: { direction: 'row', gap: 4, align: 'center', justify: 'center' } }
export const SpaceBetween: Story = { args: { direction: 'row', gap: 4, justify: 'between' } }
