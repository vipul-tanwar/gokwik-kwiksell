import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="py-4 text-center text-sm text-gray-500 mt-8 border-t">
          Crafted with passion by The Kwik Mavericks
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
