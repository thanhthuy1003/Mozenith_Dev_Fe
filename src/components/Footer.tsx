import React from 'react'
import { BookOpen, Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'
import './Footer.css'

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-section">
              <div className="footer-logo">
                <BookOpen size={32} color="#ff9800" />
                <span>Mozenith</span>
              </div>
              <p>Ứng dụng quản lý lịch học đa chức năng giúp bạn tối ưu hóa thời gian học tập.</p>
              <div className="social-links">
                <a href="#" title="Facebook"><Facebook size={20} /></a>
                <a href="#" title="Twitter"><Twitter size={20} /></a>
                <a href="#" title="LinkedIn"><Linkedin size={20} /></a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Sản phẩm</h4>
              <ul>
                <li><a href="#features">Tính năng</a></li>
                <li><a href="#pricing">Giá cả</a></li>
                <li><a href="#">Tải ứng dụng</a></li>
                <li><a href="#">Blog</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Công ty</h4>
              <ul>
                <li><a href="#">Về chúng tôi</a></li>
                <li><a href="#">Liên hệ</a></li>
                <li><a href="#">Tuyển dụng</a></li>
                <li><a href="#">Tin tức</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Hỗ trợ</h4>
              <ul>
                <li><a href="#">Trung tâm trợ giúp</a></li>
                <li><a href="#">Điều khoản dịch vụ</a></li>
                <li><a href="#">Chính sách bảo mật</a></li>
                <li><a href="#">Câu hỏi thường gặp</a></li>
              </ul>
            </div>

            <div className="footer-section contact">
              <h4>Liên hệ</h4>
              <div className="contact-item">
                <Mail size={18} />
                <span>contact@mozenith.com</span>
              </div>
              <div className="contact-item">
                <Phone size={18} />
                <span>+84 (0) 123 456 789</span>
              </div>
              <div className="contact-item">
                <MapPin size={18} />
                <span>Hồ Chí Minh, Việt Nam</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-divider"></div>
            <p className="footer-copyright">
              © 2026 Mozenith. Tất cả các quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
