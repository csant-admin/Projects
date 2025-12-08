<template>
		<div class="login-container">
			<v-card class="login-card animated animatedFadeInUp fadeInUp" elevation="4">
				<div class="animated animatedFadeInUp fadeInUp">
					<h2 class="login-title">Login</h2>
					<form @submit.prevent="login" class="login-form">
						<div class="form-group">
							<label for="username">Username</label>
							<input
								v-model="payload.username"
								type="text"
								id="username"
								placeholder="Enter your username"
								required
							/>
						</div>
						<div class="form-group">
							<label for="password">Password</label>
							<input
								v-model="payload.password"
								type="password"
								id="password"
								placeholder="Enter your password"
								required
							/>
						</div>
						<button 
							type="submit" 
							class="login-button mb-2"
							:disabled="loading"
						>
							<v-progress-circular
								v-if="loading"
								color="purple"
								indeterminate
							></v-progress-circular>
							Login
						</button>
						<button
							class="guest-login-button"
							@click="handleGuestLogin"
							@close-modal="handleCloseModal"
							>Login as Guest
						</button>
						<v-btn
							elevation="1"
							class="signup-link py-4"
							:show="showModal"
							@click="openRegistrationModal"
							@close-modal="handleCloseModal"
							>Don't have an account? Sign Up
						</v-btn>
						<registration
							:show="showModal"
							@click="openRegistrationModal"
							@close-modal="handleCloseModal"
						/>
					</form>
				</div>
			</v-card>
		</div>
</template>

  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  import Registration from '@/components/reusables/registration/Registration.vue';
  const { showAlert } = useAlert()
  
  const loading = ref(false);
  const payload = ref({})
  const showSnackbar = ref(false);
  const isError = ref(false);
  const showModal = ref(false);
  const authStore = useAuthStore();
  const router = useRouter();
  const userType = ref('');
  const overlay = ref(false);
  
  const required = (v) => !!v || 'Field is required';

  const login = async () => {
  loading.value = true
  overlay.value = true

  try {
    await authStore.authenticateUser({
      Username: username.value,
      Password: password.value
    })

    // ✅ Use the message from the store (backend or fallback)
    const message = authStore.message || 'Login successful'

    if (authStore.authenticated) {
      console.log('authStore.message:', message)

      showAlert(message, 'success')   // show the success message from backend
      showSnackbar.value = true
      isError.value = false

      setTimeout(() => {
        const user_roles = authStore.user?.UserID
        const allowedPaths = authStore.user?.roles?.access_control
          ?.filter(a => a.access_permission === 1)
          ?.map(a => a.registered_url) || []

        const landingPage =
          allowedPaths.length > 0 && user_roles !== 2  || user_roles === 3 ? '/' : '/dashboard'
        router.push(landingPage)
      }, 1500)
    } else {
      // backend explicitly sent error message
      showAlert(message || 'Login failed. Please check your credentials.', 'error')
      showSnackbar.value = true
      isError.value = true
    }

  } catch (error) {
    // Handle network or unexpected errors
    const errMessage =
      error.message ||
      'Something went wrong. Please check your connection or try again later.'
    showAlert(errMessage, 'error')
    console.error('Login failed:', error)
    showSnackbar.value = true
    isError.value = true
  } finally {
    loading.value = false
    overlay.value = false
  }
}

  
//   const login = async () => {
//     try {
//         loading.value = true;
// 		overlay.value = true;
//         await authStore.authenticateUser({ Username: username.value, Password: password.value });
//         if (authStore.authenticated) {
// 			console.log('authStore.message', authStore.message);
// 			userType.value = localStorage.getItem('type');
// 			showAlert('You have successfully logged in!', 'success');
//             showSnackbar.value = true;
//             isError.value = false;
// 			 setTimeout(() => {
// 				const user_roles = authStore.user?.UserID;
// 				const allowedPaths = authStore.user?.roles?.access_control
// 					console.log('allowedPaths', allowedPaths)

