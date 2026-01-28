import './App.css'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import Features from './components/Features'
import Dashboard from './components/Dashboard'
import Statistics from './components/Statistics'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <Features />
      <Dashboard />
      <Statistics />
      <Pricing />
      <Footer />
    </div>
  )
}

export default App
