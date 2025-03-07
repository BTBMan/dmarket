'use client'

import { Line, LineChart } from 'recharts'
import clsx from 'clsx'
import type { ChartConfig } from '@/components/ui/chart'
import { ChartContainer } from '@/components/ui/chart'

interface Props {
  data: {
    value: number
  }[]
  className?: string
  isUp?: boolean
}

export default function LargeLineGraph({ data, className, isUp = true }: Props) {
  const chartConfig = {
    value: {
      label: 'Value',
      color: isUp ? 'var(--color-green-500)' : 'var(--color-red-500)',
    },
  } satisfies ChartConfig

  return (
    <div className={clsx('flex justify-end', className)}>
      <ChartContainer config={chartConfig} className="w-full h-full">
        <LineChart
          accessibilityLayer
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <Line
            dataKey="value"
            type="natural"
            stroke="var(--color-value)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  )
}
