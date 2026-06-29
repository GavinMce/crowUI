import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridItem } from './Grid'

const Cell = ({ label }: { label: string }) => (
  <div style={{ background: 'var(--crow-color-primary)', color: '#fff', padding: '1rem', borderRadius: 4, textAlign: 'center', fontSize: 14 }}>
    {label}
  </div>
)

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
}

export default meta
type Story = StoryObj<typeof Grid>

export const ThreeColumns: Story = {
  render: () => (
    <Grid cols={3} gap={4}>
      {['A', 'B', 'C', 'D', 'E', 'F'].map((l) => <Cell key={l} label={l} />)}
    </Grid>
  ),
}

export const AsymmetricSpan: Story = {
  render: () => (
    <Grid cols={12} gap={4}>
      <GridItem span={8}><Cell label="span 8" /></GridItem>
      <GridItem span={4}><Cell label="span 4" /></GridItem>
      <GridItem span={6}><Cell label="span 6" /></GridItem>
      <GridItem span={6}><Cell label="span 6" /></GridItem>
    </Grid>
  ),
}
