import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiMail, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import { authAPI } from '@services/auth.service';
import toast from 'react-hot-toast';

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await authAPI.forgotPassword(data);
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '72px', height: '72px', borderRadius: '50%',
          background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
        }}>
          <FiCheckCircle size={36} color="#059669" />
        </div>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.625rem', color: '#0F1923', marginBottom: '0.75rem' }}>
          Check your email
        </h2>
        <p style={{ color: '#6B7280', marginBottom: '2rem', lineHeight: 1.7 }}>
          We sent a password reset link to <strong style={{ color: '#0F1923' }}>{getValues('email')}</strong>.
          The link will expire in 30 minutes.
        </p>
        <Link to="/auth/login"><Button variant="primary" fullWidth>Back to Login</Button></Link>
        <button onClick={() => setSent(false)}
          style={{ marginTop: '1rem', color: '#064E3B', fontWeight: 600, fontSize: '0.875rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          Try a different email
        </button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Forgot Password — Proptix</title>
      </Helmet>
      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.875rem', color: '#0F1923', marginBottom: '0.5rem' }}>
            Forgot password?
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
            Enter your email and we'll send a reset link.
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Email Address"
            id="forgot-email"
            type="email"
            placeholder="you@example.com"
            required
            icon={<FiMail size={17} />}
            error={errors.email?.message}
            {...register('email', {
              required: 'Email is required',
              pattern:  { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
            })}
          />
          <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
            Send Reset Link
          </Button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/auth/login" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#064E3B', fontWeight: 600, textDecoration: 'none', fontSize: '0.9375rem' }}>
            <FiArrowLeft size={16} /> Back to Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default ForgotPassword;
