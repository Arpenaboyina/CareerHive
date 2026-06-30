import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Briefcase,
  Clock,
  Heart,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { useApp } from "../../../../context/AppContext";
import { getCategoryLabel } from "../../../../data/jobsData";
import "./JobCard.css";

/* ---- Shared formatting helpers (reused across the app) ---- */
export function formatSalary(job) {
  const fmt = (n) =>
    n >= 1000 ? `$${Math.round(n / 1000)}k` : `$${n.toLocaleString()}`;
  const unit = job.salaryUnit === "month" ? "/mo" : "/yr";
  return `${fmt(job.salaryMin)} – ${fmt(job.salaryMax)} ${unit}`;
}

export function timeAgo(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const day = 24 * 60 * 60 * 1000;
  const days = Math.floor(diff / day);
  if (days <= 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return "1 week ago";
  return `${weeks} weeks ago`;
}

function JobCard({ job, style }) {
  const { isFavorite, toggleFavorite } = useApp();
  const saved = isFavorite(job.id);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(job.id, job.title);
  };

  return (
    <article className="job-card" style={style}>
      <Link
        to={`/jobs/${job.id}`}
        className="job-card__link"
        aria-label={`${job.title} at ${job.company}`}
      >
        <header className="job-card__head">
          <span
            className="job-card__logo"
            style={{ backgroundColor: job.logoColor }}
            aria-hidden="true"
          >
            {job.logoInitials}
          </span>
          <div className="job-card__heading">
            <h3 className="job-card__title">{job.title}</h3>
            <p className="job-card__company">{job.company}</p>
          </div>
          <button
            type="button"
            className={`job-card__save ${saved ? "job-card__save--active" : ""}`}
            onClick={handleSave}
            aria-pressed={saved}
            aria-label={saved ? "Remove from saved" : "Save job"}
            title={saved ? "Remove from saved" : "Save job"}
          >
            <Heart size={18} strokeWidth={2.2} fill={saved ? "currentColor" : "none"} />
          </button>
        </header>

        {job.featured && (
          <span className="job-card__featured">
            <Sparkles size={12} strokeWidth={2.5} />
            Featured
          </span>
        )}

        <p className="job-card__summary">{job.summary}</p>

        <ul className="job-card__meta">
          <li>
            <MapPin size={14} strokeWidth={2} />
            {job.location}
          </li>
          <li>
            <Briefcase size={14} strokeWidth={2} />
            {job.type}
          </li>
          <li>
            <Clock size={14} strokeWidth={2} />
            {job.workMode}
          </li>
        </ul>

        <ul className="job-card__skills">
          <li className="job-card__chip job-card__chip--cat">
            {getCategoryLabel(job.category)}
          </li>
          {job.skills.slice(0, 3).map((skill) => (
            <li key={skill} className="job-card__chip">
              {skill}
            </li>
          ))}
          {job.skills.length > 3 && (
            <li className="job-card__chip job-card__chip--more">
              +{job.skills.length - 3}
            </li>
          )}
        </ul>

        <footer className="job-card__foot">
          <div className="job-card__foot-info">
            <span className="job-card__salary">{formatSalary(job)}</span>
            <span className="job-card__posted">{timeAgo(job.postedAt)}</span>
          </div>
          <span className="job-card__view">
            View
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </span>
        </footer>
      </Link>
    </article>
  );
}

export default JobCard;
