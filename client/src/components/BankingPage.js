import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './BankingPage.css';

const BankingPage = ({ 
  applicationId: propApplicationId, 
  loanData: propLoanData,
  onBack,
  onBankSelect 
}) => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBank, setSelectedBank] = useState(null);
  const [step, setStep] = useState('bank-selection');
  const [cibilScore, setCibilScore] = useState(null);
  const [isCibilChecking, setIsCibilChecking] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(0); // Just to force updates
  
  // Refs for input values
  const aadharValue = useRef('');
  const panValue = useRef('');
  
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state || {};
  const finalApplicationId = propApplicationId || locationState.applicationId;
  const finalLoanData = propLoanData || locationState.loanData;

  useEffect(() => {
    console.log("🔍 BankingPage Data Analysis:", {
      propApplicationId,
      propLoanData,
      locationApplicationId: locationState.applicationId,
      locationLoanData: locationState.loanData,
      finalApplicationId,
      finalLoanData
    });
  }, []);

  useEffect(() => {
    fetchBanks();
  }, []);

  const fetchBanks = async () => {
    try {
      console.log('🔄 Fetching banks from backend...');
      const response = await fetch('https://loancopy.onrender.com/api/banks');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ Found ${data.length} banks:`, data);
      
      setBanks(data);
      setLoading(false);
      
    } catch (error) {
      console.error('❌ Error fetching banks:', error);
      setLoading(false);
    }
  };

  const handleBankSelect = (bank) => {
    console.log("🏦 Bank selected:", bank.name);
    setSelectedBank(bank);
  };

  const proceedToCibilCheck = () => {
    if (!selectedBank || !finalApplicationId) {
      alert('Please select a bank and ensure application ID is available');
      return;
    }
    setStep('cibil-check');
  };

  // Simple Aadhar input handler - NO RE-RENDERS
  const handleAadharInput = (e) => {
    const value = e.target.value;
    
    // Filter digits only
    let numbersOnly = value.replace(/\D/g, '');
    if (numbersOnly.length > 12) {
      numbersOnly = numbersOnly.slice(0, 12);
    }
    
    // Store in ref
    aadharValue.current = numbersOnly;
    
    // Format with spaces for display
    let formatted = numbersOnly;
    if (numbersOnly.length > 4) {
      formatted = numbersOnly.slice(0, 4) + ' ' + numbersOnly.slice(4);
    }
    if (numbersOnly.length > 8) {
      formatted = numbersOnly.slice(0, 4) + ' ' + numbersOnly.slice(4, 8) + ' ' + numbersOnly.slice(8);
    }
    
    // Update input value
    e.target.value = formatted;
  };

  // Simple PAN input handler - NO RE-RENDERS
  const handlePanInput = (e) => {
    const value = e.target.value;
    
    // Filter and uppercase
    let filtered = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    if (filtered.length > 10) {
      filtered = filtered.slice(0, 10);
    }
    
    // Store in ref
    panValue.current = filtered;
    
    // Update input value
    e.target.value = filtered;
  };

  // Check validation
  const isAadharValid = () => aadharValue.current.length === 12;
  const isPanValid = () => panValue.current.length === 10;

  // CIBIL Check Simulation
  const performCibilCheck = async () => {
    if (!aadharValue.current || !panValue.current) {
      alert('Please enter both Aadhar and PAN numbers');
      return;
    }

    if (!isAadharValid()) {
      alert('Please enter valid 12-digit Aadhar number');
      return;
    }

    if (!isPanValid()) {
      alert('Please enter valid 10-character PAN number');
      return;
    }

    setIsCibilChecking(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Generate random CIBIL score between 300-900
    const randomScore = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
    setCibilScore(randomScore);
    
    setIsCibilChecking(false);
    setStep('result');
  };

  const handleFinalApproval = () => {
    if (cibilScore >= 650) {
      console.log("🎯 CIBIL APPROVED:", {
        applicationId: finalApplicationId,
        bankId: selectedBank.id,
        bankName: selectedBank.name,
        cibilScore: cibilScore,
        timestamp: new Date().toISOString()
      });
      
      if (onBankSelect) {
        onBankSelect(selectedBank);
      } else {
        navigate('/application-success', {
          state: {
            applicationId: finalApplicationId,
            bankName: selectedBank.name,
            roiRange: `${selectedBank.roi_min}% - ${selectedBank.roi_max}%`,
            processingTime: selectedBank.processing_time,
            loanAmount: finalLoanData?.loanAmount,
            cibilScore: cibilScore,
            status: 'approved'
          }
        });
      }
    } else {
      alert(`❌ Loan Rejected! Your CIBIL score (${cibilScore}) is below the minimum required (650). Please try again after improving your credit score.`);
      setStep('bank-selection');
    }
  };

  if (loading) {
    return (
      <div className="banking-page">
        <div className="banking-container">
          <div className="loading">Loading banks...</div>
        </div>
      </div>
    );
  }

  // CIBIL CHECK PAGE - SIMPLIFIED, NO RE-RENDERS
  const CibilCheckPage = () => {
    return (
      <div className="cibil-check-page">
        <div className="cibil-header">
          <h2>CIBIL Score Verification</h2>
          <p>Enter your details for instant CIBIL check</p>
        </div>

        <div className="cibil-form">
          <div className="form-group">
            <label htmlFor="aadharNumber">Aadhar Number *</label>
            <input
              type="text"
              id="aadharNumber"
              name="aadharNumber"
              className="cibil-input"
              placeholder="Enter 12-digit Aadhar number"
              onChange={handleAadharInput}
              maxLength={14}
              inputMode="numeric"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="panNumber">PAN Number *</label>
            <input
              type="text"
              id="panNumber"
              name="panNumber"
              className="cibil-input"
              placeholder="Enter PAN number (e.g., ABCDE1234F)"
              onChange={handlePanInput}
              maxLength={10}
              required
            />
          </div>

          <div className="cibil-note">
            <p>🔒 Your information is secure and encrypted. We use bank-level security.</p>
          </div>

          <button 
            className={`cibil-check-btn ${isCibilChecking ? 'loading' : ''}`}
            onClick={performCibilCheck}
            disabled={isCibilChecking}
          >
            {isCibilChecking ? 'Checking CIBIL Score...' : 'Check CIBIL Score 🔍'}
          </button>

          <button 
            className="back-btn"
            onClick={() => setStep('bank-selection')}
          >
            ← Back to Bank Selection
          </button>
        </div>
      </div>
    );
  };

  // CIBIL Result Component (unchanged)
  const CibilResultPage = () => (
    <div className="cibil-result-page">
      <div className={`result-header ${cibilScore >= 650 ? 'approved' : 'rejected'}`}>
        <h2>
          {cibilScore >= 650 ? '🎉 CIBIL Check Passed!' : '❌ CIBIL Check Failed'}
        </h2>
        <div className="cibil-score-display">
          <span className="score-label">Your CIBIL Score:</span>
          <span className={`score-value ${cibilScore >= 650 ? 'good' : 'poor'}`}>
            {cibilScore}
          </span>
        </div>
      </div>

      <div className="result-details">
        {cibilScore >= 650 ? (
          <>
            <div className="success-message">
              <p>✅ Congratulations! Your CIBIL score meets our requirements.</p>
              <p>Your loan application with <strong>{selectedBank.name}</strong> can now proceed.</p>
            </div>
            
            <div className="loan-terms">
              <h4>Approved Loan Terms:</h4>
              <div className="terms-list">
                <div className="term-item">
                  <span>Bank:</span>
                  <span>{selectedBank.name}</span>
                </div>
                <div className="term-item">
                  <span>ROI Range:</span>
                  <span>{selectedBank.roi_min}% - {selectedBank.roi_max}%</span>
                </div>
                <div className="term-item">
                  <span>Processing Time:</span>
                  <span>{selectedBank.processing_time}</span>
                </div>
                <div className="term-item">
                  <span>CIBIL Score:</span>
                  <span className="score-good">{cibilScore} (Good)</span>
                </div>
              </div>
            </div>

            <button className="proceed-btn" onClick={handleFinalApproval}>
              Confirm & Proceed with {selectedBank.name} ✅
            </button>
          </>
        ) : (
          <>
            <div className="rejection-message">
              <p>❌ Unfortunately, your CIBIL score of <strong>{cibilScore}</strong> is below our minimum requirement of <strong>650</strong>.</p>
              <p>We cannot process your loan application at this time.</p>
            </div>

            <div className="suggestions">
              <h4>Suggestions to improve your score:</h4>
              <ul>
                <li>Pay your credit card bills on time</li>
                <li>Maintain low credit utilization</li>
                <li>Avoid multiple loan inquiries</li>
                <li>Check for errors in your credit report</li>
              </ul>
            </div>

            <button className="try-again-btn" onClick={() => setStep('bank-selection')}>
              Try Again with Different Bank
            </button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="banking-page">
      <button className="banking-close-btn" onClick={onBack}>
        &times;
      </button>
      
      <div className="banking-container">
        
        {/* Step 1: Bank Selection */}
        {step === 'bank-selection' && (
          <>
            <div className="banking-header">
              <h1>Select Your Bank</h1>
              <p>Choose your preferred bank for loan disbursement</p>
            </div>
            
            <div className="banking-main-content">
              {/* Debug Info */}
              <div style={{
                background: '#fff3cd', 
                padding: '10px', 
                margin: '0 0 20px 0', 
                borderRadius: '5px',
                border: '1px solid #ffeaa7',
                fontSize: '14px'
              }}>
                <strong>🔧 Debug Info:</strong> 
                App ID: {finalApplicationId || 'NOT FOUND'} | 
                Loan Amount: {finalLoanData?.loanAmount ? 
                  (typeof finalLoanData.loanAmount === 'number' ? 
                    `₹${finalLoanData.loanAmount.toLocaleString()}` : 
                    finalLoanData.loanAmount
                  ) : 
                  'NOT FOUND'
                }
              </div>

              {/* Loan Summary */}
              <div className="loan-summary-card">
                <h3>Your Loan Summary</h3>
                <div className="summary-details">
                  <div className="summary-item">
                    <span>Application ID:</span>
                    <span>{finalApplicationId || 'N/A'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Loan Amount:</span>
                    <span>
                      {finalLoanData?.loanAmount ? 
                        (typeof finalLoanData.loanAmount === 'number' ? 
                          `₹${finalLoanData.loanAmount.toLocaleString()}` : 
                          finalLoanData.loanAmount
                        ) : 
                        'N/A'
                      }
                    </span>
                  </div>
                  <div className="summary-item">
                    <span>Loan Type:</span>
                    <span>{finalLoanData?.loanType || 'N/A'}</span>
                  </div>
                  <div className="summary-item">
                    <span>Status:</span>
                    <span className="approved">Pre-Approved 💹</span>
                  </div>
                </div>
              </div>

              {/* Banks Table Section */}
              <div className="banks-section">
                <div className="banks-container">
                  <h4>Available Banks ({banks.length})</h4>
                  
                  {banks.length === 0 ? (
                    <div className="no-banks">
                      <p>No banks available at the moment. Please try again later.</p>
                    </div>
                  ) : (
                    <div className="banks-table">
                      <div className="table-container">
                        {/* Table Header */}
                        <div className="table-header">
                          <div>Bank Name</div>
                          <div>Product</div>
                          <div>ROI</div>
                          <div>Max Amount</div>
                          <div>Action</div>
                        </div>
                        
                        {/* Table Rows */}
                        {banks.map((bank) => (
                          <div
                            key={bank.id}
                            className={`table-row ${selectedBank?.id === bank.id ? 'selected' : ''}`}
                            onClick={() => handleBankSelect(bank)}
                          >
                            {/* Bank Name Column */}
                            <div className="bank-name-cell">
                              <div className="bank-logo-table">
                                {bank.logo || '🏦'}
                              </div>
                              <div className="bank-name-table">
                                {bank.name}
                              </div>
                            </div>
                            
                            {/* Product Column */}
                            <div className="product-cell">
                              {finalLoanData?.loanType || 'Personal Loan'}
                            </div>
                            
                            {/* ROI Column */}
                            <div className="roi-cell">
                              {bank.roi_min}% - {bank.roi_max}%
                            </div>
                            
                            {/* Amount Column */}
                            <div className="amount-cell">
                              ₹{(bank.max_loan_amount || 5000000).toLocaleString()}
                            </div>
                            
                            {/* Action Column */}
                            <div>
                              <button 
                                className={`select-btn ${selectedBank?.id === bank.id ? 'selected' : ''}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleBankSelect(bank);
                                }}
                              >
                                {selectedBank?.id === bank.id ? 'Selected ✓' : 'Select'}
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {selectedBank && (
                <div className="action-section">
                  <button className="confirm-btn" onClick={proceedToCibilCheck}>
                    Proceed with {selectedBank.name} for CIBIL Check
                  </button>
                  <p style={{textAlign: 'center', marginTop: '10px', color: '#666'}}>
                    Next: CIBIL Score Verification Required
                  </p>
                </div>
              )}

              {/* Note */}
              <div className="note-section">
                <p>
                  <strong>Note:</strong> CIBIL score verification is required before final loan approval. 
                  Minimum CIBIL score required: <strong>650</strong>
                </p>
              </div>
            </div>
          </>
        )}

        {/* Step 2: CIBIL Check */}
        {step === 'cibil-check' && <CibilCheckPage />}

        {/* Step 3: CIBIL Result */}
        {step === 'result' && <CibilResultPage />}
      </div>
    </div>
  );
};

export default BankingPage;

