import NavBar from './components/NavBar/NavBar'
import MainContent from './components/MainContent/MainContent'
import Footer from './components/Footer/Footer'
import './styles/variables.css'
import './App.css'

function App() {
  return (
    <div className="app">
      <NavBar />
      <MainContent />
      <Footer />
    </div>
  )
}

export default App
