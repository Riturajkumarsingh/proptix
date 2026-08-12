import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiMapPin, FiHome, FiCheckCircle, FiPlayCircle,
  FiStar, FiTrendingUp, FiShield, FiUsers, FiBriefcase,
  FiSearch, FiPhoneCall, FiAward, FiHeart, FiChevronDown,
  FiCheck, FiMessageSquare, FiClock, FiDollarSign, FiGrid,
  FiLifeBuoy, FiActivity, FiCoffee, FiFeather, FiKey, FiSmile, FiZap
} from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import Button from '@components/ui/Button';
import AnimatedSection from '@components/ui/AnimatedSection';

/* ────────────────────────────── DATA ────────────────────────────── */

const CATEGORIES = [
  { icon: <FiHome size={26} />, name: 'Residential Plots', count: '120+ Properties', color: '#064E3B' },
  { icon: <FiBriefcase size={26} />, name: 'Commercial Land', count: '45+ Properties', color: '#059669' },
  { icon: <FiStar size={26} />, name: 'Luxury Villas', count: '30+ Properties', color: '#D4AF37' },
  { icon: <FiMapPin size={26} />, name: 'Farm Houses', count: '15+ Properties', color: '#064E3B' },
  { icon: <FiGrid size={26} />, name: 'Apartments', count: '80+ Properties', color: '#059669' },
  { icon: <FiTrendingUp size={26} />, name: 'Comm. Plots', count: '60+ Properties', color: '#D4AF37' },
  { icon: <FiDollarSign size={26} />, name: 'Industrial Land', count: '25+ Properties', color: '#064E3B' },
  { icon: <FiAward size={26} />, name: 'Premium Projects', count: '10+ Projects', color: '#059669' },
];

const PROJECTS = [
  {
    id: 1, name: 'Proptix Residency', location: 'Pune, Maharashtra',
    price: '₹45 L', rera: 'P5210002845', possession: 'Dec 2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    badge: 'New Launch', type: 'Residential',
  },
  {
    id: 2, name: 'Sky Garden Villas', location: 'Mumbai, Maharashtra',
    price: '₹1.2 Cr', rera: 'P5180001234', possession: 'Ready to Move',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    badge: 'Hot Selling', type: 'Luxury Villa',
  },
  {
    id: 3, name: 'Palm Commercial', location: 'Nashik, Maharashtra',
    price: '₹85 L', rera: 'P5160009876', possession: 'Mar 2025',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    badge: 'Pre-Launch', type: 'Commercial',
  },
];

const WHY_US = [
  { icon: <FiShield size={28} />, title: 'RERA Compliant & Verified', desc: '100% legally verified titles with complete RERA compliance for peace of mind.' },
  { icon: <FiTrendingUp size={28} />, title: 'High ROI Locations', desc: 'Strategically chosen prime locations guaranteeing the best appreciation.' },
  { icon: <FiUsers size={28} />, title: 'Dedicated 24×7 Support', desc: 'From site visits to registration, our experts assist you at every step.' },
  { icon: <FiDollarSign size={28} />, title: 'Easy Loan Assistance', desc: 'We partner with top banks to give you the best home loan options.' },
  { icon: <FiCheckCircle size={28} />, title: 'Transparent Pricing', desc: 'No hidden charges. Complete cost breakdown before you sign.' },
  { icon: <FiAward size={28} />, title: 'Award-Winning Service', desc: 'Recognized as Maharashtra\'s best real estate advisor for 5+ years.' },
];

const STATS = [
  { value: '120+', label: 'Projects' },
  { value: '5,000+', label: 'Happy Families' },
  { value: '15+', label: 'Years Experience' },
  { value: '₹500Cr+', label: 'Sales Volume' },
];

const TESTIMONIALS = [
  {
    id: 1, name: 'Rajesh Sharma', role: 'CEO, TechNova',
    avatar: 'https://i.pravatar.cc/80?img=11',
    review: 'The level of professionalism and transparency at Proptix is unmatched. They helped us find the perfect commercial land for our new office headquarters.',
    rating: 5,
  },
  {
    id: 2, name: 'Priya Patel', role: 'Homeowner, Pune',
    avatar: 'https://i.pravatar.cc/80?img=5',
    review: 'Proptix made our dream of owning a villa come true. From site visit to registration — a completely hassle-free experience!',
    rating: 5,
  },
  {
    id: 3, name: 'Amit Desai', role: 'Investor',
    avatar: 'https://i.pravatar.cc/80?img=3',
    review: 'Excellent ROI on the plot I purchased through Proptix. Their knowledge of growth corridors in Pune is exceptional.',
    rating: 5,
  },
  {
    id: 4, name: 'Sunita Nair', role: 'Retired Teacher',
    avatar: 'https://i.pravatar.cc/80?img=9',
    review: 'Very honest team. No false promises. They guided us step by step and we got a beautiful flat well within our budget.',
    rating: 5,
  },
];

