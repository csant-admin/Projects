import { defineStore } from 'pinia';
import axios from 'axios';
export const userAuthenticated = ref([]);
export const path = ref('');

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
  }),

  actions: {
    async authenticateUser({ Username, Password }) {
      this.loading = true;
      try {
          const response = await axios.post('http://127.0.0.1:8000/api/login', {
              username: Username,
              password: Password,
          }, {
              headers: {
                  'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
              }
          });
          console.log('Response : ', response);
          if (response.data) {
              console.log('Test');
              const token = useCookie('token');
              token.value = response.data.access_token;
              this.authenticated = true;
              this.user = response.data.user;
              if(parseInt(this.user.UserType) === 1 ) {
                  path.value = 'dashboard';
              } else {
                  path.value = '/';
              }
              sessionStorage.setItem('user', JSON.stringify(this.user));  
              sessionStorage.setItem('loggedIn', true); 
              localStorage.setItem('Authenticated', 'true');
              localStorage.setItem('token', this.token);
          }
      } catch (error) {
          console.error('Login failed', error);
          throw new Error('Invalid credentials');
      } finally {
          this.loading = false;
      }
  },
  
    async logout() {
      try {
        await axios.post('http://127.0.0.1:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${this.token}`  // Include the token
          }
        });
        this.authenticated = false;
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('loggedIn');
        localStorage.removeItem('Authenticated');
        localStorage.removeItem('token');
        localStorage.removeItem('type');
      } catch (error) {
        console.error('Logout failed:', error);
      }
    },

    checkAuth() {
      const user = sessionStorage.getItem('user');
      const token = sessionStorage.getItem('token');
      const loggedIn = sessionStorage.getItem('loggedIn');

      if (user && token && loggedIn) {
        this.user = JSON.parse(user);
        this.token = token;
        this.authenticated = true;
        const authenticated = localStorage.getItem('Authenticated');
        const token = localStorage.getItem('token');
      } else {
        this.authenticated = false;
        this.user = null;
        this.token = null;
      }
    }
  }
});
