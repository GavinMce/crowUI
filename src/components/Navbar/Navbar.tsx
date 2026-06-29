import styles from './Navbar.module.css'

export interface NavbarLink {
  label: string
  href: string
  active?: boolean
}

export interface NavbarProps {
  logo?: React.ReactNode
  links?: NavbarLink[]
  actions?: React.ReactNode
  sticky?: boolean
  className?: string
}

export function Navbar({ logo, links, actions, sticky = false, className }: NavbarProps) {
  return (
    <header className={[styles.navbar, sticky ? styles.sticky : undefined, className].filter(Boolean).join(' ')}>
      {logo && <div className={styles.logo}>{logo}</div>}
      {links && links.length > 0 && (
        <nav className={styles.links}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={[styles.link, link.active ? styles.activeLink : undefined]
                .filter(Boolean)
                .join(' ')}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
      {actions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}
