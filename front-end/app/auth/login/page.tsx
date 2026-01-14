"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setuid } from 'process';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string; general?: string }>({});

  function validate() {
    const e: typeof errors = {};
    // if (!emailRegex.test(username)) e.username = 'Please enter a valid username';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${api}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: username, password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'Login failed');
      if (body.token) localStorage.setItem('token', body.token);
      router.push('/');
    } catch (err: any) {
      setErrors({ general: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h1>Login</h1>
      <form onSubmit={submit}>
        <div>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} />
          {errors.username && <div style={{ color: 'red' }}>{errors.username}</div>}
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Login'}</button>
      </form>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
