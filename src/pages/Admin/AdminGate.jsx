import { useEffect, useState } from 'react'
import './AdminGate.css'

const SESSION_KEY = 'porti-admin-authenticated'
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? ''

function AdminGate({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    setError('')

    if (!ADMIN_PASSWORD) {
      setError('Defina VITE_ADMIN_PASSWORD no arquivo .env para acessar o dashboard.')
      return
    }

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true')
      setIsAuthenticated(true)
      setPassword('')
      return
    }

    setError('Senha incorreta.')
  }

  const handleLogout = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setIsAuthenticated(false)
  }

  if (isAuthenticated) {
    return (
      <>
        <div className="admin-gate__bar">
          <span className="admin-gate__status">Área administrativa</span>
          <button type="button" className="admin-gate__logout" onClick={handleLogout}>
            Sair
          </button>
        </div>
        {children}
      </>
    )
  }

  return (
    <main className="admin-gate">
      <section className="admin-gate__card" aria-labelledby="admin-gate-title">
        <h1 className="admin-gate__title" id="admin-gate-title">
          Dashboard de Publicações
        </h1>
        <p className="admin-gate__hint">
          Rota oculta — informe a senha de administrador para continuar.
        </p>

        <form className="admin-gate__form" onSubmit={handleSubmit}>
          <label className="admin-gate__label" htmlFor="admin-password">
            Senha
          </label>
          <input
            id="admin-password"
            className="admin-gate__input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />

          {error && (
            <p className="admin-gate__error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="admin-gate__submit">
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

export default AdminGate
