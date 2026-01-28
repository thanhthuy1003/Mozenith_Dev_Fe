import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
// Đã xóa import Dashboard
// Đã xóa import Statistics
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Features />
      {/* Đã xóa <Dashboard /> */}
      {/* Đã xóa <Statistics /> */}
      <Pricing />
      <Footer />
    </div>
  )
}

export default App