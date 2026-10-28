import type { Metadata } from "next"
import { flags } from "./flags"
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
const base = ["investing in Kenya", "NSE investing", "Nairobi Securities Exchange", "beginner investing app Kenya", "investment account Kenya", "M-Pesa investing", "portfolio tracking Kenya", "financial education Kenya"]
const diaspora = ["Kenyan diaspora investing", "Kenyan diaspora NSE"]
// Held back until non-resident eligibility is confirmed in writing (COUNTRY_SEO_ENABLED).
const countrySpecific = ["Invest in Kenya from abroad", "NSE investing for diaspora", "Invest in Kenya from UK", "Invest in Kenya from US"]
const partner = ["African fintech", "African wealth-tech", "fintech partnership Kenya"]
const gated = (a: string[]) => [...a, ...(flags.COUNTRY_SEO_ENABLED ? countrySpecific : [])]
export const keywords = {
  home: [...base, ...(flags.DIASPORA_SIGNUP_CONFIRMED ? diaspora : [])],
  features: base,
  about: ["Mwandu", "investing in Kenya", "Nairobi Securities Exchange", "African fintech"],
  diaspora: gated(diaspora),
  investors: [...partner, "investing in Kenya", "Nairobi Securities Exchange"],
}
export function pageMeta({ title, description, path, keywords: kw, noindex }: { title: string; description: string; path: string; keywords?: string[]; noindex?: boolean }): Metadata {
  return { title, description, keywords: kw, alternates: { canonical: path }, robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: { title, description, url: path, type: "website", siteName: "Mwandu", locale: "en_KE", images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Mwandu — Investing in Kenya, made clearer" }] },
    twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } }
}
