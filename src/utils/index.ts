import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
  return `https://s2.coinmarketcap.com/static/img/coins/64x64/${id}.png`
}

export function getCryptoSparkLines(id: string) {
  return `https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/${id}.svg`
}
