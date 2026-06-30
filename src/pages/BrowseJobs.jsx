import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X, Heart } from "lucide-react";

import SearchBar from "../components/features/Jobs/SearchBar/SearchBar";
import Filters from "../components/features/Jobs/Filters/Filters";
import JobCard from "../components/features/Jobs/JobCard/JobCard";
import Pagination from "../components/features/Pagination/Pagination";
import SkeletonLoader from "../components/fallback/SkeletonLoader/SkeletonLoader";
import EmptyState from "../components/fallback/EmptyState/EmptyState";

import { jobs } from "../data/jobsData";
import { useApp } from "../context/AppContext";
import "./BrowseJobs.css";

const PAGE_SIZE = 9;

const SORT_OPTIONS = [
  { value: "relevant", label: "Most relevant" },
  { value: "newest", label: "Newest first" },
  { value: "salary-high", label: "Salary: high to low" },
  { value: "salary-low", label: "Salary: low to high" },
];

const EMPTY_FILTERS = {
  types: [],
  modes: [],
  levels: [],
  categories: [],
  minSalary: 0,
};

function BrowseJobs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { favorites } = useApp();

  const [keyword, setKeyword] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [filters, setFilters] = useState(() => ({
    ...EMPTY_FILTERS,
    categories: searchParams.get("category")
      ? [searchParams.get("category")]
      : [],
  }));
  const [sort, setSort] = useState("relevant");
  const [onlySaved, setOnlySaved] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Simulate an async fetch so skeleton states are exercised.
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  // Keep URL query params in sync with the primary search inputs.
  useEffect(() => {
    const params = {};
    if (keyword) params.q = keyword;
    if (location) params.location = location;
    if (filters.categories.length === 1) params.category = filters.categories[0];
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, location, filters.categories]);

  // Reset to first page whenever the result set changes.
  useEffect(() => {
    setPage(1);
  }, [keyword, location, filters, sort, onlySaved]);

  const toggleFilter = (group, value) => {
    setFilters((prev) => {
      const list = prev[group];
      const next = list.includes(value)
        ? list.filter((v) => v !== value)
        : [...list, value];
      return { ...prev, [group]: next };
    });
  };

  const setSalary = (minSalary) => {
    setFilters((prev) => ({ ...prev, minSalary }));
  };

  const resetFilters = () => {
    setFilters(EMPTY_FILTERS);
    setKeyword("");
    setLocation("");
    setOnlySaved(false);
  };

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    const loc = location.trim().toLowerCase();

    let list = jobs.filter((job) => {
      if (onlySaved && !favorites.includes(job.id)) return false;

      if (kw) {
        const haystack = [
          job.title,
          job.company,
          job.summary,
          ...job.skills,
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(kw)) return false;
      }

      if (loc && !job.location.toLowerCase().includes(loc)) return false;

      if (filters.types.length && !filters.types.includes(job.type))
        return false;
      if (filters.modes.length && !filters.modes.includes(job.workMode))
        return false;
      if (filters.levels.length && !filters.levels.includes(job.experienceLevel))
        return false;
      if (
        filters.categories.length &&
        !filters.categories.includes(job.category)
      )
        return false;
      if (filters.minSalary > 0 && job.salaryMax < filters.minSalary)
        return false;

      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return new Date(b.postedAt) - new Date(a.postedAt);
        case "salary-high":
          return b.salaryMax - a.salaryMax;
        case "salary-low":
          return a.salaryMin - b.salaryMin;
        default:
          // "relevant" — featured first, then newest.
          if (a.featured !== b.featured) return a.featured ? -1 : 1;
          return new Date(b.postedAt) - new Date(a.postedAt);
      }
    });

    return list;
  }, [keyword, location, filters, sort, onlySaved, favorites]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="browse">
      <div className="browse__header">
        <div className="container">
          <h1 className="browse__title">Browse Jobs</h1>
          <p className="browse__lead">
            Explore {jobs.length} curated software engineering roles.
          </p>
          <div className="browse__search">
            <SearchBar
              keyword={keyword}
              onKeywordChange={setKeyword}
              location={location}
              onLocationChange={setLocation}
            />
          </div>
        </div>
      </div>

      <div className="container browse__body">
        {/* Mobile filter trigger */}
        <div className="browse__mobile-bar">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal size={18} strokeWidth={2.2} />
            Filters
          </button>
          <span className="browse__mobile-count">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </span>
        </div>

        {/* Sidebar (desktop) + mobile drawer */}
        <div
          className={`browse__sidebar ${
            mobileFiltersOpen ? "browse__sidebar--open" : ""
          }`}
        >
          <div className="browse__sidebar-head">
            <span>Filters</span>
            <button
              type="button"
              className="browse__sidebar-close"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            >
              <X size={22} />
            </button>
          </div>
          <Filters
            filters={filters}
            onToggle={toggleFilter}
            onSalaryChange={setSalary}
            onReset={resetFilters}
            resultCount={filtered.length}
          />
        </div>
        {mobileFiltersOpen && (
          <div
            className="browse__scrim"
            onClick={() => setMobileFiltersOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main results */}
        <div className="browse__main">
          <div className="browse__toolbar">
            <p className="browse__result-count">
              <strong>{filtered.length}</strong> job
              {filtered.length === 1 ? "" : "s"} found
            </p>
            <div className="browse__toolbar-actions">
              <button
                type="button"
                className={`browse__saved-toggle ${
                  onlySaved ? "browse__saved-toggle--active" : ""
                }`}
                onClick={() => setOnlySaved((v) => !v)}
                aria-pressed={onlySaved}
              >
                <Heart
                  size={16}
                  strokeWidth={2.2}
                  fill={onlySaved ? "currentColor" : "none"}
                />
                Saved
                {favorites.length > 0 && (
                  <span className="browse__saved-badge">{favorites.length}</span>
                )}
              </button>
              <label className="browse__sort">
                <span className="sr-only">Sort jobs by</span>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort jobs"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {loading ? (
            <SkeletonLoader count={6} />
          ) : filtered.length === 0 ? (
            <EmptyState
              title="No jobs match your search"
              message="Try removing some filters or searching with different keywords."
              action={
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={resetFilters}
                >
                  Clear all filters
                </button>
              }
            />
          ) : (
            <>
              <div className="browse__grid">
                {pageItems.map((job, i) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    style={{ animationDelay: `${i * 40}ms` }}
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default BrowseJobs;