const AMENITIES = [
  { icon: <FiLifeBuoy size={26} />, label: 'Swimming Pool' },
  { icon: <FiActivity size={26} />, label: 'Modern Gym' },
  { icon: <FiCoffee size={26} />, label: 'Club House' },
  { icon: <FiFeather size={26} />, label: 'Landscaped Garden' },
  { icon: <FiShield size={26} />, label: '24×7 Security' },
  { icon: <FiKey size={26} />, label: 'Covered Parking' },
  { icon: <FiSmile size={26} />, label: 'Children\'s Park' },
  { icon: <FiZap size={26} />, label: 'Smart Home' },
];

const PROCESS = [
  { step: '01', title: 'Search', desc: 'Browse our curated portfolio of RERA-verified properties.' },
  { step: '02', title: 'Site Visit', desc: 'Book a guided site visit at your preferred time.' },
  { step: '03', title: 'Book & Pay', desc: 'Reserve your unit with our transparent booking process.' },
  { step: '04', title: 'Documentation', desc: 'We handle all legal paperwork and agreements.' },
  { step: '05', title: 'Registration', desc: 'Smooth property registration with our legal experts.' },
  { step: '06', title: 'Possession', desc: 'Get the keys to your dream property!' },
];

const FAQS = [
  { q: 'Are all Proptix properties RERA registered?', a: 'Yes. 100% of our properties are registered under MahaRERA and carry clear legal title deeds.' },
  { q: 'Do you offer home loan assistance?', a: 'Absolutely. We have partnerships with 10+ leading banks and NBFCs to help you get the best loan rates.' },
  { q: 'Can NRIs purchase properties through Proptix?', a: 'Yes. We have a dedicated NRI team that handles all cross-border documentation and compliance.' },
  { q: 'What is the minimum investment amount?', a: 'Our residential plots start from ₹15 Lakhs. Commercial plots and villas start from ₹45 Lakhs.' },
];

/* ────────────────────────────── COMPONENT ────────────────────────── */

