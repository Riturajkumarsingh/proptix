import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PageHero = ({ 
  title, 
  subtitle, 
  image = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
  height = '60vh'
}) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section 
      style={{ height, minHeight: '400px' }}
      className="relative flex items-center justify-center overflow-hidden bg-primary-900 mt-[-110px]"
    >
      {/* Parallax Background */}
      <motion.div 
        style={{ y, backgroundImage: `url(${image})` }}
        className="absolute inset-0 w-full h-[120%] bg-cover bg-center"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-900/80 via-primary-900/60 to-primary-900/95" />
      
      {/* Content */}
      <div className="container relative z-10 text-center pt-20 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6"
        >
          {title}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-body"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
