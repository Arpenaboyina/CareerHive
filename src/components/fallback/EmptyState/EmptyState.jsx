import React from "react";
import { SearchX } from "lucide-react";
import "./EmptyState.css";

/**
 * EmptyState
 * @param {React.ComponentType} icon    lucide icon component
 * @param {string} title                headline
 * @param {string} message              supporting copy
 * @param {React.ReactNode} action      optional CTA element
 */
function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing here yet",
  message = "Try adjusting your search or filters.",
  action = null,
}) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state__icon" aria-hidden="true">
        <Icon size={40} strokeWidth={1.8} />
      </span>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__message">{message}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

export default EmptyState;
