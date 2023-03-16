import * as React from 'react'
import cs from 'clsx'

import styles from './styles.module.css'

export const Button: React.FC<
  {
    className?: string
    buttonClassName?: string
    children: React.ReactNode
    isLoading?: boolean
  } & React.AnchorHTMLAttributes<HTMLAnchorElement>
> = ({
  className,
  buttonClassName,
  children,
  style,
  isLoading,
  ...buttonProps
}) => {
  return (
    <div className={cs(styles.buttonWrapper, className)} style={style}>
      <a className={cs(styles.button, buttonClassName)} {...buttonProps}>
        <div className={styles.buttonContent}>{children}</div>
      </a>
    </div>
  )
}
