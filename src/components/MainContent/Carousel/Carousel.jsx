import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Carousel.css'

/* ─── Constantes ──────────────────────────────────────────── */

const SLIDES = [
  { src: '/assets/atafisco-39ea17.png', alt: 'Atafísco',    name: 'Atafísco',    category: 'Web — Landing Page' },
  { src: '/assets/GentilVOa.png',       alt: 'GentilVoa',   name: 'GentilVoa',   category: 'Web — Dashboard'    },
  { src: '/assets/coeso.png',           alt: 'CO&SO',        name: 'CO&SO',       category: 'Web — Landing Page' },
  { src: '/assets/VemaPlastic.png',     alt: 'VemaPlastic',  name: 'VemaPlastic', category: 'Web — Landing Page' },
]

const AUTOPLAY_INTERVAL_MS = 6000

/* ─── Componente ──────────────────────────────────────────── */

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // Autoplay — pausa quando o mouse está sobre o carrossel
  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, AUTOPLAY_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [isPaused])

  const goToSlide = (index) => setCurrentIndex(index)

  return (
    <div
      className="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel-track">
        {SLIDES.map((slide, index) => (
          <div
            key={slide.src}
            className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}
          >
            <img
              src={slide.src}
              alt={slide.alt}
              className="carousel-image"
            />

            {/* Overlay com nome + categoria + CTA */}
            <div className="carousel-overlay">
              <div className="carousel-overlay-info">
                <span className="carousel-overlay-name">{slide.name}</span>
                <span className="carousel-overlay-category">{slide.category}</span>
              </div>
              <Link to="/freelance" className="carousel-overlay-cta">
                Ver projeto ↗
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Indicadores */}
      <div className="carousel-indicators" role="tablist" aria-label="Slides do carrossel">
        {SLIDES.map((slide, index) => (
          <button
            key={slide.src}
            role="tab"
            aria-selected={index === currentIndex}
            aria-label={`Ir para slide ${index + 1}: ${slide.alt}`}
            className={`carousel-indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  )
}

export default Carousel
