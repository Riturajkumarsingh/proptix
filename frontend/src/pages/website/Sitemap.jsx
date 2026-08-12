import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';

const Sitemap = () => {
  const sections = [
    {
      title: 'Main Pages',
      links: [
        { label: 'Home', path: '/' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact Us', path: '/contact' },
        { label: 'Our Services', path: '/services' },
      ]
    },
    {
      title: 'Properties & Projects',
      links: [
        { label: 'All Properties', path: '/properties' },
        { label: 'Featured Projects', path: '/projects' },
        { label: 'Book Site Visit', path: '/book-site-visit' },
      ]
    },
    {
      title: 'Company & Resources',
      links: [
        { label: 'Blog', path: '/blog' },
        { label: 'Gallery', path: '/gallery' },
        { label: 'Careers', path: '/career' },
        { label: 'Franchise Opportunities', path: '/franchise' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy-policy' },
        { label: 'Terms of Use', path: '/terms-of-use' },
        { label: 'RERA Compliance', path: '/rera-compliance' },
      ]
    }
  ];

  return (
    <div className="container" style={{ padding: '8rem 1.5rem 4rem', minHeight: '60vh', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '3rem', color: '#0F1923', marginBottom: '1rem' }}>Sitemap</h1>
        <p style={{ fontFamily: "'Outfit', sans-serif", color: '#4B5563', fontSize: '1.1rem' }}>
          Navigate through all the pages on the Proptix website.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        {sections.map((section, idx) => (
          <div key={idx} style={{ background: '#f8fafb', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.25rem', color: '#064E3B', marginBottom: '1.5rem', fontWeight: 700 }}>
              {section.title}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {section.links.map((link, i) => (
                <li key={i}>
                  <Link 
                    to={link.path}
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '0.5rem', 
                      textDecoration: 'none', color: '#4B5563', fontFamily: "'Outfit', sans-serif",
                      transition: 'all 0.2s', fontWeight: 500
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#D4AF37';
                      e.currentTarget.style.transform = 'translateX(5px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#4B5563';
                      e.currentTarget.style.transform = 'translateX(0)';
                    }}
                  >
                    <FiChevronRight size={14} style={{ color: '#D4AF37' }} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sitemap;
