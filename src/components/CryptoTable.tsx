import Image from 'next/image'
import Link from 'next/link'
import SimpleLineGraph from '@/components/SimpleLineGraph'
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
import { formatCurrency, formatNumberToShort, getCryptoImage } from '@/utils'
import { cmcFetch } from '@/utils/fetches'

export default async function CryptoTable() {
  const res = await cmcFetch(`v1/cryptocurrency/listings/latest`).then(res => res.json())

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
          { (res.data || []).map((item: any, index: number) => (
            <Link href={`/currencies/${item.slug}`} legacyBehavior key={item.id}>
              <TableRow className="cursor-pointer">
                <TableCell className="text-right">
                  <div className="flex items-center justify-between">
                    <Collection isCollection={false} />
                    { index + 1 }
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
                    <span>{ item.name }</span>
                    <span className="text-gray-400">{ item.symbol }</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  { formatCurrency(item.quote.USD.price) }
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
                  { formatCurrency(item.quote.USD.market_cap, { maximumFractionDigits: 0 }) }
                </TableCell>
                <TableCell className="text-right">
                  <div>{ formatCurrency(item.quote.USD.volume_24h, { maximumFractionDigits: 0 }) }</div>
                  <div className="text-[12px] text-gray-300">
                    { formatNumberToShort(item.quote.USD.volume_24h / item.quote.USD.price) } { item.symbol }
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div>
                    { formatNumberToShort(item.circulating_supply) } { item.symbol }
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <SimpleLineGraph
                    className="h-[50px] w-full"
                    id={item.id}
                    alt={item.symbol}
                    value={item.quote.USD.percent_change_7d}
                    duration="7d"
                  />
                </TableCell>
              </TableRow>
            </Link>
          )) }
        </TableBody>
      </Table>
    </div>
  )
}
