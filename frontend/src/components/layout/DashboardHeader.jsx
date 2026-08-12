import { useDispatch, useSelector } from 'react-redux';
import { FiMenu, FiBell, FiSearch, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toggleSidebar, selectSidebarOpen } from '@store/slices/uiSlice';
import { selectUnreadCount } from '@store/slices/notificationSlice';
import useAuth from '@hooks/useAuth';

const DashboardHeader = ({ title, subtitle }) => {
  const dispatch    = useDispatch();
  const unread      = useSelector(selectUnreadCount);
  const sidebarOpen = useSelector(selectSidebarOpen);
  const { user, logout, role } = useAuth();
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);

  const dashboardBase = role === 'CUSTOMER' ? '/customer' : role?.includes('ASSOCIATE') ? '/associate' : '/admin';

  return (
    <header className="dashboard-header">
      {/* Left */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={() => dispatch(toggleSidebar())}
          style={{
            width: '38px', height: '38px', borderRadius: '10px', border: '1.5px solid rgba(6,78,59,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#374151', background: '#fff', cursor: 'pointer', transition: 'all 0.15s',
          }}
        >
          <FiMenu size={18} />
        </button>
        <div>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.125rem', color: '#0F1923', lineHeight: 1 }}>
            {title || 'Dashboard'}
          </h1>
          {subtitle && <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.125rem' }}>{subtitle}</p>}
        </div>
      </div>

      {/* Right */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {/* Notifications */}
        <Link to={`${dashboardBase}/notifications`} style={{ position: 'relative' }}>
          <button style={{
            width: '38px', height: '38px', borderRadius: '10px', border: '1.5px solid rgba(6,78,59,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#374151', background: '#fff', cursor: 'pointer', transition: 'all 0.15s',
          }}>
            <FiBell size={18} />
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: '4px', right: '4px',
                minWidth: '18px', height: '18px', borderRadius: '9px',
                background: '#EF4444', color: '#fff', fontSize: '0.6875rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 4px',
                border: '2px solid #fff',
              }}>
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>
        </Link>

        {/* Profile Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.375rem 0.75rem 0.375rem 0.375rem',
              borderRadius: '24px', border: '1.5px solid rgba(6,78,59,0.12)',
              background: '#fff', cursor: 'pointer', transition: 'all 0.15s',
            }}
          >
            <div style={{
              width: '30px', height: '30px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #064E3B, #059669)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: '0.8125rem', flexShrink: 0,
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <span style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', color: '#374151', maxWidth: '100px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </span>
            <FiChevronDown size={14} color="#9CA3AF" />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                onMouseLeave={() => setProfileOpen(false)}
                style={{
                  position: 'absolute', top: 'calc(100% + 8px)', right: 0,
                  background: '#fff', borderRadius: '12px', padding: '0.5rem',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.12)', border: '1px solid rgba(6,78,59,0.08)',
                  minWidth: '200px', zIndex: 60,
                }}
              >
                <div style={{ padding: '0.625rem 1rem', borderBottom: '1px solid rgba(6,78,59,0.06)', marginBottom: '0.25rem' }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0F1923' }}>{user?.name}</p>
                  <p style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{user?.email}</p>
                </div>
                {[
                  { label: 'My Profile', icon: FiUser, href: `${dashboardBase}/profile` },
                  { label: 'Settings',   icon: FiSettings, href: `${dashboardBase}/settings` },
                ].map((item) => (
                  <Link key={item.label} to={item.href} onClick={() => setProfileOpen(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.625rem 1rem', borderRadius: '8px',
                      color: '#374151', textDecoration: 'none', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#ECFDF5'; e.currentTarget.style.color = '#064E3B'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#374151'; }}
                  >
                    <item.icon size={16} /> {item.label}
                  </Link>
                ))}
                <div style={{ borderTop: '1px solid rgba(6,78,59,0.06)', marginTop: '0.25rem', paddingTop: '0.25rem' }}>
                  <button onClick={logout}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.625rem',
                      padding: '0.625rem 1rem', borderRadius: '8px',
                      color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer',
                      fontFamily: "'Manrope', sans-serif", fontSize: '0.875rem', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#FEF2F2'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                  >
                    <FiLogOut size={16} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
