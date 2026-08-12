import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiHome, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Button from '@components/ui/Button';

const NotFound = () => (
  <>
    <Helmet>
      <title>404 — Page Not Found | Proptix</title>
    </Helmet>
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #F8FAFB 0%, #ECFDF5 100%)', padding: '2rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: '8rem', fontWeight: 900, lineHeight: 1,
            background: 'linear-gradient(135deg, #064E3B, #D4AF37)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            404
          </div>
        </motion.div>
        <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.75rem', color: '#0F1923', marginBottom: '1rem' }}>
          Page Not Found
        </h1>
        <p style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '2rem' }}>
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
          <Button variant="outline" icon={<FiArrowLeft size={16} />} onClick={() => window.history.back()}>
            Go Back
          </Button>
          <Link to="/"><Button variant="primary" icon={<FiHome size={16} />}>Home Page</Button></Link>
        </div>
      </div>
    </div>
  </>
);

export default NotFound;
