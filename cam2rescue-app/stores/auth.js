import { defineStore } from 'pinia';
import axios from 'axios';
export const userAuthenticated = ref([]);
export const path = ref('');

const base_api = 'http://192.168.1.10:8000';
const default_api = 'http://127.0.0.1:8000';
export const useAuthStore = defineStore('auth', {
  	state: () => ({
    	authenticated: false,
    	loading: false,
		user: null,
		token: null,
	}),

  	actions: {
   		async authenticateUser({ Username, Password }) {
      		this.loading = true;
			try {
				const response = await axios.post(`${base_api}/api/login`, {
					username: Username,
					password: Password,
				}, {
					headers: {
						'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
					}
				});
				if (response.data) {
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
				throw new Error('Invalid credentials');
			} finally {
			this.loading = false;
			}
  		},
  
		async logout() {
		try {
			await axios.post(`${base_api}/api/logout`, {}, {
			headers: {
				'Authorization': `Bearer ${this.token}`  // Include the token
			}
			});
			this.authenticated = false;
			this.user = null;
			this.token = null;
			sessionStorage.clear();
			const token = useCookie('token');
			token.value = null;
			clearTimeout(inactivityTimeout);
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
		},
	}
});

let inactivityTimeout;

function startInactivityTimer() {
  const authStore = useAuthStore();
  inactivityTimeout = setTimeout(() => {  
    authStore.logout(); 
  }, 1800000); 
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimeout);
  startInactivityTimer();
}


if (process.client) {
  window.onload = () => {
    startInactivityTimer();
    document.onmousemove = resetInactivityTimer;
    document.onkeypress = resetInactivityTimer;
  };

  window.onclose = () => {
    const authStore = useAuthStore();
    inactivityTimeout = setTimeout(() => {  
      authStore.logout(); 
    }, 1000 * 60 * 5); 
  }
}

