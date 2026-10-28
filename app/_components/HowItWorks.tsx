"use client"
import { useEffect, useRef, useState } from "react"
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { ArrowDown } from "lucide-react"
import Reveal from "./Reveal"
import { steps, type Step } from "../../config/howItWorks"
import { visuals } from "./HowItWorksVisuals"

// One theme per step: flat brand colours, with a text/card colour set that keeps contrast on each background.
const themes = [
  { bg: "bg-lilac", title: "text-violet", text: "text-ink", muted: "text-ink/70", note: "bg-white/70", card: "bg-white" },
  { bg: "bg-white", title: "text-violet", text: "text-ink", muted: "text-ink/70", note: "bg-lilac", card: "bg-lilac" },
  { bg: "bg-violet", title: "text-white", text: "text-white", muted: "text-white/80", note: "bg-white/15", card: "bg-white" },
  { bg: "bg-ink", title: "text-lilac-2", text: "text-paper", muted: "text-paper/70", note: "bg-paper/10", card: "bg-paper" },
]
type Theme = (typeof themes)[number]
const pad = (n: number) => String(n).padStart(2, "0")

// Plain stacked cards for reduced-motion users and very short screens (where pinned panels would clip).
function useSimple() {
  const reduce = useReducedMotion(); const [short, setShort] = useState(false)
  useEffect(() => {
    let w = window.innerWidth; const f = () => setShort(window.innerHeight < 640)
    const onResize = () => { if (window.innerWidth !== w) { w = window.innerWidth; f() } } // ignore height-only changes (mobile browser toolbars)
    f(); window.addEventListener("resize", onResize); window.addEventListener("orientationchange", f)
    return () => { window.removeEventListener("resize", onResize); window.removeEventListener("orientationchange", f) }
  }, [])
  return !!reduce || short
}

function StepText({ s, i, t }: { s: Step; i: number; t: Theme }) {
  return (
    <div className="space-y-4 md:space-y-5">
      <span aria-hidden className={`hidden text-8xl font-bold leading-none tracking-tighter opacity-20 md:block ${t.title}`}>{pad(i + 1)}</span>
      <p className={`text-sm font-semibold tracking-[.2em] ${t.title}`}>STEP {pad(i + 1)}</p>
      <span aria-hidden className={`block h-2 w-16 rounded-full bg-current ${t.title}`} />
      <h3 id={`step-${i + 1}-h`} className={`text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl ${t.title}`}>{s.title}</h3>
      <p className={`max-w-xl text-xl font-semibold md:text-2xl ${t.text}`}>{s.tagline}</p>
      <p className={`max-w-xl text-base leading-relaxed md:text-lg ${t.muted}`}>{s.description}</p>
      {s.note && <p className={`max-w-xl rounded-2xl p-4 text-sm ${t.note} ${t.text}`}>{s.note}</p>}
    </div>
  )
}
function StepVisual({ i, t }: { i: number; t: Theme }) {
  const V = visuals[i]
  return (<div className={`float-slow mx-auto w-full max-w-md rounded-[28px] p-5 text-ink shadow-xl md:p-6 ${t.card}`}><V /></div>)
}

