import type { Meta, StoryObj } from '@storybook/react'
import { Grid, GridItem } from '../Grid'
import { Stat } from './Stat'

const meta: Meta<typeof Stat> = {
  title: 'Components/Stat',
  component: Stat,
}

export default meta
type Story = StoryObj<typeof Stat>

export const Default: Story = { args: { label: 'Total Instances', value: '24' } }
export const WithUpTrend: Story = { args: { label: 'Monthly Spend', value: '$1,284', trend: { value: '12% vs last month', direction: 'up' } } }
export const WithDownTrend: Story = { args: { label: 'Error Rate', value: '0.4%', trend: { value: '0.2% vs last week', direction: 'down' } } }

export const Dashboard: Story = {
  render: () => (
    <Grid cols={4} gap={4}>
      <GridItem><Stat label="Instances" value="24" trend={{ value: '3 new today', direction: 'up' }} /></GridItem>
      <GridItem><Stat label="Storage Used" value="1.2 TB" trend={{ value: '5% vs last week', direction: 'up' }} /></GridItem>
      <GridItem><Stat label="Uptime" value="99.97%" trend={{ value: 'stable', direction: 'neutral' }} /></GridItem>
      <GridItem><Stat label="Monthly Cost" value="$842" trend={{ value: '$12 vs last month', direction: 'down' }} /></GridItem>
    </Grid>
  ),
}
