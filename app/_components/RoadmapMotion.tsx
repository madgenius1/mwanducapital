"use client";
import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion } from "motion/react";
export function CountUp({ value }: { value: string }) {
  const n = Number(value.replace(/[^\d.]/g, ""));
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(value);
  useEffect(() => {
    if (!inView || reduce || !Number.isFinite(n) || n === 0) return;
    const c = animate(0, n, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setShown(Math.round(v).toLocaleString("en-US")),
    });
    return () => c.stop();
  }, [inView, reduce, n]);
  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
export function GrowBar({
  segments,
}: {
  segments: { pct: number; className: string; label: string }[];
}) {
  const reduce = useReducedMotion();
  const text = segments.map((s) => s.label).join(", ");
  return (
    <div role="img" aria-label={text} className="flex h-3 w-full gap-1">
      {segments
        .filter((s) => s.pct > 0)
        .map((s) =>
          reduce ? (
            <div
              key={s.label}
              style={{ width: `${s.pct}%` }}
              className={`h-full rounded-full ${s.className}`}
            />
          ) : (
            <motion.div
              key={s.label}
              initial={{ width: 0 }}
              whileInView={{ width: `${s.pct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
              className={`h-full rounded-full ${s.className}`}
            />
          ),
        )}
    </div>
  );
}
