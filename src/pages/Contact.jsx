import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Send,
  MessageSquare,
  Clock,
} from "lucide-react";
import { useApp } from "../context/AppContext";
import "./Contact.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email us",
    value: "hello@careerhive.dev",
    href: "mailto:hello@careerhive.dev",
  },
  {
    icon: Phone,
    label: "Call us",
    value: "+1 (555) 012-3456",
    href: "tel:+15550123456",
  },
  {
    icon: MapPin,
    label: "Visit us",
    value: "548 Market St, San Francisco, CA",
    href: null,
  },
  {
    icon: Clock,
    label: "Support hours",
    value: "Mon–Fri, 9am–6pm PT",
    href: null,
  },
];

const SUBJECTS = [
  "General inquiry",
  "Posting a job",
  "Partnership",
  "Technical support",
  "Feedback",
];

function Contact() {
  const { showToast } = useApp();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!EMAIL_RE.test(form.email))
      next.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10)
      next.message = "Message should be at least 10 characters.";
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    if (Object.keys(next).length > 0) {
      setErrors(next);
      showToast("Please fix the errors in the form.", "error");
      return;
    }
    setSent(true);
    showToast("Message sent! We'll reply within one business day.", "success");
    setForm({ name: "", email: "", subject: SUBJECTS[0], message: "" });
  };

  return (
    <div className="contact">
      <section className="contact__hero">
        <div className="container">
          <span className="section-eyebrow">
            <MessageSquare size={14} strokeWidth={2.5} />
            Get in touch
          </span>
          <h1 className="contact__title">We'd love to hear from you</h1>
          <p className="contact__lead">
            Questions, feedback, or partnership ideas? Send us a note and our
            team will get back to you shortly.
          </p>
        </div>
      </section>

      <section className="section contact__body">
        <div className="container contact__grid">
          <aside className="contact__info">
            <h2 className="contact__info-title">Contact information</h2>
            <p className="contact__info-text">
              Reach us through any of the channels below — we read every message.
            </p>
            <ul className="contact__info-list">
              {CONTACT_INFO.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="contact__info-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={2.2} />
                    </span>
                    <span>
                      <span className="contact__info-label">{item.label}</span>
                      <span className="contact__info-value">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a href={item.href} className="contact__info-item">
                        {content}
                      </a>
                    ) : (
                      <div className="contact__info-item">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="contact__form-wrap card">
            {sent ? (
              <div className="contact__success" role="status">
                <span className="contact__success-icon" aria-hidden="true">
                  <Send size={28} strokeWidth={2.2} />
                </span>
                <h2>Thanks for reaching out!</h2>
                <p>
                  Your message is on its way. We'll get back to you within one
                  business day.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSent(false)}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit} noValidate>
                <div className="contact__row">
                  <div className="contact__field">
                    <label htmlFor="name">Full name</label>
                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Jane Doe"
                      aria-invalid={!!errors.name}
                      className={errors.name ? "contact__input--error" : ""}
                    />
                    {errors.name && (
                      <span className="contact__error">{errors.name}</span>
                    )}
                  </div>
                  <div className="contact__field">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="jane@example.com"
                      aria-invalid={!!errors.email}
                      className={errors.email ? "contact__input--error" : ""}
                    />
                    {errors.email && (
                      <span className="contact__error">{errors.email}</span>
                    )}
                  </div>
                </div>

                <div className="contact__field">
                  <label htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    value={form.subject}
                    onChange={update("subject")}
                  >
                    {SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="contact__field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us how we can help…"
                    aria-invalid={!!errors.message}
                    className={errors.message ? "contact__input--error" : ""}
                  />
                  {errors.message && (
                    <span className="contact__error">{errors.message}</span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-lg">
                  <Send size={18} strokeWidth={2.4} />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
