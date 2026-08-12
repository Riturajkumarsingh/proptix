import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
const Placeholder = ({ name, phase }) => (<><Helmet><title>{name} — Proptix</title></Helmet><motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}><div style={{ padding: '1rem 0' }}><h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0F1923', marginBottom: '0.5rem' }}>{name}</h2><p style={{ color: '#9CA3AF' }}>This module is building in {phase}. Check back soon.</p></div></motion.div></>);
export default Placeholder;
