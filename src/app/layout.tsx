import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Decentralized Market',
  description: 'Decentralized Market that you can view and swap tokens, And you can also view, publish or buy NFTs.',
}

export default function RootLayout({
  children,
}: PagePropsWithChildren) {
  return (
    <html lang="en">
      <body
        className=""
      >
        {children}
      </body>
    </html>
  )
}
