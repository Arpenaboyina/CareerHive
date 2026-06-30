import React, { useState } from "react";
import { Mail, Send, CheckCircle2 } from "lucide-react";
import { useApp } from "../../../../context/AppContext";
import "./Newsletter.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { showToast } = useApp();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setSubmitted(true);
    showToast("You're subscribed! Watch your inbox for fresh roles.", "success");
    setEmail("");
  };

  return (
    <section className="section newsletter" aria-label="Newsletter signup">
      <div className="container">
        <div className="newsletter__card">
          <div className="newsletter__glow" aria-hidden="true" />
          <div className="newsletter__content">
            <span className="newsletter__icon" aria-hidden="true">
              <Mail size={28} strokeWidth={2.2} />
            </span>
            <h2 className="newsletter__title">
              Get the best roles in your inbox
            </h2>
            <p className="newsletter__subtitle">
              Join 58,000+ engineers. A weekly digest of hand-picked roles —
              no spam, unsubscribe anytime.
            </p>

            {submitted ? (
              <div className="newsletter__success" role="status">
                <CheckCircle2 size={20} strokeWidth={2.4} />
                Thanks for subscribing! Check your inbox to confirm.
              </div>
            ) : (
              <form className="newsletter__form" onSubmit={handleSubmit}>
                <div className="newsletter__field">
                  <Mail
                    size={18}
                    className="newsletter__field-icon"
                    aria-hidden="true"
                  />
                  <input
                    type="email"
                    className="newsletter__input"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-label="Email address"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg">
                  <Send size={18} strokeWidth={2.4} />
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
