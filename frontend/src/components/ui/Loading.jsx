import { motion } from 'framer-motion';

// Full page loading
export const PageLoader = () => (
  <div style={{
    minHeight: '100vh', display: 'flex', alignItems: 'center',
    justifyContent: 'center', flexDirection: 'column', gap: '1.5rem',
    background: '#F8FAFB',
  }}>
    <div style={{ position: 'relative', width: '56px', height: '56px' }}>
      <div style={{
        width: '56px', height: '56px', borderRadius: '50%',
        border: '3px solid rgba(6,78,59,0.1)',
        borderTop: '3px solid #064E3B',
        animation: 'spin 0.8s linear infinite',
      }} />
      <div style={{
        position: 'absolute', inset: '8px', borderRadius: '50%',
        border: '3px solid rgba(212,175,55,0.15)',
        borderTop: '3px solid #D4AF37',
        animation: 'spin 1.2s linear infinite reverse',
      }} />
    </div>
    <div style={{ textAlign: 'center' }}>
      <p style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#064E3B' }}>
        Proptix
      </p>
      <p style={{ fontSize: '0.8125rem', color: '#9CA3AF', marginTop: '0.25rem' }}>Loading...</p>
    </div>
  </div>
);

// Inline spinner
export const Spinner = ({ size = 24, color = '#064E3B' }) => (
  <div style={{
    width: size, height: size, borderRadius: '50%',
    border: `2px solid rgba(6,78,59,0.15)`,
    borderTop: `2px solid ${color}`,
    animation: 'spin 0.7s linear infinite',
    flexShrink: 0,
  }} />
);

// Skeleton line
export const SkeletonLine = ({ width = '100%', height = '1rem', className = '' }) => (
  <div className={`skeleton ${className}`} style={{ width, height, borderRadius: '6px' }} />
);

// Skeleton card
export const SkeletonCard = ({ lines = 3 }) => (
  <div className="card" style={{ padding: '1.5rem' }}>
    <SkeletonLine height="1.5rem" width="60%" />
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i === lines - 1 ? '70%' : '100%'} />
      ))}
    </div>
  </div>
);

// Table skeleton
export const SkeletonTable = ({ rows = 5, cols = 5 }) => (
  <div className="table-container">
    <table className="table">
      <thead>
        <tr>
          {Array.from({ length: cols }).map((_, i) => (
            <th key={i}><SkeletonLine height="0.875rem" width="80%" /></th>
          ))}
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, r) => (
          <tr key={r}>
            {Array.from({ length: cols }).map((_, c) => (
              <td key={c}><SkeletonLine height="0.875rem" width={c === 0 ? '60%' : '80%'} /></td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PageLoader;
