
const API_URL = import.meta.env.VITE_API_URL || '/api'

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorMessage = `API error: ${response.status}`

    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      try {
        const errorData = await response.json()
        if (errorData && errorData.message) {
          errorMessage = errorData.message
        }
      } catch {
        // Ignore JSON parsing errors, use default message
      }
    }

    throw new Error(errorMessage)
  }

  const text = await response.text()
  if (!text) return {}

  return JSON.parse(text)
}

const fetchWithAuth = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`

  const token = localStorage.getItem(options.isAdmin ? 'adminToken' : 'token')

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const response = await fetch(url, {
    ...options,
    headers
  })

  return handleResponse(response)
}

export const api = {
  get: (endpoint, options = {}) => {
    return fetchWithAuth(endpoint, {
      method: 'GET',
      ...options
    })
  },

  /**
   * POST request
   */
  post: (endpoint, data, options = {}) => {
    return fetchWithAuth(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    })
  },

  /**
   * PUT request
   */
  put: (endpoint, data, options = {}) => {
    return fetchWithAuth(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    })
  },

  delete: (endpoint, options = {}) => {
    return fetchWithAuth(endpoint, {
      method: 'DELETE',
      ...options
    })
  }
}

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    register: '/auth/register'
  },
  students: {
    list: '/students',
    detail: (id) => `/students/${id}`,
    documents: (id) => `/students/${id}/documents`
  },
  news: {
    list: '/news',
    detail: (id) => `/news/${id}`
  },
  achievements: {
    list: '/achievements',
    detail: (id) => `/achievements/${id}`
  }
}
