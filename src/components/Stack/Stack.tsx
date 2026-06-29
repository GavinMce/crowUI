import type { CSSProperties } from 'react'
import styles from './Stack.module.css'

type SpacingKey = 1 | 2 | 3 | 4 | 6 | 8 | 10 | 12 | 16

export interface StackProps {
  direction?: 'row' | 'column'
  gap?: SpacingKey
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
  children: React.ReactNode
  className?: string
  style?: CSSProperties
}

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
}

export function Stack({
  direction = 'column',
  gap = 4,
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  className,
  style,
}: StackProps) {
  return (
    <div
      className={[styles.stack, className].filter(Boolean).join(' ')}
      style={{
        flexDirection: direction,
        gap: `var(--crow-spacing-${gap})`,
        alignItems: alignMap[align],
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </div>
  )
}
