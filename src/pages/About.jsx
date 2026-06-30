import React from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Heart,
  Rocket,
  ShieldCheck,
  Users,
  Globe2,
  ArrowRight,
} from "lucide-react";
import "./About.css";

const VALUES = [
  {
    icon: Target,
    title: "Engineer-first",
    text: "Every feature is built for the way engineers actually search for work — transparent, fast, and noise-free.",
  },
  {
    icon: Heart,
    title: "Quality over quantity",
    text: "We curate roles from companies we'd want to work at ourselves. No spam, no ghost listings.",
  },
  {
    icon: ShieldCheck,
    title: "Radical transparency",
    text: "Salary ranges, work modes, and expectations up front — so you can make informed decisions.",
  },
  {
    icon: Rocket,
    title: "Move fast",
    text: "One-click apply, saved jobs, and smart filters mean you spend less time searching and more time interviewing.",
  },
];

const TEAM = [
  { name: "Jordan Avery", role: "Co-founder & CEO", color: "#6366f1" },
  { name: "Priya Nair", role: "Co-founder & CTO", color: "#14b8a6" },
  { name: "Diego Santos", role: "Head of Design", color: "#f59e0b" },
  { name: "Mei Tanaka", role: "Head of Engineering", color: "#ec4899" },
];

function About() {
  return (
    <div className="about">
      <section className="about__hero">
        <div className="about__hero-glow" aria-hidden="true" />
        <div className="container about__hero-inner">
          <span className="section-eyebrow">Our story</span>
          <h1 className="about__title">
            We're building the job board engineers actually love.
          </h1>
          <p className="about__lead">
            CareerHive started with a simple frustration: finding great
            engineering work was tedious, opaque, and full of noise. So we built
            the tool we wished existed — curated roles, transparent salaries, and
            a delightful experience from search to offer.
          </p>
        </div>
      </section>

      <section className="section about__stats-wrap">
        <div className="container about__stats">
          <div className="about__stat">
            <Users size={26} strokeWidth={2.2} />
            <span className="about__stat-value">58k+</span>
            <span className="about__stat-label">Engineers hired</span>
          </div>
          <div className="about__stat">
            <Globe2 size={26} strokeWidth={2.2} />
            <span className="about__stat-value">120+</span>
            <span className="about__stat-label">Partner companies</span>
          </div>
          <div className="about__stat">
            <Rocket size={26} strokeWidth={2.2} />
            <span className="about__stat-value">2.4k+</span>
            <span className="about__stat-label">Open roles</span>
          </div>
          <div className="about__stat">
            <Heart size={26} strokeWidth={2.2} />
            <span className="about__stat-value">94%</span>
            <span className="about__stat-label">Satisfaction</span>
          </div>
        </div>
      </section>

      <section className="section about__values">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">What we believe</span>
            <h2 className="section-title">Our values</h2>
          </div>
          <div className="about__values-grid">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div key={value.title} className="about__value card">
                  <span className="about__value-icon" aria-hidden="true">
                    <Icon size={24} strokeWidth={2.2} />
                  </span>
                  <h3 className="about__value-title">{value.title}</h3>
                  <p className="about__value-text">{value.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section about__team-section">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">The humans</span>
            <h2 className="section-title">Meet the team</h2>
            <p className="section-subtitle">
              A small, senior team of engineers and designers obsessed with craft.
            </p>
          </div>
          <div className="about__team">
            {TEAM.map((member) => (
              <div key={member.name} className="about__member">
                <span
                  className="about__avatar"
                  style={{ backgroundColor: member.color }}
                  aria-hidden="true"
                >
                  {member.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="about__member-name">{member.name}</span>
                <span className="about__member-role">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about__cta">
          <h2 className="about__cta-title">Ready to find your next role?</h2>
          <p className="about__cta-text">
            Browse curated software engineering jobs and apply in one click.
          </p>
          <Link to="/jobs" className="btn btn-primary btn-lg">
            Browse jobs
            <ArrowRight size={18} strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default About;
