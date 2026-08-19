import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './HamburgerMenu.css'
import ContactModal from '../../modals/ContactModal/ContactModal'
import { usePosts } from '../../../context/PostsContext'

const navLinks = [
  { label: 'HOME', href: '/', isRoute: true },
  { label: 'SOBRE MIM', href: '/about', isRoute: true },
  { label: 'FREELANCES', href: '/freelance', isRoute: true },
  { label: 'PUBLICAÇÕES', href: '/publicacoes', isRoute: true },
]

function HamburgerMenu() {
  const navigate = useNavigate()
  const { posts } = usePosts()
  const [isOpen, setIsOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  
  const [currentDate, setCurrentDate] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [currentPostIndex, setCurrentPostIndex] = useState(0)

  // Atualiza data e hora
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentDate(now.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }))
      setCurrentTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase())
    }
    updateTime()
    const timer = setInterval(updateTime, 60000)
    return () => clearInterval(timer)
  }, [])

  // Carrossel de postagens
  useEffect(() => {
    if (!isOpen || posts.length <= 1) return
    const timer = setInterval(() => {
      setCurrentPostIndex((prev) => (prev + 1) % posts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isOpen, posts.length])

  const postToShow = posts[currentPostIndex]

  // Bloqueia scroll do body no mobile quando aberto
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
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
      setTimeout(() => setContactOpen(true), 420)
    } else if (isRoute) {
      setTimeout(() => navigate(href), 400)
    } else {
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) target.scrollIntoView({ behavior: 'smooth' })
      }, 400)
    }
  }

  return (
    <div className="hamburger-wrapper">
      {/* Botão hamburguer — dois traços desalinhados */}
      <button
        className="hamburger-btn"
        onClick={() => setIsOpen((prev) => !prev)}
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
            {postToShow ? (
              <div className="hamburger-project-card">
                <div className="hamburger-project-image-wrap">
                  <img src={postToShow.coverImage || postToShow.images[0]} alt="" />
                </div>
                <div className="hamburger-project-info">
                  <h3 className="hamburger-project-title">{postToShow.title}</h3>
                  <p className="hamburger-project-desc">{postToShow.description}</p>
                </div>
              </div>
            ) : (
              <div className="hamburger-project-card hamburger-project-card--empty">
                <p>Nenhuma publicação disponível.</p>
              </div>
            )}

            <div className="hamburger-meta">
              <span className="hamburger-meta__item">{currentDate}</span>
              <span className="hamburger-meta__item">{currentTime}</span>
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
    </div>
  )
}

export default HamburgerMenu

