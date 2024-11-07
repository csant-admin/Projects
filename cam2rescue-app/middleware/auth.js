import { storeToRefs } from 'pinia';
import { useAuthStore } from '~/stores/auth';

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.server) {
    console.log('Middleware is running on the server');
  }
  
  if (process.client) {
    console.log('Middleware is running on the client');
  }

  const authStore = useAuthStore();
  const { authenticated } = storeToRefs(authStore);
  const token = useCookie('token');
  
  if (token.value) {
    authenticated.value = true;
  } else {
    authenticated.value = false;
  }

  if (token.value && to?.name === 'login') {
    return navigateTo('/');
  }

  if (!token.value && to?.name !== 'login') {
    return navigateTo('/login');
  }
});
