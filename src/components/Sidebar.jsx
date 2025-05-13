import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  const links = [
    { to: '/dashboard',    label: 'Dashboard' },
    { to: '/admin',        label: 'Painel Admin' },
    { to: '/pedidos',      label: 'Pedidos' },
    { to: '/clientes',     label: 'Clientes' },
    { to: '/produtos',     label: 'Produtos' },
    { to: '/entregas',     label: 'Entregas' },
    { to: '/financeiro',   label: 'Financeiro' },
    { to: '/relatorios',   label: 'Relatórios' },
    { to: '/dbf-viewer/clientes', label: 'Ver clientes.dbf' },
    { to: '/dbf-viewer/produtos', label: 'Ver produtos.dbf' }
  ]

  function handleLogout() {
    localStorage.removeItem('token')
    window.location.href = '/login'
  }

  return (
    <aside className="w-64 h-screen bg-white dark:bg-gray-800 p-4 flex flex-col">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Sete Irmãos
      </h1>
      <nav className="flex-1 flex flex-col space-y-2">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              isActive
                ? 'block px-3 py-2 rounded bg-blue-100 font-semibold text-blue-600'
                : 'block px-3 py-2 rounded hover:bg-blue-50 hover:text-blue-600'
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-auto px-3 py-2 text-sm text-red-600 hover:text-red-800"
      >
        Sair
      </button>
    </aside>
)
}
