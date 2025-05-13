import React from 'react'

export default function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4 bg-white rounded shadow">Total de Vendas Hoje: R$ 0</div>
      <div className="p-4 bg-white rounded shadow">Pedidos Pendentes: 0</div>
      <div className="p-4 bg-white rounded shadow">Valor a Receber: R$ 0</div>
    </div>
  )
}
