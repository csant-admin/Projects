import { defineStore } from 'pinia'
import axios from 'axios'

const default_api = 'http://127.0.0.1:8000'
let inactivityTimeout

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    user: null,
    token: null,
	message: null,
  }),

  actions: {
    async authenticateUser({ Username, Password }) {
  this.loading = true
  try {
    const { data } = await axios.post(`${default_api}/api/login`, {
      username: Username,
      password: Password,
    })

    if (data.status === 'success') {
      const { access_token, user } = data.data

      this.token = access_token
      this.user = user
      this.authenticated = true
      this.message = data.message

      if (process.client) {
        localStorage.setItem('token', access_token)
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('authenticated', 'true')
      }
    } else {
      // Laravel explicitly sent an error message
      this.message = data.message || 'Login failed.'
    }
  } catch (error) {
    console.error('Login error:', error)

    if (error.response) {
      this.message = error.response.data?.message ||
        `Error ${error.response.status}: Something went wrong.`
    } else if (error.request) {
      this.message = 'Cannot reach the server. Check your connection.'
    } else {
      this.message = 'Unexpected error. Please try again.'
    }

    throw new Error(this.message)
  } finally {
    this.loading = false
  }
},


    async logout() {
		try {
			await axios.post(`${default_api}/api/logout`, {}, {
			headers: { 'Authorization': `Bearer ${this.token}` }
			})
		} catch (e) {
			console.error('Logout failed', e)
		}
		if(process.client) {
			this.authenticated = false
			this.user = null
			this.token = null
			localStorage.clear()
			clearTimeout(inactivityTimeout)
		}
    },

    checkAuth() {
		try {
			if(process.client) {
				const token = localStorage.getItem('token')
				const userStr = this.user = SafeStorage.get('user')
				const authenticated = localStorage.getItem('authenticated') === 'true'

				if (token && userStr && authenticated) {
					this.token = token
					this.user = JSON.parse(userStr)  
					this.authenticated = true
				} else {
					this.authenticated = false
					this.user = null
					this.token = null
				}
			}
		} catch (e) {
			console.warn('Invalid JSON in localStorage.user, resetting...', e)
			localStorage.removeItem('user')
			this.user = null
			}
    },

    startInactivityTimer() {
      clearTimeout(inactivityTimeout)
      inactivityTimeout = setTimeout(() => {
        this.logout()
      }, 1800000) // 30 mins
    },

    resetInactivityTimer() {
      clearTimeout(inactivityTimeout)
      this.startInactivityTimer()
    }
  }
})
