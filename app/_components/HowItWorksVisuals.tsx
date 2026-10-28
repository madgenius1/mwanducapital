import { Check, ShieldCheck } from "lucide-react";
// Illustrative mini-screens for each step. Swap for real app screenshots when supplied.
const tag = (
  <span className="rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-violet">
    Illustrative
  </span>
);
const Head = ({ t }: { t: string }) => (
  <div className="flex items-center justify-between gap-3">
    <p className="font-semibold">{t}</p>
    {tag}
  </div>
);
function Verify() {
  const rows: [string, boolean][] = [
    ["Your details", true],
    ["ID or passport", true],
    ["Tax data (KRA PIN or equivalent)", false],
  ];
  return (
    <div className="space-y-3">
      <Head t="Verify your identity" />
      {rows.map(([l, done]) => (
        <div
          key={l}
          className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-sm"
        >
          <span
            aria-hidden
            className={`grid size-6 shrink-0 place-items-center rounded-full ${done ? "bg-violet text-white" : "border-2 border-dashed border-violet/40"}`}
          >
            {done && <Check size={14} strokeWidth={3} />}
          </span>
          <span className="font-medium">{l}</span>
          <span className="ml-auto text-xs text-muted">
            {done ? "Done" : "Next"}
          </span>
        </div>
      ))}
      <div className="h-2 overflow-hidden rounded-full bg-lilac">
        <div className="h-full w-2/3 rounded-full bg-violet" />
      </div>
    </div>
  );
}
function Accounts() {
  return (
    <div className="space-y-3">
      <Head t="Your accounts" />
      <div className="rounded-2xl bg-lilac p-4">
        <p className="text-xs text-muted">Chequing Wallet · Everyday money</p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">
          KES 48,250.00
        </p>
        <p className="text-xs text-muted">Available</p>
      </div>
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-violet">
        <span className="h-px w-10 bg-violet/30" />
        Kept separate
        <span className="h-px w-10 bg-violet/30" />
      </div>
      <div className="rounded-2xl border border-line bg-paper p-4">
        <p className="text-xs text-muted">
          Investment Account · Set aside for investing
        </p>
        <p className="mt-1 text-2xl font-semibold tracking-tight">
          KES 126,400
        </p>
        <p className="text-xs text-muted">Portfolio value</p>
      </div>
    </div>
  );
}
function Markets() {
  const rows: [string, string, string, string, boolean][] = [
    [
      "Company A",
      "Banking",
      "+0.8%",
      "0,18 10,14 20,16 30,9 40,11 50,5 60,7",
      true,
    ],
    [
      "Company B",
      "Telecoms",
      "+0.3%",
      "0,16 10,17 20,12 30,13 40,9 50,10 60,6",
      true,
    ],
    [
      "Company C",
      "Energy",
      "-0.4%",
      "0,6 10,9 20,8 30,13 40,12 50,17 60,16",
      false,
    ],
  ];
  return (
    <div className="space-y-3">
      <Head t="NSE markets" />
      {rows.map(([n, c, d, pts, up]) => (
        <div
          key={n}
          className="flex items-center gap-3 rounded-2xl bg-paper px-4 py-3 text-sm"
        >
          <div>
            <p className="font-medium">{n}</p>
            <p className="text-xs text-muted">{c}</p>
          </div>
          <svg
            viewBox="0 0 60 24"
            aria-hidden
            className={`ml-auto h-6 w-16 ${up ? "text-gain" : "text-red-700"}`}
          >
            <polyline
              points={pts}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className={`w-12 text-right font-medium ${up ? "text-gain" : "text-red-700"}`}
          >
            {d}
          </span>
        </div>
      ))}
      <p className="rounded-2xl bg-lilac px-4 py-3 text-sm">
        Each company comes with plain-language context.
      </p>
    </div>
  );
}
function Review() {
  const rows = [
    ["Amount", "KES 5,000"],
    ["From", "Chequing Wallet"],
    ["To", "Investment Account"],
    ["Fees", "Shown here before you confirm"],
  ];
  return (
    <div className="space-y-3">
      <Head t="Review transfer" />
      <div className="divide-y divide-line rounded-2xl bg-paper px-4 text-sm">
        {rows.map(([a, b]) => (
          <div key={a} className="flex justify-between gap-4 py-3">
            <span className="text-muted">{a}</span>
            <span className="text-right font-medium">{b}</span>
          </div>
        ))}
      </div>
      <div className="rounded-full bg-violet py-3 text-center text-sm font-medium text-white">
        Authorize
      </div>
      <p className="flex items-center justify-center gap-2 text-xs text-muted">
        <ShieldCheck size={14} aria-hidden />
        Sensitive actions require authorization.
      </p>
    </div>
  );
}
export const visuals = [Verify, Accounts, Markets, Review];
