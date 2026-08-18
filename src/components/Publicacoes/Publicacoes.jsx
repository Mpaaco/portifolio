import { useState } from 'react'
import './Publicacoes.css'
import PostModal from './PostModal'
import { author, posts, featuredPosts } from '../../data/posts'

function Publicacoes() {
  const [selectedPost, setSelectedPost] = useState(null)

  return (
    <main className="publicacoes">
      {/* ── Seção 1 — Posts em destaque ───────────────── */}
      <section className="pub-section" aria-labelledby="pub-destaques-title">
        <h2 className="pub-section__title" id="pub-destaques-title">Destaques</h2>

        <div className="pub-highlights">
          {featuredPosts.map((post) => (
            <button
              key={post.id}
              type="button"
              className="pub-highlight-card"
              onClick={() => setSelectedPost(post)}
              aria-label={`Abrir publicação: ${post.title}`}
            >
              <span className="pub-highlight-card__label">Publicação</span>
              <span className="pub-highlight-card__title">{post.title}</span>
              <img
                className="pub-highlight-card__image"
                src={post.coverImage || post.images[0]}
                alt=""
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </section>

      {/* ── Seção 2 — Minhas publicações (scroll interno) ── */}
      <section className="pub-section pub-section--posts" aria-labelledby="pub-postagens-title">
        <h2 className="pub-section__title" id="pub-postagens-title">Postagens</h2>

        <div className="pub-posts-scroll" tabIndex={0} role="region" aria-label="Lista de publicações">
          {posts.map((post) => (
            <button
              key={post.id}
              type="button"
              className="pub-post-card"
              onClick={() => setSelectedPost(post)}
              aria-label={`Abrir publicação: ${post.title}`}
            >
              <header className="pub-post-card__header">
                <img className="pub-post-card__avatar" src={author.avatar} alt="" loading="lazy" />
                <span className="pub-post-card__identity">
                  <span className="pub-post-card__name">{author.name}</span>
                  <span className="pub-post-card__headline">{author.headline}</span>
                </span>
              </header>

              <p className="pub-post-card__description">{post.description}</p>

              <div
                className={`pub-post-card__gallery ${
                  post.images.length > 1 ? 'pub-post-card__gallery--multi' : ''
                }`}
              >
                <img className="pub-post-card__image" src={post.images[0]} alt="" loading="lazy" />
                {post.images.length > 1 && (
                  <div className="pub-post-card__thumbs">
                    {post.images.slice(1, 3).map((image) => (
                      <img key={image} className="pub-post-card__thumb" src={image} alt="" loading="lazy" />
                    ))}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </section>

      <PostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </main>
  )
}

export default Publicacoes
