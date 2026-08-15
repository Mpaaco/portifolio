import { useState, useEffect } from 'react'
import './Carousel.css'

/* ─── Constantes ──────────────────────────────────────────── */

const SLIDES = [
  { src: '/assets/atafisco-39ea17.png', alt: 'Atafísco' },
  { src: '/assets/GentilVOa.png',       alt: 'GentilVOa' },
  { src: '/assets/coeso.png',       alt: 'coeso' },
  { src: '/assets/VemaPlastic.png',     alt: 'VemaPlastic' },
]

const AUTOPLAY_INTERVAL_MS = 6000

/* ─── Componente ──────────────────────────────────────────── */

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length)
    }, AUTOPLAY_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => setCurrentIndex(index)

  return (
    <div className="carousel">
      <div className="carousel-track">
        {SLIDES.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            alt={slide.alt}
            className={`carousel-image ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

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
