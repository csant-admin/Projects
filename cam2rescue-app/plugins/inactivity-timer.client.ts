
export default defineNuxtPlugin(() => {
  if (process.client) {
    const auth = useAuthStore();

    window.addEventListener('load', () => {
      auth.startInactivityTimer();
      document.onmousemove = auth.resetInactivityTimer;
      document.onkeypress = auth.resetInactivityTimer;
    });

    window.addEventListener('beforeunload', () => {
      setTimeout(() => {
        auth.logout();
      }, 1000 * 60 * 5); // optional logout on close after 5 min
    });
  }
});
