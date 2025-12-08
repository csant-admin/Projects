// import { useAuthStore } from '~/stores/auth'

// export default defineNuxtRouteMiddleware((to, from) => {
//   const authStore = useAuthStore()
//   authStore.checkAuth()

//   const authenticated = authStore.authenticated
//   const user = authStore.user

//   const normalizePath = (path: string) => {
//     if (!path) return '/'
//     let cleaned = path.trim().toLowerCase()
//     if (!cleaned.startsWith('/')) cleaned = '/' + cleaned
//     return cleaned.replace(/\/+$/, '') || '/'
//   }

//   const currentPath = normalizePath(to.path)
  
//   const allowedPaths = (user?.roles?.access_control || [])
//     .filter((a: any) => a.access_permission === 1)
//     .map((a: any) => normalizePath(a.registered_url))
    

//   console.log('allowedPaths', allowedPaths)


//   const safePages = ['/unauthorized', '/signup', '/login']

//   // 🚪 Not logged in
//   if (!authenticated) {
//     if (!safePages.includes(currentPath)) {
//       return navigateTo('/login')
//     }
//     return
//   }

//   // 🔑 Already logged in, trying to go back to login
//   if (authenticated && currentPath === '/login') {
//     const landingPage = allowedPaths.length > 0 ? allowedPaths[0] : '/'
//     return navigateTo(landingPage)
//   }

//   // 🚫 Logged in but not allowed
//   if (!allowedPaths.includes(currentPath) && !safePages.includes(currentPath)) {
//     console.warn(`⛔ Access denied to: ${to.path}`)
//     return navigateTo('/unauthorized')
//   }
// })


import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware((to) => {
  if (process.server) return

  const authStore = useAuthStore()
  const user = authStore.user
  const authenticated = authStore.authenticated

  const normalizePath = (p: string) => {
    if (!p) return '/'
    let c = p.trim().toLowerCase()
    if (!c.startsWith('/')) c = '/' + c
    return c.replace(/\/+$/, '') || '/'
  }

  const allowedPaths = (user?.roles?.access_control || [])
    .filter((a: any) => a.access_permission === 1)
    .map((a: any) => normalizePath(a.registered_url.replace(/\\/g, '')))


  console.log('allowedPaths', allowedPaths)
  const currentPath = normalizePath(to.path)

  const safe = ['/unauthorized', '/signup', '/login']

  if (!authenticated || !user) {
    if (!safe.includes(currentPath)) return navigateTo('/login')
    return
  }

  if (authenticated && currentPath === '/login') {
    return navigateTo(allowedPaths[0] || '/')
  }

  if (!allowedPaths.includes(currentPath) && !safe.includes(currentPath)) {
    return navigateTo('/unauthorized')
  }
})



