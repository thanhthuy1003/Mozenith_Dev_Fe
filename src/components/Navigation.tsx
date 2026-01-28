import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import './Navigation.css'

const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Logo size={36} />
          <span>Mozenith</span>
        </div>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <a href="#features" className="nav-link">Tính năng</a>
          {/* Đã xóa link Dashboard */}
          {/* Đã xóa link Thống kê */}
          <a href="#pricing" className="nav-link">Giá cả</a>
          <button className="btn btn-primary">Đăng nhập</button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation