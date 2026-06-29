import type { CSSProperties } from 'react'
import styles from './Grid.module.css'

type SpacingKey = 1 | 2 | 3 | 4 | 6 | 8

export interface GridProps {
  cols?: number
  gap?: SpacingKey
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export interface GridItemProps {
  span?: number
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

export function Grid({ cols = 12, gap = 4, children, className, style }: GridProps) {
  return (
    <div
      className={[styles.grid, className].filter(Boolean).join(' ')}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        gap: `var(--crow-spacing-${gap})`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export function GridItem({ span = 1, children, className, style }: GridItemProps) {
  return (
    <div
      className={[styles.item, className].filter(Boolean).join(' ')}
      style={{ gridColumn: `span ${span} / span ${span}`, ...style }}
    >
      {children}
    </div>
  )
}
