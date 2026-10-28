// INTEGRATION POINT: connect an email/CRM provider by setting NEXT_PUBLIC_SIGNUP_ENDPOINT.
// Never reports success unless a real endpoint accepted the request.
export type SignupPayload = { name: string; contact: string; intent?: string; outsideKenya: boolean }
export const track = (event: string, props?: Record<string, unknown>) => {
  // INTEGRATION POINT: forward to your analytics provider (no credentials in code).
  if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("mwandu:track", { detail: { event, ...props } }))
}
export async function submitSignup(p: SignupPayload) {
  const url = process.env.NEXT_PUBLIC_SIGNUP_ENDPOINT
  if (!url) throw new Error("NOT_CONNECTED")
  const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) })
  if (!r.ok) throw new Error("FAILED")
}
