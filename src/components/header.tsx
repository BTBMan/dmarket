import Link from 'next/link'
import MainNav from './main-nav'

export default function Header() {
  return (
    <header>
      <div className="max-w-[1400px] min-w-[1000px] mx-auto flex items-center">
        <div>
          <Link href="/">
            <img className="w-[80px]" src="/logo.svg" />
          </Link>
        </div>
        <MainNav />
      </div>
    </header>
  )
}
