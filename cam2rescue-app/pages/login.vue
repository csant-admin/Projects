<template>
	<div class="animated animatedFadeInUp fadeInUp">
		<v-container fluid class="py-11">
			<v-progress-linear v-if="loading" color="deep-purple-accent-4" indeterminate></v-progress-linear>
			<v-overlay v-model="overlay"></v-overlay>
			<v-card sm="12" md="3" lg="2" max-width="500" class="mx-auto">
				<v-container>
					<v-card-title class="text-center" style="letter-spacing: 2px;">
						<h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
					</v-card-title>
					<p class="text-center">An Online Platform form for pet rescue and shelter</p>
					<v-form @submit.prevent="login" class="py-8">
						<v-text-field
							v-model="username"
							:rules="[required]"
							label="Username"
							required
							variant="outlined"
						></v-text-field>

						<v-text-field
							v-model="password"
							:rules="[required]"
							label="Password"
							type="password"
							required
							variant="outlined"
						></v-text-field>
						<br>
						<v-btn type="submit" :disabled="!username || !password" :loading="loading" size="large" variant="elevated" color="#6A0DAD">
						Login
						</v-btn>
					</v-form>
					<v-snackbar
						v-model="showSnackbar"
						:timeout="2000"
						color="#6A0DAD"
						elevation="24"
						location="top right"
						multi-line="true"
					>
						<div v-if="!isError">
							<p>Login Successful</p>
							<p>Welcome back <strong>{{ username }}</strong></p>
						</div>
						<div v-else>
							<p>Login Failed</p>
							<p><strong>ERROR! </strong>Incorrect username or password</p>
							<h3 class="text-center">or</h3>
							<p>Account has been deactivated</p>
							<p><strong>Please try again or contact Cam2Rescue team.</strong></p>
						</div>
					</v-snackbar>
				</v-container>
			</v-card>
		</v-container>
	</div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore, path } from '@/stores/auth';
  import { useRouter } from 'vue-router';
  
  const loading = ref(false);
  const username = ref('');
  const password = ref('');
  const showSnackbar = ref(false);
  const isError = ref(false);
  
  const authStore = useAuthStore();
  const router = useRouter();
  const userType = ref('');
  const overlay = ref(false);
  
  const required = (v) => !!v || 'Field is required';
  
  const login = async () => {
    try {
        loading.value = true;
		overlay.value = true;
        await authStore.authenticateUser({ Username: username.value, Password: password.value });

        if (authStore.authenticated) {
			userType.value = localStorage.getItem('type');
            showSnackbar.value = true;
            isError.value = false;
			console.log(path.value);
            setTimeout(() => {
                router.push({ path: path.value});
            }, 1500);
        } else {
            showSnackbar.value = true;
            isError.value = true;
        }
    } catch (error) {
        console.error('Login failed', error);
        showSnackbar.value = true;
        isError.value = true;
    } finally {
        loading.value = false;
		overlay.value = false;
    }
};

</script>

<style scoped>
html, body, #app, .v-application {
  height: 100%;
}

.v-container {
  height: 100%;
}
</style>

  