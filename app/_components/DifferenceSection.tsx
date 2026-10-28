import { Check, X } from "lucide-react"
import Reveal from "./Reveal"
import Photo from "./Photo"
import { images } from "../../config/images"
const common = ["Complex language", "Scattered information", "Unclear cash and investment separation", "Limited context before important actions", "Investing feels like a transaction, not a learning journey"]
const mwandu = ["Plain-language explanations", "Chequing Wallet and Investment Account shown separately", "Clear portfolio and holdings visibility", "Guided steps before important actions", "A calmer, more understandable investing experience"]
export default function DifferenceSection() {
  return (
    <section id="why-mwandu" className="scroll-mt-20 bg-ink py-16 text-paper lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-lilac-2">WHY MWANDU</p>
          <h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Same market. A clearer way in.</h2></Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-[1fr_1fr_.8fr]">
          <Reveal><div className="h-full rounded-[28px] border border-paper/15 p-7"><h3 className="text-lg font-medium text-paper/60">Common financial experiences</h3>
            <ul className="mt-5 space-y-4">{common.map((c) => <li key={c} className="flex gap-3 text-paper/70"><X size={20} className="mt-0.5 shrink-0 text-paper/40" />{c}</li>)}</ul></div></Reveal>
          <Reveal delay={.1}><div className="h-full rounded-[28px] bg-violet p-7"><h3 className="text-lg font-medium">Mwandu</h3>
            <ul className="mt-5 space-y-4">{mwandu.map((c) => <li key={c} className="flex gap-3"><Check size={20} className="mt-0.5 shrink-0 text-lilac" />{c}</li>)}</ul></div></Reveal>
          <Reveal delay={.2} className="hidden lg:block"><Photo {...images.difference} className="h-full min-h-[320px]" sizes="25vw" /></Reveal>
        </div>
      </div>
    </section>
  )
}
