import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import MainContent from './components/MainContent/MainContent'
import Footer from './components/Footer/Footer'
import Freelance from './components/Freelance/Freelance'
import './styles/variables.css'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={
            <>
              <NavBar />
              <MainContent />
              <Footer />
            </>
          } />
          <Route path="/freelance" element={
            <>
              <NavBar />
              <Freelance />
              <Footer variant="freelance" />
            </>
          } />
        </Routes>
      </div>
    </Router>
  )
}

export default App
