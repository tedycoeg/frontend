import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api, apiEndpoints } from '@/services/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    adminToken: localStorage.getItem('adminToken') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdminLoggedIn: (state) => !!state.adminToken,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials, role = 'siswa') {
      this.isLoading = true
      this.error = null

      try {
        // const response = await api.post(apiEndpoints.auth.login, {
        //   email: credentials.email,
        //   password: credentials.password,
        //   role: role
        // })
        //
        // this.user = response.user
        // this.token = response.token
        // localStorage.setItem('token', response.token)
        // return { success: true }

        // Kode sementara untuk development:
        await new Promise(resolve => setTimeout(resolve, 1000))

        if (role === 'admin') {
          if (credentials.email === 'admin@alfarabi.com' && credentials.password === 'admin123') {
            const mockUser = {
              id: 1,
              name: 'Administrator',
              email: credentials.email,
              role: 'admin'
            }

            const mockToken = 'admin-mock-jwt-token-' + Math.random().toString(36).substring(2)

            this.user = mockUser
            this.adminToken = mockToken

            localStorage.setItem('adminToken', mockToken)

            return { success: true }
          } else {
            throw new Error('Email atau password admin tidak valid')
          }
        } else {
          if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
            const mockUser = {
              id: 1,
              name: 'Demo User',
              email: credentials.email,
              role: 'student'
            }

            const mockToken = 'mock-jwt-token-' + Math.random().toString(36).substring(2)

            this.user = mockUser
            this.token = mockToken

            localStorage.setItem('token', mockToken)

            return { success: true }
          } else {
            throw new Error('Email atau password tidak valid')
          }
        }
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat login'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    logout(role = 'siswa') {
      // Contoh penggunaan API untuk logout:
      // try {
      //   await api.post(apiEndpoints.auth.logout, {}, { isAdmin: role === 'admin' })
      // } catch (error) {
      //   console.error('Error during logout:', error)
      // }

      this.user = null

      if (role === 'admin') {
        this.adminToken = null
        localStorage.removeItem('adminToken')
      } else {
        this.token = null
        localStorage.removeItem('token')
      }
    },

    async checkAuth(role = 'siswa') {
      const tokenKey = role === 'admin' ? 'adminToken' : 'token'
      const tokenValue = this[tokenKey]

      if (tokenValue) {
        try {
          // Contoh penggunaan API untuk verifikasi token:
          // const user = await api.get(apiEndpoints.auth.me, { isAdmin: role === 'admin' })
          // this.user = user
          // return true

          // Kode sementara untuk pengembangan:
          await new Promise(resolve => setTimeout(resolve, 500))

          if (role === 'admin' && tokenValue.startsWith('admin-mock-jwt-token-')) {
            this.user = {
              id: 1,
              name: 'Administrator',
              email: 'admin@alfarabi.com',
              role: 'admin'
            }
            return true
          } else if (role === 'siswa' && tokenValue.startsWith('mock-jwt-token-')) {
            this.user = {
              id: 1,
              name: 'Demo User',
              email: 'demo@example.com',
              role: 'student'
            }
            return true
          } else {
            this.logout(role)
            return false
          }
        } catch (err) {
          console.error('Error checking authentication:', err)
          this.logout(role)
          return false
        }
      }
      return false
    }
  }
})
