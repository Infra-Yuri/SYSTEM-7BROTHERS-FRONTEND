import React, { useState, useEffect } from 'react';
import api from '../services/api';
import OrderForm from '../components/OrderForm';

export default function Pedidos() {
  const [mode, setMode] = useState('list');
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    api.get('/pedidos')
      .then(res => setPedidos(res.data))
      .catch(console.error);
  }, []);

  const handleNew = data => {
    const payload = {
      client_code: '001',           // adapte para um select de cliente
      order_date: new Date(),
      total: data.total,
      items: data.items             // caso use tabela order_items
    };
    api.post('/pedidos', payload)
      .then(res => {
        setPedidos([res.data, ...pedidos]);
        setMode('list');
      });
  };

  if (mode === 'new') {
    return (
      <div>
        <button
          className="mb-4 text-blue-600"
          onClick={() => setMode('list')}
        >← Voltar</button>
        <OrderForm onSubmit={handleNew} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <button
        className="mb-4 bg-green-500 text-white px-3 py-1 rounded"
        onClick={() => setMode('new')}
      >+ Novo Pedido</button>

      {/* Aqui sua tabela de pedidos */}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th>Nº Pedido</th><th>Data</th><th>Total</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(p => (
            <tr key={p.order_number}>
              <td>{p.order_number}</td>
              <td>{new Date(p.order_date).toLocaleDateString()}</td>
              <td>R$ {p.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
