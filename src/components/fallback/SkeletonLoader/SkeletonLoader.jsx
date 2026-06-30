import React from "react";
import "./SkeletonLoader.css";

/**
 * Skeleton — a single shimmering placeholder block.
 */
export function Skeleton({ width, height, radius, className = "", style }) {
  return (
    <span
      className={`skeleton ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

/**
 * JobCardSkeleton — mirrors the JobCard layout for loading states.
 */
export function JobCardSkeleton() {
  return (
    <div className="skeleton-card" aria-hidden="true">
      <div className="skeleton-card__head">
        <Skeleton width="52px" height="52px" radius="14px" />
        <div className="skeleton-card__head-text">
          <Skeleton width="65%" height="18px" />
          <Skeleton width="40%" height="14px" />
        </div>
      </div>
      <Skeleton width="100%" height="14px" />
      <Skeleton width="85%" height="14px" />
      <div className="skeleton-card__tags">
        <Skeleton width="70px" height="26px" radius="999px" />
        <Skeleton width="90px" height="26px" radius="999px" />
        <Skeleton width="60px" height="26px" radius="999px" />
      </div>
      <div className="skeleton-card__foot">
        <Skeleton width="120px" height="18px" />
        <Skeleton width="100px" height="38px" radius="12px" />
      </div>
    </div>
  );
}

/**
 * SkeletonLoader — renders a grid of JobCardSkeletons.
 */
function SkeletonLoader({ count = 6 }) {
  return (
    <div
      className="skeleton-grid"
      role="status"
      aria-live="polite"
      aria-label="Loading jobs"
    >
      {Array.from({ length: count }).map((_, i) => (
        <JobCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default SkeletonLoader;
