// Server-side only. Nothing here renders unless REGULATORY_STRIP_ENABLED=true AND an item passes publicItems().
// Statuses are the founder's. References and dates are still to be supplied (add them to show on the site).
// Set REGULATORY_REQUIRE_PROOF=true to enforce: Obtained needs reference + date; In progress needs a filed application.
// Never use the words "licensed", "regulated" or "approved" in public labels. Legal must approve wording first.
import { flags } from "./flags"
export type Status = "Obtained" | "In progress" | "Planned" | "Not applicable"
export type RegItem = { body: string; requirement: string; label: string; status: Status; reference?: string; date?: string; applicationFiled?: boolean; namePermission?: boolean; showPublicly: boolean }
const s = (body: string, requirement: string, label: string, status: Status, showPublicly = true): RegItem => ({ body, requirement, label, status, showPublicly })
export const regulatory: RegItem[] = [
  s("Business Registration Service", "Company incorporation and beneficial ownership filing", "Company registration", "Obtained"),
  s("Kenya Revenue Authority", "Company tax registration", "Company tax registration", "Obtained"),
  s("Office of the Data Protection Commissioner", "Data controller or processor registration", "Data protection registration", "In progress"),
  s("Financial Reporting Centre", "Reporting institution registration and AML programme", "Reporting registration", "Planned"),
  s("Capital Markets Authority", "Route to be confirmed", "Capital markets route", "In progress"),
  s("CMA Regulatory Sandbox", "Admission", "Sandbox admission", "In progress"),
  s("Partner (CDS agent)", "Partner agreement", "Market access partner agreement", "Planned"),
  s("NSE and CDSC", "CDS account and trade routing", "Trade routing set-up", "Planned"),
  s("Central Bank of Kenya", "Payment service provider authorisation", "Payments authorisation", "Planned"),
  s("Wallet partner", "Partner agreement", "Wallet partner agreement", "Planned"),
  s("Safaricom M-Pesa", "Integration agreement", "Mobile money integration", "In progress"),
  s("Central Bank of Kenya, CSD", "Treasury bills and bonds access", "Government securities access", "Planned"),
  s("Home page wording", "Approved wording and naming permissions", "Wording sign-off", "Planned", false), // internal item, never shown
]
// Names stay hidden unless namePermission is true. Plain labels only.
export const publicItems = () => regulatory.filter((i) => i.showPublicly && (!flags.REGULATORY_REQUIRE_PROOF || (i.status === "Obtained" ? !!(i.reference && i.date) : i.status === "In progress" ? !!i.applicationFiled : true)))
  .map(({ label, status, date, body, namePermission }) => ({ label, status, date, body: namePermission ? body : undefined }))
