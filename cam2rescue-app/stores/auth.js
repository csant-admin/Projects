import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const base_url = useApiUrl();
export const useAuthStore = defineStore('auth', {
  state: () => ({
    loggedIn: false,
    user: null
  }),

  actions: {
    async login(username, password) {
      const router = useRouter()
      const config = useRuntimeConfig()

      try {
        const response = await this.$axios.post(`${base_url}/api/login`, {
          username,
          password
        })

        if (response.data.user) {
          this.loggedIn = true
          this.user = response.data.user
          router.push(response.data.redirect)
        }
      } catch (error) {
        console.error('Login failed', error)
      }
    },
    async logout() {
      const router = useRouter()

      try {
        await this.$axios.post(`${base_url}/api/logout`)
        this.loggedIn = false
        this.user = null
        router.push('/login')
      } catch (error) {
        console.error('Logout failed', error)
      }
    }
  }
})