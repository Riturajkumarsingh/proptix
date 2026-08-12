import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiPhone, FiLock, FiArrowRight } from 'react-icons/fi';
import { Helmet } from 'react-helmet-async';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import useAuth from '@hooks/useAuth';

const Register = () => {
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = (data) => registerUser(data);

  return (
    <>
      <Helmet>
        <title>Create Account — Proptix</title>
        <meta name="description" content="Create your Proptix customer account." />
      </Helmet>

      <div>
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 800, fontSize: '1.875rem', color: '#0F1923', marginBottom: '0.5rem' }}>
            Create account
          </h1>
          <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
            Join Proptix and find your dream property
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Input
            label="Full Name"
            id="register-name"
            type="text"
            placeholder="Your full name"
            required
            icon={<FiUser size={17} />}
            error={errors.name?.message}
            {...register('name', {
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />

          <Input
            label="Email Address"
            id="register-email"
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
            label="Phone Number"
            id="register-phone"
            type="tel"
            placeholder="10-digit mobile number"
            required
            icon={<FiPhone size={17} />}
            error={errors.phone?.message}
            {...register('phone', {
              required: 'Phone number is required',
              pattern:  { value: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit Indian mobile number' },
            })}
          />

          <Input
            label="Password"
            id="register-password"
            type="password"
            placeholder="Min 8 chars with uppercase, number, symbol"
            required
            icon={<FiLock size={17} />}
            error={errors.password?.message}
            hint="Must have uppercase, lowercase, number & symbol"
            {...register('password', {
              required:  'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
              pattern: {
                value:   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
                message: 'Must include uppercase, lowercase, number and special character',
              },
            })}
          />

          <Input
            label="Confirm Password"
            id="register-confirm-password"
            type="password"
            placeholder="Repeat your password"
            required
            icon={<FiLock size={17} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (val) => val === password || 'Passwords do not match',
            })}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            iconRight={<FiArrowRight size={18} />}
          >
            Create Account
          </Button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#6B7280', fontSize: '0.9375rem' }}>
          Already have an account?{' '}
          <Link to="/auth/login" style={{ color: '#064E3B', fontWeight: 700, textDecoration: 'none' }}>
            Sign in
          </Link>
        </p>

        <p style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.8125rem', color: '#9CA3AF' }}>
          By creating an account, you agree to our{' '}
          <Link to="/terms" style={{ color: '#064E3B', fontWeight: 600 }}>Terms</Link> and{' '}
          <Link to="/privacy" style={{ color: '#064E3B', fontWeight: 600 }}>Privacy Policy</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
