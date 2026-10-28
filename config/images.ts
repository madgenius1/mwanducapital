// Central list of online images. Swap any URL here; <Photo> shows a labelled placeholder if one fails to load.
const u = (id: string, w = 1200) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=70`
export const images = {
  problem: { src: u("photo-1573164713988-8665fc963095"), alt: "A young professional working on a laptop" },
  vision: { src: u("photo-1556742049-0cfed4f6a45d"), alt: "Paying with a phone in everyday life" },
  difference: { src: u("photo-1531545514256-b1400bc00f31"), alt: "Colleagues reviewing something together" },
  opp1: { src: u("photo-1573164713988-8665fc963095", 900), alt: "A young professional checking their phone" },
  opp2: { src: u("photo-1450101499163-c8848c66ca85", 900), alt: "Scattered documents and statements on a desk" },
  opp3: { src: u("photo-1556740738-b6a63e27c4df", 900), alt: "Paying with a phone in everyday life" },
  opp4: { src: u("photo-1551288049-bebda4e38f71", 900), alt: "Reviewing growth and long-term plans together" },
  opp5: { src: u("photo-1556761175-5973dc0f32e7", 900), alt: "Reading clear, plain-language information" },
  opp6: { src: u("photo-1494178270175-e96de2971df9", 900), alt: "Connecting with home from abroad" },
  about: { src: u("photo-1521737604893-d14cc237f11d"), alt: "A team collaborating around a table" },
}
