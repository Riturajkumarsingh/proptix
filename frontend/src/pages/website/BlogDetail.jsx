import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import AnimatedSection from '@components/ui/AnimatedSection';
import { FiCalendar, FiUser, FiArrowLeft, FiTag } from 'react-icons/fi';

const BlogDetail = () => {
  const { id } = useParams();

  // In a real app, you would fetch the blog post data based on the ID. 
  // For now, we use a static mock layout.
  
  return (
    <>
      <Helmet>
        <title>The Future of Luxury Real Estate | Proptix Insights</title>
      </Helmet>

      {/* Luxury Hero Section */}
      <section style={{
        position: 'relative', height: '60vh', minHeight: '450px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', background: '#0F1923'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80" 
          alt="Blog Article Background" 
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0F1923 0%, rgba(15,25,35,0.2) 100%)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', paddingTop: '4rem' }}>
          <AnimatedSection animation="fadeUp">
            <div style={{ 
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem', 
              background: 'rgba(212,175,55,0.2)', border: '1px solid rgba(212,175,55,0.4)',
              padding: '0.5rem 1rem', borderRadius: '50px', marginBottom: '1.5rem'
            }}>
              <span style={{ color: '#D4AF37', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', fontFamily: "'Outfit', sans-serif" }}>
                Market Trends
              </span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3.5rem', color: '#fff', marginBottom: '1.5rem', lineHeight: 1.2, maxWidth: '900px', margin: '0 auto' }}>
              The Future of <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Luxury Real Estate</span> in Maharashtra
            </h1>
            
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2rem', color: 'rgba(255,255,255,0.7)', fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem', marginTop: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiCalendar color="#D4AF37" /> 10 Aug 2026
              </div>
              <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FiUser color="#D4AF37" /> Proptix Editorial Team
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section style={{ padding: '4rem 0 8rem', backgroundColor: '#F8FAFB', minHeight: '100vh' }}>
        <div className="container max-w-4xl">
          <AnimatedSection animation="fadeUp">
            
            <div style={{ marginBottom: '2rem' }}>
              <Link to="/blog" style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: '#6B7280', textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
                fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'color 0.3s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#064E3B'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B7280'}
              >
                <FiArrowLeft /> Back to Blog
              </Link>
            </div>
            
            <div style={{ 
              background: '#fff', borderRadius: '24px', padding: '4rem', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.05)' 
            }}>
              
              <div style={{ 
                fontFamily: "'Outfit', sans-serif", fontSize: '1.1rem', color: '#4B5563', 
                lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '1.5rem' 
              }}>
                <p>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '4rem', float: 'left', lineHeight: 0.8, color: '#D4AF37', marginRight: '0.5rem', marginTop: '0.5rem' }}>T</span>he luxury real estate market in Maharashtra, particularly in cities like Mumbai and Pune, is undergoing a massive transformation. Buyers are no longer just looking for square footage; they want smart homes, sustainable architecture, and exclusive community amenities that mirror their evolving lifestyle expectations.
                </p>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Rise of Smart Automation
                </h3>
                <p>
                  Today's luxury villas and high-end apartments are fully integrated with smart home technologies. From AI-driven climate control to advanced biometric security and responsive lighting systems, these features are becoming standard expectations rather than optional upgrades.
                </p>
                
                <div style={{ margin: '2.5rem 0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80" alt="Smart Home Interior" style={{ width: '100%', height: 'auto', display: 'block' }} />
                </div>

                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#0F1923', marginTop: '2rem', marginBottom: '0.5rem' }}>
                  Focus on Wellness & Sustainability
                </h3>
                <p>
                  Post-2020, there is a heightened focus on wellness amenities. Developers are dedicating more space to landscaped gardens, advanced air purification systems, and extensive sports facilities to ensure a holistic living experience. Furthermore, sustainable building materials and energy-efficient designs are highly sought after by modern investors.
                </p>

                <blockquote style={{ 
                  fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontStyle: 'italic', 
                  color: '#064E3B', margin: '3rem 0', padding: '2rem', borderLeft: '4px solid #D4AF37', 
                  background: 'rgba(212,175,55,0.05)', borderRadius: '0 16px 16px 0'
                }}>
                  "Luxury is no longer just about aesthetics or location; it's about providing a sanctuary that promotes well-being, sustainability, and unparalleled convenience."
                </blockquote>

                <p>
                  At Proptix, we are at the forefront of this evolution, ensuring that every project we develop meets these new global standards of luxury living. We continuously study market patterns to ensure our clients are investing in future-proof properties that appreciate both in financial value and lifestyle quality.
                </p>
              </div>

              {/* Tags Section */}
              <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FiTag color="#6B7280" />
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  {['Luxury', 'Mumbai', 'Smart Homes', 'Investment'].map(tag => (
                    <span key={tag} style={{ 
                      fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 600, color: '#4B5563', 
                      background: '#F3F4F6', padding: '0.4rem 1rem', borderRadius: '50px' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </AnimatedSection>

          {/* Related Articles Section */}
          <AnimatedSection animation="fadeUp" delay={0.2}>
            <div style={{ marginTop: '6rem' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: '#0F1923', marginBottom: '2.5rem', textAlign: 'center' }}>
                Related <span style={{ color: '#064E3B', fontStyle: 'italic' }}>Articles</span>
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                {[
                  { id: 2, title: 'Top 5 Investment Destinations in Maharashtra', date: '05 Aug 2026', category: 'Investment', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80' },
                  { id: 4, title: 'Interior Design Trends for Modern Villas', date: '15 Jul 2026', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=600&q=80' }
                ].map((post) => (
                  <Link to={`/blog/${post.id}`} key={post.id} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: '#fff', borderRadius: '20px', overflow: 'hidden',
                      border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 10px 25px rgba(0,0,0,0.02)',
                      display: 'flex', flexDirection: 'column', height: '100%',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-8px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.06)';
                      e.currentTarget.querySelector('img').style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.02)';
                      e.currentTarget.querySelector('img').style.transform = 'scale(1)';
                    }}
                    >
                      <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                        <div style={{
                          position: 'absolute', top: '1rem', left: '1rem', zIndex: 10,
                          background: 'rgba(15,25,35,0.85)', backdropFilter: 'blur(5px)',
                          color: '#D4AF37', fontSize: '0.7rem', fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '0.1em',
                          padding: '0.25rem 0.75rem', borderRadius: '50px',
                          fontFamily: "'Outfit', sans-serif"
                        }}>
                          {post.category}
                        </div>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                        />
                      </div>
                      
                      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9CA3AF', fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", marginBottom: '0.75rem' }}>
                          <FiCalendar /> {post.date}
                        </div>
                        <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#0F1923', margin: 0, lineHeight: 1.3 }}>
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </AnimatedSection>

        </div>
      </section>
    </>
  );
};

export default BlogDetail;
