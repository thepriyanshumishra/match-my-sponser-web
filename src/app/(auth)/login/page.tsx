'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GlassCard } from '@/components/shared/GlassCard';
import { Input } from '@/components/ui/Input';
import { GlassButton } from '@/components/shared/GlassButton';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Create demo accounts on component mount
  useEffect(() => {
    const createDemoAccounts = () => {
      const existingAccounts = localStorage.getItem('demo_accounts');
      if (!existingAccounts) {
        const demoAccounts = [
          {
            id: 'demo-organizer-1',
            email: 'organizer@demo.com',
            name: 'Alex Johnson',
            role: 'organizer',
            password: 'demo123',
            createdAt: new Date().toISOString()
          },
          {
            id: 'demo-sponsor-1',
            email: 'sponsor@demo.com',
            name: 'Sarah Chen',
            role: 'sponsor',
            password: 'demo123',
            createdAt: new Date().toISOString()
          }
        ];
        localStorage.setItem('demo_accounts', JSON.stringify(demoAccounts));
      }
    };
    createDemoAccounts();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Check demo accounts first
      const demoAccountsStr = localStorage.getItem('demo_accounts');
      if (demoAccountsStr) {
        const demoAccounts = JSON.parse(demoAccountsStr);
        const demoAccount = demoAccounts.find(
          (acc: any) => acc.email === formData.email && acc.password === formData.password
        );
        
        if (demoAccount) {
          // Store session for demo account
          const { setSession } = await import('@/lib/auth');
          setSession({
            user: {
              id: demoAccount.id,
              email: demoAccount.email,
              name: demoAccount.name,
              role: demoAccount.role,
              createdAt: new Date(demoAccount.createdAt),
              updatedAt: new Date()
            },
            accessToken: 'demo-token',
            refreshToken: 'demo-refresh'
          });

          // Redirect based on role
          if (demoAccount.role === 'organizer') {
            router.push('/organizer/dashboard');
          } else if (demoAccount.role === 'sponsor') {
            router.push('/sponsor/dashboard');
          }
          return;
        }
      }

      // Try regular API login
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          rememberMe: formData.rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ form: data.error || 'Login failed. Please try again.' });
        return;
      }

      // Store session in localStorage
      const { setSession } = await import('@/lib/auth');
      setSession({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });

      console.log('Login successful, redirecting to:', data.user.role);

      // Redirect based on user role
      const redirectPath = data.user.role === 'organizer' 
        ? '/organizer/dashboard' 
        : '/sponsor/dashboard';
      
      window.location.href = redirectPath;
    } catch (error) {
      setErrors({ form: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <GlassCard className="w-full max-w-md" padding="lg">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
              {errors.form}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              className={errors.email ? 'border-red-300' : ''}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className={errors.password ? 'border-red-300' : ''}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </GlassButton>

          <div className="text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </Link>
          </div>
        </form>

        {/* Demo Account Quick Login - Remove in production */}
        <div className="mt-6 pt-6 border-t border-white/20">
          <p className="text-sm text-gray-600 text-center mb-3">Quick Demo Login:</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'organizer@demo.com',
                  password: 'demo123',
                  rememberMe: false
                });
              }}
              className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-700 rounded-lg text-sm font-medium transition-colors"
            >
              👤 Organizer
            </button>
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: 'sponsor@demo.com',
                  password: 'demo123',
                  rememberMe: false
                });
              }}
              className="flex-1 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-700 rounded-lg text-sm font-medium transition-colors"
            >
              🏢 Sponsor
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