const PropertySearchBox = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState({ location: '', type: '', budget: '', bedrooms: '' });

  const handleChange = (e) => setSearch(s => ({ ...s, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const query = new URLSearchParams();
    if (search.location) query.append('location', search.location);
    if (search.type) query.append('type', search.type);
    if (search.budget) query.append('budget', search.budget);
    if (search.bedrooms) query.append('bedrooms', search.bedrooms);
    navigate(`/properties?${query.toString()}`);
  };
  
  return (
    <div style={{
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1.5px solid rgba(6,78,59,0.12)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 24px 80px rgba(6,78,59,0.18), 0 8px 32px rgba(0,0,0,0.06)',
      maxWidth: '900px',
      margin: '-4rem auto 0',
      position: 'relative',
      zIndex: 20,
    }}>
      <h3 style={{
        fontFamily: "'Outfit', sans-serif", fontWeight: 700,
        fontSize: '1.1rem', color: '#064E3B', marginBottom: '1.25rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <FiSearch size={18} color="#D4AF37" /> Find Your Perfect Property
      </h3>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.875rem', marginBottom: '1.25rem' }}>
          
          <div>
            <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#374151', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Location</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiMapPin size={16} /></span>
              <input name="location" value={search.location} onChange={handleChange} type="text" placeholder="City, Area or Project" style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', border: '1.5px solid rgba(6,78,59,0.12)', borderRadius: '10px', outline: 'none', background: '#F8FAFB', color: '#0F1923', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#374151', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Property Type</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiGrid size={16} /></span>
              <input name="type" value={search.type} onChange={handleChange} type="text" placeholder="Residential, Commercial" style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', border: '1.5px solid rgba(6,78,59,0.12)', borderRadius: '10px', outline: 'none', background: '#F8FAFB', color: '#0F1923', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#374151', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Budget</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiDollarSign size={16} /></span>
              <input name="budget" value={search.budget} onChange={handleChange} type="text" placeholder="₹ Min – Max" style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', border: '1.5px solid rgba(6,78,59,0.12)', borderRadius: '10px', outline: 'none', background: '#F8FAFB', color: '#0F1923', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem', color: '#374151', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Bedrooms</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none' }}><FiHome size={16} /></span>
              <input name="bedrooms" value={search.bedrooms} onChange={handleChange} type="text" placeholder="1, 2, 3, 4+ BHK" style={{ width: '100%', paddingLeft: '2.5rem', paddingRight: '0.75rem', paddingTop: '0.65rem', paddingBottom: '0.65rem', fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', border: '1.5px solid rgba(6,78,59,0.12)', borderRadius: '10px', outline: 'none', background: '#F8FAFB', color: '#0F1923', boxSizing: 'border-box' }} />
            </div>
          </div>

        </div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
          <button type="reset" onClick={() => setSearch({ location: '', type: '', budget: '', bedrooms: '' })} style={{
            padding: '0.75rem 1.5rem',
            background: 'transparent', border: '1.5px solid rgba(6,78,59,0.2)',
            borderRadius: '10px', color: '#374151',
            fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem',
            cursor: 'pointer',
          }}>
            Reset
          </button>
          <button type="submit" style={{
            padding: '0.75rem 2rem',
            background: 'linear-gradient(135deg, #064E3B, #059669)',
            border: 'none', borderRadius: '10px', color: '#fff',
            fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem',
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 4px 16px rgba(6,78,59,0.25)',
          }}>
            <FiSearch size={16} /> Search Properties
          </button>
        </div>
      </form>
    </div>
  );
};

const SectionHeader = ({ overline, title, titleAccent, subtitle, light = false }) => (
  <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
    {overline && (
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.75rem' }}>
        <span style={{
          fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.7rem',
          letterSpacing: '0.15em', textTransform: 'uppercase',
          color: '#D4AF37',
          padding: '0.35rem 1.25rem',
          borderRadius: '50px',
          background: 'rgba(212,175,55,0.08)',
          border: '1px solid rgba(212,175,55,0.2)',
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        }}>
          <FiStar size={10} style={{ fill: '#D4AF37', opacity: 0.8 }} />
          {overline}
          <FiStar size={10} style={{ fill: '#D4AF37', opacity: 0.8 }} />
        </span>
      </div>
    )}
    <h2 style={{
      fontFamily: "'Playfair Display', serif", fontWeight: 600,
      fontSize: 'clamp(2rem, 3.5vw, 3rem)',
      color: light ? '#fff' : '#0F1923', lineHeight: 1.2, marginBottom: '1.25rem',
      letterSpacing: '-0.01em',
    }}>
      {title} {titleAccent && <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>{titleAccent}</span>}
    </h2>
    {subtitle && (
      <p style={{
        fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem',
        color: light ? 'rgba(255,255,255,0.7)' : '#6B7280',
        maxWidth: '550px', margin: '0 auto', lineHeight: 1.8,
        fontWeight: 300, letterSpacing: '0.02em',
      }}>
        {subtitle}
      </p>
    )}
  </div>
);

/* ─────────────────────────────────────────────────────────────────── */

const Home = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <>
      <Helmet>
        <title>Proptix — Premium Real Estate | Buy Plots, Villas & Commercial Properties</title>
        <meta name="description" content="Discover luxury apartments, villas, commercial spaces and residential plots in Maharashtra's most desirable locations. RERA compliant. Trusted by 5000+ families." />
        <meta name="keywords" content="real estate, property, plots, villas, commercial, residential, RERA, Maharashtra, Proptix" />
      </Helmet>

      {/* ═══════════════════════════════════════════════════════
           1. HERO SECTION
      ═══════════════════════════════════════════════════════ */}
      <section style={{
        position: 'relative', minHeight: '100vh',
        display: 'flex', alignItems: 'flex-start',
        overflow: 'hidden', marginTop: '-70px',
      }}>
        {/* Background — Luxury Property Image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=90"
            alt="Luxury Real Estate Property"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }}
          />
          {/* Layered gradient overlay for cinematic look */}
          <div style={{
            position: 'absolute', inset: 0,
            background: [
              'linear-gradient(to right, rgba(2,44,34,0.95) 0%, rgba(2,44,34,0.75) 50%, rgba(2,44,34,0.3) 100%)',
            ].join(','),
          }} />
          {/* Bottom gradient to blend into search box */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '35%',
            background: 'linear-gradient(to top, rgba(2,44,34,0.7) 0%, transparent 100%)',
          }} />
        </div>

        {/* Floating circles */}
        <motion.div
          animate={{ y: [0, -20, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute', right: '8%', top: '20%',
            width: '300px', height: '300px', borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.1)',
            background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <motion.div
          animate={{ y: [0, 20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          style={{
            position: 'absolute', right: '12%', top: '25%',
            width: '180px', height: '180px', borderRadius: '50%',
            border: '1px solid rgba(212,175,55,0.08)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '140px', paddingBottom: '4rem' }}>
          <AnimatedSection animation="fadeUp">

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 600,
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              color: '#fff',
              lineHeight: 1.12,
              marginBottom: '1.75rem',
              letterSpacing: '-0.01em',
            }}>
              Find Your{' '}
              <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Home</span>{' '}
              <br className="block md:hidden" />
              With Proptix
            </h1>

            {/* ── Inline Search Box ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: 'transparent',
                marginBottom: '2rem',
                maxWidth: '860px',
              }}
            >
              {/* Tab row */}
              <div className="hidden md:flex" style={{ gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                {['Residential', 'Commercial', 'Villas', 'Plots', 'Apartments'].map((tab) => (
                  <button key={tab} style={{
                    padding: '0.4rem 1.25rem', borderRadius: '50px',
                    background: tab === 'Residential' ? '#D4AF37' : 'rgba(255,255,255,0.1)',
                    border: tab === 'Residential' ? 'none' : '1px solid rgba(255,255,255,0.3)',
                    color: tab === 'Residential' ? '#0F1923' : '#fff',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600,
                    fontSize: '0.85rem', cursor: 'pointer',
                    backdropFilter: tab === 'Residential' ? 'none' : 'blur(8px)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if(tab !== 'Residential') {
                      e.target.style.background = 'rgba(255,255,255,0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(tab !== 'Residential') {
                      e.target.style.background = 'rgba(255,255,255,0.1)';
                    }
                  }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Fields + Button row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '0.75rem',
                alignItems: 'end',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                padding: '1rem',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.25)',
              }}>
                {[
                  { label: 'Location', placeholder: 'City or Area', icon: <FiMapPin size={13} />, opts: ['Mumbai', 'Pune', 'Nashik', 'Nagpur', 'Thane'] },
                  { label: 'Property Type', placeholder: 'Select Type', icon: <FiGrid size={13} />, opts: ['Residential Plot', 'Commercial Land', 'Luxury Villa', 'Apartment', 'Farm House'] },
                  { label: 'Budget', placeholder: '₹ Budget', icon: <FiDollarSign size={13} />, opts: ['Under ₹30L', '₹30L–₹60L', '₹60L–₹1Cr', '₹1Cr–₹2Cr', '₹2Cr+'] },
                ].map(({ label, placeholder, icon, opts }) => (
                  <div key={label}>
                    <label style={{
                      display: 'block', fontFamily: "'Outfit', sans-serif",
                      fontWeight: 600, fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)',
                      marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em',
                    }}>{label}</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '0.75rem', top: '50%',
                        transform: 'translateY(-50%)', color: '#064E3B', pointerEvents: 'none',
                        zIndex: 2,
                      }}>{icon}</span>
                      <select
                        style={{
                          width: '100%', paddingLeft: '2.2rem', paddingRight: '1rem',
                          paddingTop: '0.75rem', paddingBottom: '0.75rem',
                          fontFamily: "'Manrope', sans-serif", fontSize: '0.9rem', fontWeight: 500,
                          border: 'none', borderRadius: '10px',
                          outline: 'none', background: '#fff', color: '#0F1923',
                          boxSizing: 'border-box', appearance: 'none', cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                        }}
                      >
                        <option value="">{placeholder}</option>
                        {opts.map(o => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  </div>
                ))}

                {/* Search Btn */}
                <div>
                  <Link to="/properties" style={{ textDecoration: 'none', display: 'block' }}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        width: '100%', padding: '0.75rem 0',
                        background: 'linear-gradient(135deg, #064E3B, #059669)',
                        border: 'none', borderRadius: '10px', color: '#fff',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.95rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center',
                        justifyContent: 'center', gap: '0.5rem',
                        boxShadow: '0 4px 16px rgba(6,78,59,0.3)',
                        height: '100%',
                      }}
                    >
                      <FiSearch size={16} /> Search
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* ── Descriptive Paragraph ── */}
            <p className="hidden md:block" style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 'clamp(0.85rem, 1.1vw, 0.95rem)',
              color: 'rgba(255,255,255,0.7)',
              maxWidth: '500px',
              lineHeight: 1.8,
              marginBottom: '1rem',
              fontWeight: 300,
              letterSpacing: '0.02em',
            }}>
              Step into a world of unparalleled luxury and exclusive living. Handpicked estates, visionary commercial spaces, and pristine plots — meticulously curated for those who demand the extraordinary.
            </p>

            {/* ── CTA Buttons — below search ── */}
            <div style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/properties" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 8px 30px rgba(212,175,55,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.875rem 2rem',
                    background: 'linear-gradient(135deg, #D4AF37, #A8860A)',
                    border: 'none', borderRadius: '50px',
                    color: '#0F1923', fontFamily: "'Outfit', sans-serif",
                    fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 18px rgba(212,175,55,0.3)',
                  }}
                >
                  Explore Properties <FiArrowRight size={16} />
                </motion.button>
              </Link>
              <Link to="/book-site-visit" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    padding: '0.875rem 2rem',
                    background: 'rgba(255,255,255,0.1)',
                    border: '1.5px solid rgba(255,255,255,0.28)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '50px',
                    color: '#fff', fontFamily: "'Outfit', sans-serif",
                    fontWeight: 600, fontSize: '0.95rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                  }}
                >
                  <FiPhoneCall size={16} /> Book Site Visit
                </motion.button>
              </Link>
            </div>

          </AnimatedSection>
        </div>
      </section>

      {/* ── Spacer after hero ── */}
      <div style={{ height: '1.5rem', background: '#F8FAFB' }} />

      {/* ═══════════════════════════════════════════════════════
           3. PROPERTY CATEGORIES
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <SectionHeader
              overline="Explore"
              title="Property"
              titleAccent="Categories"
              subtitle="Browse our diverse portfolio of premium real estate offerings tailored to your lifestyle and investment goals."
            />
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {CATEGORIES.map((cat, idx) => (
              <AnimatedSection key={cat.name} animation="scale" delay={idx * 0.05}>
                <Link to="/properties" style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <motion.div
                    whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                    style={{
                      background: 'linear-gradient(145deg, #ffffff 0%, #f9fafc 100%)',
                      borderRadius: '20px',
                      border: '1px solid rgba(0,0,0,0.04)',
                      padding: '2.5rem 1.5rem', textAlign: 'center',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                      transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                      cursor: 'pointer', height: '100%',
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                    }}
                  >
                    <div style={{
                      width: '70px', height: '70px', borderRadius: '50%',
                      background: '#fff',
                      boxShadow: `0 8px 24px ${cat.color}25`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 1.25rem', color: cat.color,
                    }}>
                      {cat.icon}
                    </div>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700,
                      fontSize: '1.05rem', color: '#0F1923', marginBottom: '0.4rem',
                    }}>
                      {cat.name}
                    </h3>
                    <p style={{
                      fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem',
                      color: '#6B7280', fontWeight: 400, letterSpacing: '0.02em',
                    }}>
                      {cat.count}
                    </p>
                  </motion.div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           4. FEATURED PROJECTS
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '4rem 0', background: '#F8FAFB' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3.5rem' }}>
            <AnimatedSection animation="fadeLeft">
              <div style={{ marginBottom: '1rem' }}>
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.7rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: '#D4AF37',
                  padding: '0.35rem 1.25rem',
                  borderRadius: '50px',
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                }}>
                  <FiStar size={10} style={{ fill: '#D4AF37', opacity: 0.8 }} />
                  Premium Developments
                  <FiStar size={10} style={{ fill: '#D4AF37', opacity: 0.8 }} />
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 600,
                fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#0F1923',
                letterSpacing: '-0.01em', lineHeight: 1.2,
              }}>
                Featured <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Projects</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection animation="fadeRight">
              <Link to="/projects" style={{ textDecoration: 'none' }}>
                <motion.button
                  whileHover={{ x: 4, backgroundColor: 'rgba(6,78,59,0.04)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.75rem 1.75rem',
                    background: 'transparent', border: '1.5px solid rgba(6,78,59,0.2)',
                    borderRadius: '50px', color: '#064E3B',
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.9rem',
                    cursor: 'pointer', transition: 'background-color 0.2s',
                  }}
                >
                  View All Projects <FiArrowRight size={15} />
                </motion.button>
              </Link>
            </AnimatedSection>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {PROJECTS.map((proj, idx) => (
              <AnimatedSection key={proj.id} animation="fadeUp" delay={idx * 0.15}>
                <motion.div
                  whileHover={{ y: -10 }}
                  style={{
                    background: '#fff', borderRadius: '20px', overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(15,25,35,0.08)',
                    border: '1px solid rgba(6,78,59,0.05)',
                    transition: 'box-shadow 0.3s ease',
                  }}
                >
                  {/* Image */}
                  <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img
                      src={proj.image} alt={proj.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                      onMouseEnter={(e) => { e.target.style.transform = 'scale(1.08)'; }}
                      onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(6,78,59,0.6) 0%, transparent 60%)' }} />
                    {/* Badge */}
                    <span style={{
                      position: 'absolute', top: '1rem', left: '1rem',
                      padding: '0.375rem 0.875rem',
                      background: '#D4AF37', color: '#0F1923',
                      fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.75rem',
                      borderRadius: '50px', textTransform: 'uppercase', letterSpacing: '0.04em',
                    }}>
                      {proj.badge}
                    </span>
                    <span style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      padding: '0.25rem 0.75rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: '#064E3B', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.7rem',
                      borderRadius: '50px',
                    }}>
                      {proj.type}
                    </span>
                    <div style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.375rem', color: '#fff' }}>
                        {proj.price} <span style={{ fontWeight: 400, fontSize: '0.85rem', opacity: 0.75 }}>onwards</span>
                      </p>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.25rem', color: '#0F1923', marginBottom: '0.375rem' }}>
                      {proj.name}
                    </h3>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', color: '#6B7280', marginBottom: '1rem' }}>
                      <FiMapPin size={13} color="#D4AF37" /> {proj.location}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', paddingTop: '1rem', borderTop: '1px solid rgba(6,78,59,0.07)', marginBottom: '1.25rem' }}>
                      <div>
                        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>RERA No.</p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: '#374151' }}>{proj.rera}</p>
                      </div>
                      <div>
                        <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.7rem', color: '#9CA3AF', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Possession</p>
                        <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.8rem', color: '#374151' }}>{proj.possession}</p>
                      </div>
                    </div>

                    <Link to={`/projects/${proj.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                          width: '100%', padding: '0.75rem',
                          background: 'linear-gradient(135deg, #064E3B, #059669)',
                          border: 'none', borderRadius: '10px', color: '#fff',
                          fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.9rem',
                          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        }}
                      >
                        View Details <FiArrowRight size={15} />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           5. WHY CHOOSE US
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#064E3B', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(212,175,55,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(5,150,105,0.1)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedSection animation="fadeUp">
            <SectionHeader
              overline="Our Advantage"
              title="Why Choose"
              titleAccent="Proptix"
              subtitle="We don't just sell properties; we build lifelong relationships with every client."
              light
            />
          </AnimatedSection>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {WHY_US.map((item, idx) => (
              <AnimatedSection key={item.title} animation="fadeUp" delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -6, background: 'rgba(255,255,255,0.1)' }}
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '16px', padding: '2rem',
                    transition: 'all 0.3s',
                  }}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '12px',
                    background: 'rgba(212,175,55,0.15)',
                    border: '1px solid rgba(212,175,55,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#D4AF37', marginBottom: '1.25rem',
                  }}>
                    {item.icon}
                  </div>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.0625rem', color: '#fff', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.7 }}>
                    {item.desc}
                  </p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           6. STATISTICS
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '4.5rem 0', background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6A3 50%, #D4AF37 100%)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {STATS.map((stat, idx) => (
              <AnimatedSection key={stat.label} animation="scale" delay={idx * 0.1}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0F1923', lineHeight: 1, marginBottom: '0.5rem' }}>
                    {stat.value}
                  </p>
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           7. AMENITIES
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <SectionHeader
              overline="Premium Living"
              title="World-Class"
              titleAccent="Amenities"
              subtitle="Every Proptix project comes with state-of-the-art amenities designed for modern, luxury living."
            />
          </AnimatedSection>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {AMENITIES.map((item, idx) => (
              <AnimatedSection key={item.label} animation="fadeUp" delay={idx * 0.05}>
                <motion.div
                  whileHover={{ y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.06)' }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '1.25rem',
                    padding: '1.5rem',
                    background: 'linear-gradient(145deg, #ffffff 0%, #fcfdfd 100%)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0,0.04)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.02)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '60px', height: '60px', borderRadius: '15px',
                    background: 'linear-gradient(135deg, rgba(212,175,55,0.1), rgba(212,175,55,0.03))',
                    border: '1px solid rgba(212,175,55,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#D4AF37', flexShrink: 0,
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.05rem',
                      color: '#0F1923', margin: 0,
                    }}>
                      {item.label}
                    </h3>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           8. VIDEO TOUR
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#0F1923', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80"
            alt="Video Tour"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.3 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(6,78,59,0.85), rgba(15,25,35,0.9))' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <AnimatedSection animation="scale">
            <SectionHeader
              overline="Virtual Experience"
              title="Take a Virtual"
              titleAccent="Property Tour"
              subtitle="Experience our luxury properties from the comfort of your home. HD video walkthroughs, 360° views, and drone footage."
              light
            />
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '90px', height: '90px', borderRadius: '50%',
                background: 'rgba(212,175,55,0.2)',
                border: '2px solid rgba(212,175,55,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', cursor: 'pointer',
                boxShadow: '0 0 0 0 rgba(212,175,55,0.4)',
                animation: 'pulse-ring 2s infinite',
              }}
            >
              <FiPlayCircle size={44} color="#D4AF37" />
            </motion.div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           9. PROCESS
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#F8FAFB' }}>
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <SectionHeader
              overline="How It Works"
              title="Our Simple"
              titleAccent="Process"
              subtitle="We've streamlined the property buying journey so you can move in with zero stress."
            />
          </AnimatedSection>
          <AnimatedSection animation="fadeUp">
            <div style={{ overflow: 'hidden', paddingBottom: '2rem', paddingTop: '0.5rem', width: '100%' }}>
              <motion.div
                animate={{ x: ['0%', '-50%'] }}
                transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
                style={{ display: 'flex', width: 'max-content' }}
              >
                {[...PROCESS, ...PROCESS].map((step, idx) => (
                  <div key={`${step.step}-${idx}`} style={{ display: 'flex', alignItems: 'center', flex: '0 0 auto' }}>
                    
                    {/* Step Box */}
                    <motion.div
                      whileHover={{ y: -5, borderColor: 'rgba(212,175,55,0.4)' }}
                      style={{
                        width: '220px',
                        height: '100%',
                        background: '#fff',
                        borderRadius: '16px',
                        padding: '2rem 1.25rem',
                        textAlign: 'center',
                        border: '1.5px solid rgba(6,78,59,0.06)',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      <div style={{
                        width: '56px', height: '56px', borderRadius: '50%',
                        background: 'rgba(212,175,55,0.08)',
                        border: '1.5px dashed rgba(212,175,55,0.4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginBottom: '1.25rem',
                      }}>
                        <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.1rem', color: '#D4AF37' }}>{step.step}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0F1923', marginBottom: '0.5rem' }}>
                        {step.title}
                      </h3>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
                        {step.desc}
                      </p>
                    </motion.div>
                    
                    {/* Direction Arrow */}
                    <div style={{ 
                      margin: '0 0.75rem', 
                      color: '#D4AF37', 
                      opacity: idx === (PROCESS.length * 2) - 1 ? 0 : 0.6, 
                      display: 'flex', alignItems: 'center' 
                    }}>
                      <FiArrowRight size={26} />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           10. TESTIMONIALS
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="fadeUp">
            <SectionHeader
              overline="Client Love"
              title="What Our"
              titleAccent="Clients Say"
              subtitle="Read the experiences of families and investors who found their dream properties with Proptix."
            />
          </AnimatedSection>

          {/* Testimonial Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {TESTIMONIALS.map((t, idx) => (
              <AnimatedSection key={t.id} animation="fadeUp" delay={idx * 0.1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  style={{
                    background: '#fff', borderRadius: '18px', padding: '2rem',
                    border: '1.5px solid rgba(6,78,59,0.07)',
                    boxShadow: '0 4px 20px rgba(15,25,35,0.06)',
                    transition: 'box-shadow 0.3s',
                    display: 'flex', flexDirection: 'column', gap: '1rem',
                  }}
                >
                  {/* Stars */}
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(t.rating)].map((_, i) => (
                      <FiStar key={i} size={15} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>
                  {/* Review */}
                  <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.9375rem', color: '#374151', lineHeight: 1.75, fontStyle: 'italic', flex: 1 }}>
                    "{t.review}"
                  </p>
                  {/* Author */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', paddingTop: '1rem', borderTop: '1px solid rgba(6,78,59,0.07)' }}>
                    <img src={t.avatar} alt={t.name} style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(212,175,55,0.3)' }} />
                    <div>
                      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '0.9375rem', color: '#0F1923' }}>{t.name}</p>
                      <p style={{ fontFamily: "'Manrope', sans-serif", fontSize: '0.8rem', color: '#9CA3AF' }}>{t.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           11. FAQ
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '6rem 0', background: '#F8FAFB' }}>
        <div className="container">
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '4rem',
            alignItems: 'flex-start'
          }}>
            {/* Left Column: Sticky Title */}
            <div style={{ position: 'sticky', top: '100px' }}>
              <AnimatedSection animation="fadeRight">
                <span style={{
                  fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem',
                  letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37',
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem',
                  padding: '0.4rem 1.25rem', background: 'rgba(212,175,55,0.08)', 
                  border: '1px solid rgba(212,175,55,0.2)', borderRadius: '50px',
                }}>
                  <FiStar size={10} style={{ fill: '#D4AF37' }} /> FAQ <FiStar size={10} style={{ fill: '#D4AF37' }} />
                </span>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 600,
                  fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: '#0F1923',
                  lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.02em',
                }}>
                  We have <br /> <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Answers</span>
                </h2>
                <p style={{
                  fontFamily: "'Outfit', sans-serif", fontSize: '1.05rem',
                  color: '#6B7280', lineHeight: 1.7, marginBottom: '2.5rem',
                  maxWidth: '400px'
                }}>
                  Everything you need to know about purchasing luxury real estate with Proptix. Can't find the answer you're looking for?
                </p>
                <Link to="/contact" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(6,78,59,0.15)' }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      padding: '1rem 2rem', background: '#0F1923', color: '#fff',
                      border: 'none', borderRadius: '50px',
                      fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.95rem',
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      cursor: 'pointer', transition: 'all 0.3s ease',
                    }}
                  >
                    Contact Support <FiArrowRight size={16} />
                  </motion.button>
                </Link>
              </AnimatedSection>
            </div>

            {/* Right Column: Sleek Accordion */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {FAQS.map((faq, idx) => (
                <AnimatedSection key={idx} animation="fadeUp" delay={idx * 0.08}>
                  <div style={{
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                    padding: '1.75rem 0',
                  }}>
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                        background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1.15rem',
                        color: activeFaq === idx ? '#D4AF37' : '#0F1923', textAlign: 'left', gap: '1rem',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      <span style={{ lineHeight: 1.4 }}>{faq.q}</span>
                      <motion.div 
                        animate={{ rotate: activeFaq === idx ? 180 : 0 }} 
                        transition={{ duration: 0.4, ease: 'backOut' }}
                        style={{
                          width: '32px', height: '32px', borderRadius: '50%',
                          background: activeFaq === idx ? 'rgba(212,175,55,0.1)' : '#fff',
                          border: `1px solid ${activeFaq === idx ? 'rgba(212,175,55,0.3)' : 'rgba(0,0,0,0.08)'}`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          color: activeFaq === idx ? '#D4AF37' : '#0F1923',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        <FiChevronDown size={18} />
                      </motion.div>
                    </button>
                    <AnimatePresence initial={false}>
                      {activeFaq === idx && (
                        <motion.div
                          key="faq-content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <p style={{
                            paddingTop: '1.25rem', paddingRight: '2rem',
                            fontFamily: "'Outfit', sans-serif", fontSize: '0.95rem',
                            color: '#6B7280', lineHeight: 1.7, margin: 0,
                          }}>
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
           12. CTA
      ═══════════════════════════════════════════════════════ */}
      <section style={{ padding: '5rem 0', background: '#fff' }}>
        <div className="container">
          <AnimatedSection animation="scale">
            <div style={{
              background: 'linear-gradient(135deg, #022c22 0%, #064E3B 50%, #0a6649 100%)',
              borderRadius: '28px', padding: 'clamp(3rem, 6vw, 5rem)',
              textAlign: 'center', position: 'relative', overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(6,78,59,0.25)',
            }}>
              {/* Decorative blobs */}
              <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(5,150,105,0.2)', pointerEvents: 'none' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span style={{
                    fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.75rem',
                    letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37',
                    display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem',
                    padding: '0.4rem 1.25rem', background: 'rgba(212,175,55,0.1)', 
                    border: '1px solid rgba(212,175,55,0.3)', borderRadius: '50px',
                  }}>
                    <FiStar size={10} style={{ fill: '#D4AF37' }} /> Get Started Today <FiStar size={10} style={{ fill: '#D4AF37' }} />
                  </span>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 600,
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#fff',
                    lineHeight: 1.1, marginBottom: '1.25rem', letterSpacing: '-0.02em',
                  }}>
                    Ready to Find Your <br />
                    <span style={{ color: '#D4AF37', fontStyle: 'italic' }}>Dream Property?</span>
                  </h2>
                  <p style={{
                    fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.75)',
                    marginBottom: '2.5rem', maxWidth: '560px', margin: '0 auto 2.5rem',
                    lineHeight: 1.6, fontSize: '1.1rem'
                  }}>
                    Our experts are ready to guide you through our exclusive portfolio of premium real estate. Schedule a free site visit today.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link to="/book-site-visit" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.04, boxShadow: '0 8px 30px rgba(212,175,55,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '1rem 2.5rem',
                        background: 'linear-gradient(135deg, #D4AF37, #A8860A)',
                        border: 'none', borderRadius: '50px', color: '#0F1923',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem',
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                      }}
                    >
                      <FiPhoneCall size={17} /> Schedule Site Visit
                    </motion.button>
                  </Link>
                  <Link to="/properties" style={{ textDecoration: 'none' }}>
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        padding: '1rem 2.5rem',
                        background: 'rgba(255,255,255,0.1)',
                        border: '1.5px solid rgba(255,255,255,0.25)',
                        borderRadius: '50px', color: '#fff',
                        fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '1rem',
                        cursor: 'pointer',
                      }}
                    >
                      Browse Properties
                    </motion.button>
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;
