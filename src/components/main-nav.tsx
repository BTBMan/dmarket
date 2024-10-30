import Link from 'next/link'

export default function MainNav() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/">
        Cryptocurrencies
      </Link>
      <Link href="/">
        NFTs
      </Link>
      <Link href="/">
        Exchanges
      </Link>
    </nav>
  )
}
