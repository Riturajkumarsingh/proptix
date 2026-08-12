import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMenu, FiX, FiPhone, FiMail, FiMapPin,
  FiUser, FiHome, FiLogIn,
} from 'react-icons/fi';
import useAuth from '@hooks/useAuth';
import Button from '@components/ui/Button';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Projects', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
];

/* ── Logo Component ─────────────────────────────────── */
const ProptixLogo = ({ light }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
      {/* Logo box — auto-uses /logo.png if present, else shows icon */}
      <div style={{
        width: '56px', height: '56px', borderRadius: '12px',
        background: '#fff',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, overflow: 'hidden',
        padding: '6px',
      }}>
        {!imgFailed ? (
          <img
            src="/logo.png"
            alt="Proptix Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <FiHome size={28} color="#064E3B" />
        )}
      </div>
      <div>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontWeight: 800,
          fontSize: '1.65rem',
          color: light ? '#fff' : '#064E3B',
          lineHeight: 1,
          letterSpacing: '-0.01em',
        }}>
          Prop<span style={{ color: '#D4AF37' }}>tix</span>
        </div>
        <div style={{
          fontSize: '0.65rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: light ? 'rgba(255,255,255,0.7)' : '#6B7280',
          marginTop: '4px',
          fontWeight: 600,
        }}>
          Your Dream Home Awaits
        </div>
      </div>
    </div>
  );
};

/* ── Navbar ─────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const { isAuth, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparent = isHome && !scrolled;

  // Track scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Track viewport width for responsive toggle
  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop) setMobileOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
    }}>
      {/* ── Top Info Bar ─────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ height: scrolled ? 0 : 36, opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: 'linear-gradient(135deg, #022c22 0%, #064E3B 100%)',
          overflow: 'hidden', display: 'flex', alignItems: 'center',
          fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)',
        }}
      >
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', width: '100%', height: '36px',
        }}>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
              <FiPhone size={12} /> +91 98765 43210
            </span>
            {isDesktop && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <FiMail size={12} /> info@proptix.com
              </span>
            )}
          </div>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: '#D4AF37' }}>
            <FiMapPin size={12} /> Mumbai, Maharashtra
          </span>
        </div>
      </motion.div>

      {/* ── Main Navbar ──────────────────────────────── */}
      <motion.nav
        initial={false}
        animate={{
          background: isTransparent ? 'transparent' : 'rgba(255,255,255,0.97)',
          boxShadow: isTransparent ? 'none' : '0 2px 24px rgba(6,78,59,0.1)',
          backdropFilter: isTransparent ? 'none' : 'blur(20px)',
        }}
        transition={{ duration: 0.3 }}
        style={{
          height: '70px',
          display: 'flex', alignItems: 'center',
          borderBottom: isTransparent ? 'none' : '1px solid rgba(6,78,59,0.06)',
        }}
      >
        <div className="container" style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', width: '100%',
        }}>

          {/* LEFT — Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <ProptixLogo light={isTransparent} />
          </Link>

          {/* CENTER — Desktop Navigation */}
          {isDesktop && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  style={({ isActive }) => ({
                    padding: '0.5rem 0.75rem',
                    fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600, fontSize: '0.875rem',
                    borderRadius: '8px', textDecoration: 'none',
                    transition: 'all 0.15s',
                    whiteSpace: 'nowrap',
                    color: isActive
                      ? (isTransparent ? '#D4AF37' : '#064E3B')
                      : (isTransparent ? 'rgba(255,255,255,0.9)' : '#374151'),
                    background: isActive
                      ? (isTransparent ? 'rgba(255,255,255,0.1)' : 'rgba(6,78,59,0.06)')
                      : 'transparent',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>
          )}

          {/* RIGHT — CTA (desktop) or Hamburger (mobile) */}
          {isDesktop ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexShrink: 0 }}>
              {isAuth ? (
                <Button
                  variant="primary" size="sm"
                  icon={<FiUser size={14} />}
                  onClick={() => navigate(
                    user?.role === 'CUSTOMER' ? '/customer/dashboard'
                      : user?.role?.includes('ASSOCIATE') ? '/associate/dashboard'
                        : '/admin/dashboard'
                  )}
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Link to="/auth/login" style={{ textDecoration: 'none' }}>
                    <Button
                      variant="outline" size="sm"
                      style={{ 
                        color: isTransparent ? 'rgba(255,255,255,0.95)' : '#064E3B',
                        borderColor: isTransparent ? 'rgba(255,255,255,0.3)' : 'rgba(6,78,59,0.3)',
                        background: isTransparent ? 'rgba(255,255,255,0.05)' : 'transparent',
                        borderWidth: '1.5px'
                      }}
                      icon={<FiLogIn size={14} />}
                    >
                      Login
                    </Button>
                  </Link>
                  <Link to="/book-site-visit" style={{ textDecoration: 'none' }}>
                    <Button variant="accent" size="sm">
                      Book Site Visit
                    </Button>
                  </Link>
                </>
              )}
            </div>
          ) : (
            /* MOBILE — Hamburger only */
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle Menu"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '0.5rem', borderRadius: '8px',
                color: isTransparent ? '#fff' : '#064E3B',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.15s',
              }}
            >
              {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          )}
        </div>
      </motion.nav>

      {/* ── Mobile Dropdown Menu ──────────────────────── */}
      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{
              background: '#fff',
              boxShadow: '0 12px 40px rgba(6,78,59,0.15)',
              borderBottom: '1px solid rgba(6,78,59,0.08)',
            }}
          >
            <div className="container" style={{ paddingTop: '0.75rem', paddingBottom: '1rem' }}>
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={({ isActive }) => ({
                    display: 'block', padding: '0.75rem 0',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                    fontSize: '0.9375rem',
                    color: isActive ? '#064E3B' : '#374151',
                    borderBottom: '1px solid rgba(6,78,59,0.06)',
                    textDecoration: 'none',
                    background: 'none',
                  })}
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mobile CTA Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', paddingTop: '1rem' }}>
                <Link to="/auth/login" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" fullWidth size="sm" icon={<FiLogIn size={14} />}>
                    Login
                  </Button>
                </Link>
                <Link to="/book-site-visit" style={{ flex: 1, textDecoration: 'none' }} onClick={() => setMobileOpen(false)}>
                  <Button variant="accent" fullWidth size="sm">
                    Book Site Visit
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
