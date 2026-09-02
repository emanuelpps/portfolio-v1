import { useEffect } from "react";

/**
 * The tab title and the search snippet, set by whichever route is on screen.
 *
 * This used to live in `App`, which renders on every route — so the project
 * sheet had no way to name itself without the app overwriting it the moment
 * the language changed. Only one route renders at a time, so letting the route
 * own its own metadata removes the race instead of sequencing it.
 *
 * The `og:` tags are deliberately left alone: they are read by scrapers that do
 * not run JavaScript, so changing them here would only make the markup
 * disagree with what actually gets shared.
 */
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [title, description]);
}
