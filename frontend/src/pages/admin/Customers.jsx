import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
const Customers = () => (<><Helmet><title>Customers — Proptix</title></Helmet><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><div style={{ padding: '1rem 0' }}><h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0F1923', marginBottom: '0.5rem' }}>Customers</h2><p style={{ color: '#9CA3AF' }}>Customer management module — building in Phase 5.</p></div></motion.div></>);
export default Customers;
