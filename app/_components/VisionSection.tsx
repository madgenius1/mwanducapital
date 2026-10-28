import { Wallet, TrendingUp, Landmark, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import Photo from "./Photo";
import { images } from "../../config/images";
export default function VisionSection() {
  const steps = [
    [Wallet, "Everyday money"],
    [TrendingUp, "Investing"],
    [Landmark, "Long-term ownership"],
  ] as const;
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
      <Reveal>
        <Photo
          {...images.vision}
          className="aspect-[4/5] max-h-[560px] w-full"
        />
      </Reveal>
      <div>
        <Reveal>
          <p className="text-sm font-semibold tracking-[.18em] text-violet">
            OUR VISION
          </p>
          <blockquote className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl lg:text-[44px]">
            We believe more people should be able to participate in the growth
            around them—not because finance became less important, but because
            it became easier to understand.
          </blockquote>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {steps.map(([Icon, t], n) => (
              <span key={t} className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full bg-lilac px-4 py-2.5 text-sm font-medium">
                  <Icon size={16} className="text-violet" />
                  {t}
                </span>
                {n < 2 && <ArrowRight size={16} className="text-muted" />}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
