import Card from './Card'

interface Props {
  type: 'card' | 'list'
}

export default function Skeleton({ type }: Props) {
  return (
    <div>
      {type === 'card' && <Card />}
    </div>
  )
}
