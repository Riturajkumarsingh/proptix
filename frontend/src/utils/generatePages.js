/**
 * Scaffold generator for placeholder pages.
 * Run this script to generate all placeholder page files.
 * node src/utils/generatePages.js
 */
const fs = require('fs');
const path = require('path');

const PAGES = {
  'src/pages/admin': [
    'Leads', 'Customers', 'Projects', 'ProjectDetail', 'Plots', 'Bookings', 'Payments',
    'Associates', 'Users', 'Reports', 'Settings', 'Inventory', 'Agreements', 'Commissions',
    'Blog', 'Gallery', 'Support', 'Notifications', 'AuditLogs', 'FollowUps', 'SiteVisits',
    'Quotations', 'Enquiries', 'Analytics', 'Profile',
  ],
  'src/pages/associate': [
    'Dashboard', 'Leads', 'Customers', 'Plots', 'Bookings', 'Commissions',
    'FollowUps', 'SiteVisits', 'SubAssociates', 'Profile', 'Notifications',
  ],
  'src/pages/customer': [
    'Dashboard', 'Properties', 'Payments', 'Documents', 'Support', 'Profile', 'Notifications',
  ],
  'src/pages/website': [
    'Home', 'ProjectsList', 'ProjectDetail', 'About', 'Contact', 'Blog', 'BlogDetail',
    'Gallery', 'Career', 'Franchise', 'Calculator', 'BookProperty', 'SiteVisit',
    'Compare', 'Wishlist',
  ],
  'src/pages/auth': ['ResetPassword'],
};

const PAGE_TEMPLATE = (name, path) => `import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const ${name} = () => (
  <>
    <Helmet>
      <title>${name} — Proptix</title>
    </Helmet>
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div style={{ padding: '1rem 0' }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0F1923', marginBottom: '0.5rem' }}>
          ${name}
        </h2>
        <p style={{ color: '#9CA3AF' }}>This module is coming soon. Phase build in progress.</p>
      </div>
    </motion.div>
  </>
);

export default ${name};
`;

const BASE = path.join(__dirname, '../../');

Object.entries(PAGES).forEach(([dir, pages]) => {
  const fullDir = path.join(BASE, dir);
  if (!fs.existsSync(fullDir)) fs.mkdirSync(fullDir, { recursive: true });
  pages.forEach((name) => {
    const file = path.join(fullDir, `${name}.jsx`);
    if (!fs.existsSync(file)) {
      fs.writeFileSync(file, PAGE_TEMPLATE(name, dir));
      console.log(`✅ Created: ${dir}/${name}.jsx`);
    } else {
      console.log(`⏭  Exists: ${dir}/${name}.jsx`);
    }
  });
});

console.log('\n🚀 All scaffold pages generated!');
