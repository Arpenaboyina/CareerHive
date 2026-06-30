import React from "react";
import "./LoadingSpinner.css";

/**
 * LoadingSpinner
 * @param {("sm"|"md"|"lg")} size      visual size of the spinner
 * @param {boolean}          fullPage  center within a tall flex container
 * @param {string}           label     accessible loading label
 */
function LoadingSpinner({ size = "md", fullPage = false, label = "Loading" }) {
  return (
    <div
      className={`spinner-wrap ${fullPage ? "spinner-wrap--full" : ""}`}
      role="status"
      aria-live="polite"
    >
      <span className={`spinner spinner--${size}`} aria-hidden="true" />
      <span className="sr-only">{label}…</span>
      {fullPage && <span className="spinner__label">{label}…</span>}
    </div>
  );
}

export default LoadingSpinner;
