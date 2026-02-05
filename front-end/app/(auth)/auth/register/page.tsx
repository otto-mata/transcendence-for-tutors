"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleLogin, CredentialResponse, GoogleOAuthProvider } from '@react-oauth/google';
import { Backend } from '@/client/TransClient';
import { isLogged } from '@/client/common.mock';
import { Loader2 } from 'lucide-react';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string; email?: string ; name?: string }>({});

  useEffect(() => {
    const run = async() => {
      const logged = await isLogged();
      if (logged){
        router.push("/");
      }
    }
    run();
  }, []);

  function validate() {
    const e: typeof errors = {};
    if (!emailRegex.test(email)) e.email = 'Please enter a valid email address';
    if (!login) e.login = 'Username is required';
    if (!name) e.name = 'DisplayName is required';
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleFortyTwoLogin() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:8443/api';
    window.location.href = `${apiUrl}/auth/42/login`;
  }

  function handleGoogleRedirect() {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:8443/api';
    window.location.href = `${apiUrl}/auth/google/login`;
  }

  async function handleGoogleLogin(credentialResponse: CredentialResponse) {
    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL ?? 'https://localhost:8443/api';
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

  function redirect(){
    router.push('/auth/login');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const client = Backend.getInstance();
      const res = await client.auth.register({
        username: login,
        password: password,
        email: email,
        displayName: name,
      });
      if (!res.ok) throw res.error;
      const data = res?.value;
      if (data?.access_token) localStorage.setItem('access_token', data.access_token);
      router.push('/');
    } catch (err: any) {
      // Extract error message from Axios error response or fallback to generic message
      let errorMessage = 'Registration failed';
      if (err?.response?.data) {
        const data = typeof err.response.data === 'string' 
          ? JSON.parse(err.response.data) 
          : err.response.data;
        errorMessage = data?.message || err?.message || String(err);
      } else {
        errorMessage = err?.message || String(err);
      }
      setErrors({ general: errorMessage });
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
            <p className="text-gray-400 mt-2">Create your account to get started.</p>
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
                Sign up with 42
              </button>

              {/* Google Button */}
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
                Sign up with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-800/50 text-gray-400">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={submit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
                <input
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  maxLength={50}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Username</label>
                  <input
                    value={login}
                    maxLength={15}
                    onChange={e => setLogin(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.login && <p className="mt-1 text-sm text-red-400">{errors.login}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Display Name</label>
                  <input
                    value={name}
                    maxLength={30}
                    onChange={e => setName(e.target.value)}
                    type="text"
                    placeholder="Display name"
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name}</p>}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1.5">Password</label>
                <input
                  value={password}
                  maxLength={128}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </button>
            </form>

            {errors.general && (
              <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 text-center">{errors.general}</p>
              </div>
            )}

            {/* Login Link */}
            <p className="mt-6 text-center text-gray-400">
              Already have an account?{' '}
              <button
                onClick={redirect}
                className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
