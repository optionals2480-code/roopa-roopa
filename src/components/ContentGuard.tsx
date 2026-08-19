import { useEffect } from "react";

/**
 * Discourages casual inspection: blocks right-click, image drag/save,
 * text selection and the common devtools / view-source shortcuts.
 * (Client-side deterrent only — not real security.)
 */
export function ContentGuard() {
  useEffect(() => {
    const onContext = (e: MouseEvent) => e.preventDefault();
    const onDragStart = (e: DragEvent) => e.preventDefault();
    const onSelect = (e: Event) => e.preventDefault();
    const onCopy = (e: ClipboardEvent) => e.preventDefault();
    const onKey = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["i", "j", "c", "k"].includes(k)) ||
        (e.metaKey && e.altKey && ["i", "j", "c", "u"].includes(k)) ||
        ((e.ctrlKey || e.metaKey) && ["u", "s", "p"].includes(k))
      ) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    document.addEventListener("contextmenu", onContext);
    document.addEventListener("dragstart", onDragStart);
    document.addEventListener("selectstart", onSelect);
    document.addEventListener("copy", onCopy);
    document.addEventListener("keydown", onKey, true);

    return () => {
      document.removeEventListener("contextmenu", onContext);
      document.removeEventListener("dragstart", onDragStart);
      document.removeEventListener("selectstart", onSelect);
      document.removeEventListener("copy", onCopy);
      document.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return null;
}
