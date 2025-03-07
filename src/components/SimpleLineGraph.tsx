'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { getCryptoSparkLines } from '@/utils'

interface Props {
  value: number | string
  id: number
  alt: string
}

export default function SimpleLineGraph({ value, id, alt }: Props) {
  return (
    <div className={clsx('relative')}>
      <Image
        className={clsx({
          'hue-rotate-[75deg] saturate-[130%] brightness-[0.7]': Number(value) > 0,
          'hue-rotate-[300deg] saturate-[230%] brightness-[0.7] contrast-[180%]': Number(value) < 0,
        })}
        src={getCryptoSparkLines(id)}
        alt={alt}
        fill
      />
    </div>
  )
}
