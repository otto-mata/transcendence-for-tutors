"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string; firstName?: string; lastName?: string; age?: string; }>({});

  function validate() {
    const e: typeof errors = {};
    if (!emailRegex.test(email)) e.email = 'Please enter a valid email address';
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
    if (firstName.length < 3) e.firstName = 'First name must be at least 3 characters';
    if (lastName.length < 3) e.lastName = 'Last name must be at least 3 characters';
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum)) {
      e.age = 'Enter a valid age';
    } else if (ageNum < 18 || ageNum >= 150) {
      e.age = 'Age must be between 18 and 150';
    }
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
      const res = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, login: name, password, display_name: firstName+lastName, age: parseInt(age, 10)}),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || 'Registration failed');
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
      <h1>Register</h1>
      <form onSubmit={submit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
          {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}
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
          <label>First Name</label>
          <input value={firstName} onChange={e => setFirstName(e.target.value)} />
        </div>
        <div>
          <label>Last Name</label>
          <input value={lastName} onChange={e => setLastName(e.target.value)} />
        </div>
        <div>
        <label>Age</label>
          <input value={age} onChange={e => setAge(e.target.value)} />  
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
      </form>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
