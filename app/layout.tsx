import {
  Inter,
  Playfair_Display,
  Cinzel,
  Noto_Sans_Symbols,
} from 'next/font/google'
import '../styles/main.css'
import Providers from '@/components/providers/SessionProvider'
import Main from './Main'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${playfairDisplay.variable} ${cinzel.variable} ${notoSansSymbols.variable} antialiased min-h-screen transition-colors duration-300 loading`}
      >
        <Providers>
          <Main>{children}</Main>
        </Providers>
      </body>
    </html>
  )
}
