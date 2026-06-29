import styles from './PageLayout.module.css'

export interface PageLayoutProps {
  navbar?: React.ReactNode
  sidebar?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function PageLayout({ navbar, sidebar, children, className }: PageLayoutProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(' ')}>
      {navbar && <div className={styles.navbar}>{navbar}</div>}
      <div className={styles.body}>
        {sidebar && <div className={styles.sidebar}>{sidebar}</div>}
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  )
}
