import React, { useRef, useState } from 'react';
import './AboutUs.css';
import { FiTarget, FiUsers, FiAward, FiShield, FiTrendingUp, FiClock } from 'react-icons/fi';
import Features from '../components/Features';
import LoanForm from '../components/LoanForm';

const AboutUs = () => {
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
    <div className="aboutPageMain">
      {/* Hero Section */}
      <div className="aboutHero">
        <div className="heroContent">
          <h1 className="heroTitle">
            Empowering <span className="gradientText">Financial Freedom</span> 
          </h1>
          <p className="heroDesc">
            We're revolutionizing how India accesses credit. Fast, transparent, and 
            completely digital - making loans simpler for everyone.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="statsRow">
        <div className="statItem">
          <div className="statIcon"><FiClock /></div>
          <div className="statNumber">24 Hours</div>
          <div className="statText">Fastest Approval</div>
        </div>
        <div className="statItem">
          <div className="statIcon"><FiUsers /></div>
          <div className="statNumber">50K+</div>
          <div className="statText">Customers Served</div>
        </div>
        <div className="statItem">
          <div className="statIcon"><FiTrendingUp /></div>
          <div className="statNumber">₹500Cr+</div>
          <div className="statText">Loan Disbursed</div>
        </div>
        <div className="statItem">
          <div className="statIcon"><FiShield /></div>
          <div className="statNumber">100%</div>
          <div className="statText">Secure & Safe</div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="missionSection">
        <div className="sectionHeader">
          <h2>Our <span>Purpose</span> </h2>
          <p>Why we do what we do</p>
        </div>
        
        <div className="missionGrid">
          <div className="missionCard">
            <div className="cardIcon mission">
              <FiTarget />
            </div>
            <h3>Our Mission</h3>
            <p>
              To simplify loan access through technology, making credit available 
              to every deserving Indian with complete transparency and fairness.
            </p>
          </div>
          
          <div className="missionCard">
            <div className="cardIcon vision">
              <FiAward />
            </div>
            <h3>Our Vision</h3>
            <p>
              To become India's most trusted digital lending platform, empowering 
              10 million individuals with financial independence by 2027.
            </p>
          </div>
        </div>
      </div>
<Features/>
      {/* How We Help */}
      <div className="helpSection">
        <div className="sectionHeader">
          <h2>How We <span> Help You</span></h2>
          <p>Making your financial journey easier</p>
        </div>
        
        <div className="helpGrid">
          <div className="helpCard">
            <div className="helpNumber">01</div>
            <h4>Digital First Approach</h4>
            <p>
              Complete online process from application to disbursement. 
              No physical paperwork required.
            </p>
          </div>
          
          <div className="helpCard">
            <div className="helpNumber">02</div>
            <h4>Transparent Pricing</h4>
            <p>
              No hidden charges. Clear interest rates and fees disclosed upfront 
              before you apply.
            </p>
          </div>
          
          <div className="helpCard">
            <div className="helpNumber">03</div>
            <h4>Fast Processing</h4>
            <p>
              Quick verification and approval. Get loan decisions within hours, 
              not days.
            </p>
          </div>
          
          <div className="helpCard">
            <div className="helpNumber">04</div>
            <h4>Flexible Repayment</h4>
            <p>
              Choose repayment plans that fit your budget. Options for tenure 
              and EMI customization.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="valuesSection">
        <div className="sectionHeader">
          <h2>Our <span>Core Values</span></h2>
          <p>The principles that guide every decision</p>
        </div>
        
        <div className="valuesGrid">
          <div className="valueItem">
            <div className="valueDot trust"></div>
            <h4>Trust</h4>
            <p>Building lasting relationships through reliability and honesty.</p>
          </div>
          
          <div className="valueItem">
            <div className="valueDot transparency"></div>
            <h4>Transparency</h4>
            <p>Clear communication with no hidden terms or surprises.</p>
          </div>
          
          <div className="valueItem">
            <div className="valueDot innovation"></div>
            <h4>Innovation</h4>
            <p>Continuously improving our technology for better user experience.</p>
          </div>
          
          <div className="valueItem">
            <div className="valueDot empathy"></div>
            <h4>Empathy</h4>
            <p>Understanding your needs and providing personalized solutions.</p>
          </div>
        </div>
      </div>

       <div ref={loanFormRef}>
        <LoanForm preSelectedLoanType={selectedLoanType} />
      </div>
    </div>
  );
};

export default AboutUs;
