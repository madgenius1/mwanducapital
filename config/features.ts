// Server-side only: filter with enabledFeatures() before passing to client components,
// so disabled entries never reach the page source.
// `bento` (12-column span + tone) drives /features. `home` marks the (max 6) features shown on the home page, in the same bento style.
export type Feature = { id: string; title: string; blurb: string; enabled: boolean; size?: "lg" | "md" | "sm"; bento?: { span: 4 | 8 | 12; tone?: "lilac" }; home?: { span: 4 | 6 | 8; tone?: "lilac" } }
const all: Feature[] = [
  { id: "wallet", title: "Chequing Wallet", blurb: "See available and pending cash. Deposit, withdraw, and transact.", enabled: true, size: "lg", bento: { span: 8, tone: "lilac" }, home: { span: 8, tone: "lilac" } },
  { id: "invest", title: "Investment Account", blurb: "Keep investment cash, holdings, and portfolio value clearly separated.", enabled: true, size: "lg", bento: { span: 4 }, home: { span: 4 } },
  { id: "nse", title: "NSE market discovery", blurb: "Explore listed companies with plain-language context.", enabled: true, size: "md", bento: { span: 4 }, home: { span: 4 } },
  { id: "portfolio", title: "Holdings & portfolio", blurb: "See what you own and follow daily movement.", enabled: true, size: "md", bento: { span: 8 }, home: { span: 8 } },
  { id: "alerts", title: "Price target alerts", blurb: "Set an above or below target and get notified when it is reached.", enabled: true, size: "md", bento: { span: 8, tone: "lilac" }, home: { span: 6, tone: "lilac" } },
  { id: "rails", title: "M-Pesa & bank rails", blurb: "Move Kenya shillings in and out at launch.", enabled: true, bento: { span: 4 }, home: { span: 6 } },
  { id: "move", title: "Money between accounts", blurb: "Move money between your wallet and Investment Account.", enabled: true, bento: { span: 4 } },
  { id: "pay", title: "Buy goods & pay bills", blurb: "Make everyday payments with clear transaction status.", enabled: true, bento: { span: 4 } },
  { id: "history", title: "Transaction history", blurb: "Review your account ledger and transaction details.", enabled: true, bento: { span: 4 } },
  { id: "auth", title: "Sensitive actions", blurb: "Sensitive actions require authorization.", enabled: true, bento: { span: 4 } },
  { id: "learn", title: "Learn as you go", blurb: "Short explanations before important decisions.", enabled: true, bento: { span: 8 } },
  { id: "fees", title: "Clear fees and status", blurb: "Fees shown before you confirm.", enabled: true, bento: { span: 12 } },
  { id: "x1", title: "", blurb: "", enabled: false },
  { id: "x2", title: "", blurb: "", enabled: false },
]
export const enabledFeatures = () => all.filter((f) => f.enabled)
// Home page: at most 6, in array order.
export const homeFeatures = () => all.filter((f) => f.enabled && f.home).slice(0, 6)
