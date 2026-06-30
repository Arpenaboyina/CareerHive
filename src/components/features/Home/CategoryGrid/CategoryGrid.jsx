import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Server,
  Layers,
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import { getCategoryCounts } from "../../../../data/jobsData";
import "./CategoryGrid.css";

const ICON_MAP = {
  Layout,
  Server,
  Layers,
  Smartphone,
  Cloud,
  BrainCircuit,
  ShieldCheck,
  BadgeCheck,
};

function CategoryGrid() {
  const navigate = useNavigate();
  const categories = getCategoryCounts();

  const goToCategory = (id) => {
    navigate(`/jobs?category=${id}`);
  };

  return (
    <section className="section category-section" aria-label="Browse by category">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Explore</span>
          <h2 className="section-title">Browse jobs by category</h2>
          <p className="section-subtitle">
            Find the perfect role across every software engineering discipline.
          </p>
        </div>

        <div className="category-grid">
          {categories.map((cat, i) => {
            const Icon = ICON_MAP[cat.icon] || Layout;
            return (
              <button
                key={cat.id}
                type="button"
                className="category-card"
                style={{ animationDelay: `${i * 50}ms` }}
                onClick={() => goToCategory(cat.id)}
                aria-label={`Browse ${cat.label} jobs (${cat.count} open)`}
              >
                <span className="category-card__icon" aria-hidden="true">
                  <Icon size={26} strokeWidth={2} />
                </span>
                <span className="category-card__body">
                  <span className="category-card__title">{cat.label}</span>
                  <span className="category-card__count">
                    {cat.count} open role{cat.count === 1 ? "" : "s"}
                  </span>
                </span>
                <ArrowRight
                  size={18}
                  strokeWidth={2.4}
                  className="category-card__arrow"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CategoryGrid;
