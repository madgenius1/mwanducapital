"use client"
import { ArrowRight } from "lucide-react"
import Reveal from "./Reveal"
import PhoneMockup from "./PhoneMockup"
import { useSignup } from "./SignupModal"
import { track } from "../../lib/integrations"
export default function Hero({ showDiaspora = false }: { showDiaspora?: boolean }) {
  const { open } = useSignup()
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
      <div>
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">INVESTING, MADE CLEARER</p></Reveal>
        <Reveal delay={.08}><h1 className="mt-4 text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">A simpler way to invest in Kenya.</h1></Reveal>
        <Reveal delay={.16}><p className="mt-6 max-w-xl text-lg text-muted">Mwandu brings your everyday money, Investment Account, NSE holdings, and learning journey into one simpler experience.</p></Reveal>
        {showDiaspora && (
          <Reveal delay={.22}><p className="mt-4 text-sm text-muted"><a href="/diaspora" className="underline underline-offset-4 hover:text-violet">Based outside Kenya?</a> Mwandu is being built with you in mind.</p></Reveal>)}
        <Reveal delay={.28} className="mt-8 flex flex-wrap gap-3">
          <button onClick={() => { track("cta_click", { where: "hero" }); open() }} className="group inline-flex items-center gap-2 rounded-full bg-violet px-7 py-4 font-medium text-white transition hover:bg-violet-dark active:scale-[.97]">
            Join the early access list <ArrowRight size={18} className="transition group-hover:translate-x-1" /></button>
          <a href="#how-it-works" className="rounded-full border border-ink/15 px-7 py-4 font-medium transition hover:border-ink">See how it works</a>
        </Reveal>
        <Reveal delay={.34}><p className="mt-5 text-xs text-muted">Alpha testing is underway. Public launch is targeted for Q2 2027.</p></Reveal>
      </div>
      <Reveal delay={.2}><PhoneMockup /></Reveal>
    </section>
  )
}
