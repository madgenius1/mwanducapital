import { pageMeta, keywords } from "../../config/seo";
import { notFound } from "next/navigation";
import { ArrowDown } from "lucide-react";
import SiteShell from "../_components/SiteShell";
import Reveal from "../_components/Reveal";
import PhoneMockup from "../_components/PhoneMockup";
import CtaButton from "../_components/CtaButton";
import TrackView from "../_components/TrackView";
import FAQ from "../_components/FAQ";
import { flags } from "../../config/flags";
import { faq } from "../../config/faq";
export const metadata = pageMeta({
  title: "Mwandu for Kenyans abroad",
  description:
    "Join the early access list, sign up from the beta test, and explore NSE investing through simulations while we build for Kenyans abroad.",
  path: "/diaspora",
  keywords: keywords.diaspora,
});
const rows = [
  [
    "Available in beta",
    "Sign up",
    "Kenyans abroad can sign up from the beta test.",
  ],
  [
    "Available in beta",
    "Explore with simulations",
    "Explore how investing in NSE-listed companies works through simulations. Everyone in the beta, including users abroad, starts here.",
  ],
  [
    "Being confirmed",
    "Investing from outside Kenya",
    "We’re working toward it. Eligibility for investing from outside Kenya is still being confirmed.",
  ],
];
export default function DiasporaPage() {
  if (!flags.DIASPORA_PAGE_ENABLED) notFound();
  return (
    <SiteShell>
      <TrackView event="diaspora_page_view" />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <Reveal>
            <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Stay close to Kenya’s growth, from wherever you are.
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Join early access, sign up from the beta test, and explore NSE
              investing through simulations while we build for Kenyans abroad.
            </p>
          </Reveal>
          <Reveal delay={0.2} className="mt-8 flex flex-wrap gap-3">
            <CtaButton event="diaspora_cta_click" source="diaspora" outside />
            <a
              href="#status"
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-7 py-4 font-medium transition hover:border-ink"
            >
              See what’s available <ArrowDown size={16} />
            </a>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <PhoneMockup />
        </Reveal>
      </section>
      <section
        id="status"
        className="mx-auto max-w-4xl scroll-mt-20 px-5 py-16 lg:py-20"
      >
        <Reveal>
          <h2 className="text-4xl font-semibold tracking-tight">
            What is available, and what is next
          </h2>
        </Reveal>
        <ul className="mt-8 divide-y divide-line rounded-[28px] border border-line bg-white">
          {rows.map(([l, t, d], n) => (
            <Reveal key={t} delay={n * 0.08}>
              <li className="grid gap-3 p-6 sm:grid-cols-[170px_1fr]">
                <span
                  className={`h-fit w-fit rounded-full px-3 py-1 text-xs font-semibold ${l === "Being confirmed" ? "bg-paper text-muted ring-1 ring-line" : "bg-lilac text-violet"}`}
                >
                  {l}
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{t}</h3>
                  <p className="mt-1 text-muted">{d}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-muted">
          Alpha testing is underway. Beta testing comes next. Public launch is
          targeted for Q2 2027.
        </p>
      </section>
      <section className="bg-lilac py-16 lg:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-2">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight">
              How money moves at launch
            </h2>
            <p className="mt-3 text-ink/75">
              At launch, you move money in and out with M-Pesa and bank rails,
              in Kenya shillings. International funding options are under
              development.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-3xl font-semibold tracking-tight">
              What you’ll need to get verified
            </h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-ink/75">
              <li>ID or passport</li>
              <li>Tax data (a KRA PIN or the equivalent in your country)</li>
            </ul>
            <p className="mt-3 text-sm text-ink/60">
              Verification opens after launch.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-5 py-16 text-center lg:py-20">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Fees you can see before you confirm
          </h2>
          <p className="mt-3 text-muted">
            Mwandu shows the fees for every buy, sell and transfer before you
            confirm.
          </p>
        </Reveal>
      </section>
      <FAQ items={faq.filter((f) => f.abroad).map(({ q, a }) => ({ q, a }))} />
      <section className="bg-ink py-20 text-center text-paper">
        <Reveal className="mx-auto max-w-3xl px-5">
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Be first to hear when options for Kenyans abroad open.
          </h2>
          <div className="mt-8">
            <CtaButton event="diaspora_cta_click" source="diaspora" outside />
          </div>
          <p className="mt-4 text-sm text-paper/60">
            Beta first, public launch targeted for Q2 2027.
          </p>
        </Reveal>
      </section>
    </SiteShell>
  );
}
