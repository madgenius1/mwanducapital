import SiteShell from "./SiteShell"
export default function LegalPlaceholder({ title }: { title: string }) {
  return (<SiteShell><section className="mx-auto max-w-3xl px-5 py-20 lg:py-28">
    <p className="text-sm font-semibold tracking-[.18em] text-violet">LEGAL</p>
    <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
    <p className="mt-6 rounded-[24px] bg-lilac p-6 text-lg">This page is a placeholder. The text, drafted by our legal team, will be published here.</p>
    <a href="/" className="mt-8 inline-block font-medium text-violet underline underline-offset-4">Back to home</a>
  </section></SiteShell>)
}
