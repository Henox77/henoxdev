import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '[İsminiz] - Full-stack Yazılımcı & Freelancer',
  description: 'Full-stack yazılım geliştiricisi ve bulut mimarı olarak web uygulamaları, dağıtık sistemler ve modern web teknolojileri üzerinde çalışıyorum.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
} 