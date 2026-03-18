import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Alleged Scam Incident Reports`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'scam reports', 'Zelle scam', 'Venmo fraud', 'Cash App scam',
    'PayPal fraud report', 'Facebook Marketplace scam', 'phone number scam lookup',
    'online payment scam', 'scam database', 'fraud report',
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Alleged Scam Incident Reports`,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Alleged Scam Incident Reports`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
