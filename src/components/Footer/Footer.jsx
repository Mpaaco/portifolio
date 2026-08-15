import { useState, useEffect } from 'react'
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
          <p className="footer-subtitle footer-subtitle--right">Sobre Mim</p>
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
