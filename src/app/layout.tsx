import type { Metadata } from 'next'
import '../styles/globals.css'
import Header from '@/components/Header'
import Providers from '@/components/Providers'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'Decentralized Market',
  description: 'Decentralized Market where you can view and swap tokens, And you can also view, publish or buy NFTs.',
}

export default function RootLayout({
  children,
}: PagePropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="">
        <Providers>
          <div className="app">
            <Header />
            <main>
              <div className="main-content">
                { children }
              </div>
            </main>
          </div>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  )
}
