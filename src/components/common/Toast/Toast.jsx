import React from "react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from "lucide-react";
import { useApp } from "../../../context/AppContext";
import "./Toast.css";

const ICONS = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

function Toast() {
  const { toast, dismissToast } = useApp();

  if (!toast) return null;

  const Icon = ICONS[toast.type] || Info;

  return (
    <div
      className="toast-region"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div
        key={toast.id}
        className={`toast toast--${toast.type}`}
      >
        <span className="toast__icon" aria-hidden="true">
          <Icon size={20} strokeWidth={2.4} />
        </span>
        <p className="toast__message">{toast.message}</p>
        <button
          type="button"
          className="toast__close"
          onClick={dismissToast}
          aria-label="Dismiss notification"
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

export default Toast;
