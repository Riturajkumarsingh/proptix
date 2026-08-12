import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiChevronLeft, FiChevronRight, FiX, FiZoomIn } from 'react-icons/fi';

const IMAGES = [
  { id: 1, category: 'Exteriors', src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80', title: 'Luxury Villa Facade' },
  { id: 2, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80', title: 'Modern Living Room' },
  { id: 3, category: 'Amenities', src: 'https://images.unsplash.com/photo-1576013551627-142858b73f76?w=1200&q=80', title: 'Infinity Pool' },
  { id: 4, category: 'Exteriors', src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80', title: 'Modern Architecture' },
  { id: 5, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600566753086-00f18efc2291?w=1200&q=80', title: 'Designer Kitchen' },
  { id: 6, category: 'Amenities', src: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80', title: 'State-of-the-art Gym' },
  { id: 7, category: 'Exteriors', src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80', title: 'Garden Estate' },
  { id: 8, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80', title: 'Master Bedroom' },
  { id: 9, category: 'Amenities', src: 'https://images.unsplash.com/photo-1582653291997-079a1c04e5a1?w=1200&q=80', title: 'Clubhouse Lounge' },
  { id: 10, category: 'Exteriors', src: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80', title: 'Evening View' },
  { id: 11, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80', title: 'Dining Area' },
  { id: 12, category: 'Amenities', src: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=1200&q=80', title: 'Landscaped Gardens' },
  { id: 13, category: 'Exteriors', src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&q=80', title: 'Premium Apartment Complex' },
  { id: 14, category: 'Interiors', src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80', title: 'Luxury Bathroom' },
  { id: 15, category: 'Amenities', src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', title: 'Spa & Wellness Center' },
];

const Gallery = () => {
  const [filter, setFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  
  const filtered = filter === 'All' ? IMAGES : IMAGES.filter(img => img.category === filter);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev + 1) % filtered.length);
  };
  
  const prevImage = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  };

  // Handle keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'ArrowRight') nextImage(e);
      if (e.key === 'ArrowLeft') prevImage(e);
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filtered.length]);

  return (
    <>
      <Helmet>
        <title>Gallery | Proptix Luxury Real Estate</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '50vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" 
          alt="Gallery Background" 
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
                Visual Tour
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Project <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Gallery</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Take a visual tour of our most stunning luxury developments.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery Section */}
      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB', minHeight: '100vh' }}>
        <div className="container">
          
          {/* Filters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '4rem' }}>
            {['All', 'Exteriors', 'Interiors', 'Amenities'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.75rem 2rem',
                  borderRadius: '50px',
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  letterSpacing: '0.05em',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  border: filter === cat ? '1px solid #D4AF37' : '1px solid rgba(0,0,0,0.1)',
                  background: filter === cat ? '#D4AF37' : '#fff',
                  color: filter === cat ? '#0F1923' : '#6B7280',
                  boxShadow: filter === cat ? '0 4px 15px rgba(212,175,55,0.3)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if(filter !== cat) {
                    e.currentTarget.style.borderColor = '#D4AF37';
                    e.currentTarget.style.color = '#0F1923';
                  }
                }}
                onMouseLeave={(e) => {
                  if(filter !== cat) {
                    e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)';
                    e.currentTarget.style.color = '#6B7280';
                  }
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {filtered.map((img, idx) => (
              <AnimatedSection 
                key={img.id} 
                animation="fadeUp" 
                delay={(idx % 3) * 0.1}
                style={{ marginBottom: '1.5rem', breakInside: 'avoid', display: 'block' }}
              >
                <div 
                  className="group relative overflow-hidden"
                  style={{ borderRadius: '24px', boxShadow: '0 15px 35px rgba(0,0,0,0.05)', cursor: 'zoom-in' }}
                  onClick={() => openLightbox(idx)}
                >
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    style={{ width: '100%', height: 'auto', display: 'block', transition: 'transform 0.8s ease' }} 
                    className="group-hover:scale-110"
                  />
                  <div 
                    style={{
                      position: 'absolute', inset: 0, 
                      background: 'linear-gradient(to top, rgba(15,25,35,0.85) 0%, rgba(15,25,35,0.3) 40%, rgba(15,25,35,0) 100%)',
                      transition: 'background 0.4s ease',
                      display: 'flex', alignItems: 'flex-end', padding: '2rem'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'linear-gradient(to top, rgba(15,25,35,0.95) 0%, rgba(15,25,35,0.5) 50%, rgba(15,25,35,0) 100%)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'linear-gradient(to top, rgba(15,25,35,0.85) 0%, rgba(15,25,35,0.3) 40%, rgba(15,25,35,0) 100%)'}
                  >
                    <div style={{ width: '100%' }}>
                      <span style={{ 
                        display: 'inline-block',
                        background: 'rgba(212,175,55,0.2)',
                        border: '1px solid rgba(212,175,55,0.4)',
                        color: '#D4AF37',
                        padding: '0.35rem 1rem',
                        borderRadius: '50px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        fontFamily: "'Outfit', sans-serif",
                        marginBottom: '0.5rem'
                      }}>
                        {img.category}
                      </span>
                      <h3 style={{ 
                        fontFamily: "'Playfair Display', serif", 
                        fontSize: '1.5rem', 
                        color: '#fff', 
                        margin: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}>
                        {img.title}
                        <FiZoomIn size={20} color="rgba(255,255,255,0.5)" />
                      </h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(15,25,35,0.95)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={closeLightbox}>
          
          {/* Close Button */}
          <button 
            style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', zIndex: 10 }}
            onClick={closeLightbox}
          >
            <FiX size={36} />
          </button>

          {/* Navigation Prev */}
          <button 
            style={{ position: 'absolute', left: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }}
            onClick={prevImage}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.5)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <FiChevronLeft size={28} />
          </button>

          {/* Main Image */}
          <div style={{ maxWidth: '90vw', maxHeight: '90vh', position: 'relative' }} onClick={e => e.stopPropagation()}>
            <img 
              src={filtered[lightboxIndex].src} 
              alt={filtered[lightboxIndex].title} 
              style={{ maxWidth: '100%', maxHeight: '85vh', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }} 
            />
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#fff', margin: 0 }}>
                {filtered[lightboxIndex].title}
              </h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: '#D4AF37', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.25rem' }}>
                {filtered[lightboxIndex].category}
              </p>
            </div>
          </div>

          {/* Navigation Next */}
          <button 
            style={{ position: 'absolute', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 10, transition: 'background 0.3s' }}
            onClick={nextImage}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(212,175,55,0.5)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          >
            <FiChevronRight size={28} />
          </button>

        </div>
      )}
    </>
  );
};

export default Gallery;
