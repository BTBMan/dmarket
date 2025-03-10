import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Props {
  className?: string
}

export default function NFTCard({ className }: Props) {
  return (
    <div className={className}>
      <Card className="overflow-hidden">
        <CardContent className="relative h-[340px] overflow-hidden">
          <Image className="hover:scale-110 transition-all duration-300" src="https://i.seadn.io/s/raw/files/1de3a093463179fd5e4faf5b2afb1a68.png?auto=format&dpr=1&w=750" alt="RKL Rookies" fill objectFit="cover" />
        </CardContent>
        <CardFooter className="p-4">
          <div className="w-full">
            <div className="flex items-center justify-between text-[16px]">
              <h3>Rookie #737</h3>
              <div>0.0349 ETH</div>
            </div>
            <Button className="w-full mt-4 text-[16px]">BUY</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
