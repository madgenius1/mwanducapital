"use client"
import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useReducedMotion } from "framer-motion"
import Reveal from "./Reveal"
import Photo from "./Photo"
import { track } from "../../lib/integrations"
import type { Slide } from "../../config/opportunity"

// Peek carousel: native scroll-snap (swipe on touch, trackpad, keyboard arrows), the next card peeks in, no slide numbers shown.
export default function OpportunitySlides({ slides }: { slides: Slide[] }) {
  const n = slides.length
  const track$ = useRef<HTMLDivElement>(null); const cards = useRef<(HTMLElement | null)[]>([]); const raf = useRef(0); const first = useRef(true)
  const [active, setActive] = useState(0); const reduce = useReducedMotion()
  const acts = slides.reduce<{ name: string; index: number }[]>((a, s, i) => (a.some((x) => x.name === s.act) ? a : [...a, { name: s.act, index: i }]), [])
  const to = useCallback((i: number) => {
    const tr = track$.current; const c = cards.current[Math.max(0, Math.min(n - 1, i))]; if (!tr || !c) return
    tr.scrollTo({ left: c.offsetLeft - (tr.clientWidth - c.clientWidth) / 2, behavior: reduce ? "auto" : "smooth" })
  }, [n, reduce])
  const onScroll = () => {
    cancelAnimationFrame(raf.current)
    raf.current = requestAnimationFrame(() => {
      const tr = track$.current; if (!tr) return; const mid = tr.scrollLeft + tr.clientWidth / 2; let best = 0, bd = Infinity
      cards.current.forEach((c, i) => { if (!c) return; const d = Math.abs(c.offsetLeft + c.clientWidth / 2 - mid); if (d < bd) { bd = d; best = i } })
      setActive(best)
    })
  }
  useEffect(() => { if (first.current) { first.current = false; return } track("opportunity_slide", { index: active + 1 }) }, [active])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])
  const act = slides[active]?.act
  return (
    <section id="opportunity" className="scroll-mt-20 py-12 lg:py-20" aria-labelledby="opp-h">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">THE OPPORTUNITY · WHY NOW</p>
          <h2 id="opp-h" className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">Wanting to invest is easy. Knowing how to start is not.</h2></Reveal>
        <div role="group" aria-label="Jump to a section" className="mt-8 flex flex-wrap gap-2">
          {acts.map((a) => (<button key={a.name} aria-pressed={act === a.name} onClick={() => { track("opportunity_jump", { section: a.name }); to(a.index) }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${act === a.name ? "border-violet bg-violet text-white" : "border-line bg-white hover:border-violet"}`}>{a.name}</button>))}
        </div>
      </div>
      <div ref={track$} onScroll={onScroll} tabIndex={0} role="group" aria-roledescription="carousel" aria-label="The opportunity and why now"
        onKeyDown={(e) => { if (e.key === "ArrowRight") { e.preventDefault(); to(active + 1) } if (e.key === "ArrowLeft") { e.preventDefault(); to(active - 1) } }}
        className="relative mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%_-_min(40vw,200px))] pb-4 pt-1 [-webkit-overflow-scrolling:touch] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((s, i) => (
          <article key={s.title} ref={(el) => { cards.current[i] = el }} aria-roledescription="slide" aria-label={`${i + 1} of ${n}`} onClick={() => i !== active && to(i)}
            className={`flex w-[80vw] max-w-[400px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-line bg-white transition duration-300 ${i === active ? "opacity-100" : "scale-[.96] cursor-pointer opacity-60"}`}>
            <div className="h-48 shrink-0 sm:h-56"><Photo {...s.image} rounded="rounded-none" className="h-full" sizes="(min-width:640px) 400px, 80vw" /></div>
            <div className="flex flex-1 flex-col p-6">
              <span className="self-start rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet">{s.act}</span>
              <h3 className="mt-4 min-h-[3.75em] text-2xl font-semibold leading-tight tracking-tight">{s.title}</h3>
              {s.points.map((p) => <p key={p} className="mt-3 leading-relaxed text-muted">{p}</p>)}
            </div>
          </article>))}
      </div>
      <div className="mx-auto mt-2 flex max-w-7xl items-center justify-between px-5 lg:px-8">
        <div className="flex items-center gap-2">{slides.map((s, i) => (
          <button key={s.title} onClick={() => to(i)} aria-label={`Go to slide ${i + 1}: ${s.title}`} aria-current={i === active}
            className={`relative h-2 rounded-full transition-all duration-300 before:absolute before:-inset-2 ${i === active ? "w-7 bg-violet" : "w-2 bg-lilac-2 hover:bg-violet/50"}`} />))}</div>
        <div className="flex gap-2">
          <button onClick={() => to(active - 1)} disabled={active === 0} aria-label="Previous slide" className="grid size-12 place-items-center rounded-full border border-line bg-white transition hover:border-violet hover:bg-violet hover:text-white disabled:pointer-events-none disabled:opacity-35"><ArrowLeft size={20} /></button>
          <button onClick={() => to(active + 1)} disabled={active === n - 1} aria-label="Next slide" className="grid size-12 place-items-center rounded-full border border-line bg-white transition hover:border-violet hover:bg-violet hover:text-white disabled:pointer-events-none disabled:opacity-35"><ArrowRight size={20} /></button>
        </div>
      </div>
    </section>
  )
}
