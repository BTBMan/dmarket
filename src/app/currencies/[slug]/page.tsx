import { cmcFetch } from '@/utils/fetches'

export default async function CurrenciesPage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params

  const res = await cmcFetch(`v2/cryptocurrency/info?slug=${slug}`).then(res => res.json())

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <pre className="overflow-scroll">{ JSON.stringify(res, null, 2) }</pre>
        </div>
      </div>
    </div>
  )
}
