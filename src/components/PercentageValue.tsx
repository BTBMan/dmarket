import { TriangleDownIcon, TriangleUpIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'

export default function PercentageValue({ value, unit = '%', isUp = true }: { value: number | string, unit?: string, isUp?: boolean }) {
  return (
    <div className={clsx('flex items-center ', isUp ? 'text-green-500' : 'text-red-500')}>
      {isUp ? <TriangleUpIcon /> : <TriangleDownIcon />}
      <span className="text-[12px]">{value}{unit}</span>
    </div>
  )
}
