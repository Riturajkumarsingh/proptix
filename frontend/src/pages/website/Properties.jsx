import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiFilter, FiMapPin, FiChevronRight } from 'react-icons/fi';
import AnimatedSection from '@components/ui/AnimatedSection';
import { Link, useSearchParams } from 'react-router-dom';

const PROPERTIES = [
  { id: 1, name: 'The Golden Crest', location: 'Worli, Mumbai', price: '₹12.5 Cr', type: 'Villa', badge: 'New Launch', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 2, name: 'Emerald Heights', location: 'Bandra West, Mumbai', price: '₹8.0 Cr', type: 'Apartment', badge: 'Hot Selling', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80' },
  { id: 3, name: 'Sapphire Residency', location: 'Koregaon Park, Pune', price: '₹5.5 Cr', type: 'Pent House', badge: '', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80' },
  { id: 4, name: 'Royal Oasis Plots', location: 'Lonavala, Maharashtra', price: '₹2.0 Cr', type: 'Plot', badge: '', image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb65?w=800&q=80' },
  { id: 5, name: 'Crown Plaza', location: 'Baner, Pune', price: '₹4.2 Cr', type: 'Commercial', badge: 'Premium', image: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&q=80' },
  { id: 6, name: 'Majestic Villas', location: 'Alibaug, Maharashtra', price: '₹15.0 Cr', type: 'Villa', badge: '', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' },
];

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [selectedType, setSelectedType] = useState('All Types');
  const [filteredProperties, setFilteredProperties] = useState(PROPERTIES);

  useEffect(() => {
    // Read from URL query params
    const typeParam = searchParams.get('type');
    const locationParam = searchParams.get('location');

    let currentType = 'All Types';

    if (typeParam) {
      // Map URL types to Filter Types if necessary, or just use it directly
      const formattedType = typeParam.toLowerCase();
      if (formattedType.includes('villa')) currentType = 'Villas';
      else if (formattedType.includes('plot')) currentType = 'Plots';
      else if (formattedType.includes('apartment')) currentType = 'Apartments';
      else if (formattedType.includes('commercial')) currentType = 'Commercial';
      else currentType = typeParam;
      setSelectedType(currentType);
    }

    // Filter logic
    let filtered = PROPERTIES;

    if (currentType !== 'All Types') {
      filtered = filtered.filter(p => {
        const pType = p.type.toLowerCase();
        const cType = currentType.toLowerCase();
        // A simple loose match: if property type is 'Villa', and filter is 'Villas', it matches.
        return cType.includes(pType) || pType.includes(cType.replace(/s$/, ''));
      });
    }

    if (locationParam) {
      filtered = filtered.filter(p => 
        p.location.toLowerCase().includes(locationParam.toLowerCase()) ||
        p.name.toLowerCase().includes(locationParam.toLowerCase())
      );
    }

    setFilteredProperties(filtered);
  }, [searchParams]);
  return (
    <>
      <Helmet>
        <title>Properties | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '45vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" 
          alt="Properties Background" 
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
                Exclusive Collection
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Discover Your <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Home</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Explore our handpicked selection of premium real estate across Maharashtra, curated for the most discerning buyers.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content Area */}
      <section style={{ backgroundColor: '#F8FAFB', padding: '5rem 0', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '3rem', flexDirection: 'row', flexWrap: 'wrap' }}>
            
            {/* Sidebar Filters */}
            <div style={{ flex: '1 1 300px', maxWidth: '350px' }}>
              <div style={{ 
                position: 'sticky', top: '120px', 
                background: '#fff', padding: '2rem', 
                borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FiFilter color="#D4AF37" /> Filters
                </h3>

                {/* Property Type */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#0F1923', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1.25rem' }}>
                    Property Type
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {['All Types', 'Villas', 'Plots', 'Apartments', 'Commercial'].map((type) => (
                      <Link key={type} to={`/properties${type === 'All Types' ? '' : `?type=${type}`}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', color: '#4B5563' }}>
                        <input type="radio" name="ptype" checked={type === selectedType} readOnly style={{ accentColor: '#D4AF37', width: '18px', height: '18px', pointerEvents: 'none' }} /> 
                        {type}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#0F1923', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1.25rem' }}>
                    Location
                  </label>
                  <select style={{ 
                    width: '100%', padding: '0.875rem 1.25rem', 
                    background: '#F8FAFB', border: '1px solid rgba(0,0,0,0.1)', 
                    borderRadius: '12px', fontFamily: "'Outfit', sans-serif", 
                    fontSize: '0.95rem', color: '#0F1923', outline: 'none'
                  }}>
                    <option>Any Location</option>
                    <option>Mumbai</option>
                    <option>Pune</option>
                    <option>Nashik</option>
                  </select>
                </div>

                {/* Budget */}
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', fontWeight: 700, color: '#0F1923', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: '1.25rem' }}>
                    Budget Range
                  </label>
                  <input type="range" min="0" max="100" style={{ width: '100%', accentColor: '#D4AF37' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem', color: '#6B7280', marginTop: '0.5rem' }}>
                    <span>₹0</span>
                    <span>₹20+ Cr</span>
                  </div>
                </div>

                <button style={{
                  width: '100%', padding: '1rem',
                  background: 'linear-gradient(135deg, #064E3B, #022c22)',
                  color: '#fff', border: 'none', borderRadius: '12px',
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem',
                  cursor: 'pointer', transition: 'all 0.2s',
                  boxShadow: '0 4px 15px rgba(6,78,59,0.2)'
                }}>
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Properties Grid */}
            <div style={{ flex: '3 1 600px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", color: '#4B5563', fontSize: '1rem' }}>
                  Showing <span style={{ fontWeight: 700, color: '#0F1923' }}>{filteredProperties.length}</span> luxury properties
                </p>
              </div>

              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '2.5rem' 
              }}>
                {filteredProperties.length === 0 ? (
                  <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: '#6B7280', fontFamily: "'Outfit', sans-serif" }}>
                    <p style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No properties found matching your search.</p>
                    <p style={{ fontSize: '0.95rem' }}>Try adjusting your filters.</p>
                  </div>
                ) : (
                  filteredProperties.map((prop, idx) => (
                  <AnimatedSection key={prop.id} animation="fadeUp" delay={idx * 0.1}>
                    <Link to={`/projects/${prop.type.toLowerCase()}/${prop.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div style={{
                        background: '#fff', borderRadius: '24px', overflow: 'hidden',
                        boxShadow: '0 10px 40px rgba(0,0,0,0.04)', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer', border: '1px solid rgba(0,0,0,0.02)',
                        height: '100%', display: 'flex', flexDirection: 'column'
                      }}
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
                        <div style={{ position: 'relative', height: '260px', overflow: 'hidden' }}>
                          <img 
                            src={prop.image} 
                            alt={prop.name} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} 
                          />
                          {prop.badge && (
                            <div style={{
                              position: 'absolute', top: '1.25rem', left: '1.25rem',
                              background: 'rgba(212,175,55,0.95)', backdropFilter: 'blur(4px)',
                              color: '#0F1923', padding: '0.5rem 1rem', borderRadius: '50px',
                              fontFamily: "'Outfit', sans-serif", fontSize: '0.7rem', fontWeight: 800,
                              textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                            }}>
                              {prop.badge}
                            </div>
                          )}
                          <div style={{
                            position: 'absolute', bottom: '1.25rem', right: '1.25rem',
                            background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(4px)',
                            color: '#0F1923', padding: '0.5rem 1rem', borderRadius: '50px',
                            fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', fontWeight: 800,
                            textTransform: 'uppercase', letterSpacing: '0.1em', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                          }}>
                            {prop.type}
                          </div>
                        </div>

                        {/* Content Box */}
                        <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '0.75rem', lineHeight: 1.3 }}>
                            {prop.name}
                          </h3>
                          <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.95rem', fontFamily: "'Outfit', sans-serif", marginBottom: '1.5rem' }}>
                            <FiMapPin color="#D4AF37" size={18} /> {prop.location}
                          </p>
                          
                          <div style={{ 
                            marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid rgba(0,0,0,0.05)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'
                          }}>
                            <div>
                              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.75rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>
                                Starting From
                              </p>
                              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#D4AF37', fontWeight: 700, lineHeight: 1 }}>
                                {prop.price}
                              </p>
                            </div>
                            <div style={{ 
                              width: '44px', height: '44px', borderRadius: '50%',
                              background: '#F8FAFB', display: 'flex', alignItems: 'center', justifyContent: 'center',
                              color: '#0F1923', border: '1px solid rgba(0,0,0,0.05)',
                              transition: 'all 0.3s'
                            }}
                            className="property-arrow"
                            >
                              <FiChevronRight size={20} />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Properties;
