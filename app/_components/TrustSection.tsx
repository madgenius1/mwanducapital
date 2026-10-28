import { Check } from "lucide-react"
import Reveal from "./Reveal"
import RegulatoryProgress from "./RegulatoryProgress"
const points = ["Clear information before every important action", "Separate visibility for everyday money and investments", "Secure authorization for sensitive actions", "No promises of guaranteed returns", "Educational guidance for new investors", "Transparent product status and transaction history", "Clear fees shown for every buy, sell and transfer before you confirm"]
const links = [["Privacy policy", "/privacy"], ["Terms", "/terms"], ["Risk disclosure", "/risk"], ["Contact / support", "#contact"]]
export default function TrustSection({ regulatory = [] }: { regulatory?: { label: string; status: string; date?: string; body?: string }[] }) {
  return (
    <section className="bg-lilac py-16 lg:py-24"><div className="mx-auto max-w-7xl px-5 lg:px-8">
      <Reveal><p className="text-sm font-semibold tracking-[.18em] text-violet">TRUST AND CLARITY</p><h2 className="mt-3 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">Clear by design.</h2></Reveal>
      <ul className="mt-10 grid gap-3 md:grid-cols-2">{points.map((p, n) => (
        <Reveal key={p} delay={(n % 2) * .08}><li className="flex gap-4 rounded-[24px] bg-white p-5"><span className="grid size-8 shrink-0 place-items-center rounded-full bg-violet text-white"><Check size={16} /></span><span className="font-medium">{p}</span></li></Reveal>))}</ul>
      <RegulatoryProgress items={regulatory} />
      <Reveal className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm font-medium">{links.map(([l, h]) => <a key={l} href={h} className="underline underline-offset-4 hover:text-violet">{l}</a>)}</Reveal>
    </div></section>
  )
}
