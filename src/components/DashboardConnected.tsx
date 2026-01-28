import React, { useEffect, useState } from 'react'
import { Eye, Navigation, Zap, TrendingUp, Clock, BookOpen } from 'lucide-react'
import { useApi } from '../hooks/useApi'
import { statisticsAPI } from '../services/api'
import './Dashboard.css'

interface DashboardStats {
  userName: string
  views: number
  visits: number
  others: number
  sales: number
  profit: number
  orders: number
  visits_count: number
}

const Dashboard: React.FC = () => {
  const [userName, setUserName] = useState('Emilia')
  const [stats, setStats] = useState<DashboardStats>({
    userName: 'Emilia',
    views: 500,
    visits: 2000,
    others: 500,
    sales: 500,
    profit: 150,
    orders: 1000,
    visits_count: 400
  })

  // Fetch dashboard statistics from backend
  const { data: dashboardData, loading, error } = useApi(
    () => statisticsAPI.getDashboardStats(),
    true // auto-execute on mount
  )

  useEffect(() => {
    if (dashboardData) {
      setStats(dashboardData)
    }
  }, [dashboardData])

  return (
    <section id="dashboard" className="dashboard">
      <div className="container">
        <h2 className="section-title">
          Giao diện <span>Dashboard</span> hiện đại
        </h2>

        <div className="dashboard-content">
          <div className="dashboard-preview fade-in">
            <div className="dashboard-header">
              <h3>Xin chào {userName}!</h3>
              <p>Chào mừng trở lại!</p>
            </div>

            <div className="dashboard-search">
              <input type="text" placeholder="Tìm kiếm môn học..." />
              <button className="filter-btn">⚙️ Lọc</button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {loading && <div className="loading-spinner">Đang tải dữ liệu...</div>}

            <div className="stats-container orange-card fade-in">
              <div className="stat-box">
                <div className="stat-icon">👁️</div>
                <div className="stat-info">
                  <span className="stat-label">Lượt xem</span>
                  <span className="stat-value">{stats.views}</span>
                  <span className="stat-unit">Hôm nay</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">📍</div>
                <div className="stat-info">
                  <span className="stat-label">Truy cập</span>
                  <span className="stat-value">{stats.visits}</span>
                  <span className="stat-unit">Từ ứng dụng</span>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">⚡</div>
                <div className="stat-info">
                  <span className="stat-label">Khác</span>
                  <span className="stat-value">{stats.others}</span>
                  <span className="stat-unit">Hôm nay</span>
                </div>
              </div>
            </div>

            <div className="dashboard-widgets">
              <div className="widget light-blue-card fade-in">
                <div className="widget-header">
                  <h4>Lịch học</h4>
                  <span className="progress-badge">55%</span>
                </div>
                <div className="widget-value">
                  <span className="large-number">${stats.sales}</span>
                  <span className="widget-unit">Hôm nay</span>
                </div>
              </div>

              <div className="widget dark-blue-card fade-in">
                <div className="widget-header">
                  <h4>Tổng điểm</h4>
                  <span className="progress-badge">30%</span>
                </div>
                <div className="widget-value">
                  <span className="large-number">${stats.profit}</span>
                  <span className="widget-unit">Tăng hôm nay</span>
                </div>
              </div>

              <div className="widget dark-blue-card fade-in">
                <div className="widget-header">
                  <h4>Bài tập</h4>
                  <span className="progress-badge">80%</span>
                </div>
                <div className="widget-value">
                  <span className="large-number">{stats.orders}</span>
                  <span className="widget-unit">Tổng hôm nay</span>
                </div>
              </div>

              <div className="widget light-cyan-card fade-in">
                <div className="widget-header">
                  <h4>Tham gia</h4>
                  <span className="progress-badge">70%</span>
                </div>
                <div className="widget-value">
                  <span className="large-number">{stats.visits_count}</span>
                  <span className="widget-unit">Hôm nay</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-features slide-right">
            <h3>Theo dõi toàn bộ hoạt động</h3>
            
            <div className="feature-list">
              <div className="feature-item">
                <div className="feature-item-icon">
                  <Eye size={24} />
                </div>
                <div className="feature-item-content">
                  <h4>Theo dõi thực thời</h4>
                  <p>Cập nhật lịch học và bài tập ngay trong ứng dụng</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item-icon">
                  <TrendingUp size={24} />
                </div>
                <div className="feature-item-content">
                  <h4>Phân tích chi tiết</h4>
                  <p>Xem các biểu đồ và báo cáo về hiệu quả học tập</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item-icon">
                  <Clock size={24} />
                </div>
                <div className="feature-item-content">
                  <h4>Quản lý thời gian</h4>
                  <p>Phân bổ thời gian học hợp lý cho các môn</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-item-icon">
                  <BookOpen size={24} />
                </div>
                <div className="feature-item-content">
                  <h4>Tài liệu tổ chức</h4>
                  <p>Lưu trữ ghi chú và tài liệu theo các folder</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
