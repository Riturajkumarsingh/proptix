import React from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiEye, FiTarget, FiAward, FiCheckCircle, FiTrendingUp, FiUsers, FiHome, FiShield } from 'react-icons/fi';

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '50vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" 
          alt="About Background" 
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
                Our Heritage
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              About <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Proptix</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Maharashtra's premier luxury real estate developer.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Story Section */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB' }}>
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
            <AnimatedSection animation="fadeLeft" style={{ flex: '1 1 300px' }}>
              <h2 style={{ 
                fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, 
                color: '#D4AF37', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '1rem' 
              }}>
                Our Story
              </h2>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#0F1923', marginBottom: '2rem', lineHeight: 1.2 }}>
                Building Legacies, <span style={{ fontStyle: 'italic', color: '#064E3B' }}>Not Just Homes</span>
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', fontFamily: "'Outfit', sans-serif", color: '#4B5563', fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '3rem' }}>
                <p>
                  Founded over 15 years ago, Proptix started with a singular vision: to bring transparency, luxury, and trust to the Indian real estate market. Today, we are proud to be the most trusted name in Maharashtra for premium residential and commercial developments.
                </p>
                <p>
                  Our commitment to RERA compliance, clear titles, and architectural excellence has helped over 5,000 families find their dream homes and secure their financial futures.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: '#fff', borderRadius: '20px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
                  <FiAward size={28} />
                </div>
                <div>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#0F1923', marginBottom: '0.25rem' }}>Award Winning</p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#6B7280' }}>Best Luxury Developer 2023</p>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeRight" style={{ flex: '1 1 300px' }}>
              <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
                <img 
                  src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&q=80" 
                  alt="About Proptix" 
                  style={{ width: '100%', height: 'auto', display: 'block', transform: 'scale(1.05)', transition: 'transform 10s ease' }} 
                  onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.1)'} 
                  onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1.05)'} 
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '4rem 0', background: '#fff', borderTop: '1px solid rgba(0,0,0,0.05)', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', margin: '0 auto 1.5rem' }}>
                <FiUsers size={28} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: '#0F1923', marginBottom: '0.5rem', lineHeight: 1 }}>5,000+</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Happy Families</p>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', margin: '0 auto 1.5rem' }}>
                <FiTrendingUp size={28} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: '#0F1923', marginBottom: '0.5rem', lineHeight: 1 }}>15+</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Years of Legacy</p>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.3}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', margin: '0 auto 1.5rem' }}>
                <FiHome size={28} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: '#0F1923', marginBottom: '0.5rem', lineHeight: 1 }}>50+</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Projects Delivered</p>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.4}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', margin: '0 auto 1.5rem' }}>
                <FiShield size={28} />
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 3rem)', fontWeight: 700, color: '#0F1923', marginBottom: '0.5rem', lineHeight: 1 }}>100%</p>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Clear Titles</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section style={{ padding: '6rem 0', background: 'linear-gradient(180deg, #0c1a14 0%, #022c22 100%)', color: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem' }}>
            
            <AnimatedSection animation="fadeUp">
              <div style={{ 
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', 
                border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', 
                borderRadius: '24px', height: '100%', display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(212,175,55,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', marginBottom: '2rem' }}>
                  <FiEye size={32} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', marginBottom: '1.5rem' }}>Our Vision</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: '#f3f4f6', lineHeight: 1.8 }}>
                  To be the gold standard in luxury real estate, creating iconic developments that enhance the quality of life for our residents while providing exceptional returns for our investors.
                </p>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div style={{ 
                background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', 
                border: '1px solid rgba(255,255,255,0.1)', padding: '3rem', 
                borderRadius: '24px', height: '100%', display: 'flex', flexDirection: 'column'
              }}>
                <div style={{ width: '64px', height: '64px', background: 'rgba(212,175,55,0.15)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', marginBottom: '2rem' }}>
                  <FiTarget size={32} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#fff', marginBottom: '1.5rem' }}>Our Mission</h3>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: '#f3f4f6', lineHeight: 1.8 }}>
                  To deliver uncompromising quality through transparent processes, innovative design, and a relentless focus on customer satisfaction at every touchpoint of the buying journey.
                </p>
              </div>
            </AnimatedSection>
            
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '600px', margin: '0 auto 4rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#0F1923', marginBottom: '1rem', lineHeight: 1.2 }}>
              Our <span style={{ fontStyle: 'italic', color: '#D4AF37' }}>Core Values</span>
            </h2>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '1.05rem', lineHeight: 1.6 }}>
              The principles that guide every brick we lay and every promise we make.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <AnimatedSection animation="fadeUp" delay={0.1}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '100%', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', marginBottom: '1.5rem' }}>
                  <FiCheckCircle size={24} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '1rem' }}>Transparency</h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6 }}>Clear titles, honest pricing, and complete RERA compliance. No hidden costs.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.2}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '100%', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(6,78,59,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#064E3B', marginBottom: '1.5rem' }}>
                  <FiAward size={24} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '1rem' }}>Excellence</h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6 }}>Uncompromising architectural quality and premium finishings in every project.</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fadeUp" delay={0.3}>
              <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)', height: '100%', transition: 'all 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.transform='translateY(-5px)'} onMouseLeave={(e)=>e.currentTarget.style.transform='translateY(0)'}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37', marginBottom: '1.5rem' }}>
                  <FiUsers size={24} />
                </div>
                <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '1rem' }}>Customer First</h4>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.6 }}>Dedicated support from the first site visit to the final handover of keys.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
