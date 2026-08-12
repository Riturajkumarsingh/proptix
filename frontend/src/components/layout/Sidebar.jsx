import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiUsers, FiMap, FiFileText, FiDollarSign,
  FiBarChart2, FiSettings, FiLogOut, FiChevronDown,
  FiHome, FiBriefcase, FiMessageSquare, FiBell,
  FiShield, FiUserCheck, FiTarget, FiCalendar,
  FiTrendingUp, FiBook, FiHelpCircle, FiPackage,
} from 'react-icons/fi';

import { useDispatch, useSelector } from 'react-redux';
import { selectSidebarOpen } from '@store/slices/uiSlice';
import useAuth from '@hooks/useAuth';

// ── Sidebar Nav Config ──────────────────────────────────────────────────────────
const getNavConfig = (role) => {
  const isAdmin = ['SUPER_ADMIN', 'ADMIN', 'MANAGER'].includes(role);
  const isAssociate = ['ASSOCIATE', 'SUB_ASSOCIATE'].includes(role);
  const isCustomer = role === 'CUSTOMER';

  if (isAdmin) return [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard',    icon: FiGrid,       href: '/admin/dashboard' },
        { label: 'Analytics',    icon: FiBarChart2,  href: '/admin/analytics' },
        { label: 'Activity',     icon: FiTrendingUp, href: '/admin/activity' },
      ],
    },
    {
      group: 'CRM',
      items: [
        { label: 'Leads',        icon: FiTarget,     href: '/admin/leads' },
        { label: 'Customers',    icon: FiUsers,      href: '/admin/customers' },
        { label: 'Follow Ups',   icon: FiCalendar,   href: '/admin/follow-ups' },
        { label: 'Site Visits',  icon: FiHome,       href: '/admin/site-visits' },
        { label: 'Quotations',   icon: FiFileText,   href: '/admin/quotations' },
      ],
    },
    {
      group: 'Property',
      items: [
        { label: 'Projects',     icon: FiBriefcase, href: '/admin/projects' },
        { label: 'Plots',        icon: FiMap,        href: '/admin/plots' },
        { label: 'Inventory',    icon: FiPackage,    href: '/admin/inventory' },
      ],
    },
    {
      group: 'Sales',
      items: [
        { label: 'Bookings',     icon: FiBriefcase,  href: '/admin/bookings' },
        { label: 'Payments',     icon: FiDollarSign, href: '/admin/payments' },
        { label: 'Agreements',   icon: FiFileText,   href: '/admin/agreements' },
        { label: 'Commissions',  icon: FiTrendingUp, href: '/admin/commissions' },
      ],
    },
    {
      group: 'Team',
      items: [
        { label: 'Associates',   icon: FiUserCheck,  href: '/admin/associates' },
        { label: 'Users',        icon: FiUsers,      href: '/admin/users' },
      ],
    },
    {
      group: 'Content',
      items: [
        { label: 'Blog',         icon: FiBook,       href: '/admin/blog' },
        { label: 'Gallery',      icon: FiMap,        href: '/admin/gallery' },
      ],
    },
    {
      group: 'Reports',
      items: [
        { label: 'Reports',      icon: FiBarChart2,  href: '/admin/reports' },
        { label: 'Audit Logs',   icon: FiShield,     href: '/admin/audit-logs' },
      ],
    },
    {
      group: 'Support',
      items: [
        { label: 'Tickets',      icon: FiMessageSquare, href: '/admin/support' },
        { label: 'Enquiries',    icon: FiHelpCircle, href: '/admin/enquiries' },
        { label: 'Notifications',icon: FiBell,       href: '/admin/notifications' },
      ],
    },
    {
      group: 'System',
      items: [
        { label: 'Settings',     icon: FiSettings,   href: '/admin/settings' },
      ],
    },
  ];

  if (isAssociate) return [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard',    icon: FiGrid,       href: '/associate/dashboard' },
      ],
    },
    {
      group: 'CRM',
      items: [
        { label: 'My Leads',     icon: FiTarget,     href: '/associate/leads' },
        { label: 'My Customers', icon: FiUsers,      href: '/associate/customers' },
        { label: 'Follow Ups',   icon: FiCalendar,   href: '/associate/follow-ups' },
        { label: 'Site Visits',  icon: FiHome,       href: '/associate/site-visits' },
      ],
    },
    {
      group: 'Sales',
      items: [
        { label: 'My Plots',     icon: FiMap,        href: '/associate/plots' },
        { label: 'Bookings',     icon: FiBriefcase,  href: '/associate/bookings' },
        { label: 'Commissions',  icon: FiDollarSign, href: '/associate/commissions' },
      ],
    },
    {
      group: 'Team',
      items: [
        { label: 'Sub Associates',icon: FiUserCheck, href: '/associate/sub-associates' },
      ],
    },
    {
      group: 'Account',
      items: [
        { label: 'Profile',      icon: FiSettings,   href: '/associate/profile' },
        { label: 'Notifications',icon: FiBell,       href: '/associate/notifications' },
      ],
    },
  ];

  // Customer
  return [
    {
      group: 'Overview',
      items: [
        { label: 'Dashboard',       icon: FiGrid,        href: '/customer/dashboard' },
        { label: 'My Properties',   icon: FiHome,        href: '/customer/properties' },
        { label: 'Payments',        icon: FiDollarSign,  href: '/customer/payments' },
        { label: 'Documents',       icon: FiFileText,    href: '/customer/documents' },
        { label: 'Support',         icon: FiMessageSquare, href: '/customer/support' },
        { label: 'Notifications',   icon: FiBell,        href: '/customer/notifications' },
      ],
    },
    {
      group: 'Account',
      items: [
        { label: 'Profile',         icon: FiSettings,    href: '/customer/profile' },
      ],
    },
  ];
};

