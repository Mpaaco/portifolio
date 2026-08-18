import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HamburgerMenu.css'
import ContactModal from '../ContactModal/ContactModal'

const navLinks = [
  { label: 'HOME', href: '/', isRoute: true },
  { label: 'SOBRE MIM', href: '/about', isRoute: true },
  { label: 'FREELANCES', href: '/freelance', isRoute: true },
  { label: 'PUBLICAÇÕES', href: '/publicacoes', isRoute: true },
  { label: 'CONTATO', href: '#contato', isContact: true },
]

function HamburgerMenu() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Bloqueia scroll do body quando o menu está aberto
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

  // Fecha o menu com a tecla Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleLinkClick = (e, href, isContact, isRoute) => {
    e.preventDefault()
    setIsOpen(false)
    if (isContact) {
      // Abre o modal de contato após o menu fechar
      setTimeout(() => setContactOpen(true), 420)
    } else if (isRoute) {
      // Navega para a rota usando React Router
      setTimeout(() => navigate(href), 400)
    } else {
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }

  return (
    <>
      {/* Botão hamburguer — dois traços desalinhados */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir menu"
        aria-expanded={isOpen}
        aria-controls="hamburger-modal"
      >
        <span className="hamburger-line hamburger-line--top" />
        <span className="hamburger-line hamburger-line--bottom" />
      </button>

      {/* Overlay de fundo */}
      <div
        className={`hamburger-overlay ${isOpen ? 'hamburger-overlay--visible' : ''}`}
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Modal do menu */}
      <div
        id="hamburger-modal"
        className={`hamburger-modal ${isOpen ? 'hamburger-modal--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
      >
        {/* Header do modal */}
        <div className="hamburger-modal__header">
          <span className="hamburger-modal__title">Menu</span>
          <button
            className="hamburger-close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar menu"
          >
            <span className="hamburger-close-line" />
          </button>
        </div>

        {/* Corpo: duas colunas */}
        <div className="hamburger-modal__body">
          {/* Coluna esquerda — card de projeto + metadados */}
          <div className="hamburger-col hamburger-col--left">
            <div className="hamburger-project-card">
              <div className="hamburger-project-logo">
                {/* Logo MOTARO em SVG inline */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M24 4L8 13V35L24 44L40 35V13L24 4Z" fill="url(#motaro-grad)" />
                  <path d="M16 18L24 14L32 18V30L24 34L16 30V18Z" fill="none" stroke="white" strokeWidth="2" />
                  <defs>
                    <linearGradient id="motaro-grad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4ADE80" />
                      <stop offset="1" stopColor="#16A34A" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="hamburger-project-logo__text">MOTARO</span>
              </div>
              <div className="hamburger-project-info">
                <h3 className="hamburger-project-title">Lançamos a MOTARO</h3>
                <p className="hamburger-project-desc">
                  A <strong>MOTARO</strong> é uma ferramenta de gestão para mecânicos. Focado em gerir e fidelizar cada vez mais seus clientes. Hoje, temos o prazer de anunciar que a <strong>CO&amp;SO</strong> foi a empresa que conseguiu...
                </p>
              </div>
            </div>

            <div className="hamburger-meta">
              <span className="hamburger-meta__item">17/12/2025</span>
              <span className="hamburger-meta__item">12:30 pm</span>
              <span className="hamburger-meta__item">São Paulo</span>
            </div>
          </div>

          {/* Divisor vertical */}
          <div className="hamburger-divider" aria-hidden="true" />

          {/* Coluna direita — navegação */}
          <nav className="hamburger-col hamburger-col--right" aria-label="Navegação principal">
            <ul className="hamburger-nav-list">
              {navLinks.map((link, index) => (
                <li key={link.label} className="hamburger-nav-item" style={{ '--i': index }}>
                  <a
                    href={link.href}
                    className="hamburger-nav-link"
                    onClick={(e) => handleLinkClick(e, link.href, link.isContact, link.isRoute)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Modal de Contato */}
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  )
}

export default HamburgerMenu
