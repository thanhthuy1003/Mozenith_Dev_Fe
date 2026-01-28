import React, { useState } from 'react'
import './Auth.css'

interface LoginFormData {
  email: string
  password: string
}

interface RegisterFormData {
  email: string
  password: string
  fullName: string
}

// Demo mode - không cần backend
const DEMO_MODE = true

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (DEMO_MODE) {
      // Demo mode - accept any login
      if (!formData.email || !formData.password) {
        setError('Vui lòng nhập email và password')
        return
      }
      
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token-' + Date.now())
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          email: formData.email,
          fullName: 'Demo User'
        }))
        setSuccessMessage('✅ Đăng nhập demo thành công!')
        setFormData({ email: '', password: '' })
        setLoading(false)
        // Redirect to dashboard
        setTimeout(() => window.location.href = '/', 1500)
      }, 800)
    }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Đăng nhập</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  )
}

export function RegisterForm() {
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    password: '',
    fullName: ''
  })
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (DEMO_MODE) {
      // Demo mode - accept any registration
      if (!formData.email || !formData.password || !formData.fullName) {
        setError('Vui lòng điền đầy đủ thông tin')
        return
      }
      
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        localStorage.setItem('token', 'demo-token-' + Date.now())
        localStorage.setItem('user', JSON.stringify({
          id: Math.random(),
          email: formData.email,
          fullName: formData.fullName
        }))
        setSuccessMessage('✅ Đăng ký demo thành công!')
        setFormData({ email: '', password: '', fullName: '' })
        setLoading(false)
        // Redirect to home
        setTimeout(() => window.location.href = '/', 1500)
      }, 800)
    }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Đăng ký</h2>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <div className="form-group">
          <label>Tên đầy đủ</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label>Mật khẩu</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={loading}
        >
          {loading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>
    </div>
  )
}

export default LoginForm
