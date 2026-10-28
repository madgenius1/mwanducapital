"use client"
import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { Bell, ArrowUpRight, Wallet, TrendingUp } from "lucide-react"
// All figures are illustrative. Replace with v1 app screenshots when supplied.
const Row = ({ a, b, c }: { a: string; b: string; c?: string }) => (
  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3"><div><p className="text-sm font-medium">{a}</p><p className="text-xs text-muted">{b}</p></div>{c && <p className="text-sm font-medium text-gain">{c}</p>}</div>)
const screens = [
  { k: "Chequing Wallet", icon: <Wallet size={16} />, big: "KES 48,250.00", sub: "Available", body: <><Row a="Pending" b="Incoming" c="KES 1,200" /><div className="grid grid-cols-3 gap-2 text-center text-xs font-medium">{["Deposit", "Withdraw", "Transact"].map((x) => <span key={x} className="rounded-2xl bg-lilac py-3">{x}</span>)}</div></> },
  { k: "Investment Account", icon: <TrendingUp size={16} />, big: "KES 126,400", sub: "Portfolio value", body: <><Row a="Available cash" b="Ready to invest" c="KES 12,000" /><Row a="Holdings" b="3 companies" c="+1.2% today" /></> },
  { k: "NSE markets", icon: <ArrowUpRight size={16} />, big: "Explore", sub: "Listed companies", body: <><Row a="Company A" b="Banking · Illustrative" c="+0.8%" /><Row a="Company B" b="Telecoms · Illustrative" c="+0.3%" /></> },
  { k: "Price alert", icon: <Bell size={16} />, big: "Target reached", sub: "Above target", body: <><Row a="Company A" b="Target KES 20.00" c="KES 20.40" /><span className="rounded-2xl bg-violet py-3 text-center text-xs font-medium text-white">Review</span></> },
]
export default function PhoneMockup() {
  const [i, setI] = useState(0); const reduce = useReducedMotion()
  useEffect(() => { if (reduce) return; const t = setInterval(() => setI((x) => (x + 1) % screens.length), 3800); return () => clearInterval(t) }, [reduce])
  const s = screens[i]
  return (
    <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[310px]">
      <div className="rounded-[44px] bg-ink p-3 shadow-2xl shadow-violet/20">
        <div className="min-h-[540px] rounded-[34px] bg-lilac p-5">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .35 }} className="space-y-3">
              <p className="mt-6 flex items-center gap-2 text-sm font-medium text-violet">{s.icon}{s.k}</p>
              <div><p className="text-xs text-muted">{s.sub}</p><p className="text-3xl font-semibold tracking-tight">{s.big}</p></div>
              {s.body}
            </motion.div>
          </AnimatePresence>
          <p className="mt-6 text-center text-[11px] text-muted">Illustrative · App screenshot placeholder</p>
        </div>
      </div>
      <div className="mt-5 flex justify-center gap-2">{screens.map((x, n) => <button key={x.k} aria-label={x.k} onClick={() => setI(n)} className={`h-2 rounded-full transition-all ${n === i ? "w-6 bg-violet" : "w-2 bg-lilac-2"}`} />)}</div>
    </div>
  )
}
