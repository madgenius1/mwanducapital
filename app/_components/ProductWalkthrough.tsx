"use client";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import Reveal from "./Reveal";
import { track } from "../../lib/integrations";
// Illustrative content only. Swap for v1 app screenshots when supplied.
const R = ({
  a,
  b,
  c,
  g,
}: {
  a: string;
  b?: string;
  c?: string;
  g?: boolean;
}) => (
  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 text-sm">
    <div>
      <p className="font-medium">{a}</p>
      {b && <p className="text-xs text-muted">{b}</p>}
    </div>
    {c && <p className={`font-medium ${g ? "text-gain" : ""}`}>{c}</p>}
  </div>
);
const Btn = ({ children, dark }: { children: ReactNode; dark?: boolean }) => (
  <span
    className={`rounded-2xl py-3 text-center text-xs font-medium ${dark ? "bg-violet text-white" : "bg-lilac-2/60"}`}
  >
    {children}
  </span>
);
const tabs: {
  id: string;
  name: string;
  line: string;
  shows: string[];
  head: string;
  big: string;
  body: ReactNode;
}[] = [
  {
    id: "wallet",
    name: "Chequing Wallet",
    line: "See what is available to move, withdraw, or use.",
    shows: [
      "Available balance",
      "Pending balance",
      "Deposit, withdraw, transact",
    ],
    head: "Available",
    big: "KES 48,250.00",
    body: (
      <>
        <R a="Pending" b="Incoming" c="KES 1,200" />
        <div className="grid grid-cols-3 gap-2">
          <Btn>Deposit</Btn>
          <Btn>Withdraw</Btn>
          <Btn>Transact</Btn>
        </div>
      </>
    ),
  },
  {
    id: "invest",
    name: "Investment Account",
    line: "Keep investment cash and everyday cash clearly separated.",
    shows: [
      "Account balance and available cash",
      "Holdings and portfolio value",
      "Account ledger",
    ],
    head: "Portfolio value",
    big: "KES 126,400",
    body: (
      <>
        <R a="Available cash" c="KES 12,000" />
        <R a="Holdings" b="3 companies" c="+1.2% today" g />
        <R a="Ledger" b="Latest activity" c="View" />
      </>
    ),
  },
  {
    id: "nse",
    name: "NSE markets",
    line: "Explore listed companies with context that is easier to understand.",
    shows: [
      "Ticker, price, daily change",
      "Market category",
      "Watchlist and buy/sell entry",
    ],
    head: "Company A · Illustrative",
    big: "KES 20.40",
    body: (
      <>
        <R a="Daily change" b="Banking" c="+0.8%" g />
        <div className="grid grid-cols-3 gap-2">
          <Btn>Watch</Btn>
          <Btn dark>Buy</Btn>
          <Btn>Sell</Btn>
        </div>
      </>
    ),
  },
  {
    id: "alerts",
    name: "Price alerts",
    line: "Set a target and know when the market reaches it.",
    shows: [
      "Above or below target",
      "Current and target price",
      "Notification state",
    ],
    head: "Target reached",
    big: "Above KES 20.00",
    body: (
      <>
        <R a="Current price" c="KES 20.40" />
        <R a="Target price" c="KES 20.00" />
        <R a="Notification" b="Sent to your phone" c="On" g />
      </>
    ),
  },
  {
    id: "guided",
    name: "Guided actions",
    line: "Know what you are confirming before you confirm it.",
    shows: [
      "Amount, source, destination",
      "Fees shown before you confirm",
      "Authorization and result",
    ],
    head: "Review transfer",
    big: "KES 5,000",
    body: (
      <>
        <R a="From" c="Chequing Wallet" />
        <R a="To" c="Investment Account" />
        <R a="Fees" b="Shown here before you confirm" />
        <Btn dark>Authorize</Btn>
      </>
    ),
  },
];
export default function ProductWalkthrough({
  only,
  eyebrow = "THE APP",
  title = "Walk through Mwandu.",
}: {
  only?: string[];
  eyebrow?: string;
  title?: string;
}) {
  const list = only ? tabs.filter((x) => only.includes(x.id)) : tabs;
  const [i, setI] = useState(0);
  const t = list[i];
  return (
    <section
      className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"
      aria-labelledby="pw"
    >
      <Reveal>
        <p className="text-sm font-semibold tracking-[.18em] text-violet">
          {eyebrow}
        </p>
        <h2
          id="pw"
          className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          {title}
        </h2>
      </Reveal>
      <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <div
            role="tablist"
            aria-label="Product walkthrough"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0"
          >
            {list.map((x, n) => (
              <button
                key={x.id}
                role="tab"
                aria-selected={n === i}
                onClick={() => {
                  setI(n);
                  track("walkthrough_tab", { tab: x.id });
                }}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition ${n === i ? "border-violet bg-violet text-white" : "border-line bg-white hover:border-violet"}`}
              >
                {x.name}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              role="tabpanel"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              <p className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {t.line}
              </p>
              <ul className="mt-6 space-y-2 text-muted">
                {t.shows.map((s) => (
                  <li key={s} className="flex gap-3">
                    <span className="mt-2 size-2 rounded-full bg-violet" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mx-auto w-full max-w-[290px]">
          <div className="rounded-[44px] bg-ink p-3 shadow-2xl shadow-violet/20">
            <div className="min-h-[500px] rounded-[34px] bg-lilac p-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <p className="mt-6 text-sm font-medium text-violet">
                    {t.name}
                  </p>
                  <div>
                    <p className="text-xs text-muted">{t.head}</p>
                    <p className="text-3xl font-semibold tracking-tight">
                      {t.big}
                    </p>
                  </div>
                  {t.body}
                </motion.div>
              </AnimatePresence>
              <p className="mt-6 text-center text-[11px] text-muted">
                Illustrative · App screenshot placeholder
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
