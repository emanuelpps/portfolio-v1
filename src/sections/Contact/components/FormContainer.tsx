import { Form } from "./Form";
import { Cell, CellGrid } from "@/components/blueprint/Cell";

const LINKS = [
  {
    key: "Email",
    label: "emanuelpages.ps@gmail.com",
    href: "mailto:emanuelpages.ps@gmail.com",
  },
  {
    key: "GitHub",
    label: "github.com/emanuelpps",
    href: "https://github.com/emanuelpps",
  },
  {
    key: "LinkedIn",
    label: "linkedin.com/in/emanuel-ps",
    href: "https://www.linkedin.com/in/emanuel-ps",
  },
];

export const FormContainer = () => {
  return (
    <CellGrid cols="grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <Cell className="sm:p-10">
        <p className="mono-sm text-ink-faint">Direct</p>

        <p className="mt-6 text-base font-light leading-relaxed text-ink-dim">
          Open to frontend roles and freelance projects. Tell me what
          you&apos;re working on — I usually reply within a day.
        </p>

        <ul className="mt-10 flex flex-col">
          {LINKS.map(({ key, label, href }) => (
            <li key={key} className="border-b border-rule-soft last:border-b-0">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="hover"
                className="group flex items-baseline gap-4 py-3.5"
              >
                <span className="mono-sm w-16 shrink-0 text-ink-faint">
                  {key}
                </span>
                <span className="font-mono text-[0.8125rem] text-ink-dim transition-colors duration-300 group-hover:text-ink">
                  {label}
                </span>
                <span
                  aria-hidden
                  className="mono ml-auto text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Cell>

      <Cell className="sm:p-10">
        <p className="mono-sm mb-10 text-ink-faint">Message</p>
        <Form />
      </Cell>
    </CellGrid>
  );
};
