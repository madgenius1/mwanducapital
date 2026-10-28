// The Opportunity + Why now slides on /investors. Every line is one of the existing confirmed statements; nothing new is claimed.
// The diaspora slide is filtered out on the server unless DIASPORA_SIGNUP_CONFIRMED=true.
import { images } from "./images"
export type Slide = { act: "The opportunity" | "Why now" | "Diaspora"; title: string; points: string[]; image: { src: string; alt: string }; diaspora?: boolean }
export const slides: Slide[] = [
  { act: "The opportunity", title: "Many people want to invest but do not know where to begin.", points: [], image: images.opp1 },
  { act: "The opportunity", title: "Financial information is often fragmented.", points: ["Existing experiences can be difficult to understand."], image: images.opp2 },
  { act: "Why now", title: "Mobile money is changing how people move money.", points: ["Growing comfort with digital financial services.", "Mobile money and digital finance open the door to clearer investing products."], image: images.opp3 },
  { act: "Why now", title: "Increasing interest in ownership and long-term participation.", points: ["More accessible market and investment products."], image: images.opp4 },
  { act: "Why now", title: "Rising expectations for clarity and transparency.", points: ["The next wave of investors needs trust, education and usability."], image: images.opp5 },
  { act: "Diaspora", diaspora: true, title: "Kenyan diaspora communities are a significant and underserved audience.", points: ["People with financial means, a connection to Kenya, and a desire to invest back home, but limited clarity on how to do it.", "Growing diaspora interest in long-term ownership and investment in Kenya from abroad."], image: images.opp6 },
]
