import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiChevronRight, FiUser, FiPhone, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const BookSiteVisit = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    project: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData(s => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleNext = () => setStep(s => Math.min(s + 1, 3));
  const handlePrev = () => setStep(s => Math.max(s - 1, 1));
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Booking Successful!');
  }

  const stepLabels = ['Select Property', 'Date & Time', 'Your Details'];

  return (
    <>
      <Helmet>
        <title>Book Site Visit | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '40vh', minHeight: '350px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" 
          alt="Book Site Visit Background" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.35 }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(15,25,35,0.1), #0F1923)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <AnimatedSection animation="fadeUp">
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
              background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)',
              padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                Exclusive Access
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Experience Luxury <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>In Person</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Schedule a guided site visit with our property experts and explore your future dream home.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Form Section */}
      <section style={{ backgroundColor: '#F8FAFB', padding: '6rem 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <AnimatedSection animation="fadeUp">
            
            {/* Step Indicator */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4rem', position: 'relative' }}>
              {/* Connecting Line */}
              <div style={{ position: 'absolute', top: '24px', left: '10%', right: '10%', height: '2px', background: 'rgba(6,78,59,0.1)', zIndex: 0 }} />
              
              {[1, 2, 3].map((num, idx) => (
                <div key={num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1, width: '33%' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                    background: step >= num ? 'linear-gradient(135deg, #064E3B, #022c22)' : '#fff',
                    color: step >= num ? '#D4AF37' : '#9CA3AF',
                    border: step >= num ? 'none' : '2px solid rgba(6,78,59,0.15)',
                    boxShadow: step >= num ? '0 8px 24px rgba(6,78,59,0.2)' : 'none',
                    transition: 'all 0.4s ease', marginBottom: '0.75rem'
                  }}>
                    {step > num ? <FiCheckCircle size={22} color="#fff" /> : num}
                  </div>
                  <span style={{ 
                    fontFamily: "'Outfit', sans-serif", fontWeight: step >= num ? 700 : 500,
                    fontSize: '0.85rem', color: step >= num ? '#064E3B' : '#9CA3AF',
                    textTransform: 'uppercase', letterSpacing: '0.1em'
                  }}>
                    {stepLabels[idx]}
                  </span>
                </div>
              ))}
            </div>

            {/* Form Card */}
            <div style={{
              background: '#fff', borderRadius: '24px', padding: '3.5rem',
              boxShadow: '0 20px 60px rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.03)'
            }}>
              <form onSubmit={handleSubmit}>
                
                {/* STEP 1: Property Selection */}
                {step === 1 && (
                  <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '2.5rem', textAlign: 'center' }}>
                      Which project are you interested in?
                    </h3>
                    <div style={{ marginBottom: '2.5rem' }}>
                      <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        Select Project
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                          <FiMapPin size={18} />
                        </span>
                        <select 
                          name="project" 
                          value={formData.project} 
                          onChange={handleChange}
                          style={{
                            width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                            background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)',
                            borderRadius: '12px', outline: 'none', color: '#0F1923',
                            fontFamily: "'Outfit', sans-serif", fontSize: '1rem',
                            appearance: 'none', cursor: 'pointer'
                          }}
                        >
                          <option value="">Choose a luxury project...</option>
                          <option value="golden_crest">The Golden Crest, Worli</option>
                          <option value="emerald_heights">Emerald Heights, Bandra</option>
                          <option value="royal_oasis">Royal Oasis Plots, Lonavala</option>
                        </select>
                        <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                          <FiChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                        </span>
                      </div>
                    </div>
                    
                    <button type="button" onClick={handleNext} disabled={!formData.project} style={{
                      width: '100%', padding: '1.25rem',
                      background: formData.project ? 'linear-gradient(135deg, #064E3B, #022c22)' : '#E5E7EB',
                      color: formData.project ? '#fff' : '#9CA3AF', border: 'none', borderRadius: '12px',
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                      cursor: formData.project ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                      boxShadow: formData.project ? '0 10px 25px rgba(6,78,59,0.2)' : 'none'
                    }}>
                      Continue to Schedule <FiChevronRight size={18} />
                    </button>
                  </div>
                )}

                {/* STEP 2: Date & Time */}
                {step === 2 && (
                  <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '2.5rem', textAlign: 'center' }}>
                      Choose your preferred schedule
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          Preferred Date
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                            <FiCalendar size={18} />
                          </span>
                          <input 
                            type="date" 
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{
                              width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                              background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)',
                              borderRadius: '12px', outline: 'none', color: '#0F1923',
                              fontFamily: "'Outfit', sans-serif", fontSize: '1rem',
                            }} 
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          Preferred Time
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                            <FiClock size={18} />
                          </span>
                          <select 
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                            style={{
                              width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem',
                              background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)',
                              borderRadius: '12px', outline: 'none', color: '#0F1923',
                              fontFamily: "'Outfit', sans-serif", fontSize: '1rem',
                              appearance: 'none', cursor: 'pointer'
                            }}
                          >
                            <option value="">Choose time...</option>
                            <option>10:00 AM</option>
                            <option>12:00 PM</option>
                            <option>02:00 PM</option>
                            <option>04:00 PM</option>
                          </select>
                          <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}>
                            <FiChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <button type="button" onClick={handlePrev} style={{
                        flex: 1, padding: '1.25rem',
                        background: 'transparent', border: '1.5px solid rgba(0,0,0,0.1)',
                        borderRadius: '12px', color: '#4B5563',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                        cursor: 'pointer', transition: 'all 0.3s',
                      }}>
                        Back
                      </button>
                      <button type="button" onClick={handleNext} disabled={!formData.date || !formData.time} style={{
                        flex: 2, padding: '1.25rem',
                        background: (formData.date && formData.time) ? 'linear-gradient(135deg, #064E3B, #022c22)' : '#E5E7EB',
                        color: (formData.date && formData.time) ? '#fff' : '#9CA3AF', border: 'none', borderRadius: '12px',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                        cursor: (formData.date && formData.time) ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
                        boxShadow: (formData.date && formData.time) ? '0 10px 25px rgba(6,78,59,0.2)' : 'none'
                      }}>
                        Continue to Details <FiChevronRight size={18} />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: User Details */}
                {step === 3 && (
                  <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '2.5rem', textAlign: 'center' }}>
                      Complete your booking
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          Full Name
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiUser size={18} /></span>
                          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', color: '#0F1923', fontFamily: "'Outfit', sans-serif", fontSize: '1rem' }} />
                        </div>
                      </div>
                      
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                          Phone Number
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiPhone size={18} /></span>
                          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', color: '#0F1923', fontFamily: "'Outfit', sans-serif", fontSize: '1rem' }} />
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ marginBottom: '2.5rem' }}>
                      <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.85rem', color: '#4B5563', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
                        Email Address
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiMail size={18} /></span>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ width: '100%', padding: '1.25rem 1.25rem 1.25rem 3.5rem', background: '#F8FAFB', border: '1.5px solid rgba(0,0,0,0.08)', borderRadius: '12px', outline: 'none', color: '#0F1923', fontFamily: "'Outfit', sans-serif", fontSize: '1rem' }} />
                      </div>
                    </div>

                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer', marginBottom: '2.5rem' }}>
                      <input type="checkbox" defaultChecked style={{ accentColor: '#D4AF37', width: '20px', height: '20px', marginTop: '2px' }} />
                      <span style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.5 }}>
                        I agree to receive communications regarding my site visit and property updates from Proptix.
                      </span>
                    </label>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                      <button type="button" onClick={handlePrev} style={{
                        flex: 1, padding: '1.25rem',
                        background: 'transparent', border: '1.5px solid rgba(0,0,0,0.1)',
                        borderRadius: '12px', color: '#4B5563',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.1rem',
                        cursor: 'pointer', transition: 'all 0.3s',
                      }}>
                        Back
                      </button>
                      <button type="submit" disabled={!formData.name || !formData.phone || !formData.email} style={{
                        flex: 2, padding: '1.25rem',
                        background: (formData.name && formData.phone && formData.email) ? 'linear-gradient(135deg, #D4AF37, #A8860A)' : '#E5E7EB',
                        color: (formData.name && formData.phone && formData.email) ? '#0F1923' : '#9CA3AF', border: 'none', borderRadius: '12px',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.1rem',
                        cursor: (formData.name && formData.phone && formData.email) ? 'pointer' : 'not-allowed', transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', gap: '0.75rem',
                        boxShadow: (formData.name && formData.phone && formData.email) ? '0 10px 25px rgba(212,175,55,0.3)' : 'none'
                      }}>
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                )}

              </form>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default BookSiteVisit;
