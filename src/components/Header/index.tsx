'use client'

import Link from 'next/link'
import MainNav from './MainNav'
import MainMenu from './MainMenu'

export default function Header() {
  return (
    <header className="border-b-[1px]">
      <div className="main-content flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-6">
            <Link href="/">
              <img className="w-[40px] rounded-full border-[1px]" src="/logo.svg" />
            </Link>
          </div>
          <MainNav />
        </div>
        <div>
          <MainMenu />
        </div>
      </div>
    </header>
  )
}
