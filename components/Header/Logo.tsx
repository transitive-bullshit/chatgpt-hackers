'use client'

import * as React from 'react'
import cs from 'clsx'
import Image from 'next/image'
import { useGlitch } from 'react-powerglitch'

import LogoDark from '@/public/logo-dark.png'

import styles from './styles.module.css'

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  const glitch = useGlitch({
    playMode: 'hover'
  })

  return (
    <Image
      ref={glitch.ref}
      className={cs(styles.logo, className)}
      src={LogoDark.src}
      alt='Logo'
      width={LogoDark.width}
      height={LogoDark.height}
    />
  )
}
