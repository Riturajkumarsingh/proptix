import { motion } from 'framer-motion';

const Card = ({
  children,
  variant   = 'default',
  hover     = false,
  padding   = 'md',
  className = '',
  onClick,
  ...props
}) => {
  const variantClass = {
    default: 'card',
    glass:   'card-glass',
    dark:    'card-dark',
  }[variant] || 'card';

  const paddingClass = {
    none: '',
    sm:   'p-4',
    md:   'p-6',
    lg:   'p-8',
  }[padding] || 'p-6';

  return (
    <motion.div
      onClick={onClick}
      className={[variantClass, paddingClass, hover ? 'card-hover' : '', onClick ? 'cursor-pointer' : '', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Card sub-components
Card.Header = ({ children, className = '' }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

Card.Title = ({ children, className = '' }) => (
  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1.125rem', color: '#0F1923', marginBottom: '0.25rem' }} className={className}>
    {children}
  </h3>
);

Card.Subtitle = ({ children, className = '' }) => (
  <p style={{ fontSize: '0.875rem', color: '#6B7280' }} className={className}>{children}</p>
);

Card.Body    = ({ children, className = '' }) => <div className={className}>{children}</div>;
Card.Footer  = ({ children, className = '' }) => (
  <div style={{ paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid rgba(6,78,59,0.08)' }} className={className}>
    {children}
  </div>
);

export default Card;
