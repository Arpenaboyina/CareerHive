import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, TrendingUp, Building2, Zap } from "lucide-react";
import SearchBar from "../../Jobs/SearchBar/SearchBar";
import "./Hero.css";

const POPULAR = ["Frontend", "React", "Remote", "Senior", "Python"];

function Hero() {
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const runSearch = (term) => {
    const params = new URLSearchParams();
    const q = term ?? keyword;
    if (q) params.set("q", q);
    if (location) params.set("location", location);
    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <section className="hero">
      <div className="hero__glow hero__glow--1" aria-hidden="true" />
      <div className="hero__glow hero__glow--2" aria-hidden="true" />
      <div className="hero__grid-pattern" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="hero__badge">
          <Sparkles size={14} strokeWidth={2.5} />
          2,400+ engineering roles, updated daily
        </span>

        <h1 className="hero__title">
          Find your next
          <span className="hero__title-grad"> engineering role</span>
          <br />
          at a company you love.
        </h1>

        <p className="hero__subtitle">
          CareerHive connects software engineers with world-class companies.
          Search curated roles, filter by what matters, and apply in one click.
        </p>

        <div className="hero__search">
          <SearchBar
            keyword={keyword}
            onKeywordChange={setKeyword}
            location={location}
            onLocationChange={setLocation}
            onSubmit={() => runSearch()}
          />
        </div>

        <div className="hero__popular">
          <span className="hero__popular-label">Popular:</span>
          <ul className="hero__popular-tags">
            {POPULAR.map((tag) => (
              <li key={tag}>
                <button
                  type="button"
                  className="hero__tag"
                  onClick={() => runSearch(tag)}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="hero__highlights">
          <li>
            <TrendingUp size={18} strokeWidth={2.2} />
            Trending roles weekly
          </li>
          <li>
            <Building2 size={18} strokeWidth={2.2} />
            120+ top companies
          </li>
          <li>
            <Zap size={18} strokeWidth={2.2} />
            One-click apply
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Hero;
