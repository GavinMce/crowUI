import styles from './Sidebar.module.css'

export interface SidebarItem {
  id: string
  label: string
  icon?: React.ReactNode
  href?: string
  active?: boolean
  onClick?: () => void
}

export interface SidebarGroup {
  label?: string
  items: SidebarItem[]
}

export interface SidebarProps {
  groups: SidebarGroup[]
  collapsed?: boolean
  onCollapse?: (collapsed: boolean) => void
  header?: React.ReactNode
  className?: string
}

export function Sidebar({
  groups,
  collapsed = false,
  onCollapse,
  header,
  className,
}: SidebarProps) {
  return (
    <aside className={[styles.sidebar, collapsed ? styles.collapsed : undefined, className].filter(Boolean).join(' ')}>
      {header && <div className={styles.header}>{header}</div>}

      <nav className={styles.nav}>
        {groups.map((group, gi) => (
          <div key={gi} className={styles.group}>
            {group.label && !collapsed && (
              <span className={styles.groupLabel}>{group.label}</span>
            )}
            {group.items.map((item) => {
              const Tag = item.href ? 'a' : 'button'
              return (
                <Tag
                  key={item.id}
                  href={item.href}
                  className={[styles.item, item.active ? styles.activeItem : undefined]
                    .filter(Boolean)
                    .join(' ')}
                  onClick={item.onClick}
                  title={collapsed ? item.label : undefined}
                >
                  {item.icon && <span className={styles.itemIcon}>{item.icon}</span>}
                  {!collapsed && <span className={styles.itemLabel}>{item.label}</span>}
                </Tag>
              )
            })}
          </div>
        ))}
      </nav>

      {onCollapse && (
        <button className={styles.collapseBtn} onClick={() => onCollapse(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      )}
    </aside>
  )
}
