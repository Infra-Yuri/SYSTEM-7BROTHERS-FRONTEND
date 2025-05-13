import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// componentes globais
import Sidebar from './components/Sidebar'
import Header  from './components/Header'
import Footer  from './components/Footer'

// páginas
import Login       from './pages/Login'
import Dashboard   from './pages/Dashboard'
import AdminPanel  from './pages/AdminPanel'
import Clientes    from './pages/Clientes'
import Produtos    from './pages/Produtos'
import Entregas    from './pages/Entregas'
import Financeiro  from './pages/Financeiro'
import Relatorios  from './pages/Relatorios'
import DbViewer    from './pages/DbfViewer'

export default function App() {
  const token = localStorage.getItem('token') // seu JWT

  return (
    <BrowserRouter>
      <div className="flex h-screen">
        {/* só mostra a Sidebar quando estiver logado */}
        {token && <Sidebar />}

        <div className="flex-1 flex flex-col">
          {/* Header sempre visível, ou só quando logado */}
          {token && <Header />}

          <main className="flex-1 overflow-auto p-4">
            <Routes>
              {/* raiz: se estiver logado vai a /dashboard, senão /login */}
              <Route path="/" element={
                token
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/login" replace />
              } />

              {/* tela de login */}
              <Route path="/login" element={<Login />} />

              {/* todas as rotas privadas abaixo só funcionam se 'token' existir */}
              {token && (
                <>
                  <Route path="/dashboard"  element={<Dashboard />} />
                  <Route path="/admin"      element={<AdminPanel />} />
                  <Route path="/clientes"   element={<Clientes />} />
                  <Route path="/produtos"   element={<Produtos />} />
                  <Route path="/entregas"   element={<Entregas />} />
                  <Route path="/financeiro" element={<Financeiro />} />
                  <Route path="/relatorios" element={<Relatorios />} />

                  {/* genérica para visualizar os DBF */}
                  <Route path="/dbf-viewer/:name" element={<DbViewer />} />
                </>
              )}

              {/* fallback 404 */}
              <Route path="*" element={<h2>Página não encontrada</h2>} />
            </Routes>
          </main>

          {token && <Footer />}
        </div>
      </div>
    </BrowserRouter>
  )
}
