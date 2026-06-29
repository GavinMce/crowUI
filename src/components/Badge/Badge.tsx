import styles from './Badge.module.css'

export type BadgeVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type BadgeSize = 'sm' | 'md'

export interface BadgeProps {
  variant?: BadgeVariant
  size?: BadgeSize
  children: React.ReactNode
}

export function Badge({ variant = 'default', size = 'md', children }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], styles[size]].join(' ')}>
      {children}
    </span>
  )
}
