import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop
 * Resets scroll position to the top whenever the route pathname changes.
 * Renders nothing.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
