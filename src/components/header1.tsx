'use client'

import Link from 'next/link'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import MainNav from './main-nav1'
import { Button } from './ui/button'

export default function Header() {
  const { setTheme } = useTheme()

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
        <div className="space-x-2">
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
