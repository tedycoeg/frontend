import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null

      try {
        await new Promise(resolve => setTimeout(resolve, 1000))

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
      } catch (error) {
        this.error = error.message || 'Terjadi kesalahan saat login'
        return { success: false, error: this.error }
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
    },

    async checkAuth() {
      if (this.token) {
        try {
          await new Promise(resolve => setTimeout(resolve, 500))

          if (this.token.startsWith('mock-jwt-token-')) {
            this.user = {
              id: 1,
              name: 'Demo User',
              email: 'demo@example.com',
              role: 'student'
            }
            return true
          } else {
            this.logout()
            return false
          }
        } catch (err) {
          console.log(err)
          this.logout()
          return false
        }
      }
      return false
    }
  }
})
