import { motion } from 'framer-motion';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

const StatCard = ({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  color   = 'primary',
  loading = false,
  prefix  = '',
  suffix  = '',
  className = '',
}) => {
  const colorMap = {
    primary: { bg: '#ECFDF5', icon: '#064E3B', bar: 'linear-gradient(90deg, #064E3B, #059669)' },
    accent:  { bg: '#FFFBEB', icon: '#D4AF37', bar: 'linear-gradient(90deg, #D4AF37, #F5E6A3)' },
    success: { bg: '#ECFDF5', icon: '#10B981', bar: 'linear-gradient(90deg, #10B981, #34D399)' },
    warning: { bg: '#FEF3C7', icon: '#F59E0B', bar: 'linear-gradient(90deg, #F59E0B, #FCD34D)' },
    danger:  { bg: '#FEF2F2', icon: '#EF4444', bar: 'linear-gradient(90deg, #EF4444, #FCA5A5)' },
    info:    { bg: '#EFF6FF', icon: '#3B82F6', bar: 'linear-gradient(90deg, #3B82F6, #93C5FD)' },
  };
  const colors = colorMap[color] || colorMap.primary;
  const isPositive = change > 0;
  const isNeutral  = change === 0;

  if (loading) {
    return (
      <div className={`stat-card ${className}`}>
        <div className="skeleton" style={{ height: '1rem', width: '60%', marginBottom: '0.75rem' }} />
        <div className="skeleton" style={{ height: '2.5rem', width: '40%', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ height: '0.875rem', width: '50%' }} />
      </div>
    );
  }

  return (
    <motion.div
      className={`stat-card ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ translateY: -2 }}
    >
      {/* Color bar */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: colors.bar }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div>
          <p className="stat-label">{title}</p>
          <p className="stat-value">
            {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
          </p>
        </div>
        {icon && (
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: colors.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: colors.icon, fontSize: '1.25rem', flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
      </div>

      {change !== undefined && (
        <div className={`stat-change ${isPositive ? 'up' : isNeutral ? '' : 'down'}`}>
          {isNeutral ? <FiMinus size={14} /> : isPositive ? <FiTrendingUp size={14} /> : <FiTrendingDown size={14} />}
          <span>{Math.abs(change)}%</span>
          <span style={{ color: '#9CA3AF', fontWeight: 400 }}>{changeLabel}</span>
        </div>
      )}
    </motion.div>
  );
};

export default StatCard;
