import React from "react";
import { Sun, Moon } from "lucide-react";
import { useApp } from "../../../context/AppContext";
import "./ThemeToggle.css";

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useApp();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`theme-toggle ${className}`}
      onClick={toggleTheme}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="theme-toggle__track">
        <span className="theme-toggle__thumb">
          {isDark ? (
            <Moon size={14} strokeWidth={2.5} />
          ) : (
            <Sun size={14} strokeWidth={2.5} />
          )}
        </span>
      </span>
    </button>
  );
}

export default ThemeToggle;
