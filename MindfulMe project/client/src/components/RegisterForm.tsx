import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');  // Default role
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, role })
    });

    const data = await response.json();
    if (response.ok) {
      setMessage('Registration successful. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setMessage(data.error || 'Registration failed');
    }
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="w-full p-2 mb-2 border" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full p-2 mb-2 border" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full p-2 mb-2 border" required />

      <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 mb-2 border">
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      {message && <p className="mt-2 text-red-600">{message}</p>}
    </form>
  );
};

export default RegisterForm;
