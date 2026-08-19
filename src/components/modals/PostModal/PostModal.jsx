import { useCallback, useEffect, useRef, useState } from 'react'
import './PostModal.css'
import { author } from '../../../data/posts'

function PostModal({ post, onClose }) {
  const [imageIndex, setImageIndex] = useState(0)
  const dialogRef = useRef(null)
  const closeButtonRef = useRef(null)

  const isOpen = Boolean(post)
  const images = post?.images ?? []
  const hasMultipleImages = images.length > 1

  const goPrev = useCallback(() => {
    setImageIndex((index) => (index - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setImageIndex((index) => (index + 1) % images.length)
  }, [images.length])

  // Reinicia o carrossel e move o foco ao abrir
  useEffect(() => {
    if (!isOpen) return
    setImageIndex(0)
    closeButtonRef.current?.focus()
  }, [isOpen, post?.id])

  // Bloqueia scroll do body enquanto o modal está aberto
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Escape, setas do teclado e foco preso dentro do modal
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (hasMultipleImages && event.key === 'ArrowLeft') goPrev()
      if (hasMultipleImages && event.key === 'ArrowRight') goNext()

      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables?.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, hasMultipleImages, goPrev, goNext, onClose])

  if (!isOpen) return null

  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div
        className="post-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-modal-title"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        {/* Coluna esquerda — imagens do post */}
        <div className="post-modal__gallery">
          <img
            className="post-modal__image"
            src={images[imageIndex]}
            alt={`Imagem ${imageIndex + 1} de ${images.length} da publicação`}
          />

          {hasMultipleImages && (
            <>
              <button
                type="button"
                className="post-modal__arrow post-modal__arrow--prev"
                onClick={goPrev}
                aria-label="Imagem anterior"
              >
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
                  <path d="M12 2L2 12L12 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                type="button"
                className="post-modal__arrow post-modal__arrow--next"
                onClick={goNext}
                aria-label="Próxima imagem"
              >
                <svg width="14" height="24" viewBox="0 0 14 24" fill="none" aria-hidden="true">
                  <path d="M2 2L12 12L2 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="post-modal__dots" role="tablist" aria-label="Navegação entre imagens">
                {images.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    role="tab"
                    aria-selected={index === imageIndex}
                    aria-label={`Ir para a imagem ${index + 1}`}
                    className={`post-modal__dot ${index === imageIndex ? 'post-modal__dot--active' : ''}`}
                    onClick={() => setImageIndex(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Coluna direita — perfil, título e descrição */}
        <div className="post-modal__content">
          <button
            type="button"
            className="post-modal__close"
            onClick={onClose}
            aria-label="Fechar publicação"
            ref={closeButtonRef}
          >
            <span className="post-modal__close-line" />
            <span className="post-modal__close-line post-modal__close-line--cross" />
          </button>

          <div className="post-modal__profile">
            <img className="post-modal__avatar" src={author.avatar} alt="" />
            <div className="post-modal__profile-text">
              <span className="post-modal__author">{author.name}</span>
              <a
                className="post-modal__link"
                href={post.linkedinUrl}
                target="_blank"
                rel="noreferrer"
              >
                Link do post
              </a>
            </div>
          </div>

          <div className="post-modal__box post-modal__box--title">
            <h2 className="post-modal__title" id="post-modal-title">{post.title}</h2>
          </div>

          <div className="post-modal__box post-modal__box--description" tabIndex={0}>
            <p className="post-modal__description">{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostModal
