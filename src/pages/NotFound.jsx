import React from "react";
import { Link } from "react-router-dom";
import { Home, Search, Compass } from "lucide-react";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="notfound">
      <div className="container notfound__inner">
        <div className="notfound__glow" aria-hidden="true" />
        <span className="notfound__icon" aria-hidden="true">
          <Compass size={42} strokeWidth={1.8} />
        </span>
        <p className="notfound__code">404</p>
        <h1 className="notfound__title">This page wandered off</h1>
        <p className="notfound__text">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>
        <div className="notfound__actions">
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} strokeWidth={2.4} />
            Back home
          </Link>
          <Link to="/jobs" className="btn btn-secondary btn-lg">
            <Search size={18} strokeWidth={2.4} />
            Browse jobs
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
