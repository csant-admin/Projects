export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  authStore.checkAuth()
  if (!authStore.loggedIn) {
    return navigateTo('/login')
  }
})
