import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import styles from './DropdownMenu.module.css'

export interface DropdownMenuItem {
  id: string
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  divider?: boolean
  variant?: 'default' | 'danger'
}

export interface DropdownMenuProps {
  trigger: React.ReactNode
  items: DropdownMenuItem[]
  align?: 'left' | 'right'
}

export function DropdownMenu({ trigger, items, align = 'left' }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const [position, setPosition] = useState({ top: 0, left: 0 })
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    function handleClickOutside(e: MouseEvent) {
      if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  function handleTriggerClick() {
    if (!open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setPosition({
        top: rect.bottom + window.scrollY + 4,
        left: align === 'right' ? rect.right + window.scrollX : rect.left + window.scrollX,
      })
    }
    setOpen((v) => !v)
  }

  return (
    <>
      <div ref={triggerRef} className={styles.trigger} onClick={handleTriggerClick}>
        {trigger}
      </div>
      {open &&
        createPortal(
          <ul
            className={[styles.menu, align === 'right' ? styles.alignRight : undefined]
              .filter(Boolean)
              .join(' ')}
            style={{ top: position.top, left: position.left }}
            role="menu"
          >
            {items.map((item) =>
              item.divider ? (
                <li key={item.id} className={styles.divider} role="separator" />
              ) : (
                <li key={item.id} role="menuitem">
                  <button
                    className={[
                      styles.item,
                      item.variant === 'danger' ? styles.danger : undefined,
                      item.disabled ? styles.disabled : undefined,
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    disabled={item.disabled}
                    onClick={() => {
                      item.onClick?.()
                      setOpen(false)
                    }}
                  >
                    {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                    {item.label}
                  </button>
                </li>
              ),
            )}
          </ul>,
          document.body,
        )}
    </>
  )
}
