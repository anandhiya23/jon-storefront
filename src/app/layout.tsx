import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CartHydrator from '@/components/cart/CartHydrator'
import Providers from '@/components/Providers'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://jonperformance.id'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'JON — Just One Nation',
    template: '%s | JON',
  },
  description: 'Sport apparel built for precision and performance.',
  openGraph: {
    siteName: 'JON — Just One Nation',
    type: 'website',
    images: [{ url: `${BASE_URL}/runningwoman.png`, alt: 'JON — Just One Nation' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <CartHydrator />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
