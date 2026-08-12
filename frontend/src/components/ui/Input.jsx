import { forwardRef } from 'react';
import { FiEye, FiEyeOff, FiSearch, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';

const Input = forwardRef(({
  label,
  error,
  hint,
  icon,
  iconRight,
  type        = 'text',
  placeholder,
  required    = false,
  disabled    = false,
  fullWidth   = true,
  className   = '',
  id,
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const isPassword = type === 'password';
  const inputType  = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`form-group ${fullWidth ? 'w-full' : ''} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="form-label">
          {label}
          {required && <span style={{ color: '#EF4444', marginLeft: '0.25rem' }}>*</span>}
        </label>
      )}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {icon && (
          <span style={{
            position: 'absolute', left: '0.875rem', color: '#6B7280',
            display: 'flex', alignItems: 'center', zIndex: 1, pointerEvents: 'none'
          }}>
            {icon}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          type={inputType}
          disabled={disabled}
          placeholder={placeholder}
          className={`form-input ${error ? 'error' : ''}`}
          style={{
            paddingLeft:  icon ? '2.625rem' : undefined,
            paddingRight: (iconRight || isPassword) ? '2.625rem' : undefined,
          }}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            style={{
              position: 'absolute', right: '0.875rem', color: '#6B7280',
              display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer'
            }}
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
        {!isPassword && iconRight && (
          <span style={{
            position: 'absolute', right: '0.875rem', color: '#6B7280',
            display: 'flex', alignItems: 'center', zIndex: 1
          }}>
            {iconRight}
          </span>
        )}
      </div>
      {error && (
        <p className="form-error">
          <FiAlertCircle size={14} />
          {error}
        </p>
      )}
      {hint && !error && (
        <p style={{ fontSize: '0.8125rem', color: '#9CA3AF' }}>{hint}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
