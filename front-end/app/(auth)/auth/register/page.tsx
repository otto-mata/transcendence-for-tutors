"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backend } from '@/client/TransClient';
import { isLogged } from '@/client/common.mock';

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
    if (password.length < 8) e.password = 'Password must be at least 8 characters';
    const ageNum = parseInt(age, 10);

    if (isNaN(ageNum)) {
      e.age = 'Enter a valid age';
    } else if (ageNum < 18 || ageNum >= 150) {
      e.age = 'Age must be between 18 and 150';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
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
        username : login,
        password : password,
        email : email,
        displayName : name,
      });
      if (!res.ok) throw res.error;
      const data = res?.value;
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
      <button onClick={redirect}>Already registered ?</button>
      {errors.general && <p style={{ color: 'red' }}>{errors.general}</p>}
    </div>
  );
}
