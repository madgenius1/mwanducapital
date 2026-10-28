// Typed defaults; override with env vars of the same name (e.g. SHOW_TEAM=true).
const on = (k: string, d: boolean) => (process.env[k] ?? String(d)) === "true"
export const flags = {
  DIASPORA_SIGNUP_CONFIRMED: on("DIASPORA_SIGNUP_CONFIRMED", true),
  DIASPORA_PAGE_ENABLED: on("DIASPORA_PAGE_ENABLED", true),
  DIASPORA_INVESTING_CONFIRMED: on("DIASPORA_INVESTING_CONFIRMED", false),
  NON_RESIDENT_ELIGIBILITY_CONFIRMED: on("NON_RESIDENT_ELIGIBILITY_CONFIRMED", false),
  INTL_FUNDING_CONFIRMED: on("INTL_FUNDING_CONFIRMED", false),
  COUNTRY_SEO_ENABLED: on("COUNTRY_SEO_ENABLED", false),
  REGULATORY_STRIP_ENABLED: on("REGULATORY_STRIP_ENABLED", true),
  REGULATORY_REQUIRE_PROOF: on("REGULATORY_REQUIRE_PROOF", false), // true = "Obtained" needs reference + date, "In progress" needs a filed application
  SHOW_TRACTION_METRICS: on("SHOW_TRACTION_METRICS", true),
  SHOW_TEAM: on("SHOW_TEAM", true),
  SHOW_FOUNDER_STORY: on("SHOW_FOUNDER_STORY", false),
  SHOW_DIASPORA_PARTNERS: on("SHOW_DIASPORA_PARTNERS", true),
  DECK_URL: process.env.DECK_URL ?? "",
  SCHEDULING_URL: process.env.SCHEDULING_URL ?? "",
} as const
