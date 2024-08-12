import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    loggedIn: false,
  }),
  actions: {
    async login(username, password) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/login', { username, password })

        this.token = response.data.token
        this.user = response.data.user
        this.loggedIn = true

        // Save the token, user, and login status to session storage
        sessionStorage.setItem('user', JSON.stringify(this.user))
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('loggedIn', true)
      } catch (error) {
        throw new Error('Invalid credentials')
      }
    },
    
    async logout() {
      try {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`  // Include the token
          }
        })
        this.loggedIn = false
        this.user = null
        this.token = null
        sessionStorage.removeItem('user')
        sessionStorage.removeItem('token')
        sessionStorage.removeItem('loggedIn')
      } catch (error) {
        console.error('Logout failed:', error)
      }
    },
    
    checkAuth() {
      const user = sessionStorage.getItem('user')
      const token = sessionStorage.getItem('token')
      const loggedIn = sessionStorage.getItem('loggedIn')

      if (user && token && loggedIn) {
        this.user = JSON.parse(user)
        this.token = token
        this.loggedIn = true
      }
    }
  }
})
