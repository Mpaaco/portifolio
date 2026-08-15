import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import ContactModal from '../ContactModal/ContactModal'

/* ─── Helpers ─────────────────────────────────────────────── */

function formatTime(date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })
}

/* ─── Componente ──────────────────────────────────────────── */

function Footer({ variant }) {
  const [time, setTime] = useState(() => formatTime(new Date()))
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (variant === 'freelance') {
    return (
      <>
        <footer className="footer footer--freelance">
          <button
            className="footer-contact"
            onClick={() => setContactOpen(true)}
            aria-label="Abrir modal de contato"
          >
            Contato
          </button>
          <p className="footer-timestamp">BR . SP . {time}</p>
          <Link to="/about" className="footer-subtitle footer-subtitle--right">Sobre Mim</Link>
        </footer>

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </>
    )
  }

  if (variant === 'about') {
    return (
      <>
        <footer className="footer footer--about">
          <button
            className="footer-contact"
            onClick={() => setContactOpen(true)}
            aria-label="Abrir modal de contato"
          >
            Contato
          </button>
          <p className="footer-quote">"Tudo tem o seu tempo determinado." — Ec 3:1</p>
          <p className="footer-timestamp">BR . SP . {time}</p>
        </footer>

        <ContactModal
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
        />
      </>
    )
  }

  return (
    <>
      <footer className="footer">
        <button
          className="footer-contact"
          onClick={() => setContactOpen(true)}
          aria-label="Abrir modal de contato"
        >
          Contato
        </button>
        <p className="footer-subtitle">Engenheiro de Software</p>
        <p className="footer-timestamp">BR . SP . {time}</p>
      </footer>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}

export default Footer
