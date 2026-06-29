import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Button } from '../Button'
import { Modal } from './Modal'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
}

export default meta
type Story = StoryObj<typeof Modal>

function ModalDemo(props: Partial<React.ComponentProps<typeof Modal>>) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Example Modal" {...props}>
        <p>This is the modal body. Click outside or the ✕ button to close.</p>
      </Modal>
    </>
  )
}

export const Default: Story = { render: () => <ModalDemo /> }
export const NoTitle: Story = { render: () => <ModalDemo title={undefined} /> }
