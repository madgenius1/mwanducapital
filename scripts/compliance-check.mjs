// Run after `next build`:  npm run check:compliance
// Scans the built HTML for words the brief bans or restricts, and for content that should be hidden behind flags.
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs"
import { join } from "node:path"
const root = join(process.cwd(), ".next/server/app")
if (!existsSync(root)) { console.error("No build found. Run `npm run build` first."); process.exit(1) }
const files = []; (function walk(d) { for (const f of readdirSync(d)) { const p = join(d, f); statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") && files.push(p) } })(root)
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ")
const banned = [/licen[sc]ed/gi, /regulated/gi, /approved/gi, /send money home/gi, /never lose touch/gi, /revolutionary/gi, /disruptive/gi, /get rich/gi, /financial freedom/gi, /derivative/gi]
const allow = [/(no promises of|never|not|does not promise) guaranteed/i, /including remittance services/i] // negations and spec-supplied partner card text
// Flag defaults are read from config/flags.ts; an env var of the same name overrides them.
const flagsSrc = readFileSync(join(process.cwd(), "config/flags.ts"), "utf8")
const flag = (k) => { const e = process.env[k]; if (e !== undefined) return e === "true"; const m = flagsSrc.match(new RegExp(`${k}: on\\("${k}", (true|false)\\)`)); return m?.[1] === "true" }
const gatedContent = [
  ["REGULATORY_STRIP_ENABLED", ["Data protection registration", "Sandbox admission", "Payments authorisation", "Market access partner agreement", "Trade routing set-up"]],
  ["SHOW_TRACTION_METRICS", ["registered for the beta"]],
  ["SHOW_TEAM", ["Name to be supplied", "The people building Mwandu"]],
]
const hiddenWhenFlagsOff = gatedContent.filter(([k]) => !flag(k)).flatMap(([, v]) => v)
// Internal item that must never be public, whatever the flags say.
const neverPublic = ["Wording sign-off"]
let bad = 0, placeholders = 0
for (const f of files) {
  const t = strip(readFileSync(f, "utf8")); const name = f.replace(root, "")
  for (const re of [...banned, /guaranteed/gi, /remittance/gi]) for (const m of t.matchAll(re)) {
    const ctx = t.slice(Math.max(0, m.index - 40), m.index + m[0].length + 40)
    if (allow.some((a) => a.test(ctx))) continue
    bad++; console.error(`✗ ${name}: "${m[0]}" …${ctx}…`)
  }
  for (const h of [...hiddenWhenFlagsOff, ...neverPublic]) if (t.includes(h)) { bad++; console.error(`✗ ${name}: flagged-off content rendered: ${h}`) }
  placeholders += (t.match(/PLACEHOLDER/g) || []).length
}
console.log(`${files.length} pages scanned. ${placeholders} visible PLACEHOLDER markers.`)
if (bad) { console.error(`\n${bad} problem(s) found.`); process.exit(1) } else console.log("✓ No banned wording and no flagged-off content in the built pages.")
