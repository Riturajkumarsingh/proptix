import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight } from 'react-icons/fi';
import AnimatedSection from '@components/ui/AnimatedSection';

const PROJECTS = [
  { id: 1, name: 'The Golden Crest', location: 'Worli, Mumbai', price: '₹12.5 Cr onwards', type: 'Residential', status: 'Under Construction', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', badge: 'New Launch' },
  { id: 2, name: 'Emerald Heights', location: 'Bandra West, Mumbai', price: '₹8.0 Cr onwards', type: 'Residential', status: 'Ready to Move', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80', badge: 'Hot Selling' },
  { id: 3, name: 'Sapphire Residency', location: 'Koregaon Park, Pune', price: '₹5.5 Cr onwards', type: 'Villas', status: 'Under Construction', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80', badge: '' },
  { id: 4, name: 'Royal Oasis Plots', location: 'Lonavala, Maharashtra', price: '₹2.0 Cr onwards', type: 'Residential', status: 'Ready to Move', image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?w=800&q=80', badge: '' },
  { id: 5, name: 'Crown Plaza', location: 'Baner, Pune', price: '₹4.2 Cr onwards', type: 'Commercial', status: 'Under Construction', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80', badge: 'Premium' },
  { id: 6, name: 'Majestic Villas', location: 'Alibaug, Maharashtra', price: '₹15.0 Cr onwards', type: 'Villas', status: 'Ready to Move', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', badge: '' },
];

const ProjectsList = () => {
  return (
    <>
      <Helmet>
        <title>Projects | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '45vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" 
          alt="Projects Background" 
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
                Premium Developments
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.5rem, 8vw, 3.5rem)', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Our <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Signature</span> Projects
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Explore our portfolio of meticulously crafted luxury developments across prime locations.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Projects Grid */}
      <section style={{ backgroundColor: '#F8FAFB', padding: '5rem 0', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '2rem' 
          }}>
            {PROJECTS.map((proj, idx) => (
              <AnimatedSection key={proj.id} animation="fadeUp" delay={idx * 0.1}>
                <div style={{
                  background: '#fff', borderRadius: '24px', overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid rgba(0,0,0,0.02)',
                  height: '100%', display: 'flex', flexDirection: 'column'
                }}
                className="group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.08)';
                  const img = e.currentTarget.querySelector('img');
                  if(img) img.style.transform = 'scale(1.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.04)';
                  const img = e.currentTarget.querySelector('img');
                  if(img) img.style.transform = 'scale(1)';
                }}
                >
                  {/* Image Box */}
                  <div style={{ position: 'relative', height: '280px', overflow: 'hidden' }}>
                    <img 
                      src={proj.image} 
                      alt={proj.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                    />
                    {proj.badge && (
                      <div style={{
                        position: 'absolute', top: '1.25rem', left: '1.25rem',
                        background: 'rgba(212,175,55,0.95)', backdropFilter: 'blur(4px)',
                        color: '#0F1923', padding: '0.5rem 1rem', borderRadius: '50px',
                        fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800,
                        textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                      }}>
                        {proj.badge}
                      </div>
                    )}
                    <div style={{
                      position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)',
                      color: '#0F1923', padding: '0.5rem 1rem', borderRadius: '50px',
                      fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}>
                      {proj.type}
                    </div>
                  </div>

                  {/* Content Box */}
                  <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', color: '#0F1923', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                      {proj.name}
                    </h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif", marginBottom: '1.5rem' }}>
                      <FiMapPin color="#D4AF37" size={18} /> {proj.location}
                    </p>
                    
                    <div style={{ 
                      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem',
                      paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)', marginBottom: '1.5rem'
                    }}>
                      <div>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                          Starting Price
                        </p>
                        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#0F1923', fontWeight: 700, lineHeight: 1 }}>
                          {proj.price}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                          Status
                        </p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', color: '#064E3B', fontWeight: 600, lineHeight: 1 }}>
                          {proj.status}
                        </p>
                      </div>
                    </div>

                    <Link to={`/projects/${proj.type.toLowerCase()}/${proj.id}`} style={{ textDecoration: 'none', marginTop: 'auto' }}>
                      <button style={{
                        width: '100%', padding: '1rem',
                        background: '#F8FAFB', color: '#0F1923',
                        border: '1px solid rgba(0,0,0,0.1)', borderRadius: '12px',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        cursor: 'pointer', transition: 'all 0.3s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#064E3B';
                        e.currentTarget.style.color = '#fff';
                        e.currentTarget.style.borderColor = '#064E3B';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#F8FAFB';
                        e.currentTarget.style.color = '#0F1923';
                        e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                      }}
                      >
                        View Details <FiArrowRight />
                      </button>
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProjectsList;
