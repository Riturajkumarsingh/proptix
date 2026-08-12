import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
const ResetPassword = () => (
  <>
    <Helmet><title>Reset Password — Proptix</title></Helmet>
    <div>
      <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.875rem', color: '#0F1923', marginBottom: '0.5rem' }}>Reset Password</h1>
      <p style={{ color: '#6B7280' }}>Enter your new password below.</p>
    </div>
  </>
);
export default ResetPassword;
