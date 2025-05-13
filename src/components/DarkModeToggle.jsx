import React from 'react'
import useDarkMode from '../hooks/useDarkMode'

export default function DarkModeToggle() {
  const [dark, setDark] = useDarkMode()
  return (
    <button onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
      {dark ? '☀️' : '🌙'}
    </button>
  )
}
