import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

interface Props {
  value: number | string
  unit?: string
  isUp?: boolean
  className?: string
}

export default function PercentageValue({ value, unit = '%', isUp = true, className }: Props) {
  return (
    <div className={clsx('flex items-center ', isUp ? 'text-green-500' : 'text-red-500', className)}>
      {isUp ? <TriangleUpIcon /> : <TriangleDownIcon />}
      <span>{value}{unit}</span>
    </div>
  )
}
