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
<<<<<<< HEAD
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string; firstName?: string; lastName?: string; age?: string; }>({});
=======
  const [age, setAge ] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string; email?:string; age?: string }>({});
>>>>>>> 876d8de ([DevFeat] mockApi Done, some examples on homepage and login page to use them)

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
<<<<<<< HEAD
      const api = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000';
      const res = await fetch(`${api}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, login: name, password, display_name: firstName+lastName, age: parseInt(age, 10)}),
=======
      const client = TransClient.get_instance();
      const res = await client.register({
        login : login,
        password : password,
        email : email,
        display_name : name,
        age : age
>>>>>>> 876d8de ([DevFeat] mockApi Done, some examples on homepage and login page to use them)
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
<<<<<<< HEAD
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
=======
          <label>age</label>
          <input value={age} onChange={e => setAge(e.target.value)} />
>>>>>>> 876d8de ([DevFeat] mockApi Done, some examples on homepage and login page to use them)
        </div>
        <button type="submit" disabled={loading}>{loading ? 'Registering…' : 'Register'}</button>
      </form>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
