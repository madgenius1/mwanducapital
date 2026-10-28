import { Check, FlaskConical, Users, Rocket } from "lucide-react"
import Reveal from "./Reveal"
import TractionStat from "./TractionStat"
import { GrowBar } from "./RoadmapMotion"
import type { Metric } from "../../config/traction"
type Item = { label: string; status: string; date?: string }
type State = "done" | "now" | "next" | "target"
const stages: { title: string; kind: string; detail: string; state: State; Icon: typeof Check }[] = [
  { title: "Company registered", kind: "Actual", detail: "Mwandu Capital is a registered company.", state: "done", Icon: Check },
  { title: "Alpha testing", kind: "Actual", detail: "Underway.", state: "now", Icon: FlaskConical },
  { title: "Beta testing", kind: "Planned", detail: "Next. Date to be confirmed.", state: "next", Icon: Users },
  { title: "Public launch", kind: "Target", detail: "Q2 2027.", state: "target", Icon: Rocket },
]
const tag = "rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet"
const node: Record<State, string> = {
  done: "bg-violet text-white", now: "bg-white text-violet",
  next: "border-2 border-dashed border-paper/40 text-paper/60", target: "border-2 border-dashed border-paper/40 text-paper/60",
}
function StatusIcon({ s }: { s: string }) {
  if (s === "Obtained") return <span aria-hidden className="grid size-5 shrink-0 place-items-center rounded-full bg-violet text-white"><Check size={12} strokeWidth={3} /></span>
  if (s === "In progress") return <span aria-hidden className="size-5 shrink-0 animate-spin rounded-full border-2 border-lilac-2 border-t-transparent motion-reduce:animate-none" />
  return <span aria-hidden className="size-5 shrink-0 rounded-full border-2 border-dashed border-paper/40" />
}
export default function Roadmap({ items, metrics }: { items: Item[]; metrics: Metric[] }) {
  const by = (s: string) => items.filter((i) => i.status === s)
  const cols = [["Obtained", by("Obtained")], ["In progress", by("In progress")], ["Planned", by("Planned")]] as const
  const hasReg = by("Obtained").some((i) => i.label === "Company registration")
  const achievements = [
    ...(hasReg ? [] : ["Company registered as Mwandu Capital"]),
    ...by("Obtained").map((i) => i.label),
    "Mobile app in alpha testing", "Privacy, Terms and Risk disclosure drafted by our legal team",
    ...metrics.map((m) => `${m.value} ${m.label.toLowerCase()}`),
  ]
  const pct = (n: number) => (items.length ? (n / items.length) * 100 : 0)
  return (
    <section className="bg-ink py-16 text-paper lg:py-24" aria-labelledby="roadmap-h"><div className="mx-auto max-w-6xl px-5 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-lilac-2">OUR ROADMAP</p>
          <h2 id="roadmap-h" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Where we are today</h2>
          <p className="mt-3 text-paper/70">We’re early, and we’ll say so plainly.</p></Reveal>
        {metrics[0] && <Reveal delay={.1}><TractionStat metric={metrics[0]} dark /></Reveal>}
      </div>

      <ol className="mt-14 grid gap-10 lg:grid-cols-4 lg:gap-6" aria-label="Roadmap stages">
        {stages.map((s, n) => { const last = n === stages.length - 1; const solid = s.state === "done"
          return (
            <li key={s.title} className="relative pl-12 lg:pl-0 lg:pt-12">
              <span aria-hidden className={`absolute left-0 top-0 z-10 grid size-8 place-items-center rounded-full ${node[s.state]}`}>
                {s.state === "now" && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-violet/50 motion-reduce:hidden" />}<s.Icon size={16} /></span>
              {!last && <span aria-hidden className={`absolute left-[15px] top-8 bottom-[-2.5rem] lg:bottom-auto lg:left-8 lg:right-[-1.5rem] lg:top-[15px] ${solid ? "w-0.5 bg-violet lg:h-0.5 lg:w-auto" : "border-l-2 border-dashed border-paper/30 lg:h-0 lg:border-l-0 lg:border-t-2"}`} />}
              <Reveal delay={n * .1}>
                <div className="flex flex-wrap items-center gap-2"><span className={tag}>{s.kind}</span>{s.state === "now" && <span className="rounded-full bg-violet px-3 py-1 text-xs font-semibold text-white">You are here</span>}</div>
                <h3 className="mt-3 text-xl font-semibold">{s.title}</h3><p className="mt-1 text-paper/70">{s.detail}</p>
              </Reveal>
            </li>) })}
      </ol>

      <Reveal className="mt-14"><h3 className="text-2xl font-semibold">Achievements so far</h3>
        <ul className="mt-4 flex flex-wrap gap-3">{achievements.map((a) => (
          <li key={a} className="flex items-center gap-2 rounded-full bg-paper/10 px-4 py-2 text-sm"><span aria-hidden className="grid size-5 place-items-center rounded-full bg-violet text-white"><Check size={12} strokeWidth={3} /></span>{a}</li>))}</ul></Reveal>

      <Reveal className="mt-16"><h3 className="text-2xl font-semibold">Registrations and partner agreements</h3>
        <p className="mt-2 max-w-2xl text-paper/70">We’re working through the registrations and partner agreements needed to operate in Kenya’s financial market.</p>
        {items.length > 0 && (<>
          <div className="mt-6"><GrowBar segments={[{ pct: pct(by("Obtained").length), className: "bg-violet", label: `${by("Obtained").length} obtained` }, { pct: pct(by("In progress").length), className: "bg-lilac-2", label: `${by("In progress").length} in progress` }, { pct: pct(by("Planned").length), className: "bg-paper/20", label: `${by("Planned").length} planned` }]} /></div>
          <p className="mt-3 text-sm text-paper/60">{by("Obtained").length} obtained · {by("In progress").length} in progress · {by("Planned").length} planned</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">{cols.map(([name, list]) => (
            <div key={name}><h4 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-paper/70">{name}<span className="rounded-full bg-paper/10 px-2 py-0.5 text-xs">{list.length}</span></h4>
              <ul className="grid gap-2">{list.length ? list.map((i) => (
                <li key={i.label} className="flex items-center gap-3 rounded-2xl bg-paper/5 px-4 py-3"><StatusIcon s={name} /><span>{i.label}</span>{i.date && <span className="ml-auto text-xs text-paper/50">{i.date}</span>}</li>)) : <li className="rounded-2xl border border-dashed border-paper/15 px-4 py-3 text-sm text-paper/40">None yet</li>}</ul></div>))}</div></>)}
      </Reveal>
    </div></section>
  )
}
