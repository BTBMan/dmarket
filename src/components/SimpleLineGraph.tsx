'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { getCryptoSparkLines } from '@/utils'
import type { SparkLineDuration } from '@/utils/types'

interface Props {
  value: number | string
  id: number | string
  alt: string
  className?: string
  duration?: SparkLineDuration
}

export default function SimpleLineGraph({ value, id, alt, className, duration }: Props) {
  return (
    <div className={clsx('relative', className)}>
      <Image
        className={clsx({
          'hue-rotate-[75deg] saturate-[130%] brightness-[0.7]': Number(value) > 0,
          'hue-rotate-[300deg] saturate-[230%] brightness-[0.7] contrast-[180%]': Number(value) < 0,
        })}
        src={getCryptoSparkLines(id, duration)}
        alt={alt}
        fill
      />
    </div>
  )
}
