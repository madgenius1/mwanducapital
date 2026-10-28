import { pageMeta, keywords } from "../../config/seo";
import {
  ShieldCheck,
  Eye,
  Gauge,
  Wallet,
  TrendingUp,
  Bell,
  GraduationCap,
} from "lucide-react";
import SiteShell from "../_components/SiteShell";
import Reveal from "../_components/Reveal";
import Photo from "../_components/Photo";
import CtaButton from "../_components/CtaButton";
import TrackView from "../_components/TrackView";
import Roadmap from "../_components/Roadmap";
import TeamGrid from "../_components/TeamGrid";
import { flags } from "../../config/flags";
import { company } from "../../config/company";
import { publicItems } from "../../config/regulatory";
import { traction } from "../../config/traction";
import { team } from "../../config/team";
import { images } from "../../config/images";
export const metadata = pageMeta({
  title: "About Mwandu",
  description:
    "Mwandu is building a clearer way to start investing in NSE-listed companies in Kenya. See where we are today and what comes next.",
  path: "/about",
  keywords: keywords.about,
});
const beliefs = [
  [
    Eye,
    "Clear, not intimidating.",
    "Short, simple explanations before you make important decisions.",
  ],
  [
    Gauge,
    "Know what you own.",
    "Your wallet money and your investment money stay separate, so you always see where you stand.",
  ],
  [
    ShieldCheck,
    "You stay in control.",
    "Fees are shown before you confirm, and sensitive actions require authorization.",
  ],
] as const;
const building = [
  [Wallet, "Chequing Wallet and Investment Account, kept separate"],
  [
    TrendingUp,
    "NSE-listed companies, with holdings, portfolio value and daily movement",
  ],
  [Bell, "Price targets and notifications"],
  [GraduationCap, "Short learning explanations"],
] as const;
export default function AboutPage() {
  const reg = flags.REGULATORY_STRIP_ENABLED ? publicItems() : [];
  return (
    <SiteShell>
      <TrackView event="about_page_view" />
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
        <Reveal>
          <p className="text-sm font-semibold tracking-[.18em] text-violet">
            MWANDU CAPITAL
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            We’re making investing in Kenya feel clear, not intimidating.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Mwandu is a new way to understand your money, see what you own, and
            take your first steps into companies listed on the Nairobi
            Securities Exchange.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <Photo {...images.about} className="aspect-[4/3]" />
        </Reveal>
      </section>
      <section className="bg-lilac py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-5">
          <Reveal>
            <p className="text-sm font-semibold tracking-[.18em] text-violet">
              WHY WE’RE BUILDING MWANDU
            </p>
            <blockquote className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              We believe more people should be able to participate in the growth
              around them, not because finance became less important, but
              because it became easier to understand.
            </blockquote>
            <p className="mt-6 max-w-2xl text-lg text-ink/75">
              Investing in the NSE can feel hard to approach. Mwandu brings
              everyday cash, investing and learning into one clearer experience.
            </p>
            {flags.SHOW_FOUNDER_STORY && company.founderStory && (
              <p className="mt-8 rounded-[24px] bg-white p-6">
                {company.founderStory}
              </p>
            )}
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight">
            What we believe
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {beliefs.map(([I, t, d], n) => (
            <Reveal key={t} delay={n * 0.1}>
              <div className="h-full rounded-[28px] border border-line bg-white p-7">
                <span className="grid size-12 place-items-center rounded-2xl bg-lilac text-violet">
                  <I size={22} />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 lg:px-8 lg:pb-24">
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight">
            What we’re building
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {building.map(([I, t], n) => (
            <Reveal key={t} delay={n * 0.08}>
              <a
                href="/features"
                className="flex h-full flex-col justify-between gap-8 rounded-[28px] bg-violet p-6 text-white transition hover:-translate-y-1 hover:bg-violet-dark"
              >
                <I size={24} />
                <span className="font-medium">{t}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
      <Roadmap
        items={reg}
        metrics={flags.SHOW_TRACTION_METRICS ? traction : []}
      />
      {flags.SHOW_TEAM && team.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-sm font-semibold tracking-[.18em] text-violet">
              TEAM
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
              The people building Mwandu
            </h2>
          </Reveal>
          <TeamGrid members={team} />
        </section>
      )}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center lg:py-24">
        <Reveal>
          <div className="rounded-[28px] bg-lilac p-8">
            <h2 className="text-3xl font-semibold">Investing involves risk</h2>
            <p className="mt-3 text-ink/75">
              The value of investments can go down as well as up. Mwandu does
              not promise returns. Read our risk disclosure before you invest.
            </p>
            <a
              href="/risk"
              className="mt-4 inline-block font-medium text-violet underline underline-offset-4"
            >
              Risk disclosure
            </a>
          </div>
        </Reveal>
      </section>
      <section className="bg-violet py-20 text-center text-white">
        <Reveal className="mx-auto max-w-2xl px-5">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Help shape Mwandu from the start.
          </h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            <CtaButton light event="about_cta_click" source="about" />
            <a
              href="/investors"
              className="font-medium underline underline-offset-4"
            >
              For investors and partners
            </a>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
