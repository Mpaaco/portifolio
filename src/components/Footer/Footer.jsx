import { useState, useEffect } from 'react'
import './Footer.css'

/* ─── Helpers ─────────────────────────────────────────────── */

function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/* ─── Componente ──────────────────────────────────────────── */

function Footer() {
  const [time, setTime] = useState(() => formatTime(new Date()))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="footer">
      <a href="#contact" className="footer-contact">Contato</a>
      <p className="footer-subtitle">Engenheiro de Software — Web, Automação, Dashboards</p>
      <p className="footer-timestamp">BR . SP . {time}</p>
    </footer>
  )
}

export default Footer
