"use client"
import { useEffect, useRef, useState } from "react"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useSignup } from "./SignupModal"
import Logo from "./Logo"
import { track } from "../../lib/integrations"
// About lives in the footer. Add ["About", "/about"] here to bring it back to the main nav.
const links = [["How it works", "/#how-it-works"], ["Features", "/features"], ["Why Mwandu", "/#why-mwandu"], ["Investors & Partners", "/investors"], ["FAQ", "/#faq"]]
export default function Navbar() {
  const [menu, setMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const burger = useRef<HTMLButtonElement>(null)
  const { open } = useSignup()
  const join = () => { track("cta_click", { where: "nav" }); setMenu(false); open() }
  useEffect(() => { const f = () => setScrolled(window.scrollY > 8); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f) }, [])
  useEffect(() => {
    if (!menu) return
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") { setMenu(false); burger.current?.focus() } }
    const mq = window.matchMedia("(min-width: 1024px)"); const wide = () => mq.matches && setMenu(false)
    document.addEventListener("keydown", key); mq.addEventListener("change", wide)
    return () => { document.removeEventListener("keydown", key); mq.removeEventListener("change", wide) }
  }, [menu])
  return (
    <header className={`sticky top-0 z-50 border-b bg-paper/90 backdrop-blur transition-colors duration-300 ${scrolled || menu ? "border-line" : "border-transparent"}`}>
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-2 px-4 sm:px-6 lg:h-20 lg:px-12">
        <Logo />
        <div className="flex items-center gap-1 sm:gap-2 lg:gap-12">
          <ul className="hidden items-center gap-9 text-[17px] text-ink lg:flex">
            {links.map(([l, h]) => (<li key={l}><a href={h} className="transition-colors duration-200 hover:text-violet">{l}</a></li>))}
          </ul>
          <button onClick={join} className="group inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-violet px-4 py-2.5 text-sm font-medium text-white transition hover:bg-violet-dark active:scale-95 sm:px-5 lg:px-7 lg:py-3.5 lg:text-base">
            <span className="sm:hidden">Join</span><span className="hidden sm:inline">Join early access</span>
            <ArrowUpRight aria-hidden size={18} className="hidden transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 lg:block" /></button>
          <button ref={burger} aria-label={menu ? "Close menu" : "Open menu"} aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)} className="grid size-11 place-items-center rounded-full lg:hidden">{menu ? <X /> : <Menu />}</button>
        </div>
      </nav>
      {menu && (<ul id="mobile-menu" className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-paper px-5 pb-4 lg:hidden">
        {links.map(([l, h]) => (<li key={l}><a href={h} onClick={() => setMenu(false)} className="block border-b border-line/60 py-3.5 text-lg">{l}</a></li>))}</ul>)}
    </header>
  )
}