// ── Sidebar Component ──────────────────────────────────────────────────────────
const Sidebar = () => {
  const sidebarOpen = useSelector(selectSidebarOpen);
  const { user, logout, role } = useAuth();
  const navConfig = getNavConfig(role);
  const [expandedGroups, setExpandedGroups] = useState({});

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 39, backdropFilter: 'blur(4px)' }}
          />
        )}
      </AnimatePresence>

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="sidebar-logo">
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'rgba(212,175,55,0.2)', border: '1.5px solid rgba(212,175,55,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FiHome color="#D4AF37" size={20} />
          </div>
          <div className="sidebar-logo-text">
            Prop<span style={{ color: '#D4AF37' }}>tix</span>
          </div>
        </div>

        {/* User Mini Profile */}
        <div style={{
          padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', alignItems: 'center', gap: '0.75rem',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #D4AF37, #F5E6A3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '0.9rem', color: '#0F1923', flexShrink: 0,
          }}>
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <p style={{ color: '#fff', fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '0.875rem', lineHeight: 1.2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {user?.name}
            </p>
            <p style={{ color: 'rgba(212,175,55,0.8)', fontSize: '0.75rem', textTransform: 'capitalize' }}>
              {role?.replace('_', ' ')?.toLowerCase()}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {navConfig.map((section) => (
            <div key={section.group} className="sidebar-group">
              <p className="sidebar-group-title">{section.group}</p>
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) => `sidebar-item ${isActive ? 'active' : ''}`}
                >
                  <item.icon className="sidebar-item-icon" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        {/* Logout */}
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={logout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
              padding: '0.65rem 1rem', borderRadius: '8px',
              color: 'rgba(255,255,255,0.6)', fontFamily: "'Outfit', sans-serif",
              fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.15s',
              background: 'none', border: 'none', cursor: 'pointer',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(239,68,68,0.1)'; e.currentTarget.style.color = '#FCA5A5'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            <FiLogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
