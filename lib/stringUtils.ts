export function toTitleCase(s: string): string {
  return s
    .split(" ")
    .map((w) => (w.length ? w[0].toUpperCase() + w.slice(1).toLowerCase() : ""))
    .join(" ");
}

export function truncate(s: string, max = 20): string {
  if (!s) return s;
  return s.length > max ? s.slice(0, max - 1) + "…" : s;
}
