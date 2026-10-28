// Only confirmed answers. `abroad` items render only when DIASPORA_SIGNUP_CONFIRMED=true (filtered on the server).
export type Faq = { q: string; a: string; abroad?: boolean }
export const faq: Faq[] = [
  { q: "What is Mwandu?", a: "Mwandu brings your everyday money, Investment Account, NSE holdings and learning journey into one simpler experience." },
  { q: "Who is Mwandu for?", a: "People who want a clearer way into investing in Kenya, including first-time investors, young professionals and existing investors." },
  { q: "Can I invest in NSE-listed companies?", a: "Mwandu is built around NSE-listed companies. During beta you can explore investing through simulations. Live investing is planned for launch." },
  { q: "Is Mwandu for first-time investors?", a: "Yes. Plain-language explanations and guided steps are part of the experience." },
  { q: "What is the difference between the Chequing Wallet and Investment Account?", a: "The Chequing Wallet is for everyday money you can move, withdraw or use. The Investment Account holds money set aside for investing. Mwandu shows them separately." },
  { q: "Can I use M-Pesa?", a: "Yes. You can move money in and out with M-Pesa and bank rails, in Kenya shillings." },
  { q: "Does Mwandu guarantee investment returns?", a: "No. Investing involves risk and returns are never guaranteed." },
  { q: "How do price alerts work?", a: "Set a target price for a company, above or below. When the market reaches it, you are notified." },
  { q: "When will Mwandu launch?", a: "Alpha testing is underway and beta testing comes next. We are targeting a public launch in Q2 2027." },
  { q: "How can I become an early tester?", a: "Join the early access list. We are inviting a limited group of early testers ahead of wider launch." },
  { q: "Is my information secure?", a: "Sensitive actions require authorization." },
  { q: "Can I use Mwandu if I live outside Kenya?", a: "Yes. Join the early access list and sign up from the beta test. During beta, everyone explores investing through simulations. We’ll keep you updated as options for people outside Kenya open.", abroad: true },
  { q: "Can I invest in the NSE from abroad?", a: "We’re working toward it. Eligibility for investing from outside Kenya is still being confirmed. Join the list and we’ll update you.", abroad: true },
  { q: "How do I fund my account from outside Kenya?", a: "At launch, funding is through M-Pesa and bank rails in Kenya shillings. International funding options are under development. Join the list to be notified.", abroad: true },
]
