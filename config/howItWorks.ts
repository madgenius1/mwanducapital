// Copy for the four "How it works" steps (confirmed product facts only).
export type Step = {
  title: string;
  tagline: string;
  description: string;
  note?: string;
};
export const steps: Step[] = [
  {
    title: "Create your account",
    tagline: "Sign up and go through KYC verification.",
    description: "A few details, an identity check, and you are set up.",
    note: "What you’ll need: ID or passport, and tax data (a KRA PIN or the equivalent in your country).",
  },
  {
    title: "Understand your money",
    tagline: "See your account options and how they differ.",
    description:
      "Your Chequing Wallet holds everyday money. Your Investment Account holds money set aside for investing. Mwandu tells you exactly what you can afford to invest without stretching your wallet",
  },
  {
    title: "Explore NSE investments",
    tagline: "Browse listed companies with plain context.",
    description:
      "Instead of guessing which single stock to buy, choose an automated, thematic portfolio that spreads your investments instantly with at a touch.",
  },
  {
    title: "Start with clearer context",
    tagline: "Review what you’re confirming, then go ahead.",
    description:
      "Fees are shown before you confirm, and sensitive actions require authorization.",
  },
];
