/** Smoothly scroll to an in-page section id, using Lenis when active. */
export function scrollToSection(id: string) {
  const el = id === "top" ? document.documentElement : document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (window.__lenis && !reduce) {
    window.__lenis.scrollTo(id === "top" ? 0 : el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }
  history.replaceState(null, "", id === "top" ? "/" : `/#${id}`);
  return true;
}

export const isExternal = (href: string) => /^https?:\/\//.test(href);
