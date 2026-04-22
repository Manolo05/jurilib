'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) throw new Error();
      const { accessToken } = await r.json();
      localStorage.setItem('token', accessToken);
      router.push('/recherche');
    } catch {
      setError('Identifiants invalides');
    }
  }

  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <h1 className="text-2xl font-bold">Se connecter</h1>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-lg border px-3 py-2"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full rounded-lg border px-3 py-2"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full rounded-lg bg-brand-600 text-white py-2 hover:bg-brand-700">
          Connexion
        </button>
      </form>
    </div>
  );
}
