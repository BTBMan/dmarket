import Image from 'next/image'
import clsx from 'clsx'
import Collection from '@/components/Collection'
import PercentageValue from '@/components/PercentageValue'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatNumberToShort, getCryptoImage, getCryptoSparkLines } from '@/utils'

export default async function CryptoTable() {
  const data = await fetch(`${process.env.COIN_MARKET_DOMAIN}/cryptocurrency/listings/latest`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
    },
  }).then(res => res.json())

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px] text-right text-[var(--foreground)]">#</TableHead>
            <TableHead className="text-[var(--foreground)]">Name</TableHead>
            <TableHead className="text-right w-[100px] text-[var(--foreground)]">Price</TableHead>
            <TableHead className="text-right w-[100px] text-[var(--foreground)]">1h %</TableHead>
            <TableHead className="text-right w-[100px] text-[var(--foreground)]">24h %</TableHead>
            <TableHead className="text-right w-[100px] text-[var(--foreground)]">7d %</TableHead>
            <TableHead className="w-[180px] text-right text-[var(--foreground)]">Market Cap</TableHead>
            <TableHead className="w-[180px] text-right text-[var(--foreground)]">Volume(24h)</TableHead>
            <TableHead className="w-[180px] text-right text-[var(--foreground)]">Circulating Supply</TableHead>
            <TableHead className="w-[180px] text-right text-[var(--foreground)]">Last 7 days</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(data.data || []).map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell className="text-right">
                <div className="flex items-center justify-between">
                  <Collection isCollection={false} />
                  {index + 1}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    className="rounded-full"
                    src={getCryptoImage(item.id)}
                    alt={item.name}
                    width={24}
                    height={24}
                  />
                  <span>{item.name}</span>
                  <span className="text-gray-400">{item.symbol}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.quote.USD.price)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue
                    value={Math.abs(item.quote.USD.percent_change_1h).toFixed(2)}
                    isUp={item.quote.USD.percent_change_1h > 0}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue
                    value={Math.abs(item.quote.USD.percent_change_24h).toFixed(2)}
                    isUp={item.quote.USD.percent_change_24h > 0}
                  />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue
                    value={Math.abs(item.quote.USD.percent_change_7d).toFixed(2)}
                    isUp={item.quote.USD.percent_change_7d > 0}
                  />
                </div>
              </TableCell>
              <TableCell className="text-right">
                {formatCurrency(item.quote.USD.market_cap, { maximumFractionDigits: 0 })}
              </TableCell>
              <TableCell className="text-right">
                <div>{formatCurrency(item.quote.USD.volume_24h)}</div>
                <div className="text-[12px] text-gray-300">
                  {formatNumberToShort(item.quote.USD.volume_24h / item.quote.USD.price)}
                  {item.symbol}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="text-gray-300">
                  {formatNumberToShort(item.circulating_supply)}
                  {item.symbol}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="relative h-[50px] w-full">
                  <Image
                    className={clsx({
                      'hue-rotate-[75deg] saturate-[130%] brightness-[0.7]': item.quote.USD.percent_change_7d > 0,
                      'hue-rotate-[300deg] saturate-[230%] brightness-[0.7] contrast-[180%]': item.quote.USD.percent_change_7d < 0,
                    })}
                    src={getCryptoSparkLines(item.id)}
                    alt={item.name}
                    fill
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
