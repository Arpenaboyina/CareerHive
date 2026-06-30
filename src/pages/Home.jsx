import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import Hero from "../components/features/Home/Hero/Hero";
import StatsSection from "../components/features/Home/StatsSection/StatsSection";
import CategoryGrid from "../components/features/Home/CategoryGrid/CategoryGrid";
import Testimonials from "../components/features/Home/Testimonials/Testimonials";
import Newsletter from "../components/features/Home/Newsletter/Newsletter";
import JobCard from "../components/features/Jobs/JobCard/JobCard";

import { jobs } from "../data/jobsData";
import "./Home.css";

function Home() {
  const featured = jobs.filter((job) => job.featured).slice(0, 6);

  return (
    <div className="home">
      <Hero />
      <StatsSection />

      <section className="section home-featured" aria-label="Featured jobs">
        <div className="container">
          <div className="home-featured__head">
            <div>
              <span className="section-eyebrow">Hand-picked</span>
              <h2 className="section-title">Featured opportunities</h2>
            </div>
            <Link to="/jobs" className="home-featured__all">
              View all jobs
              <ArrowRight size={18} strokeWidth={2.4} />
            </Link>
          </div>

          <div className="home-featured__grid">
            {featured.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      <CategoryGrid />
      <Testimonials />
      <Newsletter />
    </div>
  );
}

export default Home;
