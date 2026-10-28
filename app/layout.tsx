import type { ReactNode } from "react"
import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { SignupProvider } from "./_components/SignupModal"
import Analytics from "./_components/Analytics"
import { siteUrl } from "../config/seo"

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-outfit", display: "swap" })
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), applicationName: "Mwandu",
  title: "Mwandu — Investing in Kenya, made clearer",
  description: "Mwandu brings your everyday money, Investment Account and NSE holdings into one simpler experience. Join the early access list.",
}
export const viewport: Viewport = { themeColor: "#F8F7F3", width: "device-width", initialScale: 1 }
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}><body>
      <a href="#top" className="sr-only z-[200] rounded-full bg-violet px-5 py-3 font-medium text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <SignupProvider>{children}</SignupProvider><Analytics />
    </body></html>
  )
}
