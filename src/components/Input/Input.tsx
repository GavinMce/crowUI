import styles from './Input.module.css'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
}

export function Input({ label, error, helperText, id, className, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
  const hintId = inputId ? `${inputId}-hint` : undefined

  return (
    <div className={styles.wrapper}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[styles.input, error ? styles.hasError : undefined, className]
          .filter(Boolean)
          .join(' ')}
        aria-describedby={error || helperText ? hintId : undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
      {(error || helperText) && (
        <span id={hintId} className={error ? styles.errorText : styles.helperText}>
          {error ?? helperText}
        </span>
      )}
    </div>
  )
}
