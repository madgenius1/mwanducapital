"use client"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Plus } from "lucide-react"
import Reveal from "./Reveal"
import { track } from "../../lib/integrations"
export default function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section id="faq" className="mx-auto max-w-3xl scroll-mt-20 px-5 py-16 lg:py-24">
      <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">FAQ</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Questions, answered.</h2></Reveal>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {items.map((f, n) => { const on = open === n
          return (
            <div key={f.q}>
              <h3><button id={`f-b${n}`} aria-expanded={on} aria-controls={`f-p${n}`} onClick={() => { setOpen(on ? null : n); if (!on) track("faq_open", { q: f.q }) }}
                className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg font-medium">{f.q}
                <Plus size={22} className={`shrink-0 text-violet transition-transform duration-300 ${on ? "rotate-45" : ""}`} /></button></h3>
              <AnimatePresence initial={false}>{on && (
                <motion.div id={`f-p${n}`} role="region" aria-labelledby={`f-b${n}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} className="overflow-hidden">
                  <p className="pb-5 text-muted">{f.a}</p></motion.div>)}</AnimatePresence>
            </div>) })}
      </div>
    </section>
  )
}
