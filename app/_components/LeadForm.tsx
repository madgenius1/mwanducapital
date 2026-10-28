"use client"
import { useRef, useState, type FormEvent } from "react"
import { Loader2, CheckCircle2, Download } from "lucide-react"
import { forms, type FormKind } from "../../config/forms"
import { submitLead } from "../investors/actions"
import { track } from "../../lib/integrations"
type Done = { deckUrl?: string; schedulingUrl?: string }
const msg: Record<string, string> = { NOT_CONNECTED: "This form isn’t connected yet. Set LEAD_ENDPOINT to enable it.", FAILED: "Something went wrong. Please try again.", INVALID: "Please check the highlighted fields." }
export default function LeadForm({ kind, contact }: { kind: FormKind; contact: string }) {
  const cfg = forms[kind]; const ref = useRef<HTMLFormElement>(null)
  const [state, setState] = useState<"idle" | "loading" | "error" | "success">("idle")
  const [err, setErr] = useState(""); const [fe, setFe] = useState<Record<string, string>>({}); const [done, setDone] = useState<Done>({})
  const inp = "mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-violet"
  async function onSubmit(e: FormEvent) {
    e.preventDefault(); const f = new FormData(ref.current!); const data: Record<string, string> = {}; const bad: Record<string, string> = {}
    f.forEach((v, k) => { data[k] = String(v) })
    for (const fl of cfg.fields) { const v = (data[fl.name] ?? "").trim()
      if (fl.required && !v) bad[fl.name] = "This field is required."
      else if (fl.type === "email" && v && !/^\S+@\S+\.\S+$/.test(v)) bad[fl.name] = "Enter a valid email address." }
    if (!f.get("consent")) bad.consent = "Please tick to continue."
    setFe(bad); if (Object.keys(bad).length) return
    setState("loading"); const r = await submitLead(kind, data)
    if (r.ok) {
      setDone({ deckUrl: r.deckUrl, schedulingUrl: r.schedulingUrl }); setState("success"); track(`${kind}_submit`)
      if (r.deckUrl) track("deck_download")
      if (r.deckUrl) { const a = document.createElement("a"); a.href = r.deckUrl; a.download = ""; a.rel = "noopener"; a.click() }
    } else { setFe(r.fields ?? {}); setErr(msg[r.error]); setState("error") }
  }
  if (state === "success") return (
    <div role="status" className="rounded-[28px] bg-white p-8 text-center">
      <CheckCircle2 className="mx-auto text-gain" size={44} />
      {kind === "deck" ? (<>
        <p className="mt-4 text-xl font-semibold">Thanks. Your presentation is ready.</p>
        {done.deckUrl ? <a href={done.deckUrl} download onClick={() => track("deck_download", { repeat: true })} className="mt-4 inline-flex items-center gap-2 font-medium text-violet underline underline-offset-4"><Download size={16} />Download again</a>
          : <p className="mt-3 rounded-2xl bg-lilac p-4 text-sm text-ink/80">The presentation file isn’t available to download yet. To receive it, contact us: {contact}</p>}</>)
        : (<><p className="mt-4 text-xl font-semibold">Thanks. We’ll review your request and follow up with the right next step.</p>
          {done.schedulingUrl && <a href={done.schedulingUrl} onClick={() => track("scheduling_click")} className="mt-4 inline-block font-medium text-violet underline underline-offset-4">Book a time</a>}</>)}
    </div>)
  return (
    <form ref={ref} onSubmit={onSubmit} noValidate className="space-y-4 rounded-[28px] bg-white p-6 sm:p-8">
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      {cfg.fields.map((f) => (
        <label key={f.name} className="block text-sm font-medium">{f.label}
          {f.type === "select" ? <select name={f.name} defaultValue="" className={inp} aria-invalid={!!fe[f.name]}><option value="" disabled>Select…</option>{f.options!.map((o) => <option key={o}>{o}</option>)}</select>
            : f.type === "textarea" ? <textarea name={f.name} rows={4} className={inp} aria-invalid={!!fe[f.name]} />
            : <input name={f.name} type={f.type} autoComplete={f.type === "email" ? "email" : f.name === "name" ? "name" : "off"} className={inp} aria-invalid={!!fe[f.name]} />}
          {fe[f.name] && <span className="text-sm text-red-700">{fe[f.name]}</span>}</label>))}
      <button disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 font-medium text-white transition hover:bg-violet-dark active:scale-[.98] disabled:opacity-70">
        {state === "loading" && <Loader2 className="animate-spin" size={18} />}{cfg.submit}</button>
      {state === "error" && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{err}</p>}
      <label className="flex items-start gap-2 text-xs text-muted"><input name="consent" type="checkbox" className="mt-0.5 size-4 accent-violet" /><span>[PLACEHOLDER — standard consent text from the legal team.] See our <a href="/privacy" className="underline">Privacy Policy</a>.</span></label>
      {fe.consent && <span className="text-sm text-red-700">{fe.consent}</span>}
    </form>
  )
}
