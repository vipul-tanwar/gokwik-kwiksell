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
        <footer className="py-6 text-center mt-10 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center">
              <p className="text-sm font-medium" style={{ color: "#004B8D" }}>
                Crafted with passion by The Kwik Mavericks
              </p>
              <p className="text-xs text-gray-500 mt-2">
                © {new Date().getFullYear()} GoKwik | All Rights Reserved
              </p>
            </div>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
