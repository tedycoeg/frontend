import { defineStore } from 'pinia'

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

const TOKEN_KEYS = {
  admin: 'adminToken',
  siswa: 'token',
}

const ERROR_MESSAGES = {
  invalidCredentials: 'Email atau password tidak valid',
  default: 'Terjadi kesalahan saat login',
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem(TOKEN_KEYS.siswa) || null,
    adminToken: localStorage.getItem(TOKEN_KEYS.admin) || null,
    isLoading: false,
    error: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdminLoggedIn: (state) => !!state.adminToken,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials, role = 'siswa') {
      this._setLoadingState(true)

      try {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        const data = await response.json()
        const payload = data.payload || {}
        const userData = payload.data || {}

        if (userData.token) {
          return this._handleLoginSuccess(userData, role)
        } else {
          throw new Error(payload.message || ERROR_MESSAGES.invalidCredentials)
        }
      } catch (error) {
        return this._handleLoginError(error)
      } finally {
        this._setLoadingState(false)
      }
    },

    logout(role = 'siswa') {
      this.user = null
      const tokenKey = this._getTokenKeyForRole(role)
      this[tokenKey] = null
      localStorage.removeItem(tokenKey)
    },

    async checkAuth(role = 'siswa') {
      const tokenKey = this._getTokenKeyForRole(role)
      return !!this[tokenKey]
    },

    _setLoadingState(isLoading) {
      this.isLoading = isLoading
      if (isLoading) this.error = null
    },

    _handleLoginSuccess(userData, role) {
      this.user = userData.user || null
      const tokenKey = this._getTokenKeyForRole(role)
      this[tokenKey] = userData.token
      localStorage.setItem(tokenKey, userData.token)
      return { success: true }
    },

    _handleLoginError(error) {
      this.error = error.message || ERROR_MESSAGES.default
      return { success: false, error: this.error }
    },

    _getTokenKeyForRole(role) {
      return role === 'admin' ? TOKEN_KEYS.admin : TOKEN_KEYS.siswa
    },
  },
})
