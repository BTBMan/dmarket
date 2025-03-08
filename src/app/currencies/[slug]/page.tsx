export default async function CurrenciesPage({ params }: PageProps<{ slug: string }>) {
  const { slug } = await params

  const res = await fetch(`${process.env.COIN_MARKET_DOMAIN}/v2/cryptocurrency/info?slug=${slug}`, {
    headers: {
      'X-CMC_PRO_API_KEY': process.env.COIN_MARKET_KEY as string,
    },
  }).then(res => res.json())

  return (
    <div>
      <div className="flex">
        <div className="w-1/2">
          <pre className="overflow-scroll">{JSON.stringify(res, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
