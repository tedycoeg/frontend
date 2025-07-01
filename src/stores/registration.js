import { defineStore } from 'pinia'

// Constants
const isDevelopment = import.meta.env.DEV
const API_URL = isDevelopment
  ? '/api/register'
  : 'https://api.al-farabi.id/register'
const ERROR_DEFAULT_MESSAGE = 'Gagal mendaftar, silakan cek data Anda'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registrationData: null,
    isSubmitting: false,
    registrationSuccess: false,
    registrationError: null
  }),

  actions: {
    /**
     * Submit registration data to the server
     * @param {Object} formData - Registration form data
     * @returns {Promise<boolean>} - Success status
     */
    async submitRegistration(formData) {
      this.isSubmitting = true
      this.registrationError = null

      try {
        // Map form data to API payload structure
        const payload = this._mapFormDataToPayload(formData)
        
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
          credentials: 'include'
        })
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || ERROR_DEFAULT_MESSAGE)
        }
        
        await response.json() // Process response data if needed
        
        // Update store state on success
        this.registrationData = { ...formData }
        this.registrationSuccess = true
        return true
      } catch (error) {
        this.registrationError = error.message || 'Terjadi kesalahan saat mengirim data pendaftaran'
        return false
      } finally {
        this.isSubmitting = false
      }
    },

    /**
     * Reset registration state
     */
    resetRegistration() {
      this.registrationData = null
      this.registrationSuccess = false
      this.registrationError = null
    },
    
    /**
     * Map form data to API payload structure
     * @param {Object} formData - Registration form data
     * @returns {Object} - API payload
     * @private
     */
    _mapFormDataToPayload(formData) {
      return {
        nama: formData.fullName,
        email: formData.email,
        password: formData.password,
        captcha: formData.captcha
      }
    }
  }
})
