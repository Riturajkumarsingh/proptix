import { motion } from 'framer-motion';
import { FiLoader } from 'react-icons/fi';

const Button = ({
  children,
  variant  = 'primary',
  size     = 'md',
  loading  = false,
  disabled = false,
  icon,
  iconRight,
  fullWidth = false,
  type      = 'button',
  onClick,
  className = '',
  ...props
}) => {
  const baseClass = 'btn';

  const variantClass = {
    primary: 'btn-primary',
    accent:  'btn-accent',
    outline: 'btn-outline',
    ghost:   'btn-ghost',
    danger:  'btn-danger',
  }[variant] || 'btn-primary';

  const sizeClass = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
    xl: 'btn-xl',
  }[size] || '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={!disabled && !loading ? { scale: 0.97 } : {}}
      className={[
        baseClass,
        variantClass,
        sizeClass,
        fullWidth ? 'w-full' : '',
        loading ? 'opacity-75' : '',
        className,
      ].filter(Boolean).join(' ')}
      {...props}
    >
      {loading ? (
        <FiLoader className="animate-spin" size={16} />
      ) : (
        icon && <span className="flex items-center">{icon}</span>
      )}
      {children}
      {!loading && iconRight && <span className="flex items-center">{iconRight}</span>}
    </motion.button>
  );
};

export default Button;
