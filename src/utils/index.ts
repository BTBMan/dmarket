import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { SparkLineDuration } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    ...options,
  }).format(value)
}

export function formatNumberToShort(value: number) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value)
}

export function getCryptoImage(id: string) {
  return `${process.env.NEXT_PUBLIC_COIN_MARKET_STATIC_DOMAIN}/static/img/coins/64x64/${id}.png`
}

export function getCryptoSparkLines(id: string | number, duration: SparkLineDuration = '7d') {
  return `${process.env.NEXT_PUBLIC_COIN_MARKET_GENERATED_DOMAIN}/generated/sparklines/web/${duration}/2781/${id}.svg`
}
