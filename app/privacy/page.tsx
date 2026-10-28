import { pageMeta } from "../../config/seo";
import LegalPlaceholder from "../_components/LegalPlaceholder";
export const metadata = pageMeta({
  title: "Privacy Policy | Mwandu",
  description:
    "Placeholder page. Text drafted by our legal team will be published here.",
  path: "/privacy",
  noindex: true,
});
export default function Page() {
  return <LegalPlaceholder title="Privacy Policy" />;
}
