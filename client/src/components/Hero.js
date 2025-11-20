// src/components/Hero.js
import React from "react";
import "./Hero.css";
import { FaArrowRight } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-bg-wrapper">
        <div className="hero-content">
          <div className="hero-bg-slider">
            <div className="hero-bg-slide"></div>
            <div className="hero-bg-slide"></div>
            <div className="hero-bg-slide"></div>
          </div>

          <div className="hero-overlay-content">

          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
