import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Doa Ibu - Prayer of Mother | Aplikasi Doa dan Kasih Sayang Ibu',
  description: 'Aplikasi yang menyajikan doa dan suara penuh kasih dari Ibu, yang bisa diputar kapan saja untuk memberikan ketenangan dan kekuatan dalam hidup Anda.',
  keywords: 'doa ibu, prayer of mother, aplikasi doa, kasih sayang ibu, spiritual, keluarga',
  authors: [{ name: 'Doa Ibu Team' }],
  creator: 'Doa Ibu',
  publisher: 'Doa Ibu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://doaibu.app'),
  openGraph: {
    title: 'Doa Ibu - Prayer of Mother',
    description: 'Aplikasi yang menyajikan doa dan suara penuh kasih dari Ibu',
    url: 'https://doaibu.app',
    siteName: 'Doa Ibu',
    images: [
      {
        url: '/logo-doa-ibu.png',
        width: 1200,
        height: 630,
        alt: 'Doa Ibu - Prayer of Mother',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doa Ibu - Prayer of Mother',
    description: 'Aplikasi yang menyajikan doa dan suara penuh kasih dari Ibu',
    images: ['/logo-doa-ibu.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/logo-doa-ibu.png" />
        <link rel="apple-touch-icon" href="/logo-doa-ibu.png" />
        <meta name="theme-color" content="#ec4899" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
