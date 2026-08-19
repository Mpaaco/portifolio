import { Link } from 'react-router-dom'
import Carousel from './Carousel/Carousel'
import './MainContent.css'

function MainContent() {
  return (
    <main className="main-content">
      <div className="main-wrapper">
        <div className="dark-rectangle">
          <Carousel />
        </div>
        <div className="main-cta-row">
          <Link to="/freelance" className="main-cta-link">
            Ver todos os projetos
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default MainContent
