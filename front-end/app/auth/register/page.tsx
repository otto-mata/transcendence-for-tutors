"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registerRoute, loginRoute } from '@client/auth/auth.mock'
import { TransClient } from '@/client/TransClient';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge ] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string; email?:string; age?: string }>({});

  function validate() {
    const e: typeof errors = {};
    if (!emailRegex.test(email)) e.email = 'Please enter a valid email address';
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
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
      const res = await client.register({
        login : login,
        password : password,
        email : email,
        display_name : name,
        age : age
      });
      const data = res?.getData();
      if (!res.Ok()) throw new Error(res.getMessage() || 'Register failed');
      if (data?.access_token) localStorage.setItem('token', data.access_token);
      router.push('/');
    } catch (err: any) {
      setErrors({ general: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 480, margin: '2rem auto' }}>
      <h1>Register</h1>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="login" />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
        </div>
        <div>
          <label>Login</label>
          <input value={login} onChange={e => setLogin(e.target.value)} />
          {errors.login && <div style={{ color: 'red' }}>{errors.login}</div>}
        </div>
        <div>
          <label>Name</label>
          <input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
          {errors.password && <div style={{ color: 'red' }}>{errors.password}</div>}
        </div>
        <div>
          <label>age</label>
          <input value={age} onChange={e => setAge(e.target.value)} />
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
      </form>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
