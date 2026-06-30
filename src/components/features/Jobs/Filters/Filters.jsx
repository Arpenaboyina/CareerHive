import React from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import {
  JOB_TYPES,
  WORK_MODES,
  EXPERIENCE_LEVELS,
  CATEGORIES,
} from "../../../../data/jobsData";
import "./Filters.css";

const GROUPS = [
  { key: "types", title: "Job Type", options: JOB_TYPES },
  { key: "modes", title: "Work Mode", options: WORK_MODES },
  { key: "levels", title: "Experience Level", options: EXPERIENCE_LEVELS },
];

const SALARY_STEPS = [
  { value: 0, label: "Any" },
  { value: 80000, label: "$80k+" },
  { value: 120000, label: "$120k+" },
  { value: 150000, label: "$150k+" },
  { value: 200000, label: "$200k+" },
];

/**
 * Filters
 * @param {object}   filters       { types:[], modes:[], levels:[], categories:[], minSalary:number }
 * @param {Function} onToggle      (groupKey, value) => void
 * @param {Function} onSalaryChange (number) => void
 * @param {Function} onReset       () => void
 * @param {number}   resultCount
 */
function Filters({ filters, onToggle, onSalaryChange, onReset, resultCount }) {
  const activeCount =
    filters.types.length +
    filters.modes.length +
    filters.levels.length +
    filters.categories.length +
    (filters.minSalary > 0 ? 1 : 0);

  return (
    <aside className="filters card" aria-label="Job filters">
      <header className="filters__head">
        <h2 className="filters__title">
          <SlidersHorizontal size={18} strokeWidth={2.4} />
          Filters
          {activeCount > 0 && (
            <span className="filters__count">{activeCount}</span>
          )}
        </h2>
        <button
          type="button"
          className="filters__reset"
          onClick={onReset}
          disabled={activeCount === 0}
        >
          <RotateCcw size={14} strokeWidth={2.4} />
          Reset
        </button>
      </header>

      {typeof resultCount === "number" && (
        <p className="filters__results">
          <strong>{resultCount}</strong> job{resultCount === 1 ? "" : "s"} found
        </p>
      )}

      <fieldset className="filters__group">
        <legend className="filters__group-title">Category</legend>
        <div className="filters__options">
          {CATEGORIES.map((cat) => (
            <label key={cat.id} className="filters__option">
              <input
                type="checkbox"
                checked={filters.categories.includes(cat.id)}
                onChange={() => onToggle("categories", cat.id)}
              />
              <span className="filters__checkbox" aria-hidden="true" />
              <span className="filters__label">{cat.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {GROUPS.map((group) => (
        <fieldset key={group.key} className="filters__group">
          <legend className="filters__group-title">{group.title}</legend>
          <div className="filters__options">
            {group.options.map((opt) => (
              <label key={opt} className="filters__option">
                <input
                  type="checkbox"
                  checked={filters[group.key].includes(opt)}
                  onChange={() => onToggle(group.key, opt)}
                />
                <span className="filters__checkbox" aria-hidden="true" />
                <span className="filters__label">{opt}</span>
              </label>
            ))}
          </div>
        </fieldset>
      ))}

      <fieldset className="filters__group">
        <legend className="filters__group-title">Minimum Salary</legend>
        <input
          type="range"
          className="filters__range"
          min={0}
          max={SALARY_STEPS.length - 1}
          step={1}
          value={SALARY_STEPS.findIndex((s) => s.value === filters.minSalary)}
          onChange={(e) =>
            onSalaryChange(SALARY_STEPS[Number(e.target.value)].value)
          }
          aria-label="Minimum salary"
        />
        <div className="filters__range-labels">
          {SALARY_STEPS.map((s) => (
            <span
              key={s.value}
              className={
                filters.minSalary === s.value
                  ? "filters__range-label filters__range-label--active"
                  : "filters__range-label"
              }
            >
              {s.label}
            </span>
          ))}
        </div>
      </fieldset>
    </aside>
  );
}

export default Filters;
