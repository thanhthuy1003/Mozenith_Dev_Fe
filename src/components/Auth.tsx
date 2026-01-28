import React, { useState } from 'react'
import { useMutation } from '../hooks/useApi'
import { authAPI } from '../services/api'
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

export function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const { mutate: login, loading, error } = useMutation(
    (data: LoginFormData) => authAPI.login(data.email, data.password)
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response: any = await login(formData)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      setSuccessMessage('Đăng nhập thành công!')
      setFormData({ email: '', password: '' })
      // Redirect to dashboard
      setTimeout(() => window.location.href = '/dashboard', 1500)
    } catch (err) {
      console.error('Login failed:', err)
    }
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

  const { mutate: register, loading, error } = useMutation(
    (data: RegisterFormData) => authAPI.register(data.email, data.password, data.fullName)
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response: any = await register(formData)
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify(response.user))
      setSuccessMessage('Đăng ký thành công!')
      setFormData({ email: '', password: '', fullName: '' })
      // Redirect to dashboard
      setTimeout(() => window.location.href = '/dashboard', 1500)
    } catch (err) {
      console.error('Registration failed:', err)
    }
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
