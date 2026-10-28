"use client"
import { useEffect, useState } from "react"
import { useSignup } from "./SignupModal"
import { track } from "../../lib/integrations"
export default function MobileCTA() {
  const [show, setShow] = useState(false); const { open } = useSignup()
  useEffect(() => { const f = () => setShow(window.scrollY > 700); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f) }, [])
  return (
    <div aria-hidden={!show} className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 p-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}>
      <button tabIndex={show ? 0 : -1} onClick={() => { track("cta_click", { where: "mobile_bar" }); open() }} className="w-full rounded-full bg-violet py-3.5 font-medium text-white active:scale-[.98]">Join early access</button>
    </div>
  )
}
