import {
  Inter,
  Playfair_Display,
  Cinzel,
  Noto_Sans_Symbols,
} from 'next/font/google'
import { headers } from 'next/headers'
import '../styles/main.css'
import '../styles/theme.css'
import Providers from '@/components/providers/SessionProvider'
import BrandProvider from '@/components/providers/BrandProvider'
import Main from './Main'
import { getBrandByDomain } from '@/utils/branding'

const inter = Inter({ subsets: ['latin'] })
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-playfair',
})
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
})
const notoSansSymbols = Noto_Sans_Symbols({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-symbols',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const h = await headers()
  const host = h.get('host') ?? h.get('x-forwarded-host') ?? 'localhost'
  const brand = getBrandByDomain(host)

  return (
    <html lang="en" suppressHydrationWarning data-theme="dark">
      <head>
        <title>{brand.name}</title>
        <meta name="description" content={brand.description} />
      </head>
      <body
        className={`${inter.className} ${playfairDisplay.variable} ${cinzel.variable} ${notoSansSymbols.variable} antialiased min-h-screen transition-colors duration-300 loading`}
      >
        <Providers>
          <BrandProvider brand={brand}>
            <Main>{children}</Main>
          </BrandProvider>
        </Providers>
      </body>
    </html>
  )
}
