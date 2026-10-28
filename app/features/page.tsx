import { pageMeta, keywords } from "../../config/seo";
import SiteShell from "../_components/SiteShell";
import Reveal from "../_components/Reveal";
import FeaturesBento from "../_components/FeaturesBento";
import CtaButton from "../_components/CtaButton";
import { enabledFeatures } from "../../config/features";
export const metadata = pageMeta({
  title: "Features | Mwandu",
  description:
    "Everything in Mwandu: Chequing Wallet, Investment Account, NSE market discovery, portfolio tracking, price alerts and clear fees.",
  path: "/features",
  keywords: keywords.features,
});
export default function FeaturesPage() {
  return (
    <SiteShell>
      <section className="mx-auto max-w-7xl px-4 pb-12 pt-12 sm:px-6 lg:px-8 lg:pb-16 lg:pt-20">
        <Reveal>
          <p className="text-sm font-semibold tracking-[.2em] text-violet">
            BUILT AROUND YOUR NEXT MOVE
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl lg:text-[88px]">
            Your money has many sides. See them clearly.
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-8 max-w-3xl text-lg text-muted lg:text-xl">
            A connected experience for everyday cash, NSE discovery, and
            long-term ownership. Beta uses simulations. Live investing is
            planned for launch.
          </p>
        </Reveal>
      </section>
      <FeaturesBento features={enabledFeatures()} />
      <section className="bg-ink py-16 text-center text-paper">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-4xl font-semibold tracking-tight">
            See it for yourself.
          </h2>
          <p className="mt-4 text-paper/70">
            Join the early access list and be among the first to try Mwandu.
          </p>
          <div className="mt-8">
            <CtaButton event="cta_click" source="features" />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
