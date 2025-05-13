import React from 'react'
import DarkModeToggle from './DarkModeToggle'

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <h2 className="text-xl font-semibold">Painel Sete Irmãos</h2>
      <DarkModeToggle />
    </header>
  )
}
