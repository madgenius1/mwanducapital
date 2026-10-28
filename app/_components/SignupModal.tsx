"use client"
import { createContext, useContext, useState, useCallback, useRef, useEffect, type ReactNode, type FormEvent } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X, Loader2, CheckCircle2 } from "lucide-react"
import { submitSignup, track } from "../../lib/integrations"

const Ctx = createContext<{ open: (o?: { outsideKenya?: boolean; source?: string }) => void }>({ open: () => {} })
export const useSignup = () => useContext(Ctx)
const intents = ["Start investing", "Track my holdings", "Manage everyday money", "Learn about the NSE", "Invest from outside Kenya"]
type State = "idle" | "loading" | "error" | "success"

export function SignupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false)
  const [outside, setOutside] = useState(false)
  const [src, setSrc] = useState("")
  const [state, setState] = useState<State>("idle")
  const [err, setErr] = useState("")
  const [intent, setIntent] = useState("")
  const [fieldErr, setFieldErr] = useState<Record<string, string>>({})
  const open = useCallback((o?: { outsideKenya?: boolean; source?: string }) => {
    setSrc(o?.source ?? "")
    setOutside(!!o?.outsideKenya); setState("idle"); setErr(""); setFieldErr({}); setOpen(true); track("signup_start")
  }, [])
  const ref = useRef<HTMLFormElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  // Focus management: focus the first field, trap Tab, close on Escape, lock page scroll, restore focus on close.
  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement | null; const d = dialogRef.current
    const items = () => Array.from(d?.querySelectorAll<HTMLElement>("button, a[href], input, select, textarea") ?? []).filter((el) => !el.hasAttribute("disabled"))
    d?.querySelector<HTMLElement>("input")?.focus(); document.body.style.overflow = "hidden"
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
      if (e.key === "Tab") { const f = items(); if (!f.length) return; const a = f[0], z = f[f.length - 1]
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() } else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() } }
    }
    document.addEventListener("keydown", key)
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; prev?.focus() }
  }, [isOpen])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const f = new FormData(ref.current!)
    const name = String(f.get("name") || "").trim(), contact = String(f.get("contact") || "").trim()
    const bad: Record<string, string> = {}
    if (!name) bad.name = "Please enter your name."
    if (!/^\S+@\S+\.\S+$/.test(contact) && !/^\+?[\d\s-]{9,15}$/.test(contact)) bad.contact = "Enter a valid email or phone number."
    if (!f.get("consent")) bad.consent = "Please tick to continue."
    setFieldErr(bad); if (Object.keys(bad).length) return
    setState("loading")
    try {
      await submitSignup({ name, contact, intent, outsideKenya: outside })
      track("signup_success", { source: src }); if (src === "diaspora") track("diaspora_signup_submit"); setState("success")
    } catch (x) {
      setErr((x as Error).message === "NOT_CONNECTED" ? "Signups aren’t connected yet. Set NEXT_PUBLIC_SIGNUP_ENDPOINT to enable them." : "Something went wrong. Please try again.")
      setState("error")
    }
  }
  const fld = "mt-1.5 w-full rounded-2xl border border-line bg-white px-4 py-3 text-base outline-none focus:border-violet"
  const abroad = outside || intent === "Invest from outside Kenya"
  return (
    <Ctx.Provider value={{ open }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[100] flex items-end justify-center bg-ink/60 p-0 sm:items-center sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setOpen(false)} onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
            <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="su-title" onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }}
              className="max-h-[92vh] w-full max-w-md overflow-y-auto rounded-t-[28px] bg-paper p-6 sm:rounded-[28px] sm:p-8">
              <div className="flex items-start justify-between">
                <h2 id="su-title" className="text-2xl font-semibold">Join the early access list</h2>
                <button aria-label="Close" onClick={() => setOpen(false)} className="rounded-full p-2 hover:bg-lilac"><X size={20} /></button>
              </div>
              {state === "success" ? (
                <div className="py-8 text-center" role="status">
                  <CheckCircle2 className="mx-auto text-gain" size={44} />
                  <p className="mt-4 text-lg font-medium">You’re on the list.</p>
                  <p className="mt-2 text-muted">We’ll share early access and launch updates.{abroad && " Thanks. We’ll share beta and launch updates for people outside Kenya."}</p>
                </div>
              ) : (
                <form ref={ref} onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
                  <label className="block text-sm font-medium">Name
                    <input name="name" autoComplete="name" className={fld} aria-invalid={!!fieldErr.name} />
                    {fieldErr.name && <span className="text-sm text-red-700">{fieldErr.name}</span>}</label>
                  <label className="block text-sm font-medium">Email or phone number
                    <input name="contact" autoComplete="email" className={fld} aria-invalid={!!fieldErr.contact} />
                    {fieldErr.contact && <span className="text-sm text-red-700">{fieldErr.contact}</span>}</label>
                  <fieldset><legend className="text-sm font-medium">What would you like to do first? <span className="text-muted">(optional)</span></legend>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {intents.map((i) => (
                        <button type="button" key={i} aria-pressed={intent === i} onClick={() => setIntent(intent === i ? "" : i)}
                          className={`rounded-full border px-3.5 py-2 text-sm transition ${intent === i ? "border-violet bg-violet text-white" : "border-line bg-white hover:border-violet"}`}>{i}</button>))}
                    </div></fieldset>
                  <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={outside} onChange={(e) => setOutside(e.target.checked)} className="size-4 accent-violet" />
                    I’m currently based outside Kenya <span className="text-muted">(optional)</span></label>
                  <button disabled={state === "loading"} className="flex w-full items-center justify-center gap-2 rounded-full bg-violet px-6 py-3.5 font-medium text-white transition hover:bg-violet-dark active:scale-[.98] disabled:opacity-70">
                    {state === "loading" && <Loader2 className="animate-spin" size={18} />} Join early access</button>
                  {state === "error" && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-800">{err}</p>}
                  <label className="flex items-start gap-2 text-xs text-muted"><input name="consent" type="checkbox" className="mt-0.5 size-4 accent-violet" />
                    <span>[PLACEHOLDER — standard consent text from the legal team.] See our <a href="/privacy" className="underline">Privacy Policy</a>.</span></label>
                  {fieldErr.consent && <span className="text-sm text-red-700">{fieldErr.consent}</span>}
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
