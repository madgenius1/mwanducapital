"use client"
import Reveal from "./Reveal"
import { useSignup } from "./SignupModal"
import { track } from "../../lib/integrations"
export default function FinalCTA() {
  const { open } = useSignup()
  return (
    <section className="bg-ink py-20 text-center text-paper lg:py-28"><Reveal className="mx-auto max-w-3xl px-5">
      <h2 className="text-4xl font-semibold tracking-tight sm:text-6xl">Your next step can be clearer.</h2>
      <p className="mt-5 text-lg text-paper/70">Join the early access list and be among the first to experience Mwandu.</p>
      <button onClick={() => { track("cta_click", { where: "final" }); open() }} className="mt-8 rounded-full bg-violet px-8 py-4 font-medium text-white transition hover:bg-violet-dark active:scale-[.97]">Join early access</button>
    </Reveal></section>
  )
}
