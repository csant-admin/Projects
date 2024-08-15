//middleware/auth.js
export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  authStore.checkAuth()
  console.log('Middleware : ', authStore.checkAuth());
  if (!authStore.loggedIn) {
    return navigateTo('/login')
  }
})
