import { useState } from 'react'
import styles from './Table.module.css'

export type SortDirection = 'asc' | 'desc'

export interface TableColumn<T> {
  key: string
  header: string
  render?: (row: T) => React.ReactNode
  sortable?: boolean
  width?: string
}

export interface TableProps<T extends Record<string, unknown>> {
  columns: TableColumn<T>[]
  data: T[]
  keyField: keyof T & string
  selectable?: boolean
  onSelectionChange?: (selected: T[]) => void
  onSort?: (key: string, direction: SortDirection) => void
  className?: string
}

export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  selectable,
  onSelectionChange,
  onSort,
  className,
}: TableProps<T>) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [sort, setSort] = useState<{ key: string; direction: SortDirection } | null>(null)

  function toggleRow(key: string) {
    const next = new Set(selected)
    next.has(key) ? next.delete(key) : next.add(key)
    setSelected(next)
    onSelectionChange?.(data.filter((row) => next.has(String(row[keyField]))))
  }

  function toggleAll() {
    if (selected.size === data.length) {
      setSelected(new Set())
      onSelectionChange?.([])
    } else {
      const all = new Set(data.map((row) => String(row[keyField])))
      setSelected(all)
      onSelectionChange?.(data)
    }
  }

  function handleSort(key: string) {
    const direction = sort?.key === key && sort.direction === 'asc' ? 'desc' : 'asc'
    setSort({ key, direction })
    onSort?.(key, direction)
  }

  return (
    <div className={[styles.wrapper, className].filter(Boolean).join(' ')}>
      <table className={styles.table}>
        <thead>
          <tr>
            {selectable && (
              <th className={styles.th} style={{ width: '40px' }}>
                <input
                  type="checkbox"
                  checked={selected.size === data.length && data.length > 0}
                  onChange={toggleAll}
                  aria-label="Select all"
                />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key}
                className={[styles.th, col.sortable ? styles.sortable : undefined]
                  .filter(Boolean)
                  .join(' ')}
                style={col.width ? { width: col.width } : undefined}
                onClick={col.sortable ? () => handleSort(col.key) : undefined}
              >
                <span className={styles.thContent}>
                  {col.header}
                  {col.sortable && (
                    <span className={styles.sortIcon}>
                      {sort?.key === col.key ? (sort.direction === 'asc' ? ' ↑' : ' ↓') : ' ↕'}
                    </span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            const rowKey = String(row[keyField])
            const isSelected = selected.has(rowKey)
            return (
              <tr key={rowKey} className={[styles.tr, isSelected ? styles.selectedRow : undefined].filter(Boolean).join(' ')}>
                {selectable && (
                  <td className={styles.td}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleRow(rowKey)}
                      aria-label={`Select row ${rowKey}`}
                    />
                  </td>
                )}
                {columns.map((col) => (
                  <td key={col.key} className={styles.td}>
                    {col.render ? col.render(row) : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            )
          })}
          {data.length === 0 && (
            <tr>
              <td
                className={[styles.td, styles.empty].join(' ')}
                colSpan={columns.length + (selectable ? 1 : 0)}
              >
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
