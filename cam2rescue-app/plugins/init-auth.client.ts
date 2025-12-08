import { useAuthStore } from '~/stores/auth'


// export default defineNuxtPlugin(() => {
//   const authStore = useAuthStore()
//   authStore.checkAuth()
// })

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()

  const user = localStorage.getItem('user')
  const token = localStorage.getItem('token')

  if (user && token) {
    authStore.user = JSON.parse(user)
    authStore.token = token
    authStore.authenticated = true
  }
})

