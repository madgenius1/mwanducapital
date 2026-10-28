"use client";

import { company } from "../../config/company";
import Logo from "./Logo";

// Defined at the top level of the file (runs once on module load)
const currentYear = new Date().getFullYear();

export default function Footer({
  showAbroad = false,
}: {
  showAbroad?: boolean;
}) {
  const cols = [
    [
      "Product",
      [
        ["How it works", "/#how-it-works"],
        ["Features", "/features"],
        ["FAQ", "/#faq"],
      ],
    ],
    [
      "Company",
      [
        ["About", "/about"],
        ["Investors & Partners", "/investors"],
        ...(showAbroad ? [["Kenyans abroad", "/diaspora"]] : []),
      ],
    ],
    [
      "Legal",
      [
        ["Privacy", "/privacy"],
        ["Terms", "/terms"],
        ["Risk disclosure", "/risk"],
      ],
    ],
  ] as const;

  return (
    <footer className="border-t border-line bg-paper pb-24 pt-14 md:pb-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Logo className="text-2xl" />
            <p className="mt-3 max-w-xs text-muted">
              A simpler, clearer way to invest in Kenya.
            </p>
            <p id="contact" className="mt-4 text-sm text-muted">
              Contact: {company.contactEmail}
            </p>
          </div>
          {cols.map(([h, ls]) => (
            <div key={h}>
              <h3 className="text-sm font-semibold">{h}</h3>
              <ul className="mt-4 space-y-3 text-muted">
                {ls.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} className="hover:text-violet">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted">
          © {currentYear} {company.name}. | Investing involves risk.
        </p>
      </div>
    </footer>
  );
}