// Shared by the client form and the server action, so validation always matches.
export type FormKind = "deck" | "intro" | "partner"
export type Field = { name: string; label: string; type: "text" | "email" | "select" | "textarea"; required?: boolean; options?: string[] }
export const forms: Record<FormKind, { fields: Field[]; submit: string }> = {
  deck: { submit: "Download the pitch presentation", fields: [
    { name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true },
    { name: "organization", label: "Organization", type: "text", required: true },
    { name: "visitor", label: "Visitor type", type: "select", required: true, options: ["Investor", "Strategic partner", "Distribution partner", "Financial institution", "Media", "Other"] },
    { name: "interest", label: "What are you interested in? (optional)", type: "select", options: ["Investment opportunity", "Partnership", "Pilot", "Product", "Market research"] } ] },
  intro: { submit: "Request an investor introduction", fields: [
    { name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Email", type: "email", required: true },
    { name: "organization", label: "Organization", type: "text", required: true }, { name: "role", label: "Role", type: "text", required: true },
    { name: "location", label: "Location or market", type: "text", required: true }, { name: "topic", label: "Discussion topic", type: "text", required: true },
    { name: "message", label: "Message (optional)", type: "textarea" } ] },
  partner: { submit: "Start a partnership conversation", fields: [
    { name: "name", label: "Name", type: "text", required: true }, { name: "email", label: "Work email", type: "email", required: true },
    { name: "organization", label: "Organization", type: "text", required: true },
    { name: "type", label: "Partnership type", type: "select", required: true, options: ["Distribution", "Financial services", "Payments", "Education", "Technology", "Pilot", "Other"] },
    { name: "description", label: "Short description of the opportunity", type: "textarea", required: true } ] },
}
