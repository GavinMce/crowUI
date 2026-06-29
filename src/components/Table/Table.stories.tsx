import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from '../Badge'
import { Table } from './Table'

type Server = { id: string; name: string; status: string; region: string; cpu: number }

const data: Server[] = [
  { id: '1', name: 'web-01', status: 'running', region: 'us-east-1', cpu: 42 },
  { id: '2', name: 'web-02', status: 'stopped', region: 'us-west-2', cpu: 0 },
  { id: '3', name: 'db-01',  status: 'running', region: 'eu-west-1', cpu: 78 },
  { id: '4', name: 'cache-01', status: 'running', region: 'ap-south-1', cpu: 15 },
]

const statusVariant = (s: string) =>
  s === 'running' ? 'success' : s === 'stopped' ? 'danger' : 'warning'

const columns = [
  { key: 'name',   header: 'Name',   sortable: true },
  { key: 'status', header: 'Status', render: (row: Server) => <Badge variant={statusVariant(row.status)}>{row.status}</Badge> },
  { key: 'region', header: 'Region', sortable: true },
  { key: 'cpu',    header: 'CPU %',  sortable: true, render: (row: Server) => `${row.cpu}%` },
]

const meta: Meta<typeof Table<Server>> = {
  title: 'Components/Table',
  component: Table,
}

export default meta
type Story = StoryObj<typeof Table<Server>>

export const Default: Story = { render: () => <Table columns={columns} data={data} keyField="id" /> }
export const Selectable: Story = { render: () => <Table columns={columns} data={data} keyField="id" selectable /> }
export const Empty: Story = { render: () => <Table columns={columns} data={[]} keyField="id" /> }
