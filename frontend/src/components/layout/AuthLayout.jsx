import { Link, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome } from 'react-icons/fi';

const AuthLayout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', background: '#F8FAFB' }}>
    {/* Left Panel — Branding */}
    <div className="hidden lg:flex" style={{
      width: '45%', background: 'linear-gradient(160deg, #022c22 0%, #064E3B 45%, #047857 100%)',
      position: 'relative', flexDirection: 'column', justifyContent: 'space-between', padding: '3rem',
      overflow: 'hidden',
    }}>
      {/* Background Pattern */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.05 }}>
        {Array.from({ length: 8 }).map((_, r) =>
          Array.from({ length: 6 }).map((_, c) => (
            <div key={`${r}-${c}`} style={{
              position: 'absolute', left: `${c * 17}%`, top: `${r * 13}%`,
              width: '120px', height: '120px', borderRadius: '50%',
              border: '1.5px solid rgba(212,175,55,0.6)',
            }} />
          ))
        )}
      </div>

      {/* Logo */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', textDecoration: 'none' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'rgba(212,175,55,0.2)', border: '1.5px solid rgba(212,175,55,0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FiHome color="#D4AF37" size={24} />
          </div>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#fff', lineHeight: 1 }}>
              Prop<span style={{ color: '#D4AF37' }}>tix</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(212,175,55,0.7)', letterSpacing: '0.06em', marginTop: '0.125rem' }}>
              Your Dream Home Awaits
            </div>
          </div>
        </Link>
      </div>

      {/* Center Content */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{ position: 'relative', zIndex: 1 }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(212,175,55,0.15)', borderRadius: '9999px', padding: '0.375rem 1rem', marginBottom: '1.5rem' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D4AF37' }} />
          <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.75rem', color: '#D4AF37', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Enterprise Real Estate Platform
          </span>
        </div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: '1.25rem' }}>
          Premium Properties,<br />
          <span style={{ color: '#D4AF37' }}>Exceptional Service.</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          Join thousands of happy homeowners who found their dream property through Proptix.
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '2.5rem' }}>
          {[
            { value: '5,000+', label: 'Happy Families' },
            { value: '120+',   label: 'Projects' },
            { value: '₹500Cr', label: 'Sales Volume' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.75rem', color: '#D4AF37' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Footer quote */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.5)', borderLeft: '3px solid #D4AF37', paddingLeft: '1rem', lineHeight: 1.6 }}>
          "Transforming the way India buys and sells real estate — one property at a time."
        </p>
      </div>
    </div>

    {/* Right Panel — Form */}
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: '440px' }}
      >
        {/* Mobile Logo */}
        <div className="flex lg:hidden" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #064E3B, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FiHome color="#fff" size={22} />
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#064E3B' }}>
              Prop<span style={{ color: '#D4AF37' }}>tix</span>
            </span>
          </Link>
        </div>
        <Outlet />
      </motion.div>
    </div>
  </div>
);

export default AuthLayout;
