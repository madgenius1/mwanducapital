import { pageMeta } from "../../config/seo"
import LegalPlaceholder from "../_components/LegalPlaceholder"
export const metadata = pageMeta({ title: "Terms of Use | Mwandu", description: "Placeholder page. Text drafted by our legal team will be published here.", path: "/terms", noindex: true })
export default function Page() { return <LegalPlaceholder title="Terms of Use" /> }
