import React, { useState, useEffect } from "react";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import "./FinancialProducts.css";

// Import your images
import personalLoanImage from "../assets/images/personal-loan.jpg";
import homeLoanImage from "../assets/images/home-loan.jpg";
import businessLoanImage from "../assets/images/business-loan.jpg";
import mortageLoanImage from "../assets/images/mortage-loan.png";
import odLoanImage from "../assets/images/od-loan.jpg";
import ccLoanImage from "../assets/images/cc-loan.jpg";

// Import the actual LoanForm component
import LoanForm from "./LoanForm";

// Fallback images
const fallbackImages = {
  "Personal Loan": "https://via.placeholder.com/100/667eea/ffffff?text=PL",
  "Home Loan": "https://via.placeholder.com/100/f093fb/ffffff?text=HL",
  "Business Loan": "https://via.placeholder.com/100/43e97b/ffffff?text=BL",
  "Mortage Loan": "https://via.placeholder.com/100/4facfe/ffffff?text=ML",
  "OD Loan": "https://via.placeholder.com/100/fa709a/ffffff?text=OD",
  "CC Limit Loan": "https://via.placeholder.com/100/667eea/ffffff?text=CC",
};

const FinancialProducts = ({ onApplyClick }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const [loanProducts, setLoanProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showLoanForm, setShowLoanForm] = useState(false);

  // Fetch loan products from backend
  useEffect(() => {
    fetch("https://loancopy-production.up.railway.app/api/loan-products")
      .then((res) => res.json())
      .then((data) => setLoanProducts(data))
      .catch((err) => {
        console.error("Error fetching loan products:", err);
        setLoanProducts([]);
      });
  }, []);

  const getProductImage = (product) => {
    const imageMap = {
      "Personal Loan": personalLoanImage,
      "Home Loan": homeLoanImage,
      "Business Loan": businessLoanImage,
      "Mortage Loan": mortageLoanImage,
      "OD Loan": odLoanImage,
      "CC Limit Loan": ccLoanImage,
    };

    if (imageErrors[product.name]) {
      return fallbackImages[product.name] || fallbackImages["Personal Loan"];
    }

    return (
      imageMap[product.name] ||
      fallbackImages[product.name] ||
      fallbackImages["Personal Loan"]
    );
  };

  const handleImageError = (productName) => {
    setImageErrors((prev) => ({ ...prev, [productName]: true }));
  };

  const handleApplyNow = (product) => {
    setSelectedProduct(product);
    setShowLoanForm(true);
  };

  const handleCloseLoanForm = () => {
    setShowLoanForm(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <section className="finpro-modern-section">
        <div className="finpro-container">
          <div className="finpro-section-header">
            <div className="finpro-section-badge">Our Products ✨</div>
            <h2>
              Loans for Every&nbsp;<span>Dream</span>
            </h2>
            <p>
              Choose from our wide range of loan products tailored to your needs
            </p>
          </div>

          <div className="finpro-products-grid">
            {loanProducts.map((product, index) => (
              <div
                key={product.id}
                className={`finpro-product-card ${
                  hoveredCard === product.id ? "finpro-card-hovered" : ""
                }`}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="finpro-card-content">
                  {/* Image Section */}
                  <div className="finpro-image-container">
                    <div className="finpro-image-bg">
                      <img
                        src={getProductImage(product)}
                        alt={product.name}
                        className="finpro-product-img"
                        onError={() => handleImageError(product.name)}
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="finpro-product-info">
                    <h3>{product.name}</h3>
                  </div>

                  {/* Clean Loan Details Section - No Icons */}
                  <div className="finpro-loan-details">
                    <div className="finpro-details-grid">
                      <div className="finpro-detail-item">
                        <span className="finpro-detail-label">Interest Rate</span>
                        <span className="finpro-detail-value">
                          {product.interest_rate}
                        </span>
                      </div>
                      <div className="finpro-detail-item">
                        <span className="finpro-detail-label">Tenure</span>
                        <span className="finpro-detail-value">
                          {product.tenure}
                        </span>
                      </div>
                      <div className="finpro-detail-item">
                        <span className="finpro-detail-label">Processing Time</span>
                        <span className="finpro-detail-value">
                          {product.processing_time}
                        </span>
                      </div>
                      <div className="finpro-detail-item">
                        <span className="finpro-detail-label">Security</span>
                        <span className="finpro-detail-value">
                          {product.security_type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="finpro-card-actions">
                  <button
                    className="finpro-primary-btn"
                    onClick={() => handleApplyNow(product)}
                  >
                    <span>Apply Now</span>
                    <FaArrowRight className="finpro-arrow-icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Loan Form Popup */}
      {showLoanForm && (
        <div className="finpro-popup-overlay">
          <div className="finpro-popup-container">
            <button className="finpro-popup-close" onClick={handleCloseLoanForm}>
              <FaTimes />
            </button>
            
            <div className="finpro-popup-content">
              <LoanForm 
                preSelectedLoanType={selectedProduct?.name}
                onClose={handleCloseLoanForm}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FinancialProducts;

