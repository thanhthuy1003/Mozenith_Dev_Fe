import React from 'react'
import { ArrowRight, Zap } from 'lucide-react'
import Logo from './Logo'
import './Hero.css'

const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content fade-in">
          <div className="hero-logo-section">
            <Logo size={80} />
          </div>
          <h1 className="hero-title">
            Quản lý lịch học <span>một cách thông minh</span>
          </h1>
          <p className="hero-subtitle">
            Mozenith giúp bạn sắp xếp lịch học, quản lý bài tập và tối ưu hóa thời gian học tập với các công cụ đa chức năng
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">
              <Zap size={20} />
              Bắt đầu ngay
            </button>
            <button className="btn btn-secondary">
              <ArrowRight size={20} />
              Tìm hiểu thêm
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50K+</span>
              <span className="stat-label">Người dùng</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4.8★</span>
              <span className="stat-label">Đánh giá</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Hỗ trợ</span>
            </div>
          </div>
        </div>
        <div className="hero-image fade-in">
          <div className="mockup">
            <div className="phone">
              <div className="phone-notch"></div>
              <div className="phone-screen">
                <div className="screen-content">
                  <div className="app-header">Mozenith</div>
                  <div className="app-item">📚 Toán - 14:00</div>
                  <div className="app-item">📖 Tiếng Anh - 15:30</div>
                  <div className="app-item">🔬 Hóa học - 17:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
