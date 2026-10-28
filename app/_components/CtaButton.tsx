"use client"
import type { ReactNode } from "react"
import { useSignup } from "./SignupModal"
import { track } from "../../lib/integrations"
export default function CtaButton({ children = "Join early access", event, source, outside, light }: { children?: ReactNode; event: string; source?: string; outside?: boolean; light?: boolean }) {
  const { open } = useSignup()
  return (<button onClick={() => { track(event); open({ outsideKenya: outside, source }) }}
    className={`rounded-full px-7 py-4 font-medium transition active:scale-[.97] ${light ? "bg-white text-violet hover:bg-lilac" : "bg-violet text-white hover:bg-violet-dark"}`}>{children}</button>)
}
