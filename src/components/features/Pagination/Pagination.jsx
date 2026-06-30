import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

/**
 * Build a compact list of page tokens with ellipses.
 * e.g. 1 … 4 5 [6] 7 8 … 12
 */
function buildPages(current, total) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages = new Set([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);

  const result = [];
  let prev = 0;
  for (const p of sorted) {
    if (p - prev > 1) result.push("…");
    result.push(p);
    prev = p;
  }
  return result;
}

/**
 * Pagination
 * @param {number}   currentPage
 * @param {number}   totalPages
 * @param {Function} onPageChange
 */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = buildPages(currentPage, totalPages);

  const go = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => go(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} strokeWidth={2.4} />
        <span className="pagination__nav-text">Prev</span>
      </button>

      <ul className="pagination__list">
        {pages.map((page, i) =>
          page === "…" ? (
            <li key={`ellipsis-${i}`} className="pagination__ellipsis" aria-hidden="true">
              …
            </li>
          ) : (
            <li key={page}>
              <button
                type="button"
                className={`pagination__btn ${
                  page === currentPage ? "pagination__btn--active" : ""
                }`}
                onClick={() => go(page)}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
              >
                {page}
              </button>
            </li>
          )
        )}
      </ul>

      <button
        type="button"
        className="pagination__btn pagination__btn--nav"
        onClick={() => go(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <span className="pagination__nav-text">Next</span>
        <ChevronRight size={18} strokeWidth={2.4} />
      </button>
    </nav>
  );
}

export default Pagination;
