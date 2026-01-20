"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRoute } from '@client/auth/auth.mock'
import { TransClient } from '@/client/TransClient';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!login ) e.login = 'Login is required';
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
      const client = TransClient.get_instance();

      const res = await client.login({ login : login, password : password}); 
      const data = res?.getData();
      if (!res.Ok) throw new Error(res.getMessage() || 'Login failed');
      if (data?.access_token) localStorage.setItem('access_token', data.access_token);
      router.push('/');
    } catch (err: any) {
      setErrors({ general: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h1>Log in Page</h1>
      <form onSubmit={submit}>
        <div>
          <label>Login</label>
          <input value={login} onChange={e => setLogin(e.target.value)} type="login" />
          {errors.login && <div style={{ color: 'red' }}>{errors.login}</div>}
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Logging in…' : 'Log in'}</button>
      </form>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
