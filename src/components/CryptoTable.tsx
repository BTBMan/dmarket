import Collection from '@/components/Collection'
import PercentageValue from '@/components/PercentageValue'
import SimpleLineChart from '@/components/SimpleLineChart'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/utils'

export default async function CryptoTable() {
  const data = await fetch(`${process.env.COIN_MARKET_DOMAIN}/cryptocurrency/listings/latest`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
    },
  }).then(res => res.json())

  console.log(data)

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
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell className="text-right">
                <div className="flex items-center justify-between">
                  <Collection isCollection={false} />
                  {index + 1}
                </div>
              </TableCell>
              <TableCell>
                Img Bitcoin <span>{item.symbol}</span>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(item.quote.USD.price)}</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={Math.abs(item.quote.USD.percent_change_1h).toFixed(2)} isUp={item.quote.USD.percent_change_1h > 0} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={Math.abs(item.quote.USD.percent_change_24h).toFixed(2)} isUp={item.quote.USD.percent_change_24h > 0} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={Math.abs(item.quote.USD.percent_change_7d).toFixed(2)} isUp={item.quote.USD.percent_change_7d > 0} />
                </div>
              </TableCell>
              <TableCell className="text-right">{formatCurrency(item.quote.USD.market_cap)}</TableCell>
              <TableCell className="text-right">
                <div>{formatCurrency(item.quote.USD.volume_24h)}</div>
                <div className="text-[12px]">609.54K BTC</div>
              </TableCell>
              <TableCell className="text-right">
                <div>19.82M BTC</div>
              </TableCell>
              <TableCell className="text-right">
                <SimpleLineChart
                  className="h-[50px]"
                  data={[
                    { value: 186 },
                    { value: 305 },
                    { value: 237 },
                    { value: 73 },
                    { value: 209 },
                    { value: 214 },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
