import { Skeleton } from '@/components/ui/skeleton'

export default function Card() {
  return (
    <div className="grid grid-cols-5 gap-4">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex flex-col space-y-3">
          <Skeleton className="h-[200px] rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      ))}
    </div>
  )
}
