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
      className="bowl invertible mono stem-x fixed bottom-6 z-[70] border border-rule bg-ground py-3 pl-4 pr-6 text-ink-dim"
    >
      Top ↑
    </button>
  );
};
