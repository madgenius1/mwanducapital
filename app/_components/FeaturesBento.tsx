import Reveal from "./Reveal"
import { icons } from "./featureIcons"
import type { Feature } from "../../config/features"
// Explicit class names so Tailwind can see them. 12-column grid from md; two columns on sm; one on mobile.
// variant "home" uses each feature's `home` layout (max 6); "page" uses `bento`.
const span = { 4: "md:col-span-4", 6: "sm:col-span-2 md:col-span-6", 8: "sm:col-span-2 md:col-span-8", 12: "sm:col-span-2 md:col-span-12" } as const
export default function FeaturesBento({ features, variant = "page", embedded }: { features: Feature[]; variant?: "page" | "home"; embedded?: boolean }) {
  return (
    <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-12 ${embedded ? "" : "mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28"}`}>
      {features.map((f, n) => { const Icon = icons[f.id]; const b = (variant === "home" ? f.home : f.bento) ?? { span: 4 as const }
        return (
          <Reveal key={f.id} delay={(n % 3) * .06} className={`h-full ${span[b.span]}`}>
            <article className={`group flex h-full min-h-[180px] flex-col rounded-[28px] p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-18px_rgba(101,69,193,.35)] ${b.tone === "lilac" ? "bg-lilac" : "bg-white"}`}>
              {Icon && <Icon size={22} strokeWidth={1.75} aria-hidden className="text-violet transition duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" />}
              <h2 className="mt-5 text-xl font-medium tracking-tight">{f.title}</h2>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-muted">{f.blurb}</p>
            </article>
          </Reveal>) })}
    </div>
  )
}
