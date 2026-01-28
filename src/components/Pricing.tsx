import React from 'react'
import { Check } from 'lucide-react'
import './Pricing.css'

interface PricingPlan {
  name: string
  price: number | string
  description: string
  features: string[]
  highlighted?: boolean
}

const Pricing: React.FC = () => {
  const plans: PricingPlan[] = [
    {
      name: 'Cơ bản',
      price: 'Miễn phí',
      description: 'Perfect để bắt đầu',
      features: [
        '📅 3 lịch học',
        '📝 Ghi chú cơ bản',
        '📊 Thống kê căn bản',
        '⏰ 1 nhóm học tập',
        '📱 1 thiết bị'
      ]
    },
    {
      name: 'Chuyên nghiệp',
      price: '₫69.000',
      description: 'Dành cho học sinh',
      features: [
        '✅ Lịch học không giới hạn',
        '✅ Ghi chú nâng cao',
        '✅ Thống kê chi tiết',
        '✅ Nhóm học tập không giới hạn',
        '✅ Đa thiết bị',
        '✅ Thông báo thông minh',
        '✅ Hỗ trợ ưu tiên'
      ],
      highlighted: true
    },
    {
      name: 'Cao cấp',
      price: '₫199.000',
      description: 'Cho những người muốn tối ưu',
      features: [
        '✅ Tất cả tính năng Pro',
        '✅ AI hỗ trợ học tập',
        '✅ Tích hợp giáo viên',
        '✅ Chia sẻ bài học',
        '✅ Phân tích nâng cao',
        '✅ API truy cập',
        '✅ Hỗ trợ 24/7'
      ]
    }
  ]

  return (
    <section id="pricing" className="pricing">
      <div className="container">
        <h2 className="section-title">
          Lựa chọn <span>gói cước</span> phù hợp
        </h2>

        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`pricing-card fade-in ${plan.highlighted ? 'highlighted' : ''}`}
            >
              <div className="pricing-header">
                <h3 className="pricing-name">{plan.name}</h3>
                <p className="pricing-description">{plan.description}</p>
              </div>

              <div className="pricing-price">
                <span className="price-value">{plan.price}</span>
                {plan.price !== 'Miễn phí' && <span className="price-period">/tháng</span>}
              </div>

              <button className={`btn ${plan.highlighted ? 'btn-primary' : 'btn-white'}`}>
                Chọn gói này
              </button>

              <div className="pricing-features">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="feature-check">
                    <Check size={20} className="check-icon" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pricing-note">
          <p>💡 Bắt đầu miễn phí ngay hôm nay. Không cần nhập thông tin thẻ tín dụng.</p>
        </div>
      </div>
    </section>
  )
}

export default Pricing
