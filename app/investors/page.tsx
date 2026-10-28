import { pageMeta, keywords } from "../../config/seo";
import {
  Users,
  Globe,
  Landmark,
  Sparkles,
  GraduationCap,
  Cpu,
  Rocket,
  Compass,
  Wallet,
} from "lucide-react";
import SiteShell from "../_components/SiteShell";
import Reveal from "../_components/Reveal";
import PhoneMockup from "../_components/PhoneMockup";
import ProductWalkthrough from "../_components/ProductWalkthrough";
import RegulatoryProgress from "../_components/RegulatoryProgress";
import LeadForm from "../_components/LeadForm";
import FAQ from "../_components/FAQ";
import TrackedLink from "../_components/TrackedLink";
import TractionStat from "../_components/TractionStat";
import TeamGrid from "../_components/TeamGrid";
import { traction } from "../../config/traction";
import OpportunitySlides from "../_components/OpportunitySlides";
import { slides } from "../../config/opportunity";
import TrackView from "../_components/TrackView";
import { flags } from "../../config/flags";
import { company } from "../../config/company";
import { publicItems } from "../../config/regulatory";
import { team } from "../../config/team";
export const metadata = pageMeta({
  title:
    "Mwandu for Investors & Partners — Building clearer access to investing",
  description:
    "Mwandu is building a clearer path into investing in Kenya. Download the pitch presentation or start a conversation.",
  path: "/investors",
  keywords: keywords.investors,
});
type Item = readonly [typeof Compass, string, string?];
const H2 = ({ eyebrow, children }: { eyebrow: string; children: string }) => (
  <Reveal>
    <p className="text-sm font-semibold tracking-[.18em] text-violet">
      {eyebrow}
    </p>
    <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
      {children}
    </h2>
  </Reveal>
);
const Cards = ({ items, dark }: { items: readonly Item[]; dark?: boolean }) => (
  <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {items.map(([I, t, d], n) => (
      <Reveal key={t} delay={(n % 3) * 0.07}>
        <div
          className={`h-full rounded-[28px] border p-6 transition hover:-translate-y-1 ${dark ? "border-paper/15" : "border-line bg-white hover:border-lilac-2"}`}
        >
          <span
            className={`grid size-11 place-items-center rounded-2xl ${dark ? "bg-violet text-white" : "bg-lilac text-violet"}`}
          >
            <I size={20} />
          </span>
          <h3 className="mt-4 text-lg font-semibold">{t}</h3>
          {d && (
            <p className={`mt-2 ${dark ? "text-paper/70" : "text-muted"}`}>
              {d}
            </p>
          )}
        </div>
      </Reveal>
    ))}
  </div>
);
const tag = "rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet";
export default function InvestorsPage() {
  const abroad = flags.DIASPORA_SIGNUP_CONFIRMED;
  const advantages: Item[] = [
    [Sparkles, "User-first product design"],
    [Wallet, "A connected but clearly separated money experience"],
    [Landmark, "Built for KES, M-Pesa, local money movement and the NSE"],
    [GraduationCap, "Education integrated into important actions"],
    [
      Rocket,
      "Designed for long-term engagement through tracking, alerts, learning, transactions and investing",
    ],
  ];
  const partners: Item[] = [
    [
      Users,
      "Distribution partners",
      "Reach communities, employees, customers, or members who want a clearer entry point into investing.",
    ],
    [
      Landmark,
      "Financial ecosystem partners",
      "Explore ways to connect money movement, investment access, or user education.",
    ],
    [
      GraduationCap,
      "Education partners",
      "Help people build the knowledge and confidence needed to make better financial decisions.",
    ],
    [
      Cpu,
      "Technology partners",
      "Support secure, scalable, and accessible financial experiences.",
    ],
    [
      Rocket,
      "Pilot partners",
      "Work with Mwandu to test a focused product experience with a defined audience.",
    ],
    ...(flags.SHOW_DIASPORA_PARTNERS
      ? ([
          [
            Globe,
            "Diaspora network partners",
            "Organisations, platforms, or communities that serve Kenyan diaspora populations, including remittance services, diaspora-focused financial products, or community networks, who want to help their users direct money toward long-term investment rather than just transfers.",
          ],
        ] as Item[])
      : []),
  ];
  const faq: { q: string; a: string }[] = [
    [
      "What stage is Mwandu currently at?",
      "Alpha testing is underway. Beta testing is next. Public launch is targeted for Q2 2027.",
    ],
    [
      "Who is Mwandu designed for?",
      "People who want a clearer way into investing in Kenya, including first-time investors, young professionals and existing investors.",
    ],
    ["Which markets does Mwandu serve?", "Kenya first, in Kenya shillings."],
    [
      "What is the relationship between the Chequing Wallet and Investment Account?",
      "The Chequing Wallet is for everyday money you can move, withdraw or use. The Investment Account holds money set aside for investing. Mwandu shows them separately.",
    ],
    [
      "Is Mwandu currently raising capital?",
      "Yes, Mwandu is raising funds. Download the pitch presentation or start a conversation for details.",
    ],
    [
      "How can I request the pitch presentation?",
      "Complete the form on this page and we’ll make the presentation available.",
    ],
    [
      "Can I request additional information?",
      "Yes. Start a conversation using the investor introduction form on this page.",
    ],
    [
      "How can I discuss a pilot?",
      "Use the partnership form on this page and choose “Pilot” as the partnership type.",
    ],
    [
      "How can I contact the team?",
      `Use the forms on this page${company.contactEmail.startsWith("PLACEHOLDER") ? "." : ` or email ${company.contactEmail}.`}`,
    ],
    ...(abroad
      ? [
          [
            "Does Mwandu serve Kenyan diaspora investors?",
            "Diaspora users can sign up from the beta test. Eligibility for investing from outside Kenya is still being confirmed.",
          ],
          [
            "Can diaspora users invest in the NSE through Mwandu?",
            "Not confirmed yet. We will share an update once eligibility is confirmed.",
          ],
        ]
      : []),
  ].map(([q, a]) => ({ q, a }));
  const reg = flags.REGULATORY_STRIP_ENABLED ? publicItems() : [];
  return (
    <SiteShell>
      <TrackView event="investor_page_view" />
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[.18em] text-violet">
              FOR INVESTORS &amp; PARTNERS
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Building a clearer path into investing in Africa.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              Mwandu is building a simpler way for people to understand their
              money, explore the NSE, and begin investing with more clarity and
              confidence.
            </p>
          </Reveal>
          <Reveal delay={0.24} className="mt-8 flex flex-wrap gap-3">
            <TrackedLink
              event="deck_cta_click"
              href="#deck"
              className="rounded-full bg-violet px-7 py-4 font-medium text-white transition hover:bg-violet-dark active:scale-[.97]"
            >
              Download the pitch presentation
            </TrackedLink>
            <TrackedLink
              event="conversation_cta_click"
              href="#intro"
              className="rounded-full border border-ink/15 px-7 py-4 font-medium transition hover:border-ink"
            >
              Start a conversation
            </TrackedLink>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <PhoneMockup />
        </Reveal>
      </section>
      <section className="mx-auto grid max-w-7xl gap-4 px-5 pb-16 md:grid-cols-2 lg:px-8">
        {[
          [
            "I’m an investor",
            "Understand the opportunity, product direction, and next milestones.",
            "Explore the investor case",
            "#opportunity",
          ],
          [
            "I’m a potential partner",
            "Explore ways to help more people access clearer financial and investing experiences.",
            "Explore partnership opportunities",
            "#partners",
          ],
        ].map(([t, d, c, h], n) => (
          <Reveal key={t} delay={n * 0.1}>
            <a
              href={h}
              className={`group block h-full rounded-[28px] p-8 transition hover:-translate-y-1 ${n ? "bg-lilac" : "bg-violet text-white"}`}
            >
              <h2 className="text-2xl font-semibold">{t}</h2>
              <p className={`mt-2 ${n ? "text-ink/75" : "text-white/80"}`}>
                {d}
              </p>
              <span className="mt-6 inline-block font-medium underline underline-offset-4">
                {c} →
              </span>
            </a>
          </Reveal>
        ))}
      </section>
      <OpportunitySlides slides={slides.filter((x) => !x.diaspora || abroad)} />
      <section className="mt-8 bg-ink py-16 text-paper lg:py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <H2 eyebrow="WHY MWANDU">A product built around clarity.</H2>
          <Cards items={advantages} dark />
        </div>
      </section>
      <ProductWalkthrough
        only={["wallet", "invest", "nse", "alerts"]}
        eyebrow="PRODUCT PROOF"
        title="See the product."
      />
      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <H2 eyebrow="MILESTONES">What we are building toward</H2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Alpha testing", "Actual", "Underway."],
            ["Beta testing", "Planned", "Date to be confirmed."],
            ["Public launch", "Target", "Q2 2027."],
          ].map(([m, l, d], n) => (
            <Reveal key={m} delay={n * 0.1}>
              <li className="h-full rounded-[28px] border border-line bg-white p-6">
                <span className={tag}>{l}</span>
                <h3 className="mt-4 text-xl font-semibold">{m}</h3>
                <p className="mt-1 text-muted">{d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
        {flags.SHOW_TRACTION_METRICS && traction[0] && (
          <div className="mt-8 max-w-md">
            <TractionStat metric={traction[0]} />
          </div>
        )}
        <RegulatoryProgress items={reg} />
      </section>
      <section id="deck" className="scroll-mt-20 bg-lilac py-16 lg:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <p className="text-sm font-semibold tracking-[.18em] text-violet">
              PITCH PRESENTATION
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
              Get the investor deck.
            </h2>
            <p className="mt-4 max-w-md text-lg text-ink/75">
              Tell us a little about you and we’ll make the Mwandu pitch
              presentation available.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <LeadForm kind="deck" contact={company.contactEmail} />
          </Reveal>
        </div>
      </section>
      <section
        id="intro"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24"
      >
        <Reveal>
          <p className="text-sm font-semibold tracking-[.18em] text-violet">
            INVESTOR INTRODUCTION
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Request an investor introduction
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm kind="intro" contact={company.contactEmail} />
        </Reveal>
      </section>
      <section
        id="partners"
        className="mx-auto max-w-7xl scroll-mt-20 px-5 py-12 lg:px-8"
      >
        <H2 eyebrow="PARTNERSHIPS">Ways to build together.</H2>
        <Cards items={partners} />
      </section>
      <section
        id="partner-form"
        className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-16 lg:grid-cols-2 lg:px-8"
      >
        <Reveal>
          <p className="text-sm font-semibold tracking-[.18em] text-violet">
            PARTNER INQUIRY
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">
            Start a partnership conversation
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <LeadForm kind="partner" contact={company.contactEmail} />
        </Reveal>
      </section>
      {flags.SHOW_TEAM && team.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-12 lg:px-8">
          <H2 eyebrow="TEAM">Team and credibility</H2>
          <TeamGrid members={team} />
        </section>
      )}
      <FAQ items={faq} />
      <section className="bg-ink py-20 text-center text-paper">
        <Reveal className="mx-auto max-w-3xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Interested in helping build a clearer investing experience?
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <TrackedLink
              event="deck_cta_click"
              href="#deck"
              className="rounded-full bg-violet px-7 py-4 font-medium text-white transition hover:bg-violet-dark"
            >
              Download the pitch presentation
            </TrackedLink>
            <TrackedLink
              event="conversation_cta_click"
              href="#intro"
              className="rounded-full border border-paper/30 px-7 py-4 font-medium transition hover:border-paper"
            >
              Start a conversation
            </TrackedLink>
          </div>
        </Reveal>
      </section>
    </SiteShell>
  );
}
