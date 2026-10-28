import Navbar from "./_components/Navbar"
import Hero from "./_components/Hero"
import ProblemSection from "./_components/ProblemSection"
import DifferenceSection from "./_components/DifferenceSection"
import HowItWorks from "./_components/HowItWorks"
import ProductWalkthrough from "./_components/ProductWalkthrough"
import FeatureGrid from "./_components/FeatureGrid"
import VisionSection from "./_components/VisionSection"
import TrustSection from "./_components/TrustSection"
import EarlyTester from "./_components/EarlyTester"
import FAQ from "./_components/FAQ"
import FinalCTA from "./_components/FinalCTA"
import Footer from "./_components/Footer"
import MobileCTA from "./_components/MobileCTA"
import { flags } from "../config/flags"
import { homeFeatures } from "../config/features"
import { publicItems } from "../config/regulatory"
import { faq } from "../config/faq"
import { company } from "../config/company"
import { pageMeta, keywords, siteUrl } from "../config/seo"
export const metadata = pageMeta({ title: "Mwandu — Investing in Kenya, made clearer", description: "Mwandu brings your everyday money, Investment Account and NSE holdings into one simpler experience. Join the early access list.", path: "/", keywords: keywords.home })
export default function Route() {
  const abroad = flags.DIASPORA_SIGNUP_CONFIRMED
  const items = faq.filter((f) => !f.abroad || abroad).map(({ q, a }) => ({ q, a }))
  const ld = { "@context": "https://schema.org", "@type": "Organization", name: company.name, url: siteUrl, description: "Mwandu is building a clearer way to start investing in NSE-listed companies in Kenya." }
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} /><Navbar /><main id="top">
    <Hero showDiaspora={abroad} /><ProblemSection /><DifferenceSection /><HowItWorks /><ProductWalkthrough />
    <FeatureGrid features={homeFeatures()} /><VisionSection />
    <TrustSection regulatory={flags.REGULATORY_STRIP_ENABLED ? publicItems() : []} />
    <EarlyTester /><FAQ items={items} /><FinalCTA /></main>
    <Footer showAbroad={flags.DIASPORA_PAGE_ENABLED} /><MobileCTA /></>)
}
