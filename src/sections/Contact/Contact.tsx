import { useScroll } from "@/hooks/UseScroll";
import { FormContainer } from "./components/FormContainer";
import { BpSection } from "@/components/blueprint/Section";
import { EPMark } from "@/components/blueprint/EPMark";

export const Contact = () => {
  const { refs } = useScroll();

  return (
    <BpSection
      id="contact"
      index="05"
      label="Contact"
      title="Let's build something that performs."
      aside="Sheet 05"
      sectionRef={refs.refContact}
    >
      <div className="mt-16 from-stem">
        <FormContainer />

        {/* The document signs itself: the mark drawing its own three strokes,
            the same geometry the whole page was laid out from. */}
        <div className="flex items-center justify-center py-24 sm:py-32">
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
