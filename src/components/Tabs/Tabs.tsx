import styles from './Tabs.module.css'

export interface Tab {
  id: string
  label: string
  disabled?: boolean
}

export interface TabsProps {
  tabs: Tab[]
  activeTab: string
  onChange: (id: string) => void
}

export function Tabs({ tabs, activeTab, onChange }: TabsProps) {
  return (
    <div className={styles.tabs} role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          disabled={tab.disabled}
          className={[styles.tab, activeTab === tab.id ? styles.active : undefined]
            .filter(Boolean)
            .join(' ')}
          onClick={() => !tab.disabled && onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
