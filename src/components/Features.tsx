import React from 'react'
import { Calendar, BookMarked, Bell, Zap } from 'lucide-react' // Đã bỏ BarChart3 và Users
import './Features.css'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

const Features: React.FC = () => {
  const features: Feature[] = [
    {
      icon: <Calendar size={32} />,
      title: 'Quản lý Lịch Học',
      description: 'Sắp xếp lịch học theo tuần, tháng với giao diện trực quan và dễ sử dụng',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: <BookMarked size={32} />,
      title: 'Ghi chú thông minh',
      description: 'Tạo ghi chú, tóm tắt bài học với hỗ trợ định dạng văn bản phong phú',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      icon: <Bell size={32} />,
      title: 'Thông báo thông minh',
      description: 'Nhận thông báo kịp thời về lịch học, bài tập sắp tới và mục tiêu học tập',
      gradient: 'from-red-400 to-red-600'
    },
    {
      icon: <Zap size={32} />,
      title: 'Hiệu suất cao',
      description: 'Ứng dụng nhẹ, nhanh chóng, hoạt động trơn tru trên mọi thiết bị',
      gradient: 'from-yellow-400 to-yellow-600'
    }
  ]

  return (
    <section id="features" className="features">
      <div className="container">
        <h2 className="section-title">
          Các <span>tính năng</span> nổi bật
        </h2>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card fade-in">
              <div className={`feature-icon gradient-${index}`}>
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features