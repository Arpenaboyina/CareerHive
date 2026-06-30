import React from "react";
import { Quote, Star } from "lucide-react";
import "./Testimonials.css";

const TESTIMONIALS = [
  {
    quote:
      "CareerHive cut my job search from months to two weeks. The filters are spot-on and every role felt relevant to my experience.",
    name: "Aisha Khan",
    role: "Senior Frontend Engineer",
    company: "now at Nebula Labs",
    color: "#6366f1",
  },
  {
    quote:
      "I love that it's built for engineers. No noise, no spam — just great backend roles with transparent salaries.",
    name: "Marcus Lee",
    role: "Backend Engineer",
    company: "now at Streamline",
    color: "#14b8a6",
  },
  {
    quote:
      "The one-click apply and saved jobs made everything effortless. I landed a remote role that pays 30% more.",
    name: "Sofia Romero",
    role: "Full Stack Developer",
    company: "now at Brightwave",
    color: "#f59e0b",
  },
];

function Testimonials() {
  return (
    <section className="section testimonials" aria-label="What engineers say">
      <div className="container">
        <div className="section-head">
          <span className="section-eyebrow">Loved by engineers</span>
          <h2 className="section-title">Don't just take our word for it</h2>
          <p className="section-subtitle">
            Thousands of engineers have found roles they love through CareerHive.
          </p>
        </div>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="testimonial"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <Quote
                className="testimonial__mark"
                size={36}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="testimonial__stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="testimonial__quote">{t.quote}</blockquote>
              <figcaption className="testimonial__author">
                <span
                  className="testimonial__avatar"
                  style={{ backgroundColor: t.color }}
                  aria-hidden="true"
                >
                  {t.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span className="testimonial__meta">
                  <span className="testimonial__name">{t.name}</span>
                  <span className="testimonial__role">
                    {t.role} · {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
