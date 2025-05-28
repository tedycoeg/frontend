import { defineStore } from 'pinia'

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
        await new Promise(resolve => setTimeout(resolve, 1500))

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
    }
  }
})
