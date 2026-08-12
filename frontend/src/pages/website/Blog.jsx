import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

const POSTS = [
  { id: 1, title: 'The Future of Luxury Real Estate in Mumbai', excerpt: 'Discover the latest trends and insights that are shaping the luxury real estate market this year.', date: '10 Aug 2026', category: 'Market Trends', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },
  { id: 2, title: 'Top 5 Investment Destinations in Maharashtra', excerpt: 'An in-depth analysis of emerging hotspots that guarantee high ROI for early investors.', date: '05 Aug 2026', category: 'Investment', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80' },
  { id: 3, title: 'Understanding RERA: A Buyer\'s Guide', excerpt: 'Everything you need to know about the Real Estate Regulation and Development Act.', date: '28 Jul 2026', category: 'Legal Advice', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80' },
  { id: 4, title: 'Interior Design Trends for Modern Villas', excerpt: 'How to style your new luxury property to maximize space, light, and elegance.', date: '15 Jul 2026', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80' },
  { id: 5, title: 'Why Commercial Real Estate is Booming', excerpt: 'Exploring the sudden surge in demand for premium office spaces and retail outlets.', date: '02 Jul 2026', category: 'Market Trends', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' },
  { id: 6, title: 'The Importance of Vastu in Modern Homes', excerpt: 'Blending ancient architectural science with contemporary luxury living designs.', date: '20 Jun 2026', category: 'Architecture', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' }
];

const Blog = () => {
  return (
    <>
      <Helmet>
        <title>Blog | Proptix Luxury Insights</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '50vh', minHeight: '400px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" 
          alt="Blog Background" 
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
                Expert Insights
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
              Real Estate <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Insights</span>
            </h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
              Stay updated with the latest market trends, investment tips, and company news.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: '6rem 0', backgroundColor: '#F8FAFB', minHeight: '100vh' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
            {POSTS.map((post, idx) => (
              <AnimatedSection key={post.id} animation="fadeUp" delay={(idx % 3) * 0.1}>
                <div style={{
                  background: '#fff', borderRadius: '24px', overflow: 'hidden',
                  border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 15px 35px rgba(0,0,0,0.03)',
                  display: 'flex', flexDirection: 'column', height: '100%',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
                className="group"
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.08)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.03)';
                }}
                >
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <div style={{
                      position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
                      background: 'rgba(15,25,35,0.85)', backdropFilter: 'blur(5px)',
                      color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      padding: '0.35rem 1rem', borderRadius: '50px',
                      fontFamily: "'Outfit', sans-serif"
                    }}>
                      {post.category}
                    </div>
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                      className="group-hover:scale-110"
                    />
                  </div>
                  
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif", marginBottom: '1rem' }}>
                      <FiCalendar /> {post.date}
                    </div>
                    
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#0F1923', marginBottom: '1rem', lineHeight: 1.3 }}>
                      {post.title}
                    </h3>
                    
                    <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1rem', color: '#6B7280', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                      {post.excerpt}
                    </p>
                    
                    <Link to={`/blog/${post.id}`} style={{ textDecoration: 'none' }}>
                      <button style={{
                        background: 'transparent', border: 'none', padding: 0,
                        color: '#064E3B', fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                        fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                        display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                        transition: 'color 0.3s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#D4AF37'}
                      onMouseLeave={e => e.currentTarget.style.color = '#064E3B'}
                      >
                        Read Article <FiArrowRight />
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

export default Blog;
