"use client"
import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Script from "next/script"
import { track } from "../../lib/integrations"
type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void }
// Forwards every track() event to window.dataLayer (works with Google Tag Manager) and to GA4 if NEXT_PUBLIC_GA_ID is set.
// No credentials live in code. Also reports scroll depth (25/50/75/100%) per page.
export default function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA_ID; const path = usePathname()
  useEffect(() => {
    const w = window as W; w.dataLayer = w.dataLayer || []
    const on = (e: Event) => { const { event, ...p } = (e as CustomEvent).detail; w.dataLayer!.push({ event, ...p }); w.gtag?.("event", event, p) }
    window.addEventListener("mwandu:track", on); return () => window.removeEventListener("mwandu:track", on)
  }, [])
  useEffect(() => {
    const seen = new Set<number>()
    const f = () => { const d = document.documentElement; const pct = ((d.scrollTop + window.innerHeight) / d.scrollHeight) * 100
      for (const t of [25, 50, 75, 100]) if (pct >= t - 1 && !seen.has(t)) { seen.add(t); track("scroll_depth", { percent: t, path }) } }
    window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f)
  }, [path])
  if (!id) return null
  return (<><Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
    <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${id}');`}</Script></>)
}
