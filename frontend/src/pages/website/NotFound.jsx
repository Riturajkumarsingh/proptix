import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import AnimatedSection from '@components/ui/AnimatedSection';
import Button from '@components/ui/Button';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | Proptix</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-bg relative overflow-hidden px-4 -mt-[70px]">
        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-100 rounded-full blur-[120px] opacity-50 pointer-events-none" />
        
        <AnimatedSection className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-[120px] md:text-[180px] font-heading font-black text-primary-900 leading-none drop-shadow-sm mb-2">
            4<span className="text-accent">0</span>4
          </h1>
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-text-dark mb-6">
            Oops! Property Not Found
          </h2>
          <p className="text-text-mid font-body text-lg mb-10">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Let's get you back home.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-md" icon={<FiHome size={18} />}>
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" onClick={() => window.history.back()} icon={<FiArrowLeft size={18} />}>
              Go Back
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </>
  );
};

export default NotFound;