// 					?.filter(a => a.access_permission === 1)
// 					?.map(a => a.registered_url) || []

// 					const landingPage = allowedPaths.length > 0 && user_roles !== 1 ? '/' : '/dashboard'
// 					router.push(landingPage)
// 				}, 1500);
//         } else {
// 			showAlert('Login failed. Please check your credentials.', 'error');
//             showSnackbar.value = true;
//             isError.value = true;
//         }
//     } catch (error) {
// 		showAlert('Something went wrong. Please try again.', 'error');
//         console.error('Login failed', error);
//         showSnackbar.value = true;
//         isError.value = true;
//     } finally {
//         loading.value = false;
// 		overlay.value = false;
//     }
// };

const openRegistrationModal = () => {
	showModal.value = true;
}

</script>

<style scoped>
	html, body, #app, .v-application {
		height: 100%;
	}

	.v-container {
		height: 100%;
	}

	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(
			to bottom right,
			rgba(247, 247, 247, 0.9),
			rgba(255, 255, 255, 0.9)
		),
		url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		overflow: hidden;
	}

	.login-container::after {
		content: "";
		position: absolute;
		width: 250px;
		height: 250px;
		background: radial-gradient(circle, rgba(255, 182, 193, 0.3), transparent 70%);
		top: 10%;
		right: 15%;
		border-radius: 50%;
		filter: blur(80px);
		animation: softPulse 6s ease-in-out infinite;
	}

	@keyframes softPulse {
		0%, 100% { opacity: 0.4; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.1); }
	}

	.login-card {
		width: 100%;
		max-width: 420px;
		padding: 2.5rem;
		background: rgba(255, 255, 255, 0.85);
		border-radius: 16px;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 1;
		border: 1px solid rgba(255, 255, 255, 0.6);
	}

	.login-title {
		font-family: 'Poppins', sans-serif;
		font-size: 2rem;
		color: #2d6a4f; /* calm forest green */
		margin-bottom: 1.5rem;
		text-align: center;
		font-weight: 700;
		letter-spacing: 0.5px;
	}

	label {
		color: #495057;
		font-weight: 600;
	}


	.login-form {
		display: flex;
		flex-direction: column;
	}

	.form-group {
		margin-bottom: 1.25rem;
	}

	label {
		display: block;
		margin-bottom: 0.5rem;
		font-weight: 600;
		color: #4a5568;
	}

	input {
		width: 100%;
		padding: 0.75rem;
		border: 1px solid #ced4da;
		border-radius: 8px;
		background-color: #f8f9fa;
		font-size: 1rem;
		transition: border-color 0.3s ease, box-shadow 0.3s ease;
	}

	input:focus {
		border-color: #74c69d;
		box-shadow: 0 0 5px rgba(116, 198, 157, 0.4);
		outline: none;
	}

	.login-button {
		background-color: #40916c; /* warm green */
		color: white;
		border: none;
		padding: 0.75rem;
		border-radius: 25px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.login-button:hover {
		background-color: #2d6a4f;
		transform: scale(1.03);
	}

	.guest-login-button {
		background-color: #fff;
		color: #2d6a4f;
		border: 1px solid #95d5b2;
		padding: 0.75rem;
		border-radius: 25px;
		font-size: 1rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.guest-login-button:hover {
		background-color: #d8f3dc;
	}


	.v-btn--size-default {
		--v-btn-size: 0.875rem;
		--v-btn-height: none !important;
		font-size: var(--v-btn-size);
		min-width: 64px;
		padding: 0 16px;
	}

	.signup-link {
		display: block;
		text-align: center;
		margin-top: 1rem;
		color: #000;
		text-decoration: none;
		font-size: 0.9rem;
		border: none;
	}

	.signup-link:hover {
		text-decoration: underline;
		color: #50075e;
	}

</style>

  