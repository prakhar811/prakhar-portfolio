/** Minimal class-name joiner (avoids pulling in clsx for one use). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
