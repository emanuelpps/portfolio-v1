import { Form } from "./Form";
import { Cell, CellGrid } from "@/components/blueprint/Cell";
import { useT } from "@/i18n";

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
  const t = useT();

  return (
    <CellGrid cols="grid-cols-1 lg:grid-cols-[minmax(0,22rem)_1fr]">
      <Cell pad="px-[var(--gutter)] py-7 sm:py-9">
        <p className="note text-ink-faint">{t.contact.directLabel}</p>

        <p className="mt-5 text-lg leading-relaxed text-ink-2">
          {t.contact.lead}
        </p>

        <ul className="mt-8 flex flex-col">
          {LINKS.map(({ key, label, href }) => (
            <li key={key} className="border-b border-rule-soft last:border-b-0">
              <a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                data-cursor="hover"
                className="group flex min-h-11 items-center gap-4 py-3"
              >
                <span className="note w-16 shrink-0 text-ink-faint">
                  {key}
                </span>
                <span className="note text-ink-2 transition-colors duration-300 group-hover:text-ink">
                  {label}
                </span>
                <span
                  aria-hidden
                  className="note ml-auto text-ink-faint transition-transform duration-300 group-hover:translate-x-1"
                >
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Cell>

      <Cell pad="px-[var(--gutter)] py-7 sm:py-9">
        <p className="note mb-8 text-ink-faint">{t.contact.messageLabel}</p>
        <Form />
      </Cell>
    </CellGrid>
  );
};
