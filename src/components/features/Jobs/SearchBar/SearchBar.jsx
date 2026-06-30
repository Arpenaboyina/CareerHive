import React from "react";
import { Search, X, MapPin } from "lucide-react";
import "./SearchBar.css";

/**
 * SearchBar
 * Controlled search with an optional location field.
 * @param {string}   keyword
 * @param {Function} onKeywordChange
 * @param {string}   location
 * @param {Function} onLocationChange
 * @param {Function} onSubmit          optional submit handler
 * @param {boolean}  showLocation
 */
function SearchBar({
  keyword,
  onKeywordChange,
  location = "",
  onLocationChange,
  onSubmit,
  showLocation = true,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <form
      className={`search-bar ${showLocation ? "search-bar--split" : ""}`}
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="search-bar__field">
        <Search size={20} className="search-bar__icon" aria-hidden="true" />
        <input
          type="search"
          className="search-bar__input"
          placeholder="Job title, company, or skill…"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          aria-label="Search jobs by keyword"
        />
        {keyword && (
          <button
            type="button"
            className="search-bar__clear"
            onClick={() => onKeywordChange("")}
            aria-label="Clear search"
          >
            <X size={16} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {showLocation && (
        <div className="search-bar__field search-bar__field--location">
          <MapPin size={20} className="search-bar__icon" aria-hidden="true" />
          <input
            type="text"
            className="search-bar__input"
            placeholder="Location"
            value={location}
            onChange={(e) => onLocationChange && onLocationChange(e.target.value)}
            aria-label="Filter jobs by location"
          />
        </div>
      )}

      <button type="submit" className="btn btn-primary search-bar__submit">
        <Search size={18} strokeWidth={2.5} />
        <span>Search</span>
      </button>
    </form>
  );
}

export default SearchBar;
