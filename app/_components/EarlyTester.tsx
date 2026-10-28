"use client"
import { Sparkles, Compass, Rocket, MessageCircle, Mail } from "lucide-react"
import Reveal from "./Reveal"
import { useSignup } from "./SignupModal"
import { track } from "../../lib/integrations"
const perks = [[Sparkles, "Early access"], [Compass, "Ability to influence product direction"], [Rocket, "First look at new features"], [MessageCircle, "Simple feedback channels"], [Mail, "Launch updates"]] as const
export default function EarlyTester() {
  const { open } = useSignup()
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="rounded-[36px] bg-violet p-8 text-white sm:p-12 lg:p-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal><h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">Help shape a clearer way to invest.</h2>
            <p className="mt-5 max-w-lg text-lg text-white/85">We’re inviting a limited group of early testers to try Mwandu, share feedback, and help shape the product before wider launch.</p>
            <button onClick={() => { track("cta_click", { where: "early_tester" }); open() }} className="mt-8 rounded-full bg-white px-7 py-4 font-medium text-violet transition hover:bg-lilac active:scale-[.97]">Join early access</button>
            <p className="mt-4 text-sm text-white/70">Alpha testing is underway. Beta testing comes next.</p></Reveal>
          <ul className="grid gap-3 self-center">{perks.map(([Icon, t], n) => (
            <Reveal key={t} delay={n * .07}><li className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-4"><Icon size={20} />{t}</li></Reveal>))}</ul>
        </div>
      </div>
    </section>
  )
}
