// API service with Fetch abstraction layer
// This is a mock implementation for now, replace with actual API when ready

const API_URL = import.meta.env.VITE_API_URL || '/api'

/**
 * Handles API responses and errors
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        let errorMessage = `API error: ${response.status}`

        // Try to parse error message from response if possible
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

    // Check if response is empty
    const text = await response.text()
    if (!text) return {}

    // Parse JSON response
    return JSON.parse(text)
}

/**
 * Handles API request with token management
 */
const fetchWithAuth = async (endpoint, options = {}) => {
    const url = `${API_URL}${endpoint}`

    // Get token from localStorage based on role
    const token = localStorage.getItem(options.isAdmin ? 'adminToken' : 'token')

    // Prepare headers
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    }

    // Add authorization header if token exists
    if (token) {
        headers['Authorization'] = `Bearer ${token}`
    }

    // Make the request
    const response = await fetch(url, {
        ...options,
        headers
    })

    return handleResponse(response)
}

export const api = {
    /**
     * GET request
     */
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

    /**
     * DELETE request
     */
    delete: (endpoint, options = {}) => {
        return fetchWithAuth(endpoint, {
            method: 'DELETE',
            ...options
        })
    }
}

// Example API endpoints (to be implemented)
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
