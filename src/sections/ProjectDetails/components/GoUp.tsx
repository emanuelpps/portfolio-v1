/**
 * Back to the top of the case-study sheet. The overlay scrolls in its own
 * container rather than the document, so this targets that container directly.
 */
export const GoUp = () => {
  const scrollToTop = () => {
    document
      .querySelector("[data-lenis-prevent]")
      ?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={scrollToTop}
      data-cursor="hover"
      className="bowl invertible note fixed bottom-6 left-[var(--pad)] z-[70] border-2 border-edge bg-ground py-3 pl-5 pr-7 text-ink-2"
    >
      Top ↑
    </button>
  );
};
