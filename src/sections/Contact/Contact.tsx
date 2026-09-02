import { useScroll } from "@/hooks/UseScroll";
import { FormContainer } from "./components/FormContainer";
import { BpSection } from "@/components/blueprint/Section";
import { EPMark } from "@/components/blueprint/EPMark";
import { useT } from "@/i18n";

export const Contact = () => {
  const { refs } = useScroll();
  const t = useT();

  return (
    <BpSection
      id="contact"
      label={t.nav.sections.contact}
      pace="loose"
      invert
      title={t.contact.title}
      sectionRef={refs.refContact}
    >
      <div className="mt-10 from-stem">
        <FormContainer />

        {/* The document signs itself: the mark drawing its own three strokes,
            the same geometry the whole page was laid out from. */}
        <div className="flex items-center justify-center py-20 sm:py-24">
          <EPMark
            size={160}
            traced
            className="text-ink/25"
            title="Emanuel Pagés"
          />
        </div>
      </div>
    </BpSection>
  );
};
