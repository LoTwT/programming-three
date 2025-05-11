import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import NextLink from "next/link"
import "./globals.css"

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "programming-three",
  description: "programming-three",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${dmSans.variable} h-full w-full antialiased`}>
        {children}

        <NextLink href="/" className="fixed top-0 right-0 mr-2 text-lg">
          Home
        </NextLink>
      </body>
    </html>
  )
}