function Panel({ s, i, n, p, enter0 }: { s: Step; i: number; n: number; p: MotionValue<number>; enter0: MotionValue<number> }) {
  const t = themes[i]; const last = i === n - 1
  // enter: 0 -> 1 while this panel slides in. covered: 0 -> 1 while the next panel slides over it.
  const enter = useTransform(i === 0 ? enter0 : p, i === 0 ? [0, 1] : [(i - 1) / (n - 1), i / (n - 1)], [0, 1], { clamp: true })
  const covered = useTransform(p, last ? [0, 1] : [i / (n - 1), (i + 1) / (n - 1)], last ? [0, 0] : [0, 1], { clamp: true })
  const textY = useTransform(enter, [0, 0.8], [56, 0]); const textO = useTransform(enter, [0, 0.6], [0, 1])
  const visY = useTransform(enter, [0.1, 1], [90, 0]); const visS = useTransform(enter, [0.1, 1], [0.9, 1]); const visO = useTransform(enter, [0.1, 0.7], [0, 1])
  const innerS = useTransform(covered, [0, 1], [1, 0.93]); const innerY = useTransform(covered, [0, 1], [0, -24]); const dim = useTransform(covered, [0, 1], [0, 0.35])
  return (
    <article aria-labelledby={`step-${i + 1}-h`} className={`sticky top-0 isolate flex h-[100svh] min-h-[560px] items-center overflow-hidden pb-6 pt-16 md:pt-20 ${t.bg} ${i > 0 ? "rounded-t-[36px] shadow-[0_-24px_60px_-30px_rgba(32,34,31,.55)]" : ""}`}>
      <motion.div style={{ scale: innerS, y: innerY }} className="mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid items-center gap-6 md:grid-cols-2 md:gap-16">
          <motion.div style={{ y: textY, opacity: textO }}><StepText s={s} i={i} t={t} /></motion.div>
          <motion.div style={{ y: visY, scale: visS, opacity: visO }}><StepVisual i={i} t={t} /></motion.div>
        </div>
      </motion.div>
      <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-ink" />
    </article>
  )
}

export default function HowItWorks() {
  const simple = useSimple(); const n = steps.length
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const { scrollYProgress: enter0 } = useScroll({ target: ref, offset: ["start end", "start start"] })
  const [active, setActive] = useState(0)
  useMotionValueEvent(p, "change", (v) => setActive(Math.max(0, Math.min(n - 1, Math.round(v * (n - 1))))))
  const go = (i: number) => { const el = ref.current; if (!el) return; window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + i * (el.scrollHeight / n), behavior: "smooth" }) }
  return (
    <section id="how-it-works" className="scroll-mt-20" aria-labelledby="hiw-h">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 lg:px-8 lg:pt-24">
        <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">HOW IT WORKS</p>
          <h2 id="hiw-h" className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Four steps. No guesswork.</h2>
          {!simple && <p className="mt-5 inline-flex items-center gap-2 text-sm text-muted">Scroll to follow each step <ArrowDown size={16} aria-hidden className="animate-bounce motion-reduce:animate-none" /></p>}</Reveal>
      </div>
      <div ref={ref} className="relative" role="group" aria-label="How it works, in four steps">
        {!simple && (
          <div className="sticky top-0 z-30 h-0"><div className="pointer-events-none absolute inset-x-0 top-0 h-[100svh]">
            <div aria-hidden className="absolute left-12 top-28 hidden rounded-full border border-ink/10 bg-paper px-4 py-2 text-sm font-semibold shadow-sm lg:block">Step {active + 1} of {n}</div>
            <nav aria-label="Step progress" className="pointer-events-auto absolute right-3 top-1/2 -translate-y-1/2 lg:right-8">
              <div className="flex flex-col items-center gap-2 rounded-full bg-paper/95 p-2 shadow-lg">
                {steps.map((s, i) => (<button key={s.title} onClick={() => go(i)} aria-label={`Go to step ${i + 1}: ${s.title}`} aria-current={i === active ? "step" : undefined}
                  className={`relative w-2.5 rounded-full transition-all duration-300 before:absolute before:-inset-2 ${i === active ? "h-8 bg-violet" : "h-2.5 bg-ink/25 hover:bg-ink/50"}`} />))}
              </div></nav>
          </div></div>)}
        {steps.map((s, i) => simple ? (
          <article key={s.title} aria-labelledby={`step-${i + 1}-h`} className={`py-14 ${themes[i].bg}`}>
            <div className="mx-auto grid max-w-7xl items-center gap-8 px-6 md:grid-cols-2 md:gap-16 md:px-10"><StepText s={s} i={i} t={themes[i]} /><StepVisual i={i} t={themes[i]} /></div></article>
        ) : <Panel key={s.title} s={s} i={i} n={n} p={p} enter0={enter0} />)}
      </div>
    </section>
  )
}
