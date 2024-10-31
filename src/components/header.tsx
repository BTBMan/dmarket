'use client'

import Link from 'next/link'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import MainNav from './main-nav'
import { Button } from './ui/button'

export default function Header() {
  const { setTheme } = useTheme()

  return (
    <header>
      <div className="max-w-[1400px] min-w-[1000px] mx-auto flex items-center justify-between">
        <div>
          <div>
            <Link href="/">
              <img className="w-[80px]" src="/logo.svg" />
            </Link>
          </div>
          <MainNav />
        </div>
        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setTheme('light')
            }}
          >
            <SunIcon />
          </Button>
          <Button
            size="icon"
            onClick={() => {
              setTheme('dark')
            }}
          >
            <MoonIcon />
          </Button>
        </div>
      </div>
    </header>
  )
}
