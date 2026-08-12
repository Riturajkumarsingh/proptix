import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import useAuth from '@hooks/useAuth';

const Login = () => {
  const { login, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => login(data);

  const handleDemoLogin = (role) => {
    const email = role === 'admin' ? 'admin@proptix.com' : role === 'associate' ? 'associate@proptix.com' : 'customer@proptix.com';
    login({ email, password: 'password123' });
  };

  return (
    <>
      <Helmet>
        <title>Login — Proptix</title>
        <meta name="description" content="Login to your Proptix account." />
      </Helmet>

      <div>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#6B7280', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '1.5rem', fontWeight: 600, fontFamily: "'Outfit', sans-serif", transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = '#064E3B'} onMouseOut={(e) => e.currentTarget.style.color = '#6B7280'}>
          <FiArrowLeft size={16} /> Back to Home
        </Link>
        
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.875rem', color: '#0F1923', marginBottom: '0.5rem' }}>
            Welcome back
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Email Address"
            id="login-email"
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

          <Input
            label="Password"
            id="login-password"
            type="password"
            placeholder="Enter your password"
            required
            icon={<FiLock size={17} />}
            error={errors.password?.message}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' },
            })}
          />

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Link to="/auth/forgot-password"
              style={{ fontSize: '0.875rem', color: '#064E3B', fontWeight: 600, textDecoration: 'none' }}>
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            iconRight={<FiArrowRight size={18} />}
          >
            Sign In
          </Button>

          {/* Demo Login Buttons */}
          <div style={{ marginTop: '0.5rem', padding: '1rem', background: '#F8FAFB', borderRadius: '12px', border: '1px dashed #E5E7EB' }}>
            <p style={{ fontSize: '0.8125rem', color: '#6B7280', marginBottom: '0.75rem', textAlign: 'center', fontWeight: 600 }}>QUICK DEMO LOGIN</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              <Button type="button" variant="outline" size="sm" onClick={() => handleDemoLogin('admin')} style={{ fontSize: '0.75rem' }}>Admin</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleDemoLogin('associate')} style={{ fontSize: '0.75rem' }}>Associate</Button>
              <Button type="button" variant="outline" size="sm" onClick={() => handleDemoLogin('customer')} style={{ gridColumn: 'span 2', fontSize: '0.75rem' }}>Customer</Button>
            </div>
          </div>
        </form>

      </div>
    </>
  );
};

export default Login;
