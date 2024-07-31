export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useAuthStore()
    if (!authStore.loggedIn && to.path !== '/login') {
      return navigateTo('/login')
    }
  })
  