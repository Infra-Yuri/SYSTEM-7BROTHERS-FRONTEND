import React from 'react';

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 shadow">
      <div>Logo</div>
      <div>Usuário • Notificações</div>
    </header>
  );
}