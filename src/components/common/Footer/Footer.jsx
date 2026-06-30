import React from "react";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Github,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react";
import "./Footer.css";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { label: "Browse Jobs", to: "/jobs" },
      { label: "Categories", to: "/jobs" },
      { label: "Companies", to: "/jobs" },
      { label: "Saved Jobs", to: "/jobs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "Careers", to: "/about" },
      { label: "Blog", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help Center", to: "/contact" },
      { label: "Privacy Policy", to: "/about" },
      { label: "Terms of Service", to: "/about" },
      { label: "Cookie Policy", to: "/about" },
    ],
  },
];

const SOCIALS = [
  { label: "GitHub", icon: Github, href: "https://github.com" },
  { label: "Twitter", icon: Twitter, href: "https://twitter.com" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com" },
  { label: "Email", icon: Mail, href: "mailto:hello@careerhive.dev" },
];

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand-col">
          <Link to="/" className="footer__brand" aria-label="CareerHive home">
            <span className="footer__logo" aria-hidden="true">
              <Briefcase size={20} strokeWidth={2.5} />
            </span>
            <span className="footer__brand-text">
              Career<span className="footer__brand-accent">Hive</span>
            </span>
          </Link>
          <p className="footer__tagline">
            The modern job board for software engineers. Discover roles at
            world-class companies and find work you love.
          </p>
          <ul className="footer__socials">
            {SOCIALS.map(({ label, icon: Icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="footer__social"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                >
                  <Icon size={18} strokeWidth={2.2} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__cols">
          {FOOTER_COLUMNS.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h3 className="footer__col-title">{col.title}</h3>
              <ul className="footer__col-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="footer__link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="container footer__bottom">
        <p>© {year} CareerHive. Crafted for engineers.</p>
        <p className="footer__made">Built with React + vanilla CSS.</p>
      </div>
    </footer>
  );
}

export default Footer;
