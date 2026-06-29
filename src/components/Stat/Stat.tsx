import styles from './Stat.module.css'

export type TrendDirection = 'up' | 'down' | 'neutral'

export interface StatTrend {
  value: string
  direction: TrendDirection
}

export interface StatProps {
  label: string
  value: string | number
  trend?: StatTrend
  icon?: React.ReactNode
  className?: string
}

export function Stat({ label, value, trend, icon, className }: StatProps) {
  return (
    <div className={[styles.stat, className].filter(Boolean).join(' ')}>
      <div className={styles.top}>
        <span className={styles.label}>{label}</span>
        {icon && <span className={styles.icon}>{icon}</span>}
      </div>
      <span className={styles.value}>{value}</span>
      {trend && (
        <span className={[styles.trend, styles[trend.direction]].join(' ')}>
          {trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→'}{' '}
          {trend.value}
        </span>
      )}
    </div>
  )
}
