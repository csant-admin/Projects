// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loggedIn: false,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password })

			this.loggedIn = true
			this.user = response.data.user
			// Save the user and login status to session storage
			sessionStorage.setItem('user', JSON.stringify(this.user))
			sessionStorage.setItem('loggedIn', true)
      } catch (error) {
        throw new Error('Invalid credentials')
      }
    },
    
    logout() {
      this.loggedIn = false
      this.user = null
      sessionStorage.removeItem('user')
      sessionStorage.removeItem('loggedIn')
    },
    checkAuth() {
      const user = sessionStorage.getItem('user')
      const loggedIn = sessionStorage.getItem('loggedIn')
      if (user && loggedIn) {
        this.user = JSON.parse(user)
        this.loggedIn = true
      }
    }
  }
})
