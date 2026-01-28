"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Backend } from '@/client/TransClient';
import { isLogged } from '@/client/common.mock';

export default function LoginPage() {
  const router = useRouter();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ login?: string; password?: string; general?: string }>({});


  useEffect(() => {
      const run = async() => {
        const logged = await isLogged();
        console.log("tiue log : ", logged);
         if (logged){
            router.push('/');
        }
      }
      run();
    }, []);

  function validate() {
    const e: typeof errors = {};
    if (!login ) e.login = 'Login is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function redirect(){
   router.push('/auth/register');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;
    setLoading(true);
    try {
      const client = Backend.getInstance();
      const res = await client.auth.login({ username : login, password : password}); 
      if (!res.ok) throw res.error;
      const data = JSON.parse(res?.value);
      if (data.access_token) localStorage.setItem('access_token', data.access_token);
      if (data?.error) throw new Error(data.error)
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
      <button onClick={redirect}>No account yet ?</button>
    </div>
  );
}
