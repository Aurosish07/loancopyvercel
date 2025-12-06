// src/pages/Product.js
import React, { useState, useRef } from "react";
import { loanOffers } from "../data/MockData";
import FinancialProducts from "../components/FinancialProducts";
import "./product.css";
import LoanForm from "../components/LoanForm";

const Product = () => {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const loanFormRef = useRef(null);

  const handleApplyClick = (loanProduct) => {
    const loanTypeMap = {
      "Personal Loan": "personal",
      "Home Loan": "home",
      "Business Loan": "business",
      "Mortgage Loan": "mortgage",
      "OD Loan": "od",
      "CC Limit Loan": "cc"
    };

    setSelectedLoanType(
      loanTypeMap[loanProduct.name] || loanProduct.name.toLowerCase()
    );

    if (loanFormRef.current) {
      loanFormRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="home-appx">
      {/* Hero Section with prod-hero prefix */}
      <section className="prod-hero-section">
        <div className="prod-hero-content">
          <h1 className="prod-hero-title">Our Loan Products</h1>
          <p className="prod-hero-description">
            Find the perfect financing solution for your needs with our
            competitive rates and flexible terms
          </p>
          <div className="prod-hero-features">
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">Lowest Interest Rates</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">Quick Approval</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">Flexible Repayment</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">100% Paperless Process</span>
            </div>
          </div>
          
        </div>
        <div className="prod-hero-image">
          <div className="prod-image-placeholder">
            <div className="prod-floating-card prod-card1">
              <span className="prod-card-title">Personal Loan</span>
              <span className="prod-card-rate">10.5% ROI</span>
            </div>
            <div className="prod-floating-card prod-card2">
              <span className="prod-card-title">Home Loan</span>
              <span className="prod-card-rate">8.4% ROI</span>
            </div>
            <div className="prod-floating-card prod-card3">
              <span className="prod-card-title">Business Loan</span>
              <span className="prod-card-rate">12% ROI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Financial Products Section */}
      <FinancialProducts
        loanOffers={loanOffers}
        onApplyClick={handleApplyClick}
      />

      {/* Loan Form Section with ref for scrolling */}
      <div ref={loanFormRef}>
        <LoanForm preSelectedLoanType={selectedLoanType} />
      </div>
    </div>
  );
};

export default Product;
