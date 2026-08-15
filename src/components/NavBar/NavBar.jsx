import './NavBar.css'

function NavBar() {
  return (
    <nav className="navbar">
      <h1 className="navbar-logo">Marco Aurélio</h1>

      <div className="navbar-actions">
        <img src="/assets/social.svg" alt="Redes Sociais" className="navbar-social" />
        <img src="/assets/menu.svg" alt="Menu" className="navbar-menu" />
      </div>
    </nav>
  )
}

export default NavBar
