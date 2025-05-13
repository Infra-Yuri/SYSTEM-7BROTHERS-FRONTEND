import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 text-center text-sm text-gray-600 py-4">
      © {new Date().getFullYear()} Sete Irmãos  
      <span className="mx-1">|</span>  
      Criado por Yuri Macedo  
      <span className="mx-1">|</span>  
      Todos os direitos reservados.
    </footer>
  );
}
