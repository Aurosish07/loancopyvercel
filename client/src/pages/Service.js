// src/pages/Service.js
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { loanOffers } from "../data/MockData";
import { loanServices } from "../data/MockData";
import FinancialServices from "../components/FinancialServices";
import "./product.css";
import LoanForm from "../components/LoanForm";

const Services = () => {
  const [selectedLoanType, setSelectedLoanType] = useState("");
  const loanFormRef = useRef(null);
   const [selectedOffer, setSelectedOffer] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    
   

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
   const handleServiceApplyClick = (offer) => {
    setSelectedOffer(offer);
    setShowPopup(true);
  };

  return (
    <div className="home-appx">
      {/* Hero Section for Services */}
      <section className="prod-hero-section">
        <div className="prod-hero-content">
          <h1 className="prod-hero-title">Comprehensive Financial Services</h1>
          <p className="prod-hero-description">
            From loans to investments, insurance to wealth management - we offer 
            end-to-end financial solutions to help you achieve your goals
          </p>
          <div className="prod-hero-features">
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">ITR Filing</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">GST Registration</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">UDYAM Registration</span>
            </div>
            <div className="prod-hero-feature-item">
              <span className="prod-hero-feature-icon">✓</span>
              <span className="prod-hero-feature-text">Balance Sheet Service</span>
            </div>
          </div>
          
          
        </div>
        <div className="prod-hero-image">
          <div className="prod-image-placeholder">
            <div className="prod-floating-card prod-card1">
              <span className="prod-card-title">Loans</span>
              <span className="prod-card-rate">10+ Types</span>
            </div>
            <div className="prod-floating-card prod-card2">
              <span className="prod-card-title">Investments</span>
              <span className="prod-card-rate">High Returns</span>
            </div>
            <div className="prod-floating-card prod-card3">
              <span className="prod-card-title">Insurance</span>
              <span className="prod-card-rate">Full Coverage</span>
            </div>
          </div>
        </div>
      </section>


      {/* Other Sections */}
      <FinancialServices
        loanServices={loanServices}
        onApplyClick={handleServiceApplyClick}
      />
      {/* Loan Form Section with ref for scrolling */}
      <div ref={loanFormRef}>
        <LoanForm preSelectedLoanType={selectedLoanType} />
      </div>
    </div>
  );
};

export default Services;
