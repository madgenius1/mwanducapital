import { CountUp } from "./RoadmapMotion"
import type { Metric } from "../../config/traction"
export default function TractionStat({ metric, dark }: { metric: Metric; dark?: boolean }) {
  return (
    <div className={`rounded-[28px] border p-6 sm:p-8 ${dark ? "border-paper/15 bg-paper/5 text-paper" : "border-line bg-white"}`}>
      <span className="rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet">{metric.kind} · as of {metric.date}</span>
      <p className="mt-5 text-6xl font-semibold leading-none tracking-tight sm:text-7xl"><CountUp value={metric.value} /></p>
      <p className={`mt-3 text-lg ${dark ? "text-paper/75" : "text-muted"}`}>{metric.label}</p>
    </div>
  )
}
