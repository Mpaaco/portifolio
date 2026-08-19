import { useCallback, useEffect, useRef, useState } from 'react'
import './PostFormModal.css'

const EMPTY_FORM = {
  title: '',
  description: '',
  images: [],
  linkedinUrl: '',
  featured: false,
  coverImage: '',
}

function PostFormModal({ post, onClose, onSave }) {
  const isEditing = Boolean(post)
  const dialogRef = useRef(null)
  const titleRef = useRef(null)
  const fileInputRef = useRef(null)

  const [form, setForm] = useState(EMPTY_FORM)
  const [imageUrl, setImageUrl] = useState('')
  const [errors, setErrors] = useState({})

  const isOpen = post !== undefined

  useEffect(() => {
    if (!isOpen) return

    if (post) {
      setForm({
        title: post.title ?? '',
        description: post.description ?? '',
        images: [...(post.images ?? [])],
        linkedinUrl: post.linkedinUrl ?? '',
        featured: Boolean(post.featured),
        coverImage: post.coverImage ?? '',
      })
    } else {
      setForm(EMPTY_FORM)
    }

    setImageUrl('')
    setErrors({})
    titleRef.current?.focus()
  }, [isOpen, post])

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusables = dialogRef.current?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
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
    },
    [onClose]
  )

  useEffect(() => {
    if (!isOpen) return
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleKeyDown])

  if (!isOpen) return null

  const validate = () => {
    const nextErrors = {}
    if (!form.title.trim()) nextErrors.title = 'Informe o título.'
    if (form.images.length === 0) nextErrors.images = 'Adicione ao menos uma imagem.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      images: form.images,
      linkedinUrl: form.linkedinUrl.trim(),
      featured: form.featured,
      coverImage: form.coverImage.trim() || undefined,
    }

    onSave(payload)
    onClose()
  }

  const addImageUrl = () => {
    const url = imageUrl.trim()
    if (!url) return
    setForm((current) => ({ ...current, images: [...current.images, url] }))
    setImageUrl('')
    setErrors((current) => ({ ...current, images: undefined }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setForm((current) => ({ ...current, images: [...current.images, reader.result] }))
        setErrors((current) => ({ ...current, images: undefined }))
      }
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  const moveImage = (index, direction) => {
    setForm((current) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1
      if (targetIndex < 0 || targetIndex >= current.images.length) return current
      const images = [...current.images]
      ;[images[index], images[targetIndex]] = [images[targetIndex], images[index]]
      return { ...current, images }
    })
  }

  const removeImage = (index) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter((_, imageIndex) => imageIndex !== index),
    }))
  }

  return (
    <div className="post-form-overlay" onClick={onClose}>
      <div
        className="post-form-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="post-form-title"
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <header className="post-form-modal__header">
          <h2 className="post-form-modal__title" id="post-form-title">
            {isEditing ? 'Editar publicação' : 'Adicionar novo post'}
          </h2>
          <button
            type="button"
            className="post-form-modal__close"
            onClick={onClose}
            aria-label="Fechar formulário"
          >
            <span className="post-form-modal__close-line" />
            <span className="post-form-modal__close-line post-form-modal__close-line--cross" />
          </button>
        </header>

        <form className="post-form-modal__form" onSubmit={handleSubmit}>
          <div className="post-form-modal__field">
            <label className="post-form-modal__label" htmlFor="post-title">
              Título *
            </label>
            <input
              id="post-title"
              ref={titleRef}
              className={`post-form-modal__input ${errors.title ? 'post-form-modal__input--error' : ''}`}
              value={form.title}
              onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              required
            />
            {errors.title && <p className="post-form-modal__error">{errors.title}</p>}
          </div>

          <div className="post-form-modal__field">
            <label className="post-form-modal__label" htmlFor="post-description">
              Descrição
            </label>
            <textarea
              id="post-description"
              className="post-form-modal__textarea"
              rows={5}
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({ ...current, description: event.target.value }))
              }
            />
          </div>

          <fieldset className="post-form-modal__fieldset">
            <legend className="post-form-modal__label">Imagens *</legend>

            <div className="post-form-modal__image-add">
              <input
                className="post-form-modal__input"
                type="url"
                placeholder="URL da imagem (ex: /assets/publicacoes/foto.png)"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addImageUrl()
                  }
                }}
              />
              <button type="button" className="post-form-modal__btn post-form-modal__btn--secondary" onClick={addImageUrl}>
                Adicionar URL
              </button>
              <button
                type="button"
                className="post-form-modal__btn post-form-modal__btn--secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Enviar arquivo
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                hidden
                onChange={handleFileChange}
              />
            </div>

            {errors.images && <p className="post-form-modal__error">{errors.images}</p>}

            {form.images.length > 0 && (
              <ul className="post-form-modal__images">
                {form.images.map((image, index) => (
                  <li key={`${image}-${index}`} className="post-form-modal__image-item">
                    <img className="post-form-modal__thumb" src={image} alt="" />
                    <span className="post-form-modal__image-index">Imagem {index + 1}</span>
                    <div className="post-form-modal__image-actions">
                      <button
                        type="button"
                        className="post-form-modal__icon-btn"
                        onClick={() => moveImage(index, 'up')}
                        disabled={index === 0}
                        aria-label={`Mover imagem ${index + 1} para cima`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="post-form-modal__icon-btn"
                        onClick={() => moveImage(index, 'down')}
                        disabled={index === form.images.length - 1}
                        aria-label={`Mover imagem ${index + 1} para baixo`}
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="post-form-modal__icon-btn post-form-modal__icon-btn--danger"
                        onClick={() => removeImage(index)}
                        aria-label={`Remover imagem ${index + 1}`}
                      >
                        ×
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </fieldset>

          <div className="post-form-modal__field">
            <label className="post-form-modal__label" htmlFor="post-linkedin">
              URL do LinkedIn
            </label>
            <input
              id="post-linkedin"
              className="post-form-modal__input"
              type="url"
              placeholder="https://www.linkedin.com/..."
              value={form.linkedinUrl}
              onChange={(event) =>
                setForm((current) => ({ ...current, linkedinUrl: event.target.value }))
              }
            />
          </div>

          <div className="post-form-modal__field">
            <label className="post-form-modal__label" htmlFor="post-cover">
              Imagem de capa (opcional)
            </label>
            <input
              id="post-cover"
              className="post-form-modal__input"
              type="text"
              placeholder="Usa a primeira imagem se vazio"
              value={form.coverImage}
              onChange={(event) =>
                setForm((current) => ({ ...current, coverImage: event.target.value }))
              }
            />
          </div>

          <label className="post-form-modal__checkbox">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(event) =>
                setForm((current) => ({ ...current, featured: event.target.checked }))
              }
            />
            <span>Destacar na seção &quot;Destaques&quot;</span>
          </label>

          <footer className="post-form-modal__footer">
            <button type="button" className="post-form-modal__btn post-form-modal__btn--ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="post-form-modal__btn post-form-modal__btn--primary">
              {isEditing ? 'Salvar alterações' : 'Criar publicação'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default PostFormModal
