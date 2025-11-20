import React, { useState, useEffect } from "react";
import {
  FaQuoteLeft,
  FaStar,
  FaMapMarkerAlt,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "./Testimonial.css";

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slidesToShow, setSlidesToShow] = useState(3);

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://loancopy-production.up.railway.app/api/testimonials");
        
        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }
        
        const data = await response.json();
        setTestimonials(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials. Please try again later.");
        // Only 2 cards in default testimonials
        setTestimonials(getDefaultTestimonials());
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Update slidesToShow based on screen size
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      if (width < 768) {
        setSlidesToShow(1); // Mobile - 1 card
      } else {
        setSlidesToShow(3); // Tablet/Laptop - 3 cards
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fallback default testimonials - ONLY 2 CARDS
  const getDefaultTestimonials = () => [
    {
      id: 1,
      name: "Rahul Sharma",
      role: "Business Owner",
      location: "Mumbai",
      content: "FinTrust helped me expand my business with a timely loan. The process was smooth and the interest rates were very competitive. Highly recommended!",
      rating: 5,
      bgColor: "card-bg-1",
      borderColor: "card-border-1",
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Home Buyer",
      location: "Delhi",
      content: "Got my home loan approved in just 3 days! The team was very supportive throughout the process. Made my dream of owning a home come true.",
      rating: 5,
      bgColor: "card-bg-2",
      borderColor: "card-border-2",
    }
    // Only 2 cards - no more
  ];

  const totalSlides = testimonials.length;

  const nextSlide = () => {
    if (totalSlides <= slidesToShow) return;
    const maxSlide = Math.max(0, totalSlides - slidesToShow);
    setCurrentSlide((prev) => (prev + 1) % (maxSlide + 1));
  };

  const prevSlide = () => {
    if (totalSlides <= slidesToShow) return;
    const maxSlide = Math.max(0, totalSlides - slidesToShow);
    setCurrentSlide((prev) => (prev - 1 + (maxSlide + 1)) % (maxSlide + 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide effect
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length <= slidesToShow) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, isAutoPlaying, testimonials.length, slidesToShow]);

  // Show loading state
  if (loading) {
    return (
      <section className="testimonials-appx">
        <div className="container">
          <div className="section-header-appx">
            <div className="section-badge-appx">✨ Customer Stories</div>
            <h2>What Our Customers <span>Say</span></h2>
            <p>Real stories from real people who achieved their dreams with us 💭</p>
          </div>
          <div className="loading-state">Loading testimonials...</div>
        </div>
      </section>
    );
  }

  const showSlider = testimonials.length > slidesToShow;
  const maxSlide = Math.max(0, totalSlides - slidesToShow);

  return (
    <section className="testimonials-appx">
      <div className="container">
        <div className="section-header-appx">
          <div className="section-badge-appx">✨ Customer Stories</div>
          <h2>
            What Our Customers <span>Say</span>
          </h2>
          <p>
            Real stories from real people who achieved their dreams with us 💭
          </p>
        </div>

        {/* Error message if any */}
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {/* Slider Container */}
        <div className="testimonial-slider-container">
          {/* Navigation Buttons - Only show if we have more slides than visible */}
          {showSlider && (
            <>
              <button
                className="slider-nav-btn slider-prev"
                onClick={prevSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <FaChevronLeft />
              </button>

              <button
                className="slider-nav-btn slider-next"
                onClick={nextSlide}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Slider Track */}
          <div
            className="testimonials-slider-track"
            style={{
              transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
            }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={testimonial.id || index} className="testimonial-slide">
                <div
                  className={`testimonial-card-appx ${testimonial.bgColor} ${testimonial.borderColor}`}
                >
                  {/* Quote Icon */}
                  <div className="quote-icon-appx">
                    <FaQuoteLeft />
                  </div>

                  {/* Testimonial Content */}
                  <div className="testimonial-content-appx">
                    <div className="rating-appx">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={
                            i < testimonial.rating
                              ? "star-filled"
                              : "star-empty"
                          }
                        />
                      ))}
                    </div>
                    <p>"{testimonial.content}"</p>
                  </div>

                  {/* Client Info */}
                  <div className="client-info-appx">
                    <div className="client-avatar-appx">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div className="client-details-appx">
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                      <div className="client-location-appx">
                        <FaMapMarkerAlt className="location-icon" />
                        <span>{testimonial.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Background Gradient */}
                  <div className="testimonial-gradient-appx"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator - Only show if we have more slides than visible */}
        {showSlider && maxSlide > 0 && (
          <div className="slider-dots">
            {[...Array(maxSlide + 1)].map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => goToSlide(index)}
                onMouseEnter={() => setIsAutoPlaying(false)}
                onMouseLeave={() => setIsAutoPlaying(true)}
              />
            ))}
          </div>
        )}

        {/* Stats Bar */}
        <div className="testimonials-stats-appx">
          <div className="stat-item-appx">
            <div>
              <span>⭐</span>
            </div>
            <div>
              <div className="stat-number-appx">Rated</div>
              <div className="stat-label-appx">4.9/5.0</div>
            </div>
          </div>
          <div className="stat-item-appx">
            <div>
              <span>🏆</span>
            </div>
            <div>
              <div className="stat-number-appx">Awards</div>
              <div className="stat-label-appx">Best Lender 2024</div>
            </div>
          </div>
          <div className="stat-item-appx">
            <div>
              <span>✅</span>
            </div>
            <div>
              <div className="stat-number-appx">Verified</div>
              <div className="stat-label-appx">Trustpilot</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
