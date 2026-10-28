// Rendered only when SHOW_TRACTION_METRICS=true. Every metric needs a label (Actual / Target / Planned) and a date.
export type Metric = { label: string; value: string; kind: "Actual" | "Target" | "Planned"; date: string }
export const traction: Metric[] = [
  { label: "People registered for the beta", value: "1,618", kind: "Actual", date: "27 October 2026" },
]
