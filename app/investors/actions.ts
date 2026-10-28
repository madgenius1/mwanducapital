"use server";
import { forms, type FormKind } from "../../config/forms";
import { flags } from "../../config/flags";
export type LeadResult =
  | { ok: true; deckUrl?: string; schedulingUrl?: string }
  | {
      ok: false;
      error: "INVALID" | "NOT_CONNECTED" | "FAILED";
      fields?: Record<string, string>;
    };
// INTEGRATION POINT: set LEAD_ENDPOINT (server-only env var) to a CRM/email webhook that accepts JSON { kind, ...fields }.
// The deck URL is only returned after a successful submission, so it never appears in the page source.
export async function submitLead(
  kind: FormKind,
  input: Record<string, string>,
): Promise<LeadResult> {
  const cfg = forms[kind];
  if (!cfg) return { ok: false, error: "INVALID" };
  if (input.website) return { ok: true }; // honeypot
  const data: Record<string, string> = {};
  const bad: Record<string, string> = {};
  for (const f of cfg.fields) {
    const v = String(input[f.name] ?? "")
      .trim()
      .slice(0, 2000);
    data[f.name] = v;
    if (f.required && !v) bad[f.name] = "This field is required.";
    else if (f.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v))
      bad[f.name] = "Enter a valid email address.";
    else if (f.type === "select" && v && !f.options?.includes(v))
      bad[f.name] = "Choose one of the options.";
  }
  if (Object.keys(bad).length)
    return { ok: false, error: "INVALID", fields: bad };
  const url = process.env.LEAD_ENDPOINT;
  if (!url) return { ok: false, error: "NOT_CONNECTED" };
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind,
        ...data,
        submittedAt: new Date().toISOString(),
      }),
    });
    if (!r.ok) return { ok: false, error: "FAILED" };
  } catch {
    return { ok: false, error: "FAILED" };
  }
  return {
    ok: true,
    deckUrl: kind === "deck" && flags.DECK_URL ? flags.DECK_URL : undefined,
    schedulingUrl:
      kind === "intro" && flags.SCHEDULING_URL
        ? flags.SCHEDULING_URL
        : undefined,
  };
}
