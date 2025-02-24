import clsx from 'clsx'
import {
  Table,
  TableBody,
  TableCaption,
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
            <TableHead className="w-[50px] text-right text-[var(--foreground)]">#</TableHead>
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
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
