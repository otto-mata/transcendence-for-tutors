"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { Backend } from '@/client/TransClient';
import { isLogged } from '@/client/common.mock';
import { Loader2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string }>({});

  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
      if (logged){
        router.push('/');
      }
    }
    run();
  }, []);

  function validate() {
    const e: typeof errors = {};
    if (!login) e.login = 'Login is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function redirect(){
    router.push('/auth/register');
  }

  function handleFortyTwoLogin() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    window.location.href = `${apiUrl}/auth/42/login`;
  }

  function handleGoogleRedirect() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? '/api';
    window.location.href = `${apiUrl}/auth/google/login`;
  }

  async function handleGoogleLogin(credentialResponse: CredentialResponse) {
    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL ?? '/api';
      const res = await fetch(`${api}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'Google login failed');
      if (body.access_token) localStorage.setItem('access_token', body.access_token);
      router.push('/');
    } catch (err: any) {
      setErrors({ general: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const client = Backend.getInstance();
      const res = await client.auth.login({ username: login, password: password }); 
      if (!res.ok) {
        const axiosError = res.error as any;
        const errorMessage = axiosError?.response?.data?.error?.message 
          || axiosError?.response?.data?.message 
          || axiosError?.message 
          || 'Invalid credentials';
        throw new Error(errorMessage);
      }
      const data = typeof res.value === 'string' ? JSON.parse(res.value) : res.value;
      if (data.access_token) localStorage.setItem('access_token', data.access_token);
      if (data?.error) throw new Error(data.error.message || data.error);
      router.push('/');
    } catch (err: any) {
      setErrors({ general: err.message || 'Login failed' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''}>
      <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
        <div className="w-full max-w-md">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              ft_transcendence
            </h1>
            <p className="text-gray-400 mt-2">Welcome back! Please sign in.</p>
          </div>

          {/* Card */}
          <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
            {/* OAuth Buttons */}
            <div className="space-y-3 mb-6">
              {/* 42 Button */}
              <button
                onClick={handleFortyTwoLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-6 h-6" viewBox="0 0 137.52 96.5" fill="currentColor">
                  <polygon points="76.01 96.5 76.01 64.34 32.5 64.34 32.5 96.5 0 96.5 0 64.34 0 32.17 0 0 32.5 0 32.5 32.17 32.5 64.34 76.01 64.34 76.01 32.17 76.01 0 108.52 0 108.52 32.17 108.52 64.34 137.52 64.34 137.52 96.5 108.52 96.5 76.01 96.5"/>
                </svg>
                Continue with 42
              </button>

              {/* Google Button - Using redirect approach for consistency */}
              <button
                onClick={handleGoogleRedirect}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white hover:bg-gray-100 text-gray-800 font-medium rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800/50 text-gray-400">or continue with username</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                <input
                  value={login}
                  maxLength={15}
                  onChange={e => setLogin(e.target.value)}
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.login && <p className="mt-1 text-sm text-red-400">{errors.login}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <input
                  value={password}
                  maxLength={128}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <div className="flex justify-end text-sm">
                <a href="/auth/forgot-password" className="text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>

            {errors.general && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 text-center">{errors.general}</p>
              </div>
            )}

            {/* Register Link */}
            <p className="mt-6 text-center text-gray-400">
              Don't have an account?{' '}
              <button
                onClick={redirect}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
