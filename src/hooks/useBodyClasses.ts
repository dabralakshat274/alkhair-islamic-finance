import { useEffect } from "react";

// The theme CSS keys off classes on <body> (has-topbar, content-full-screen, ...).
// Each page sets its own list; anything else on <body> (like sidr-open) is left alone.
export function useBodyClasses(classes: string[]) {
  useEffect(() => {
    const list = classes.filter(Boolean);
    document.body.classList.add(...list);
    return () => document.body.classList.remove(...list);
  }, [classes]);
}
