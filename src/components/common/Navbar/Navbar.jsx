import React, { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Briefcase } from "lucide-react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useApp } from "../../../context/AppContext";
import "./Navbar.css";

const NAV_LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/jobs", label: "Browse Jobs" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { favoritesCount } = useApp();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <nav className="navbar__inner container" aria-label="Primary">
        <Link to="/" className="navbar__brand" aria-label="CareerHive home">
          <span className="navbar__logo" aria-hidden="true">
            <Briefcase size={20} strokeWidth={2.5} />
          </span>
          <span className="navbar__brand-text">
            Career<span className="navbar__brand-accent">Hive</span>
          </span>
        </Link>

        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link
            to="/jobs"
            className="navbar__saved"
            aria-label={`Saved jobs (${favoritesCount})`}
          >
            <Heart size={20} strokeWidth={2.2} />
            {favoritesCount > 0 && (
              <span className="navbar__badge">{favoritesCount}</span>
            )}
          </Link>

          <ThemeToggle />

          <Link to="/jobs" className="btn btn-primary navbar__cta">
            Find Jobs
          </Link>

          <button
            type="button"
            className="navbar__burger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}
        hidden={!menuOpen}
      >
        <ul className="navbar__mobile-links">
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar__mobile-link ${
                    isActive ? "navbar__mobile-link--active" : ""
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <Link to="/jobs" className="btn btn-primary btn-lg btn-block">
          Find Jobs
        </Link>
      </div>

      {menuOpen && (
        <div
          className="navbar__scrim"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </header>
  );
}

export default Navbar;
