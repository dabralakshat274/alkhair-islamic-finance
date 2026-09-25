import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Scroll to the top on every route change, as a full page load did on the original site
export default function ScrollRestoration() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
