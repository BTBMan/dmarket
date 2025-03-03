'use client'

import { StarFilledIcon, StarIcon } from '@radix-ui/react-icons'

interface Props {
  isCollection: boolean
  onToggleCollection?: (isCollection: boolean) => void
}

export default function Collection({ isCollection, onToggleCollection }: Props) {
  const toggleCollection = () => {
    onToggleCollection?.(!isCollection)
  }

  return (
    <div className="cursor-pointer" onClick={toggleCollection}>
      {!isCollection
        ? <StarIcon className="text-gray-400 hover:text-yellow-500" />
        : <StarFilledIcon className="text-yellow-500" />}
    </div>
  )
}
