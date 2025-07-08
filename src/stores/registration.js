import { defineStore } from 'pinia'

// Constants
const API_BASE_URL = '/api'
const API_REGISTER_URL = `${API_BASE_URL}/register`
const ERROR_DEFAULT_MESSAGE = 'Gagal mendaftar, silakan cek data Anda'

export const useRegistrationStore = defineStore('registration', {
  state: () => ({
    registrationData: null,
    isSubmitting: false,
    registrationSuccess: false,
    registrationError: null
  }),

  actions: {
    async submitRegistration(formData) {
      this.isSubmitting = true
      this.registrationError = null

      try {
        const payload = this._mapFormDataToPayload(formData)
        
        const response = await fetch(API_REGISTER_URL, {
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
        
        await response.json()
        
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

    resetRegistration() {
      this.registrationData = null
      this.registrationSuccess = false
      this.registrationError = null
    },
    
    _mapFormDataToPayload(formData) {
      return {
        nama: formData.fullName,
        email: formData.email,
        password: formData.password,
        captcha: formData.captcha,
      }
    }
  }
})
