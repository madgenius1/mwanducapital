import Reveal from "./Reveal";
type Item = { label: string; status: string; date?: string; body?: string };
// Rendered only from server-filtered items (see config/regulatory.ts). No items → renders nothing.
export default function RegulatoryProgress({ items }: { items: Item[] }) {
  if (!items.length) return null;
  return (
    <Reveal className="mt-8">
      <div className="rounded-[28px] border border-line bg-white p-6">
        <h3 className="font-semibold">Where we are</h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {items.map((i) => (
            <li
              key={i.label}
              className="flex items-center justify-between gap-3 rounded-2xl bg-paper px-4 py-3 text-sm"
            >
              <span>
                {i.label}
                {i.body && <span className="text-muted"> · {i.body}</span>}
              </span>
              <span className="shrink-0 rounded-full bg-lilac px-3 py-1 text-xs font-medium text-violet">
                {i.status}
                {i.date && ` · ${i.date}`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
