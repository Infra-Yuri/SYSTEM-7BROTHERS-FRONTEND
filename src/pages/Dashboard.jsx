import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);
  const usuario = localStorage.getItem('usuario');

  useEffect(() => {
    axios.get('http://localhost:3001/pedidos', {
      headers: { Authorization: localStorage.getItem('token') }
    }).then(res => setPedidos(res.data));
  }, []);

  function logout() {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Pedidos</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm">Bem-vindo, {usuario}</span>
          <button onClick={logout} className="bg-red-600 text-white px-3 py-1 rounded">Sair</button>
        </div>
      </div>
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th>Pedido</th><th>Cliente</th><th>Valor</th><th>Pago</th><th>Saldo</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.id} className="text-center border-t">
              <td>{p.numero}</td><td>{p.cliente}</td><td>{p.total}</td><td>{p.valor_pago}</td><td>{p.saldo}</td><td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}