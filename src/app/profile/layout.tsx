'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { PropsWithChildren } from 'react'

export default function ProfileLayout({ children }: PropsWithChildren<{ params: Promise<{ slug: string }> }>) {
  const links = [
    {
      label: 'My Tokens',
      href: '/profile',
    },
    {
      label: 'My listing NFTs',
      href: '/profile/listing-nfts',
    },
    {
      label: 'My Own NFTs',
      href: '/profile/own-nfts',
    },
  ]

  const pathname = usePathname()

  return (
    <div>
      <h1>Some text here...</h1>
      <div className="pt-[var(--main-padding)]">
        <div className="flex items-center space-x-6 text-gray-500 [&>a:hover]:text-foreground">
          { links.map(link => (
            <Link className={clsx('leading-[40px] relative after:absolute after:w-full after:h-[2px] after:bg-foreground after:bottom-0 after:left-0 after:opacity-0 after:transition-opacity after:duration-300', { 'text-foreground': pathname === link.href, 'after:opacity-100': pathname === link.href })} key={link.href} href={link.href}>
              { link.label }
            </Link>
          )) }
        </div>
        <div className="mt-[var(--main-padding)]">
          { children }
        </div>
      </div>
    </div>
  )
}
