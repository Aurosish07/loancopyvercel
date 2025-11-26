import React, { useState } from "react";
import "./ServiceForm.css";

const ServiceForm = ({ onClose, selectedService }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNo: "",
    dateOfBirth: "",
    bankStatement: null,
    aadharFront: null,
    aadharBack: null,
    panCard: null
  });

  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: files[0],
    }));
    console.log(`File selected for ${name}:`, files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      console.log("Form submitted:", formData);
      console.log("Selected Service:", selectedService);
      // Add your form submission logic here
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert("Form submitted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      dateOfBirth: "",
      bankStatement: null,
      aadharFront: null,
      aadharBack: null,
      panCard: null
    });
    setAgreed(false);
    
    if (onClose) {
      onClose();
    }
  };

  // Terms and Conditions Modal Component
  const TermsAndConditionsModal = () => (
    <div className="service-modal-overlay service-terms-modal-overlay">
      <div className="service-modal-content service-terms-modal">
        <button
          className="service-modal-close-btn"
          onClick={() => setShowTermsModal(false)}
        >
          &times;
        </button>

        <div className="service-modal-header">
          <h2>Terms and Conditions</h2>
          <div className="service-modal-gradient-border"></div>
        </div>

        <div className="service-terms-content">
          <div className="service-terms-section">
            <p>By submitting this form, you agree to provide accurate and complete information. All documents uploaded must be genuine and belong to the applicant.</p>
          </div>

          <div className="service-terms-section">
            <p>We collect and process your personal information including name, contact details, date of birth, and identification documents for verification purposes only.</p>
          </div>

          <div className="service-terms-section">
            <p>Your bank statements, Aadhar card, and PAN card information will be used solely for identity verification and will be handled in accordance with our privacy policy.</p>
          </div>

          <div className="service-terms-section">
            <p>We maintain strict confidentiality of your personal information and do not share it with third parties without your consent, except as required by law.</p>
          </div>

          <div className="service-terms-section">
            <p>You confirm that all uploaded documents are clear, legible, and belong to you. Submission of fraudulent documents may result in legal action.</p>
          </div>

          <div className="service-terms-acknowledgement">
            <p><strong>By checking the agreement box, you acknowledge that you have read, understood, and agree to all the terms and conditions mentioned above.</strong></p>
          </div>
        </div>

        <div className="service-terms-modal-footer">
          <button
            className="service-close-terms-button"
            onClick={() => setShowTermsModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="service-form-container">
      <div className="service-form-wrapper">
        {/* Terms and Conditions Modal */}
        {showTermsModal && <TermsAndConditionsModal />}

        <div className="service-form-header">
          
          <h1>Complete Your <span>Verification</span></h1>
          <p>Fill in your details and upload required documents securely 🔒</p>
          
          {/* Show selected service info if available */}
          {selectedService && (
            <div className="selected-service-info">
              <p className="service-name">Service: <strong>{selectedService.name}</strong></p>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="service-form">
          {/* Personal Information Section */}
          <div className="service-form-section">
            <div className="service-form-section-header">
              <span>1</span>
              <h2>Personal Information</h2>
            </div>
            <div className="service-form-row">
              <div className="service-form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="service-form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="service-form-row">
              <div className="service-form-group">
                <label htmlFor="email">Email ID *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="service-form-group">
                <label htmlFor="mobileNo">Mobile No. *</label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="9876543210"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="service-form-group service-full-width">
              <label htmlFor="dateOfBirth">Date of Birth *</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Document Upload Section */}
          <div className="service-form-section">
            <div className="service-form-section-header">
              <span>2</span>
              <h2>Document Upload</h2>
            </div>

            {/* Bank Statement */}
            <div className="service-form-group service-full-width">
              <label htmlFor="bankStatement">Upload 6 Months Bank Statement *</label>
              <input
                type="file"
                id="bankStatement"
                name="bankStatement"
                onChange={handleFileChange}
                accept=".pdf,image/*,.doc,.docx"
                required
              />
              <small className="service-file-hint">Accepted formats: PDF, JPG, PNG, DOC (Max: 10MB)</small>
            </div>

            {/* Aadhar Card */}
            <div className="service-form-row">
              <div className="service-form-group">
                <label htmlFor="aadharFront">Aadhar Card Front *</label>
                <input
                  type="file"
                  id="aadharFront"
                  name="aadharFront"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </div>
              <div className="service-form-group">
                <label htmlFor="aadharBack">Aadhar Card Back *</label>
                <input
                  type="file"
                  id="aadharBack"
                  name="aadharBack"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </div>
            </div>

            {/* PAN Card */}
            <div className="service-form-group service-full-width">
              <label htmlFor="panCard">Upload PAN Card *</label>
              <input
                type="file"
                id="panCard"
                name="panCard"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
          </div>

          {/* Terms Agreement */}
          <div className="service-terms-agreement">
            <label className="service-checkbox-label">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="service-terms-checkbox"
              />
              <span className="service-checkbox-text">
                I have read and agree to all{" "}
                <span
                  className="service-terms-link"
                  onClick={() => setShowTermsModal(true)}
                >
                  terms & conditions
                </span>
              </span>
            </label>
          </div>

          <button 
            type="submit" 
            className="service-submit-button"
            disabled={!agreed || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Verification ✅"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServiceForm;

