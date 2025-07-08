import { defineStore } from 'pinia'
// eslint-disable-next-line no-unused-vars
import { api, apiEndpoints } from '@/services/api'

// Constants
// Gunakan proxy di lingkungan development
const API_BASE_URL = '/api'
const TOKEN_KEYS = {
  admin: 'adminToken',
  siswa: 'token'
}
const ERROR_MESSAGES = {
  invalidCredentials: 'Email atau password tidak valid',
  default: 'Terjadi kesalahan saat login'
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem(TOKEN_KEYS.siswa) || null,
    adminToken: localStorage.getItem(TOKEN_KEYS.admin) || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    isAdminLoggedIn: (state) => !!state.adminToken,
    currentUser: (state) => state.user
  },

  actions: {
    /**
     * Login a user with credentials
     * @param {Object} credentials - User credentials (email, password)
     * @param {string} role - User role ('admin' or 'siswa')
     * @returns {Promise<Object>} - Login result
     */
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
            password: credentials.password
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

    /**
     * Logout the current user
     * @param {string} role - User role ('admin' or 'siswa')
     */
    logout(role = 'siswa') {
      this.user = null
      const tokenKey = this._getTokenKeyForRole(role)
      
      this[tokenKey] = null
      localStorage.removeItem(tokenKey)
    },

    /**
     * Check if user is authenticated
     * @param {string} role - User role ('admin' or 'siswa')
     * @returns {boolean} - Authentication status
     */
    async checkAuth(role = 'siswa') {
      const tokenKey = this._getTokenKeyForRole(role)
      return !!this[tokenKey]
    },
    
    /**
     * Set loading state
     * @param {boolean} isLoading - Loading state
     * @private
     */
    _setLoadingState(isLoading) {
      this.isLoading = isLoading
      if (isLoading) {
        this.error = null
      }
    },
    
    /**
     * Handle successful login
     * @param {Object} userData - User data from API
     * @param {string} role - User role
     * @returns {Object} - Success result
     * @private
     */
    _handleLoginSuccess(userData, role) {
      this.user = userData.user || null
      const tokenKey = this._getTokenKeyForRole(role)
      
      this[tokenKey] = userData.token
      localStorage.setItem(tokenKey, userData.token)
      
      return { success: true }
    },
    
    /**
     * Handle login error
     * @param {Error} error - Error object
     * @returns {Object} - Error result
     * @private
     */
    _handleLoginError(error) {
      this.error = error.message || ERROR_MESSAGES.default
      return { success: false, error: this.error }
    },
    
    /**
     * Get token key based on user role
     * @param {string} role - User role
     * @returns {string} - Token key
     * @private
     */
    _getTokenKeyForRole(role) {
      return role === 'admin' ? TOKEN_KEYS.admin : TOKEN_KEYS.siswa
    }
  }
})
