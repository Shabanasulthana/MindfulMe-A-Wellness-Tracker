import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';

const LoginForm = () => {
  const [form, setForm] = useState({ name: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(form); 
    if (res.success) {
      localStorage.setItem('user', JSON.stringify({
        id: res.user.id,
        name: res.user.name,
        role: res.user.role, 
        token: res.token,
      }));
      navigate('/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
      <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 mb-2 border rounded"
        required
      />
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
