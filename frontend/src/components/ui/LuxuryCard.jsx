import React from 'react';
import { motion } from 'framer-motion';

const LuxuryCard = ({ 
  children, 
  className = '', 
  hoverZoom = true,
  onClick,
  glass = false
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverZoom ? { y: -8, boxShadow: '0 20px 40px rgba(6, 78, 59, 0.12)' } : {}}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`
        relative overflow-hidden rounded-[20px] 
        ${glass ? 'bg-white/90 backdrop-blur-md border border-white/20' : 'bg-white border border-primary-900/5'} 
        shadow-[0_4px_20px_rgba(15,25,35,0.06)]
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default LuxuryCard;
