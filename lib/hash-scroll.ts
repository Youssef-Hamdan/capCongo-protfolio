/**
 * Smoothly scrolls to a section by id, offset by the sticky header height.
 */
export function scrollToHashId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const header = document.querySelector<HTMLElement>("[data-sticky-header]");
  const offset = header?.offsetHeight ?? 80;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
}
