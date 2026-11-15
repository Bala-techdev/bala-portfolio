export const ICON_OPTIONS = [
  ["code", "⌘"], ["heart", "♥"], ["shield", "◆"], ["edit", "✎"],
  ["layers", "▱"], ["database", "◈"], ["globe", "◎"], ["cpu", "◉"],
  ["terminal", ">_"], ["briefcase", "▣"], ["zap", "ϟ"], ["server", "▤"],
  ["activity", "⌁"],
];

export const ACCENT_OPTIONS = [
  "linear-gradient(135deg, #4c6fff 0%, #22308f 100%)",
  "linear-gradient(135deg, #e5484d 0%, #a51111 100%)",
  "linear-gradient(135deg, #14b8a6 0%, #115e59 100%)",
  "linear-gradient(135deg, #a855f7 0%, #581c87 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)",
  "linear-gradient(135deg, #171b26 0%, #0b0d14 100%)",
];

export function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 160);
}
