import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Login() {
  const { register, handleSubmit } = useForm()
  const nav = useNavigate()

  async function onSubmit(data) {
    const res = await api.post('/auth/login', data)
    localStorage.setItem('token', res.data.token)
    nav('/dashboard')
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Entrar</h2>
        <input {...register('email')} placeholder="E-mail" className="block mb-2 border px-2 py-1 w-64" />
        <input {...register('senha')} type="password" placeholder="Senha" className="block mb-4 border px-2 py-1 w-64" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  )
}
