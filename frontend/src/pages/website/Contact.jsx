import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiMapPin, FiPhoneCall, FiMail, FiClock } from 'react-icons/fi';

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '50vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" 
          alt="Contact Background" 
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
                Connect With Us
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Get In <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Touch</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              We are here to help you find your dream property. Reach out to our experts for personalized assistance.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            
            {/* Contact Info */}
            <div style={{ flex: '1 1 350px' }}>
              <AnimatedSection animation="fadeLeft">
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#0F1923', marginBottom: '1rem', lineHeight: 1.2 }}>
                  Contact <span style={{ fontStyle: 'italic', color: '#064E3B' }}>Information</span>
                </h2>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '3rem' }}>
                  Visit our headquarters or reach out via phone or email. Our elite team is available to assist you with all your luxury real estate needs.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  {[
                    { icon: <FiMapPin size={24} />, title: 'Headquarters', desc: '123 Business Park, Andheri West,\nMumbai, Maharashtra 400001' },
                    { icon: <FiPhoneCall size={24} />, title: 'Direct Line', desc: '+91 98765 43210\n+91 98765 43211' },
                    { icon: <FiMail size={24} />, title: 'Email Address', desc: 'info@proptix.com\nsales@proptix.com' },
                    { icon: <FiClock size={24} />, title: 'Working Hours', desc: 'Monday - Saturday\n10:00 AM - 7:00 PM' }
                  ].map((info, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <div style={{ 
                        width: '56px', height: '56px', borderRadius: '16px', shrink: 0,
                        background: 'rgba(212,175,55,0.1)', color: '#D4AF37',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}>
                        {info.icon}
                      </div>
                      <div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#0F1923', marginBottom: '0.25rem', fontWeight: 700 }}>{info.title}</h4>
                        <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{info.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form */}
            <div style={{ flex: '1 1 500px' }}>
              <AnimatedSection animation="fadeUp">
                <div style={{ 
                  background: '#fff', padding: '3rem', borderRadius: '24px', 
                  border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 20px 50px rgba(0,0,0,0.05)'
                }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '2rem' }}>
                    Send us a Message
                  </h3>
                  
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={e => e.preventDefault()}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name</label>
                        <input type="text" style={{ 
                          width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', 
                          background: '#F9FAFB', outline: 'none', fontFamily: "'Outfit', sans-serif", transition: 'border-color 0.3s'
                        }} placeholder="John Doe" onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email Address</label>
                        <input type="email" style={{ 
                          width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', 
                          background: '#F9FAFB', outline: 'none', fontFamily: "'Outfit', sans-serif", transition: 'border-color 0.3s'
                        }} placeholder="john@example.com" onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                      </div>
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number</label>
                        <input type="tel" style={{ 
                          width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', 
                          background: '#F9FAFB', outline: 'none', fontFamily: "'Outfit', sans-serif", transition: 'border-color 0.3s'
                        }} placeholder="+91 98765 43210" onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Subject</label>
                        <input type="text" style={{ 
                          width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', 
                          background: '#F9FAFB', outline: 'none', fontFamily: "'Outfit', sans-serif", transition: 'border-color 0.3s'
                        }} placeholder="Inquiry about project" onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#E5E7EB'} />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 600, color: '#4B5563', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Message</label>
                      <textarea rows="4" style={{ 
                        width: '100%', padding: '1rem 1.25rem', borderRadius: '12px', border: '1px solid #E5E7EB', 
                        background: '#F9FAFB', outline: 'none', fontFamily: "'Outfit', sans-serif", transition: 'border-color 0.3s', resize: 'vertical'
                      }} placeholder="How can we help you?" onFocus={e => e.target.style.borderColor = '#D4AF37'} onBlur={e => e.target.style.borderColor = '#E5E7EB'}></textarea>
                    </div>

                    <button style={{
                      padding: '1.25rem 2rem', background: '#0F1923', color: '#fff',
                      border: 'none', borderRadius: '50px', marginTop: '1rem',
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                      cursor: 'pointer', transition: 'all 0.3s', width: '100%'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#064E3B'; e.currentTarget.style.boxShadow = '0 10px 20px rgba(6,78,59,0.2)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = '#0F1923'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </AnimatedSection>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
