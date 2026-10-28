export default function Logo({ className = "text-[26px] lg:text-[32px]" }: { className?: string }) {
  return (<a href="/" aria-label="Mwandu home" className={`shrink-0 font-bold leading-none tracking-[-0.045em] ${className}`}>mwandu</a>)
}
