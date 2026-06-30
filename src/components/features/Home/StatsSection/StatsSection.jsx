import React, { useEffect, useRef, useState } from "react";
import { Briefcase, Building2, Users, CheckCircle2 } from "lucide-react";
import "./StatsSection.css";

const STATS = [
  { icon: Briefcase, value: 2400, suffix: "+", label: "Open roles" },
  { icon: Building2, value: 120, suffix: "+", label: "Hiring companies" },
  { icon: Users, value: 58000, suffix: "+", label: "Engineers hired" },
  { icon: CheckCircle2, value: 94, suffix: "%", label: "Match satisfaction" },
];

function formatValue(n) {
  if (n >= 1000) {
    const k = n / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return String(n);
}

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, active, duration]);

  return value;
}

function StatItem({ stat, active }) {
  const Icon = stat.icon;
  const value = useCountUp(stat.value, active);
  return (
    <div className="stat">
      <span className="stat__icon" aria-hidden="true">
        <Icon size={24} strokeWidth={2.2} />
      </span>
      <span className="stat__value">
        {formatValue(value)}
        {stat.suffix}
      </span>
      <span className="stat__label">{stat.label}</span>
    </div>
  );
}

function StatsSection() {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats" ref={ref} aria-label="Platform statistics">
      <div className="container stats__inner">
        {STATS.map((stat) => (
          <StatItem key={stat.label} stat={stat} active={active} />
        ))}
      </div>
    </section>
  );
}

export default StatsSection;
