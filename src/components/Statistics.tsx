import React from 'react'
import { BarChart3, PieChart, TrendingUp, Target } from 'lucide-react'
import './Statistics.css'

const Statistics: React.FC = () => {
  return (
    <section id="statistics" className="statistics">
      <div className="container">
        <h2 className="section-title">
          <span>Thống kê</span> và phân tích
        </h2>

        <div className="statistics-content">
          <div className="stats-visual slide-left">
            <div className="chart-placeholder">
              <div className="chart-bar bar-1"></div>
              <div className="chart-bar bar-2"></div>
              <div className="chart-bar bar-3"></div>
              <div className="chart-bar bar-4"></div>
              <div className="chart-bar bar-5"></div>
              <div className="chart-legend">
                <span>T2</span>
                <span>T3</span>
                <span>T4</span>
                <span>T5</span>
                <span>T6</span>
              </div>
            </div>
          </div>

          <div className="stats-details slide-right">
            <h3>Theo dõi tiến độ học tập</h3>
            
            <div className="stats-items">
              <div className="stats-item">
                <div className="stats-item-header">
                  <BarChart3 size={24} color="#ff9800" />
                  <h4>Lịch học đã hoàn thành</h4>
                </div>
                <p>Bạn đã hoàn thành 24 lịch học trong tuần này, tăng 12% so với tuần trước.</p>
              </div>

              <div className="stats-item">
                <div className="stats-item-header">
                  <TrendingUp size={24} color="#0066ff" />
                  <h4>Xu hướng tăng trưởng</h4>
                </div>
                <p>Thời gian học tập trung bình tăng 3 giờ/tuần, cho thấy sự cải thiện rõ rệt.</p>
              </div>

              <div className="stats-item">
                <div className="stats-item-header">
                  <Target size={24} color="#10b981" />
                  <h4>Đạt được mục tiêu</h4>
                </div>
                <p>Bạn đã đạt được 8 trong 10 mục tiêu học tập đề ra cho tháng này.</p>
              </div>

              <div className="stats-item">
                <div className="stats-item-header">
                  <PieChart size={24} color="#f59e0b" />
                  <h4>Phân bố môn học</h4>
                </div>
                <p>Toán 30%, Tiếng Anh 25%, Lý 25%, Hóa 20% - cân đối và hợp lý.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Statistics
