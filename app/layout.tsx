import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

export const metadata: Metadata = {
  title: 'Zencount – Free Online Accounting Software for Finance',
  description:
    'Zencount is a 100% free online accounting tool to manage invoices, expenses, and financial reports. Fast, secure, and designed for small businesses.',
  keywords: [
    'Free accounting software',
    'Invoice generator',
    'Small business finance',
    'Online bookkeeping',
    'Expense tracker',
  ],
  metadataBase: new URL('https://zencount.vercel.app'),
  openGraph: {
    title: 'Zencount – Free Online Accounting Software for Finance',
    description:
      'Manage invoices, track expenses, and generate financial reports with Zencount – the secure, 100% free tool for small businesses.',
    url: 'https://zencount.vercel.app',
    siteName: 'Zencount',
    images: [
      {
        url: 'https://zencount.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Zencount Dashboard Screenshot',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zencount – Free Online Accounting Software for Finance',
    description:
      'Zencount is a free, fast, and secure way to manage invoices and finances for small businesses.',
    images: ['https://zencount.vercel.app/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        {/* Google Site Verification */}
        <meta
          name="google-site-verification"
          content="WAA2LtftXQI5NqpWhptEPk5DMJSerf6mkXs8ZUl4xyU"
        />

        {/* Adsterra Script */}
        <script
          type="text/javascript"
          src="//pl27296265.profitableratecpm.com/1a/c5/2c/1ac52c652a58eb1656d3a4d0b28df1e8.js"
          async
        ></script>

        {/* JSON-LD Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Zencount',
              url: 'https://zencount.vercel.app',
              image: 'https://zencount.vercel.app/og-image.jpg',
              description:
                'Zencount is a 100% free online accounting tool to manage invoices, expenses, and financial reports. Fast, secure, and designed for small businesses.',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'Web',
              browserRequirements:
                'Requires JavaScript. Works best on modern browsers.',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '187',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Zencount',
                url: 'https://zencount.vercel.app',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://zencount.vercel.app/og-image.jpg',
                },
              },
            }),
          }}
        />
      </head>
      <body className={GeistSans.className}>{children}</body>
    </html>
  )
}
