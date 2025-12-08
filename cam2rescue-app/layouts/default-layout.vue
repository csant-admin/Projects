<script setup>
	import { ref, computed, onMounted } from 'vue'
	import { useRouter } from 'vue-router'
	import { useAuthStore } from '@/stores/auth'
	import UtilityForm from '@/components/reusables/utility/UtilityForm.vue'
	import '../assets/css/sidebar.css'
	import '../assets/css/main.css'

	const router = useRouter()
	const drawer = ref(false)
	const rightdrawer = ref(false)
	const openModal = ref(false)
	const utilityTitle = ref('')
	const authStore = useAuthStore()

	const user = ref(authStore.user) 

	watch(() => authStore.user, (val) => {
		user.value = val
	})


	onMounted(() => {
		if (!authStore.user) {
			const storedUser = localStorage.getItem('user')
			const storedToken = localStorage.getItem('token')
			if (storedUser && storedToken) {
			authStore.user = JSON.parse(storedUser)
			authStore.token = storedToken
			authStore.authenticated = true
			}
		}
    })
	// logout
	const logout = async () => {
		await authStore.logout()
		router.push('/')
	}

	// helper
	const normalizePath = (path) => {
        if (!path) return '/'
        let cleaned = path.trim().toLowerCase()
        if (!cleaned.startsWith('/')) cleaned = '/' + cleaned
        return cleaned.replace(/\/+$/, '') || '/'
    }

	// --------------------
	//  MAIN DYNAMIC RBAC
	// --------------------
	const allowedPaths = computed(() => {
        const user = authStore.user
        if (!user) return []

        const access = user.roles?.access_control || []
        const cleaned = access
            .filter(a => a.access_permission === 1)
            .filter(a => a.Name && a.Name.trim() !== '')
            .filter(a => a.group_url === 2)
            .map(a => ({
                path: normalizePath(a.registered_url.replace(/\\/g, '')),
                name: a.Name
            }))
            console.log('allowedPaths:', cleaned)
            return cleaned
        })
</script>



<template>
	<v-layout>
		<v-app-bar
			color="#50075e;"
			prominent
		>
			<v-container fluid>
				<v-row align="center" no-gutters>
					<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
					<v-toolbar-title>
						<v-img :width="40" :height="50" aspect-ratio="16/9" src="../assets/images/logo3.png" class="mr-3"></v-img>
						Cam2Rescue
					</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-btn @click.stop="rightdrawer = !rightdrawer" icon="mdi-dots-vertical" variant="text"></v-btn>
				</v-row>
			</v-container>
		</v-app-bar>
		<v-navigation-drawer
			v-model="drawer"
			class="side-bar"
		>
			<v-avatar
				class="fa-fa-user mb-4 ml-4 mt-4"
				size="64"
				>
				<v-img
					:width="80"
					:height="100"
					aspect-ratio="16/9"
					cover
					src="../assets/images/logo3.png"
				>
				</v-img>
			</v-avatar>
			<div v-if="user">
				<div class="pa-4"><span class="text-capitalize">{{ user?.first_name }} {{ user?.last_name }}</span></div>
			</div>
			<div v-else>
				<div class="pa-4">User's Name</div>
			</div>

			<v-divider></v-divider>
			<v-list>
				<template v-for="item in allowedPaths" :key="item.path">
					<v-list-item>
						<v-list-item-icon>
							<v-icon v-if="item.icon">{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title>
							{{ item.name }}
						</v-list-item-title>
						<router-link :to="item.path" class="stretched-link"></router-link>
					</v-list-item>
				</template>

    <!-- logout -->
    <v-list-item
      prepend-icon="mdi-logout"
      title="Logout"
      link
      @click.prevent="logout"
    />
  </v-list>
			<!-- <v-list>
				<template v-for="(item, index) in links">
					<v-list-item
						v-if="item.name === 'AddModule'"
						:key="index"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>
				
				
				<template v-for="item in allowedPaths" :key="item.path">
					<v-list-item
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>

				<template v-for="item in allowedPaths" :key="item.path">
					<v-list-item
						v-if="item.name === 'For Rescue'"
						:key="index"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>
				
				
				<template v-for="(item, index) in links" :key="index">
					<v-list-item
						block
						v-if="item.logout"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						@click.prevent="logout()"
					></v-list-item>
				</template>
			</v-list> -->
		</v-navigation-drawer>
		<v-navigation-drawer
			v-model="rightdrawer"
			location="right"
			permanent
		>
		<div style="color: #6A0DAD;" class="left pa-4 text-uppercase">
			<h4>Actions</h4>
		</div>

			<v-divider></v-divider>
			<v-list density="compact" nav>
			<v-list-item 
				prepend-icon="mdi-pill" 
				title="Add Pet Illness" 
				value="Add Pet Illness" 
				color="#6A0DAD"
				@click="handleOpenModal('Illness')"
				>
			</v-list-item>
			<v-list-item 
				prepend-icon="mdi-format-color-fill" 
				title="Add Color" 
				value="Add Color" 
				color="#6A0DAD"
				@click="handleOpenModal('Color')"
				>
			</v-list-item>
			<v-list-item 
				prepend-icon="mdi-map-marker" 
				title="Add Barangay" 
				value="Add Barangay" 
				color="#6A0DAD"
				@click="handleOpenModal('Barangay')"
				>
			</v-list-item>
			<v-list-item 
				prepend-icon="mdi-run-fast" 
				title="Add Urgency" 
				value="Add Urgency" 
				color="#6A0DAD"
				@click="handleOpenModal('Urgency')"
				>
			</v-list-item>
			<v-list-item 
				prepend-icon="mdi-needle-off" 
				title="Add Injury" 
				value="Add Injury" 
				color="#6A0DAD"
				@click="handleOpenModal('Injury')"
				>
			</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main>
			<v-container :fluid="true">
				<v-row justify="center" align="center" class="mb-4">
					<v-col class="text-center">
						<div class="page-header-text">
							<h1 class="text-uppercase"><span style="color: #6A0DAD">Cam</span>2Rescue</h1>
							<p>An online platform for pet rescue and shelter</p>
						</div>
					</v-col>
				</v-row>
				<NuxtPage />
			</v-container>
		</v-main>
	</v-layout>
	<UtilityForm :show="openModal" :utility-title="utilityTitle" @close-dialog="handleCloseModal" />
</template>

