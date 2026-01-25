import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import CustomCursor from '@/components/CustomCursor'
import ScrollProgress from '@/components/ScrollProgress'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Riyank Mukhopadhyay - Machine Learning Engineer',
  description: 'Machine Learning Engineer specializing in Generative AI, Computer Vision & Cloud Infrastructure. Building scalable AI systems at Arizona State University.',
  keywords: ['Machine Learning', 'AI', 'Computer Vision', 'Generative AI', 'AWS', 'Python', 'RAG'],
  authors: [{ name: 'Riyank Mukhopadhyay' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rmukhop3.github.io',
    title: 'Riyank Mukhopadhyay - Machine Learning Engineer',
    description: 'Machine Learning Engineer specializing in Generative AI, Computer Vision & Cloud Infrastructure',
    siteName: 'Riyank Mukhopadhyay Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Riyank Mukhopadhyay - Machine Learning Engineer',
    description: 'Machine Learning Engineer specializing in Generative AI, Computer Vision & Cloud Infrastructure',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Riyank Mukhopadhyay',
              jobTitle: 'Machine Learning Engineer',
              url: 'https://rmukhop3.github.io',
              sameAs: [
                'https://linkedin.com/in/riyankmukhopadhyay',
                'https://github.com/rmukhop3',
              ],
              worksFor: {
                '@type': 'Organization',
                name: 'Arizona State University',
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider>
          <CustomCursor />
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
