import { ArrowRight } from "lucide-react"
import Reveal from "./Reveal"
import FeaturesBento from "./FeaturesBento"
import type { Feature } from "../../config/features"
// Home-page highlights: at most six, in the same bento style as /features.
export default function FeatureGrid({ features }: { features: Feature[] }) {
  return (
    <section id="features" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 lg:px-8 lg:py-24">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div><p className="text-sm font-semibold tracking-[.18em] text-violet">FEATURES</p><h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Built to be understood.</h2></div>
        <a href="/features" className="group inline-flex items-center gap-2 font-medium text-violet">See all features <ArrowRight size={18} className="transition group-hover:translate-x-1" /></a>
      </Reveal>
      <div className="mt-10"><FeaturesBento features={features.slice(0, 6)} variant="home" embedded /></div>
    </section>
  )
}
