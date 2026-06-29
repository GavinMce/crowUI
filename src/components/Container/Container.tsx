import styles from './Container.module.css'

export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ContainerProps {
  maxWidth?: ContainerMaxWidth
  children: React.ReactNode
  className?: string
}

export function Container({ maxWidth = 'xl', children, className }: ContainerProps) {
  return (
    <div className={[styles.container, styles[maxWidth], className].filter(Boolean).join(' ')}>
      {children}
    </div>
  )
}
