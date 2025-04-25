import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/login', { email, senha });
      const token = res.data.token;
      const payload = JSON.parse(atob(token.split('.')[1]));
      localStorage.setItem('token', token);
      localStorage.setItem('cargo', payload.cargo);
      localStorage.setItem('usuario', payload.nome);
      navigate('/');
    } catch {
      alert('Erro no login');
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}
          className="mb-3 w-full p-2 border rounded" required />
        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}
          className="mb-3 w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
