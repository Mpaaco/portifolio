import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import './Dashboard.css'
import PostFormModal from '../../components/modals/PostFormModal/PostFormModal'
import { usePosts } from '../../context/PostsContext'

function Dashboard() {
  const {
    posts,
    isLoading,
    addPost,
    updatePost,
    removePost,
    movePost,
    toggleFeatured,
    resetPosts,
    exportPosts,
    importPosts,
  } = usePosts()

  const importInputRef = useRef(null)
  const [modalPost, setModalPost] = useState(undefined)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [importError, setImportError] = useState('')

  const openCreateModal = () => {
    setModalPost(null)
    setIsModalOpen(true)
  }

  const openEditModal = (post) => {
    setModalPost(post)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setModalPost(undefined)
  }

  const handleSave = (payload) => {
    if (modalPost?.id) {
      updatePost(modalPost.id, payload)
      return
    }
    addPost(payload)
  }

  const handleDelete = (post) => {
    const confirmed = window.confirm(`Remover a publicação "${post.title}"?`)
    if (confirmed) removePost(post.id)
  }

  const handleReset = () => {
    const confirmed = window.confirm(
      'Restaurar as publicações padrão? Isso apaga as alterações salvas no navegador.'
    )
    if (confirmed) resetPosts()
  }

  const handleImport = async (event) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      setImportError('')
      await importPosts(file)
    } catch (error) {
      setImportError(error instanceof Error ? error.message : 'Não foi possível importar o arquivo.')
    }
  }

  if (isLoading) {
    return (
      <main className="dashboard">
        <p className="dashboard__empty">Carregando publicações...</p>
      </main>
    )
  }

  return (
    <main className="dashboard">
      <header className="dashboard__header">
        <div>
          <p className="dashboard__eyebrow">Administração</p>
          <h1 className="dashboard__title">Dashboard de Publicações</h1>
        </div>

        <div className="dashboard__header-actions">
          <Link className="dashboard__link" to="/publicacoes">
            Ver página pública
          </Link>
          <button type="button" className="dashboard__btn dashboard__btn--primary" onClick={openCreateModal}>
            Adicionar novo post
          </button>
        </div>
      </header>

      <section className="dashboard__panel" aria-labelledby="dashboard-list-title">
        <div className="dashboard__panel-top">
          <h2 className="dashboard__panel-title" id="dashboard-list-title">
            Publicações ({posts.length})
          </h2>
          <div className="dashboard__panel-actions">
            <button type="button" className="dashboard__btn dashboard__btn--ghost" onClick={exportPosts}>
              Exportar JSON
            </button>
            <button
              type="button"
              className="dashboard__btn dashboard__btn--ghost"
              onClick={() => importInputRef.current?.click()}
            >
              Importar JSON
            </button>
            <input
              ref={importInputRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={handleImport}
            />
            <button type="button" className="dashboard__btn dashboard__btn--ghost" onClick={handleReset}>
              Restaurar padrão
            </button>
          </div>
        </div>

        {importError && (
          <p className="dashboard__import-error" role="alert">
            {importError}
          </p>
        )}

        {posts.length === 0 ? (
          <p className="dashboard__empty">Nenhuma publicação cadastrada.</p>
        ) : (
          <div className="dashboard__table-wrap">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th scope="col">Ordem</th>
                  <th scope="col">Miniatura</th>
                  <th scope="col">Título</th>
                  <th scope="col">Status</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post, index) => (
                  <tr key={post.id}>
                    <td className="dashboard__order">
                      <button
                        type="button"
                        className="dashboard__icon-btn"
                        onClick={() => movePost(post.id, 'up')}
                        disabled={index === 0}
                        aria-label={`Mover "${post.title}" para cima`}
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        className="dashboard__icon-btn"
                        onClick={() => movePost(post.id, 'down')}
                        disabled={index === posts.length - 1}
                        aria-label={`Mover "${post.title}" para baixo`}
                      >
                        ↓
                      </button>
                    </td>
                    <td>
                      <img
                        className="dashboard__thumb"
                        src={post.coverImage || post.images[0]}
                        alt=""
                        loading="lazy"
                      />
                    </td>
                    <td>
                      <span className="dashboard__post-title">{post.title}</span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`dashboard__badge ${post.featured ? 'dashboard__badge--featured' : ''}`}
                        onClick={() => toggleFeatured(post.id)}
                        aria-pressed={post.featured}
                        aria-label={
                          post.featured
                            ? `Remover destaque de "${post.title}"`
                            : `Destacar "${post.title}"`
                        }
                      >
                        {post.featured ? 'Em destaque' : 'Publicado'}
                      </button>
                    </td>
                    <td>
                      <div className="dashboard__actions">
                        <button
                          type="button"
                          className="dashboard__btn dashboard__btn--secondary"
                          onClick={() => openEditModal(post)}
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          className="dashboard__btn dashboard__btn--danger"
                          onClick={() => handleDelete(post)}
                        >
                          Remover
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {isModalOpen && (
        <PostFormModal post={modalPost} onClose={closeModal} onSave={handleSave} />
      )}
    </main>
  )
}

export default Dashboard
