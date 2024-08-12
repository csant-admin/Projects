<template>
	<div class="animated animatedFadeInUp fadeInUp">
		<v-progress-linear
			v-if="loading"
			color="deep-purple-accent-4"
			indeterminate
		></v-progress-linear>
		<v-sheet class="pa-16" rounded>
			<v-card class="mx-auto px-6 py-8" max-width="500">
				<v-card-title class="text-center" style="letter-spacing: 2px;">
					<h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
				</v-card-title>
				<p class="text-center">An Online Platform form for pet rescue and shelter</p>
				<v-form @submit.prevent="login" v-model="form" class="py-8">
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
					<v-btn type="submit" :disabled="!form" :loading="loading" size="large" variant="elevated" color="#6A0DAD">Login</v-btn>
				</v-form>
			</v-card>
		</v-sheet>
	</div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/auth'
  import { useRouter } from 'vue-router'
  const loading = ref(false);
  const form = ref(false);
  const username = ref('')
  const password = ref('')
  const showSnackbar = ref(false);
  const isError = ref(false);
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  const required = (v) => !!v || 'Field is required'
  
  const login = async () => {
    try {
		loading.value = true;
		await authStore.login(username.value, password.value)
		if(sessionStorage.getItem('user')) {
			showSnackbar.value = true;
			if (authStore.user.UserType === 1) {
				router.push('/dashboard')
			} else {
				router.push('/')
			}
		} else {
			showSnackbar.value = true;
			isError.value = true;
		}
    } catch (error) {
		loading.value = false;
      console.error('Login failed', error)
    }
  }
  </script>

<style scoped>
	html, body, #app, .v-application {
	height: 100%;
	}

	.v-container {
	height: 100%;
	}
</style>
  