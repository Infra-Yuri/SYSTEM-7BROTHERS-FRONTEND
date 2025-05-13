import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function OrderForm({ onSubmit }) {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [items, setItems] = useState([]);

  // Debounce de 300ms para consulta de produtos
  useEffect(() => {
    if (!search) return setSuggestions([]);
    const timeout = setTimeout(() => {
      api.get('/products', { params: { search } })
        .then(res => setSuggestions(res.data))
        .catch(() => setSuggestions([]));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const addItem = product => {
    setItems(prev => [
      ...prev,
      { ...product, quantity: 1, lineTotal: product.price }
    ]);
    setSearch('');
    setSuggestions([]);
  };

  const updateQty = (idx, qty) => {
    setItems(prev => {
      const arr = [...prev];
      arr[idx].quantity = qty;
      arr[idx].lineTotal = +(qty * arr[idx].price).toFixed(2);
      return arr;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({ items, total: items.reduce((s,i)=>s+i.lineTotal,0) });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label className="block mb-1">Buscar produto:</label>
        <input
          className="border px-2 py-1 w-full"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {suggestions.length > 0 && (
          <ul className="border mt-1 max-h-40 overflow-auto">
            {suggestions.map(p => (
              <li
                key={p.id}
                className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
                onClick={() => addItem(p)}
              >
                {p.code} — {p.name} (R$ {p.price.toFixed(2)})
              </li>
            ))}
          </ul>
        )}
      </div>

      {items.length > 0 && (
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th>Produto</th><th>Qtd</th><th>Preço</th><th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  <input
                    type="number" min="1"
                    className="w-16 border px-1"
                    value={item.quantity}
                    onChange={e => updateQty(idx, +e.target.value)}
                  />
                </td>
                <td>R$ {item.price.toFixed(2)}</td>
                <td>R$ {item.lineTotal.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Enviar Pedido (Total R$ {items.reduce((s,i)=>s+i.lineTotal,0).toFixed(2)})
      </button>
    </form>
  );
}
