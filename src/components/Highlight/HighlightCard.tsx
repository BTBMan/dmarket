'use client'

import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import clsx from 'clsx'
import PercentageValue from '@/components/PercentageValue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HighlightCard({ title }: { title: string }) {
  const [list] = useState([{ id: 1 }, { id: 2 }, { id: 3 }])

  return (
    <div>
      <Card className="shadow-sm hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle>
            <Link className="flex items-center" href="/">{title}<ChevronRightIcon /></Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {list.map((item, index) => (
              <li className="min-h-[50px] flex items-center justify-between" key={item.id}>
                <div className="flex-1 flex items-center justify-between">
                  <div className="flex items-center gap-[8px]">
                    <span className="text-gray-500">{ index + 1 }</span>
                    <span>Img</span>
                    <span>BTC</span>
                  </div>
                  <div className={clsx(index === 0 ? 'text-green-500' : 'text-red-500')}>
                    $95,682.59
                  </div>
                </div>
                <div className="min-w-[88px] flex flex-col items-end">
                  <div>Graph</div>
                  <PercentageValue value={10} isUp />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
