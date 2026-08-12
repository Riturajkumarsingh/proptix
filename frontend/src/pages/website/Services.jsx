import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiHome, FiBriefcase, FiFileText, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SERVICES = [
  { icon: <FiHome size={32} />, title: 'Property Buying', desc: 'Expert guidance to help you find and purchase the perfect residential or commercial property across prime locations.' },
  { icon: <FiBriefcase size={32} />, title: 'Property Selling', desc: 'End-to-end support to get the best market value for your property with zero hassle and complete transparency.' },
  { icon: <FiTrendingUp size={32} />, title: 'Investment Advisory', desc: 'Data-driven insights and market analysis to help you build a highly profitable, future-proof real estate portfolio.' },
  { icon: <FiFileText size={32} />, title: 'Legal Assistance', desc: 'Complete legal support, from rigorous title verification to seamless RERA compliance and property registration.' },
];

const Services = () => {
  return (
    <>
      <Helmet>
        <title>Our Services | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '50vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80" 
          alt="Services Background" 
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
                Bespoke Solutions
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Our <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Services</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Comprehensive real estate solutions tailored to your unique lifestyle and investment needs.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Content Section */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB', minHeight: '100vh' }}>
        <div className="container">
          <AnimatedSection className="text-center" style={{ maxWidth: '700px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#0F1923', marginBottom: '1rem' }}>
              What We Offer
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.6 }}>
              Experience seamless real estate transactions backed by our industry expertise, deep market knowledge, and an unwavering dedication to excellence.
            </p>
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            {SERVICES.map((srv, idx) => (
              <AnimatedSection key={idx} animation="fadeUp" delay={idx * 0.1}>
                <div style={{ 
                  background: '#fff', padding: '3rem 2rem', borderRadius: '24px', 
                  border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                  display: 'flex', flexDirection: 'column', height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                  const iconBox = e.currentTarget.querySelector('.icon-box');
                  if(iconBox) {
                    iconBox.style.background = '#064E3B';
                    iconBox.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                  const iconBox = e.currentTarget.querySelector('.icon-box');
                  if(iconBox) {
                    iconBox.style.background = 'rgba(212,175,55,0.1)';
                    iconBox.style.color = '#D4AF37';
                  }
                }}
                >
                  <div 
                    className="icon-box"
                    style={{ 
                      width: '70px', height: '70px', borderRadius: '20px', 
                      background: 'rgba(212,175,55,0.1)', color: '#D4AF37',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', 
                      marginBottom: '2rem', transition: 'all 0.4s'
                    }}
                  >
                    {srv.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', color: '#0F1923', marginBottom: '1rem', lineHeight: 1.2 }}>
                    {srv.title}
                  </h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '2rem', flexGrow: 1 }}>
                    {srv.desc}
                  </p>
                  
                  <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '1.5rem' }}>
                    <Link to="/contact" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#064E3B', textDecoration: 'none', fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Learn More <FiChevronRight size={18} />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #0c1a14 0%, #022c22 100%)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
              Ready to find your <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Property?</span>
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: 'rgba(255,255,255,0.8)', maxWidth: '600px', margin: '0 auto 3rem' }}>
              Connect with our real estate experts today and experience a seamless journey towards your next big investment.
            </p>
            <Link to="/contact" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '1.25rem 3rem', background: '#D4AF37', color: '#0F1923',
                border: 'none', borderRadius: '50px',
                fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(212,175,55,0.4)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Contact Us Today
              </button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Services;
