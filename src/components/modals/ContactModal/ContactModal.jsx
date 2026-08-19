import { useEffect } from 'react'
import './ContactModal.css'

function ContactModal({ isOpen, onClose }) {
  // Fecha com Escape
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isOpen, onClose])

  // Bloqueia scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`contact-overlay ${isOpen ? 'contact-overlay--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        id="contact-modal"
        className={`contact-modal ${isOpen ? 'contact-modal--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Contato"
      >
        {/* Linha de topo: título + botão fechar */}
        <div className="contact-modal__top">
          <span className="contact-modal__title">Contato</span>
          <button
            className="contact-modal__close"
            onClick={onClose}
            aria-label="Fechar modal de contato"
          >
            <span className="contact-modal__close-line" />
          </button>
        </div>

        {/* Corpo: duas colunas separadas por divisor */}
        <div className="contact-modal__body">
          {/* Coluna esquerda — identidade */}
          <div className="contact-col contact-col--left">
            <p className="contact-name">Marco Aurélio Lima de Oliveira</p>
            <p className="contact-role">Engenheiro de software</p>
          </div>

          {/* Divisor vertical */}
          <div className="contact-divider" aria-hidden="true" />

          {/* Coluna direita — dados de contato */}
          <div className="contact-col contact-col--right">
            <a
              href="tel:+5511984017752"
              className="contact-info-item"
              title="Ligar para Marco Aurélio"
            >
              <span className="contact-info-label">Número:</span>
              <span className="contact-info-value">11 98401-7752</span>
            </a>
            <a
              href="mailto:marco.aurelio1451@gmail.com"
              className="contact-info-item"
              title="Enviar e-mail para Marco Aurélio"
            >
              <span className="contact-info-label">E-mail:</span>
              <span className="contact-info-value">marco.aurelio1451@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactModal
