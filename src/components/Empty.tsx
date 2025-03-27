import { PackageX } from 'lucide-react'
import { cloneElement } from 'react'
import { cn } from '@/utils'

interface Props {
  text?: string
  className?: string
  icon?: React.ReactNode
}

const DEFAULT_ICON = <PackageX size={64} />
const DEFAULT_ICON_SIZE = 64

export default function Empty({ className, text = 'Nothing here ...', icon = DEFAULT_ICON }: Props) {
  // eslint-disable-next-line react/no-clone-element
  const iconToRender = cloneElement((icon as any), {
    size: (icon as any).props.size || DEFAULT_ICON_SIZE,
  })

  return (
    <div className={cn('flex justify-center py-10', className)}>
      <div className="flex flex-col items-center">
        <div className="mb-4 text-gray-400">
          { iconToRender }
        </div>
        <h3 className="mb-2 text-lg font-medium">{ text }</h3>
      </div>
    </div>
  )
}
