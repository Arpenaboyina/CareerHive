import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AppContext = createContext(null);

const MAX_RECENT = 6;

function getPreferredTheme() {
  if (typeof window === "undefined") return "light";
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    return "dark";
  }
  return "light";
}

export function AppProvider({ children }) {
  /* ---------------- Theme ---------------- */
  const [theme, setTheme] = useLocalStorage("careerhive:theme", getPreferredTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", theme === "dark" ? "#0b0d12" : "#6366f1");
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, [setTheme]);

  /* ---------------- Favorites ---------------- */
  const [favorites, setFavorites] = useLocalStorage("careerhive:favorites", []);

  const isFavorite = useCallback(
    (id) => favorites.includes(String(id)),
    [favorites]
  );

  /* ---------------- Toast (declared before toggleFavorite uses it) ---------------- */
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, type = "success", duration = 3200) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ id: Date.now(), message, type });
    toastTimer.current = setTimeout(() => setToast(null), duration);
  }, []);

  const dismissToast = useCallback(() => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(null);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const toggleFavorite = useCallback(
    (id, jobTitle) => {
      const key = String(id);
      setFavorites((prev) => {
        if (prev.includes(key)) {
          showToast(
            jobTitle ? `Removed "${jobTitle}" from saved` : "Removed from saved",
            "info"
          );
          return prev.filter((f) => f !== key);
        }
        showToast(
          jobTitle ? `Saved "${jobTitle}"` : "Job saved",
          "success"
        );
        return [...prev, key];
      });
    },
    [setFavorites, showToast]
  );

  /* ---------------- Recently viewed ---------------- */
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(
    "careerhive:recent",
    []
  );

  const addRecentlyViewed = useCallback(
    (id) => {
      const key = String(id);
      setRecentlyViewed((prev) => {
        const next = [key, ...prev.filter((x) => x !== key)];
        return next.slice(0, MAX_RECENT);
      });
    },
    [setRecentlyViewed]
  );

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme,
      setTheme,
      favorites,
      isFavorite,
      toggleFavorite,
      favoritesCount: favorites.length,
      recentlyViewed,
      addRecentlyViewed,
      clearRecentlyViewed,
      toast,
      showToast,
      dismissToast,
    }),
    [
      theme,
      toggleTheme,
      setTheme,
      favorites,
      isFavorite,
      toggleFavorite,
      recentlyViewed,
      addRecentlyViewed,
      clearRecentlyViewed,
      toast,
      showToast,
      dismissToast,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return ctx;
}

export default AppContext;
