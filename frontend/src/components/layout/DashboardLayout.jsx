import { Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

const PAGE_TITLES = {
  '/admin/dashboard':     { title: 'Dashboard',     subtitle: 'Welcome back! Here\'s what\'s happening.' },
  '/admin/leads':         { title: 'Leads',          subtitle: 'Manage and track your lead pipeline.' },
  '/admin/customers':     { title: 'Customers',      subtitle: 'View and manage all customers.' },
  '/admin/projects':      { title: 'Projects',       subtitle: 'Manage all real estate projects.' },
  '/admin/plots':         { title: 'Plot Management',subtitle: 'Track and manage all plots.' },
  '/admin/bookings':      { title: 'Bookings',       subtitle: 'View all property bookings.' },
  '/admin/payments':      { title: 'Payments',       subtitle: 'Track payments and EMIs.' },
  '/admin/associates':    { title: 'Associates',     subtitle: 'Manage your sales team.' },
  '/admin/users':         { title: 'Users',          subtitle: 'Manage system users and roles.' },
  '/admin/reports':       { title: 'Reports',        subtitle: 'Export and analyze data.' },
  '/admin/settings':      { title: 'Settings',       subtitle: 'Configure system preferences.' },
  '/associate/dashboard': { title: 'My Dashboard',   subtitle: 'Track your sales performance.' },
  '/customer/dashboard':  { title: 'My Dashboard',   subtitle: 'Manage your properties and payments.' },
};

const DashboardLayout = () => {
  const { pathname } = useLocation();
  const pageInfo = PAGE_TITLES[pathname] || { title: 'Dashboard' };

  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        <DashboardHeader title={pageInfo.title} subtitle={pageInfo.subtitle} />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            style={{ flex: 1, padding: '1.5rem', minHeight: 'calc(100vh - 64px)' }}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DashboardLayout;
