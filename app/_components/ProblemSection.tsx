import { Compass, Layers, Eye } from "lucide-react"
import Reveal from "./Reveal"
import Photo from "./Photo"
import { images } from "../../config/images"
const items = [
  { i: Compass, t: "Investing feels harder than it should", d: "Jargon and unclear first steps keep curious people on the sidelines." },
  { i: Layers, t: "Everyday money and investing feel disconnected", d: "Cash, holdings and activity live in different places, so the full picture is missing." },
  { i: Eye, t: "It is difficult to know what happens next", d: "Important actions arrive with little context about what you are confirming." },
]
export default function ProblemSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
      <div className="grid items-end gap-8 lg:grid-cols-2">
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">THE PROBLEM</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Wanting to invest is the easy part.</h2></Reveal>
        <Reveal delay={.1}><Photo {...images.problem} className="aspect-[16/9]" /></Reveal>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {items.map(({ i: Icon, t, d }, n) => (
          <Reveal key={t} delay={n * .1}>
            <div className="h-full rounded-[28px] border border-line bg-white p-7 transition hover:-translate-y-1 hover:border-lilac-2">
              <span className="grid size-12 place-items-center rounded-2xl bg-lilac text-violet"><Icon size={22} /></span>
              <h3 className="mt-5 text-xl font-semibold">{t}</h3><p className="mt-2 text-muted">{d}</p>
            </div>
          </Reveal>))}
      </div>
    </section>
  )
}
