import SiteShell from "./_components/SiteShell"
export default function NotFound() {
  return (<SiteShell><section className="mx-auto max-w-2xl px-5 py-28 text-center">
    <p className="text-sm font-semibold tracking-[.18em] text-violet">404</p>
    <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">We couldn’t find that page.</h1>
    <p className="mt-4 text-muted">It may have moved, or the link may be wrong.</p>
    <a href="/" className="mt-8 inline-block rounded-full bg-violet px-7 py-4 font-medium text-white transition hover:bg-violet-dark">Back to home</a>
  </section></SiteShell>)
}
