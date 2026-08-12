import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size     = 'md',
  closable = true,
  className = '',
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && closable) onClose?.(); };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closable, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sizeStyle = {
    sm: '400px',
    md: '560px',
    lg: '720px',
    xl: '900px',
    full: '100%',
  }[size] || '560px';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => { if (e.target === e.currentTarget && closable) onClose?.(); }}
        >
          <motion.div
            className={`modal-content ${className}`}
            style={{ maxWidth: sizeStyle }}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          >
            {/* Header */}
            {(title || closable) && (
              <div className="modal-header">
                {title && <h2 className="modal-title">{title}</h2>}
                {closable && (
                  <button
                    onClick={onClose}
                    style={{
                      width: '2rem', height: '2rem', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: '#F3F4F6', color: '#374151', cursor: 'pointer',
                      border: 'none', transition: 'all 0.15s',
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#E5E7EB'}
                    onMouseLeave={(e) => e.target.style.background = '#F3F4F6'}
                  >
                    <FiX size={18} />
                  </button>
                )}
              </div>
            )}

            {/* Body */}
            <div className="modal-body">{children}</div>

            {/* Footer */}
            {footer && <div className="modal-footer">{footer}</div>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
