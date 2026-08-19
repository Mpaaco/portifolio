import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/layout/NavBar/NavBar'
import MainContent from './pages/Home/MainContent'
import Footer from './components/layout/Footer/Footer'
import Freelance from './pages/Freelance/Freelance'
import About from './pages/About/About'
import Publicacoes from './pages/Publicacoes/Publicacoes'
import Dashboard from './pages/Admin/Dashboard'
import AdminGate from './pages/Admin/AdminGate'
import { PostsProvider } from './context/PostsContext'
import './styles/variables.css'
import './App.css'

function App() {
  return (
    <PostsProvider>
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
            <Route path="/publicacoes" element={
              <>
                <NavBar />
                <Publicacoes />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <NavBar />
                <About />
                <Footer variant="about" />
              </>
            } />
            <Route path="/admin/publicacoes" element={
              <AdminGate>
                <Dashboard />
              </AdminGate>
            } />
          </Routes>
        </div>
      </Router>
    </PostsProvider>
  )
}

export default App
