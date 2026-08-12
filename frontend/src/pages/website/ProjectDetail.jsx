import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { FiMapPin, FiCheckCircle, FiInfo, FiImage, FiPhoneCall } from 'react-icons/fi';
import AnimatedSection from '@components/ui/AnimatedSection';

const AMENITIES = ['Club House', 'Swimming Pool', 'Gymnasium', 'Landscaped Gardens', '24x7 Security', 'Childrens Play Area', 'Jogging Track', 'Tennis Court'];

const ProjectDetail = () => {
  const { slug } = useParams();

  return (
    <>
      <Helmet>
        <title>Project Details | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Hero Section */}
      <section style={{
        position: 'relative', height: '60vh', minHeight: '500px',
        display: 'flex', alignItems: 'flex-end', paddingBottom: '4rem',
        marginTop: '-110px' // Pull up behind navbar if transparent
      }}>
        <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1923 0%, rgba(15,25,35,0.6) 40%, transparent 100%)', zIndex: 10 }} />
          <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1920&q=80" alt="Project" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 20 }}>
          <AnimatedSection animation="fadeUp">
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
              
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ 
                  display: 'inline-block', background: 'rgba(212,175,55,0.95)', backdropFilter: 'blur(4px)',
                  color: '#0F1923', padding: '0.5rem 1rem', borderRadius: '50px',
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', fontWeight: 800,
                  textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                }}>
                  Premium Project
                </div>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                  Proptix Heights
                </h1>
                <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', fontFamily: "'Outfit', sans-serif" }}>
                  <FiMapPin color="#D4AF37" /> Andheri West, Mumbai
                </p>
              </div>

              <div style={{ 
                background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', 
                border: '1px solid rgba(255,255,255,0.2)', padding: '2rem', 
                borderRadius: '24px', minWidth: '320px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
              }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                  Starting Price
                </p>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#D4AF37', fontWeight: 700, lineHeight: 1, marginBottom: '1.5rem' }}>
                  ₹2.5 Cr*
                </p>
                <Link to="/book-site-visit" style={{ textDecoration: 'none' }}>
                  <button style={{
                    width: '100%', padding: '1rem',
                    background: '#fff', color: '#0F1923',
                    border: 'none', borderRadius: '12px',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem',
                    cursor: 'pointer', transition: 'all 0.3s',
                    boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#D4AF37'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#0F1923'; }}
                  >
                    Enquire Now
                  </button>
                </Link>
              </div>

            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ backgroundColor: '#F8FAFB', padding: '5rem 0', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            
            {/* Left Column */}
            <div style={{ flex: '2 1 700px', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
              
              {/* Overview */}
              <AnimatedSection>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiInfo color="#D4AF37" /> Project Overview
                </h2>
                <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)' }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem', color: '#4B5563', lineHeight: 1.8, marginBottom: '2.5rem' }}>
                    Proptix Heights redefines luxury living in the heart of Mumbai. Offering exquisitely designed 3 and 4 BHK residences with sweeping city views, this project is a harmonious blend of nature and modern architecture.
                  </p>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '2.5rem' }}>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Status</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#0F1923', fontWeight: 600 }}>Under Construction</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Possession</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#0F1923', fontWeight: 600 }}>Dec 2026</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Total Area</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#0F1923', fontWeight: 600 }}>5 Acres</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>RERA No.</p>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#0F1923', fontWeight: 600 }}>P51800012345</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              {/* Amenities */}
              <AnimatedSection>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiCheckCircle color="#D4AF37" /> World-Class Amenities
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1.5rem' }}>
                  {AMENITIES.map((amenity, idx) => (
                    <div key={idx} style={{ 
                      background: '#fff', padding: '2rem 1rem', borderRadius: '20px', 
                      border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem',
                      textAlign: 'center', transition: 'all 0.3s', cursor: 'default'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.05)';
                      e.currentTarget.style.borderColor = 'rgba(212,175,55,0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)';
                      e.currentTarget.style.borderColor = 'rgba(0,0,0,0.05)';
                    }}
                    >
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
                        <FiCheckCircle size={24} />
                      </div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: '#0F1923', fontWeight: 600 }}>{amenity}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>

              {/* Gallery */}
              <AnimatedSection>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiImage color="#D4AF37" /> Project Gallery
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" alt="Gallery" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.opacity=0.8} onMouseLeave={(e)=>e.currentTarget.style.opacity=1} />
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80" alt="Gallery" style={{ width: '100%', height: '250px', objectFit: 'cover', borderRadius: '20px', cursor: 'pointer', transition: 'opacity 0.3s' }} onMouseEnter={(e)=>e.currentTarget.style.opacity=0.8} onMouseLeave={(e)=>e.currentTarget.style.opacity=1} />
                </div>
              </AnimatedSection>

            </div>

            {/* Right Column (Sticky Form) */}
            <div style={{ flex: '1 1 350px' }}>
              <div style={{ position: 'sticky', top: '120px', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                
                {/* Contact Form Box */}
                <div style={{ 
                  background: 'linear-gradient(145deg, #064E3B, #022c22)', 
                  padding: '2.5rem', borderRadius: '24px', color: '#fff',
                  boxShadow: '0 20px 40px rgba(2,44,34,0.15)'
                }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', marginBottom: '0.5rem' }}>
                    Interested?
                  </h3>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', lineHeight: 1.5 }}>
                    Leave your details and our property expert will get in touch with you shortly.
                  </p>
                  
                  <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
                    <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
                    <input type="tel" placeholder="Phone Number" style={{ width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: '#fff', fontFamily: "'Outfit', sans-serif", outline: 'none' }} />
                    
                    <button style={{
                      width: '100%', padding: '1rem', marginTop: '0.5rem',
                      background: '#D4AF37', color: '#0F1923',
                      border: 'none', borderRadius: '12px',
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem',
                      cursor: 'pointer', transition: 'all 0.3s',
                      boxShadow: '0 4px 15px rgba(212,175,55,0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                      Request Call Back
                    </button>
                  </form>
                </div>

                {/* Direct Call Box */}
                <div style={{ 
                  background: '#fff', padding: '2rem', borderRadius: '24px', 
                  border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                  display: 'flex', alignItems: 'center', gap: '1.5rem'
                }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D4AF37' }}>
                    <FiPhoneCall size={28} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Call our experts</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', fontWeight: 700 }}>+91 98765 43210</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectDetail;
