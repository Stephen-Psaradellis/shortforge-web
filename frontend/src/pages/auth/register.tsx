'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import toast from 'react-hot-toast';

const registerSchema = z.object({
  full_name: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  company: z.string().optional(),
  phone: z.string().optional()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const password = watch('password');

  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, label: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const strengths = [
      { label: 'Weak', color: 'text-red-400' },
      { label: 'Fair', color: 'text-yellow-400' },
      { label: 'Good', color: 'text-blue-400' },
      { label: 'Strong', color: 'text-green-400' },
      { label: 'Excellent', color: 'text-green-500' }
    ];

    return { strength, ...strengths[strength] };
  };

  const passwordStrength = getPasswordStrength(password || '');

  const onSubmit = async (data: RegisterForm) => {
    setIsLoading(true);
    try {
      await registerUser({
        full_name: data.full_name,
        email: data.email,
        password: data.password,
        company: data.company,
        phone: data.phone
      });
      toast.success('Account created successfully! Welcome to ShortForge.');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-forge-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Link href="/" className="inline-flex items-center space-x-3 mb-10 group">
            <div className="w-12 h-12 bg-gradient-to-br from-ember-700 to-ember-800 rounded-lg flex items-center justify-center shadow-glow-sm group-hover:shadow-glow transition-all duration-300">
              <span className="text-white font-bold text-xl">SF</span>
            </div>
            <span className="text-3xl font-bold text-white">ShortForge</span>
          </Link>

          <h2 className="text-4xl font-bold text-white mb-4">Create Account</h2>
          <p className="text-secondary-200 text-lg">
            Join ShortForge and transform your business
          </p>
        </motion.div>

        {/* Register Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-glow"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                {...register('full_name')}
                className="input-field"
                placeholder="John Doe"
                autoComplete="name"
              />
              {errors.full_name && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle size={14} className="text-red-400" />
                  <p className="text-red-400 text-sm">{errors.full_name.message}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                {...register('email')}
                className="input-field"
                placeholder="your@email.com"
                autoComplete="email"
              />
              {errors.email && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle size={14} className="text-red-400" />
                  <p className="text-red-400 text-sm">{errors.email.message}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  {...register('company')}
                  className="input-field"
                  placeholder="Your Company"
                  autoComplete="organization"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-300 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  className="input-field"
                  placeholder="+1 (555) 123-4567"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password')}
                  className="input-field pr-10"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-secondary-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${
                          passwordStrength.strength === 1 ? 'bg-red-500' :
                          passwordStrength.strength === 2 ? 'bg-yellow-500' :
                          passwordStrength.strength === 3 ? 'bg-blue-500' :
                          passwordStrength.strength >= 4 ? 'bg-green-500' : 'bg-secondary-600'
                        }`}
                        style={{ width: `${(passwordStrength.strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.color}`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="text-xs text-secondary-400 mt-1">
                    Use 8+ characters with uppercase, lowercase, numbers & symbols
                  </div>
                </div>
              )}

              {errors.password && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle size={14} className="text-red-400" />
                  <p className="text-red-400 text-sm">{errors.password.message}</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-secondary-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className="input-field pr-10"
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary-400 hover:text-secondary-300"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center space-x-1 mt-1">
                  <AlertCircle size={14} className="text-red-400" />
                  <p className="text-red-400 text-sm">{errors.confirmPassword.message}</p>
                </div>
              )}
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 mt-1 text-ember-600 bg-forge-slate border-forge-steel/40 rounded focus:ring-ember-500 focus:ring-offset-forge-black cursor-pointer"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-secondary-200 cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-ember-400 hover:text-ember-300 font-medium transition-colors">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-ember-400 hover:text-ember-300 font-medium transition-colors">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating account...
                </>
              ) : (
                <>
                  Create Account
                  <UserPlus size={20} className="ml-2" />
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Sign In Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center"
        >
          <p className="text-secondary-200">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-ember-400 hover:text-ember-300 font-semibold transition-colors">
              Sign in here
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
