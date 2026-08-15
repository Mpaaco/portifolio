import './NavBar.css'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import HamburgerMenu from './HamburgerMenu'

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo-link">
        <h1 className="navbar-logo">Marco Aurélio</h1>
      </Link>

      <div className="navbar-actions">
        <div className="navbar-socials">
          <a
            href="https://github.com/Mpaaco"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            title="GitHub"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="navbar-social"
              style={{ color: 'rgb(0, 0, 0)' }}
            />
          </a>

          <a
            href="https://www.linkedin.com/in/marco-aurelio-lima-de-oliveira/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              className="navbar-social"
              style={{ color: 'rgb(0, 0, 0)' }}
            />
          </a>
        </div>

        <HamburgerMenu />
      </div>
    </nav>
  )
}

export default NavBar
