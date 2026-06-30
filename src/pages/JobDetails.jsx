import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  TrendingUp,
  Heart,
  Share2,
  Send,
  CheckCircle2,
  ArrowLeft,
  Building2,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import JobCard, {
  formatSalary,
  timeAgo,
} from "../components/features/Jobs/JobCard/JobCard";
import EmptyState from "../components/fallback/EmptyState/EmptyState";
import LoadingSpinner from "../components/fallback/LoadingSpinner/LoadingSpinner";

import { getJobById, jobs, getCategoryLabel } from "../data/jobsData";
import { useApp } from "../context/AppContext";
import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, addRecentlyViewed, showToast } = useApp();

  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);

  const job = getJobById(id);

  useEffect(() => {
    setLoading(true);
    setApplied(false);
    const timer = setTimeout(() => setLoading(false), 400);
    if (job) addRecentlyViewed(job.id);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const related = useMemo(() => {
    if (!job) return [];
    return jobs
      .filter((j) => j.id !== job.id && j.category === job.category)
      .slice(0, 3);
  }, [job]);

  if (loading) {
    return <LoadingSpinner fullPage label="Loading job" />;
  }

  if (!job) {
    return (
      <div className="container section">
        <EmptyState
          icon={Briefcase}
          title="Job not found"
          message="This role may have been filled or removed."
          action={
            <Link to="/jobs" className="btn btn-primary">
              Browse all jobs
            </Link>
          }
        />
      </div>
    );
  }

  const saved = isFavorite(job.id);

  const handleApply = () => {
    setApplied(true);
    showToast(`Application submitted for ${job.title}!`, "success");
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: job.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast("Link copied to clipboard.", "info");
      }
    } catch {
      showToast("Couldn't share this link.", "error");
    }
  };

  return (
    <div className="details">
      <div className="container">
        <button
          type="button"
          className="details__back"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
          Back
        </button>

        <div className="details__layout">
          {/* Main content */}
          <article className="details__main">
            <header className="details__head card">
              {job.featured && (
                <span className="details__featured">
                  <Sparkles size={13} strokeWidth={2.5} />
                  Featured role
                </span>
              )}
              <div className="details__head-top">
                <span
                  className="details__logo"
                  style={{ backgroundColor: job.logoColor }}
                  aria-hidden="true"
                >
                  {job.logoInitials}
                </span>
                <div className="details__head-text">
                  <h1 className="details__title">{job.title}</h1>
                  <p className="details__company">
                    <Building2 size={16} strokeWidth={2.2} />
                    {job.company}
                  </p>
                </div>
              </div>

              <ul className="details__meta">
                <li>
                  <MapPin size={16} strokeWidth={2.2} />
                  {job.location}
                </li>
                <li>
                  <Briefcase size={16} strokeWidth={2.2} />
                  {job.type}
                </li>
                <li>
                  <Clock size={16} strokeWidth={2.2} />
                  {job.workMode}
                </li>
                <li>
                  <TrendingUp size={16} strokeWidth={2.2} />
                  {job.experienceLevel} level
                </li>
                <li>
                  <CalendarDays size={16} strokeWidth={2.2} />
                  {timeAgo(job.postedAt)}
                </li>
              </ul>
            </header>

            <section className="details__section card">
              <h2 className="details__section-title">About the role</h2>
              <p className="details__summary">{job.summary}</p>

              <h3 className="details__sub">Responsibilities</h3>
              <ul className="details__list">
                {job.responsibilities.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} strokeWidth={2.2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="details__sub">Requirements</h3>
              <ul className="details__list">
                {job.requirements.map((item) => (
                  <li key={item}>
                    <CheckCircle2 size={18} strokeWidth={2.2} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="details__sub">Skills</h3>
              <ul className="details__skills">
                {job.skills.map((skill) => (
                  <li key={skill} className="details__skill">
                    {skill}
                  </li>
                ))}
              </ul>

              <h3 className="details__sub">Benefits &amp; perks</h3>
              <ul className="details__benefits">
                {job.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </section>
          </article>

          {/* Sticky sidebar */}
          <aside className="details__aside">
            <div className="details__apply card">
              <span className="details__salary-label">Salary range</span>
              <span className="details__salary">{formatSalary(job)}</span>

              <dl className="details__facts">
                <div>
                  <dt>Category</dt>
                  <dd>{getCategoryLabel(job.category)}</dd>
                </div>
                <div>
                  <dt>Experience</dt>
                  <dd>{job.experienceLevel}</dd>
                </div>
                <div>
                  <dt>Work mode</dt>
                  <dd>{job.workMode}</dd>
                </div>
                <div>
                  <dt>Type</dt>
                  <dd>{job.type}</dd>
                </div>
              </dl>

              <button
                type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={handleApply}
                disabled={applied}
              >
                {applied ? (
                  <>
                    <CheckCircle2 size={18} strokeWidth={2.4} />
                    Applied
                  </>
                ) : (
                  <>
                    <Send size={18} strokeWidth={2.4} />
                    Apply now
                  </>
                )}
              </button>

              <div className="details__apply-actions">
                <button
                  type="button"
                  className={`btn btn-secondary ${
                    saved ? "details__save--active" : ""
                  }`}
                  onClick={() => toggleFavorite(job.id, job.title)}
                  aria-pressed={saved}
                >
                  <Heart
                    size={18}
                    strokeWidth={2.2}
                    fill={saved ? "currentColor" : "none"}
                  />
                  {saved ? "Saved" : "Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleShare}
                >
                  <Share2 size={18} strokeWidth={2.2} />
                  Share
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Related jobs */}
        {related.length > 0 && (
          <section className="details__related">
            <h2 className="details__related-title">Similar roles</h2>
            <div className="details__related-grid">
              {related.map((rel) => (
                <JobCard key={rel.id} job={rel} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
