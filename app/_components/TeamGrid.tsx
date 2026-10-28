import Image from "next/image"
import { User, ArrowUpRight } from "lucide-react"
import Reveal from "./Reveal"
import type { Member } from "../../config/team"
const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
export default function TeamGrid({ members }: { members: Member[] }) {
  const placeholders = members.some((m) => m.placeholder)
  return (<>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, n) => (
        <li key={`${m.name}-${n}`}><Reveal delay={(n % 3) * .08} className="h-full">
          <div className={`flex h-full flex-col rounded-[28px] p-6 ${m.placeholder ? "border border-dashed border-lilac-2 bg-white/60" : "border border-line bg-white"}`}>
            <div className="flex items-center gap-4">
              {m.photo ? <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-lilac"><Image src={m.photo} alt={m.name} fill sizes="64px" className="object-cover" /></div>
                : <span className="grid size-16 shrink-0 place-items-center rounded-full bg-lilac text-xl font-semibold text-violet" aria-hidden>{m.placeholder ? <User size={26} /> : initials(m.name)}</span>}
              <div><p className="text-lg font-semibold leading-snug">{m.name}</p><p className="text-muted">{m.role}</p></div>
            </div>
            {m.bio && <p className="mt-4 text-muted">{m.bio}</p>}
            {m.placeholder && <span className="mt-5 w-fit rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet">PLACEHOLDER</span>}
            {m.link && <a href={m.link} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex w-fit items-center gap-1 font-medium text-violet underline underline-offset-4">Profile <ArrowUpRight size={14} /></a>}
          </div></Reveal></li>))}
    </ul>
    {placeholders && <p className="mt-4 text-sm text-muted">PLACEHOLDER: team details will appear here once supplied.</p>}
  </>)
}
