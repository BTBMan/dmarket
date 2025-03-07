import Link from 'next/link'
import { ChevronRightIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import Image from 'next/image'
import PercentageValue from '@/components/PercentageValue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SimpleLineChart from '@/components/SimpleLineGraph'
import { getCryptoImage } from '@/utils'

export interface CoinItem {
  id: string
  symbol: string
  price: string
  percent_change_24h: string
}

interface Props {
  title: string
  list: CoinItem[]
}

export default function HighlightCard({ title, list }: Props) {
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
                    <span><Image className="rounded-full" src={getCryptoImage(item.id)} alt={item.symbol} width={24} height={24} /></span>
                    <span>{item.symbol}</span>
                  </div>
                  <div>{item.price}</div>
                </div>
                <div className="min-w-[88px] flex flex-col items-end">
                  <SimpleLineChart
                    className="w-[80%] h-[20px]"
                    isUp={index !== 0}
                    data={[
                      { value: 186 },
                      { value: 305 },
                      { value: 237 },
                      { value: 73 },
                      { value: 209 },
                      { value: 214 },
                    ]}
                  />
                  <PercentageValue value={Math.abs(Number(item.percent_change_24h))} isUp={Number(item.percent_change_24h) > 0} />
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
