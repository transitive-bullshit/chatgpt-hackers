'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'

import LogoDark from '@/public/logo-dark.png'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Image
      className={cs(styles.logo, className)}
      src={LogoDark.src}
      alt='Logo'
      width={LogoDark.width}
      height={LogoDark.height}
    />
  )
}
