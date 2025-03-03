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

export default function CryptoTable() {
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
          {Array.from({ length: 10 }).map((_, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <TableRow key={index}>
              <TableCell className="text-right">
                <div className="flex items-center justify-between">
                  <Collection isCollection={false} />
                  1
                </div>
              </TableCell>
              <TableCell>
                Img Bitcoin <span>BTC</span>
              </TableCell>
              <TableCell className="text-right">$86,732.11</TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={10} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={10} isUp={false} />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-end">
                  <PercentageValue value={10} />
                </div>
              </TableCell>
              <TableCell className="text-right">$1,718,427,973,931</TableCell>
              <TableCell className="text-right">
                <div>$1,718,427,973,931</div>
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
