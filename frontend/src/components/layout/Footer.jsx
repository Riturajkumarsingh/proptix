import { Link } from 'react-router-dom';
import {
  FiPhone, FiMail, FiMapPin,
  FiFacebook, FiInstagram, FiYoutube, FiLinkedin, FiTwitter,
  FiHome, FiArrowRight,
} from 'react-icons/fi';

const LINKS = {
  'Quick Links': [
    { label: 'Home',         href: '/' },
    { label: 'About Us',     href: '/about' },
    { label: 'Projects',     href: '/projects' },
    { label: 'Gallery',      href: '/gallery' },
    { label: 'Blog',         href: '/blog' },
    { label: 'Contact',      href: '/contact' },
  ],
  'Properties': [
    { label: 'Residential Plots', href: '/properties?type=Plots' },
    { label: 'Luxury Villas',     href: '/properties?type=Villas' },
    { label: 'Commercial Land',   href: '/properties?type=Commercial' },
    { label: 'Farm Houses',       href: '/properties?type=Farm Houses' },
    { label: 'Apartments',        href: '/properties?type=Apartments' },
    { label: 'Pent Houses',       href: '/properties?type=Pent Houses' },
    { label: 'Studio Apartments', href: '/properties?type=Studio Apartments' },
  ],
};

const SOCIALS = [
  { icon: FiFacebook,  href: '#', label: 'Facebook'  },
  { icon: FiInstagram, href: '#', label: 'Instagram'  },
  { icon: FiYoutube,   href: '#', label: 'YouTube'    },
  { icon: FiLinkedin,  href: '#', label: 'LinkedIn'   },
  { icon: FiTwitter,   href: '#', label: 'Twitter'    },
];

const Footer = () => (
  <footer style={{ background: 'linear-gradient(180deg, #0c1a14 0%, #022c22 60%, #011a12 100%)', color: '#fff' }}>
    <div className="container" style={{ padding: '6rem 1.5rem 3rem' }}>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '4rem', 
        marginBottom: '4rem',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ flex: '1 1 300px', maxWidth: '350px' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', marginBottom: '1.25rem' }}>
            <div style={{
              width: '42px', height: '42px', borderRadius: '11px',
              background: 'rgba(212,175,55,0.15)',
              border: '1.5px solid rgba(212,175,55,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FiHome size={20} color="#D4AF37" />
            </div>
            <div>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', lineHeight: 1 }}>
                Prop<span style={{ color: '#D4AF37' }}>tix</span>
              </div>
              <div style={{ fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginTop: '2px' }}>
                Your Dream Home Awaits
              </div>
            </div>
          </Link>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.75, margin: '1rem 0 2rem', paddingRight: '1rem', fontFamily: "'Outfit', sans-serif" }}>
            Proptix is Maharashtra's premier real estate company, offering RERA compliant projects with clear titles and best-in-class service since 2009.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  transition: 'all 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#064E3B';
                  e.currentTarget.style.color = '#D4AF37';
                  e.currentTarget.style.borderColor = '#064E3B';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Link Groups */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', flex: '2 1 450px' }}>
          {Object.entries(LINKS).map(([group, links]) => (
            <div key={group} style={{ flex: '1 1 140px' }}>
              <h4 style={{
                fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                fontSize: '0.85rem', color: '#D4AF37', marginBottom: '1.5rem',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                {group}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                {links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      to={href}
                      style={{
                        color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem',
                        textDecoration: 'none', transition: 'color 0.15s',
                        display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
                        fontFamily: "'Outfit', sans-serif",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; }}
                    >
                      <FiArrowRight size={12} style={{ flexShrink: 0 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Us & Working Hours */}
        <div style={{ flex: '1 1 250px' }}>
          <h4 style={{
            fontFamily: "'Outfit', sans-serif", fontWeight: 700,
            fontSize: '0.85rem', color: '#D4AF37', marginBottom: '1.5rem',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Contact Us
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {[
              { icon: FiMapPin,  text: '502, Empire Heights, BKC, Mumbai 400051' },
              { icon: FiPhone,   text: '+91 98765 43210' },
              { icon: FiMail,    text: 'info@proptix.com' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <Icon size={16} style={{ color: '#D4AF37', flexShrink: 0, marginTop: '2px' }} />
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.9rem', lineHeight: 1.6, fontFamily: "'Outfit', sans-serif" }}>
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Subscribe */}
          <div style={{
            marginTop: '2rem', padding: '1.25rem',
            background: 'rgba(212,175,55,0.05)',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
          }}>
            <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.85rem', color: '#D4AF37', marginBottom: '0.5rem' }}>
              Subscribe
            </p>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.8rem', fontFamily: "'Outfit', sans-serif", lineHeight: 1.5, margin: '0 0 1rem' }}>
              Get the latest updates on new projects and luxury properties.
            </p>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Email address"
                required
                style={{
                  flex: 1, padding: '0.6rem 0.8rem',
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '8px', color: '#fff',
                  fontFamily: "'Outfit', sans-serif", fontSize: '0.85rem',
                  outline: 'none', minWidth: 0,
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '0.6rem',
                  background: 'linear-gradient(135deg, #D4AF37, #A8860A)',
                  color: '#0F1923',
                  border: 'none', borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                title="Subscribe"
              >
                <FiArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.08)',
        paddingTop: '1.75rem',
        display: 'flex', flexWrap: 'wrap',
        alignItems: 'center', justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontFamily: "'Outfit', sans-serif" }}>
          © {new Date().getFullYear()} Proptix Realty Pvt. Ltd. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
          {[
            { label: 'Privacy Policy', path: '/privacy-policy' },
            { label: 'Terms of Use', path: '/terms-of-use' },
            { label: 'RERA Compliance', path: '/rera-compliance' }
          ].map((item) => (
            <Link
              key={item.label}
              to={item.path}
              style={{
                color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem',
                textDecoration: 'none', fontFamily: "'Outfit', sans-serif",
                transition: 'color 0.15s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#D4AF37'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
