import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar/Navbar";
import Footer from "./components/common/Footer/Footer";
import Toast from "./components/common/Toast/Toast";
import ScrollToTop from "./components/common/ScrollToTop/ScrollToTop";
import LoadingSpinner from "./components/fallback/LoadingSpinner/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const BrowseJobs = lazy(() => import("./pages/BrowseJobs"));
const JobDetails = lazy(() => import("./pages/JobDetails"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="page">
        <Suspense fallback={<LoadingSpinner fullPage label="Loading page" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<BrowseJobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <Toast />
    </>
  );
}

export default App;
