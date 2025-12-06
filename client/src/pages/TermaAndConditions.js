import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
  return (
    <div className="terms-page">
      <div className="terms-container">
        {/* Simple Header */}
        <div className="terms-header">
          <div className="header-content">
            <h1>Terms and Conditions</h1>
            <p className="subtitle">Last updated: December 15, 2025</p>
            <div className="header-divider"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Agreement Overview</h2>
            <p>
              This Terms and Conditions Agreement ("Agreement") governs your application for and use of loan services provided by FinSecure Capital Ltd. ("Company", "we", "us", or "our"). By submitting your loan application, you ("Applicant", "you", or "your") acknowledge that you have read, understood, and agree to be bound by all terms herein.
            </p>
            <div className="note-box">
              <strong>Important:</strong> This agreement constitutes a legally binding contract between you and FinSecure Capital Ltd.
            </div>
          </section>

          <section className="terms-section">
            <h2>2. Application Process & Fees</h2>
            <p><strong>2.1 Application Submission</strong> - Your loan application is subject to verification of eligibility criteria including but not limited to: age, employment status, income verification, credit history assessment, and compliance with KYC norms as per regulatory requirements.</p>
            <p><strong>2.2 Processing Fee</strong> - A non-refundable processing fee of ₹499 plus applicable taxes is payable upon application submission. This fee covers administrative costs, verification expenses, and credit assessment services.</p>
            
            <div className="fee-table">
              <div className="fee-row">
                <span>Processing Fee</span>
                <span>₹499 + GST</span>
              </div>
              <div className="fee-row">
                <span>Verification Charges</span>
                <span>Included</span>
              </div>
              <div className="fee-row">
                <span>Platform Access</span>
                <span>Included</span>
              </div>
            </div>
          </section>

          <section className="terms-section">
            <h2>3. Loan Approval & Terms</h2>
            <p><strong>3.1 Approval Criteria</strong> - Loan approval is at the sole discretion of the Company and is subject to satisfactory verification of all submitted documents and information.</p>
            <p><strong>3.2 Interest Rates</strong> - The applicable interest rate will be communicated upon approval and is based on our internal risk assessment model. Rates are subject to change based on market conditions and regulatory guidelines.</p>
            <p><strong>3.3 Disbursement</strong> - Loan disbursement occurs only after: (a) Complete verification, (b) Execution of loan agreement, (c) Payment of all applicable fees.</p>
          </section>

          <section className="terms-section">
            <h2>4. Repayment Obligations</h2>
            <p><strong>4.1 Repayment Schedule</strong> - You agree to adhere to the repayment schedule detailed in your loan agreement. Default in payment may result in:</p>
            <ul>
              <li>Late payment penalties as per the agreement</li>
              <li>Negative impact on your credit score</li>
              <li>Legal recovery proceedings</li>
              <li>Additional interest charges</li>
            </ul>
            <p><strong>4.2 Prepayment</strong> - Partial or complete prepayment is permitted subject to prepayment charges as specified in your loan agreement.</p>
          </section>

          <section className="terms-section">
            <h2>5. Default & Recovery</h2>
            <p>In the event of default, the Company reserves the right to:</p>
            <ul>
              <li>Initiate recovery proceedings through authorized agencies</li>
              <li>Report delinquency to credit bureaus (CIBIL, Experian, Equifax, CRIF High Mark)</li>
              <li>Take legal action for recovery of outstanding amounts</li>
              <li>Charge recovery costs and legal expenses to the borrower</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>6. Jurisdiction & Governing Law</h2>
            <p>This agreement shall be governed by and construed in accordance with the laws of India. Any disputes arising from this agreement shall be subject to the exclusive jurisdiction of courts in Mumbai, Maharashtra.</p>
          </section>

          <section className="terms-section">
            <h2>7. Communication Consent</h2>
            <p>You consent to receive communications related to your loan application via email, SMS, phone calls, and other electronic means.</p>
          </section>

          {/* Acknowledgment Section */}
          <div className="acknowledgment-section">
            <h3>Acceptance & Acknowledgment</h3>
            <div className="acknowledgment-box">
              <p><strong>By proceeding with your loan application, you confirm that:</strong></p>
              <ul>
                <li>You have read and understood all terms and conditions</li>
                <li>You agree to be legally bound by this agreement</li>
                <li>All information provided is true and accurate</li>
                <li>You authorize credit bureau checks and verification</li>
              </ul>
            </div>
          </div>

          {/* Privacy Policy Section */}
          <div className="privacy-section">
            <h2>Privacy Policy</h2>
            <div className="privacy-divider"></div>

            <section className="terms-section">
              <h3>Information We Collect</h3>
              <p>We collect personal information that you provide directly to us when you apply for a loan, including:</p>
              <ul>
                <li>Full name, date of birth, and contact information</li>
                <li>PAN card, Aadhaar card, and other identity proofs</li>
                <li>Employment details and income information</li>
                <li>Bank account details and statements</li>
                <li>Credit information and history</li>
              </ul>
            </section>

            <section className="terms-section">
              <h3>How We Use Your Information</h3>
              <ul>
                <li>To process your loan application and determine eligibility</li>
                <li>To verify your identity and prevent fraud</li>
                <li>To assess your creditworthiness and repayment capacity</li>
                <li>To communicate with you regarding your application</li>
                <li>To comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section className="terms-section">
              <h3>Data Security</h3>
              <p>We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section className="terms-section">
              <h3>Your Rights</h3>
              <p>You have the right to:</p>
              <ul>
                <li>Access and review your personal information</li>
                <li>Rectify inaccurate or incomplete information</li>
                <li>Withdraw consent for data processing</li>
                <li>Request deletion of your personal data</li>
              </ul>
            </section>

            <div className="contacts-info">
              <p><strong>Contact Information:</strong></p>
              <p>Data Protection Officer</p>
              <p>Email: privacy@company.com</p>
              <p>Phone: +91 88893 53273</p>
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default TermsAndConditions;
