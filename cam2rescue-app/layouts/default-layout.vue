<template>
	<v-layout>
		<v-app-bar
			color="#673AB7"
			prominent
		>
			<v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-toolbar-title><v-img :width="40" :height="50" aspect-ratio="16/9" src="../assets/images/logo3.png"></v-img>Cam2Rescue</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-btn @click.stop="rightdrawer = !rightdrawer" icon="mdi-dots-vertical" variant="text"></v-btn>
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
				<div class="pa-4"><span class="text-capitalize">{{ user }}</span></div>
			</div>
			<div v-else>
				<div class="pa-4">User's Name</div>
			</div>

			<v-divider></v-divider>

			<v-list>
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
				
				
				<template v-for="(item, index) in links">
					<v-list-item
						v-if="item.name === 'Dashboard'"
						:key="index"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>

				<template v-for="(item, index) in links">
					<v-list-item
						v-if="item.name === 'For Rescue'"
						:key="index"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						:to="item.path"
					></v-list-item>
				</template>
				
				<v-list-group>
					<template v-slot:activator="{ props }">
						<v-list-item v-bind="props" class="parent-nav">
							Adoption
						</v-list-item>
					</template>
					<template v-for="(item, index) in links" :key="index">
						<div class="custom-link-style">
							<v-list-item
							v-if="item.name !== 'Dashboard' && 
							!item.logout && 
							item.name !== 'Add Module' &&
							item.name !== 'Users' &&
							item.name !== 'Add User' &&
							item.name !== 'For Rescue'"
							:prepend-icon="item.icon"
							:title="item.name"
							link
							:to="item.path"
							></v-list-item>
						</div>
					</template>
				</v-list-group>

				<v-list-group>
					<template v-slot:activator="{ props }">
						<v-list-item v-bind="props" class="parent-nav">
							User
						</v-list-item>
					</template>
					<template v-for="(item, index) in links" :key="index">
						<div class="custom-link-style">
							<v-list-item
							v-if="item.name !== 'Dashboard' && 
							!item.logout && 
							item.name !== 'Add Module' &&
							item.name !== 'Adoption Request' &&
							item.name !== 'Create Post' &&
							item.name !== 'For Rescue'"
							:prepend-icon="item.icon"
							:title="item.name"
							link
							:to="item.path"
							></v-list-item>
						</div>
					</template>
				</v-list-group>
				<template v-for="(item, index) in links" :key="index">
					<v-list-item
						block
						v-if="item.logout"
						:prepend-icon="item.icon"
						:title="item.name"
						link
						@click="logout()"
					></v-list-item>
				</template>
			</v-list>
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
			<v-list-item prepend-icon="mdi-pill" title="Add Pet Illness" value="Add Pet Illness" color="#6A0DAD"></v-list-item>
			<v-list-item prepend-icon="mdi-format-color-fill" title="Add Color" value="Add Color" color="#6A0DAD"></v-list-item>
			<v-list-item prepend-icon="mdi-map-marker" title="Add Barangay" value="Add Barangay" color="#6A0DAD"></v-list-item>
			<v-list-item prepend-icon="mdi-run-fast" title="Add Urgency" value="Add Urgency" color="#6A0DAD"></v-list-item>
			<v-list-item prepend-icon="mdi-needle-off" title="Add Injury" value="Add Injury" color="#6A0DAD"></v-list-item>
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
</template>

<script setup>
// import Swal from 'sweetalert2';
import { ref } from 'vue';
import '../assets/css/sidebar.css';
import '../assets/css/main.css';
const rightdrawer = ref(false);

const links = [
	{
		name:'Dashboard',
		path:'/dashboard',
		icon:'mdi-view-dashboard',
		logout: false,
	},
	{
		name:'Adoption Request',
		path:'/adoption',
		icon:'mdi-account-circle',
		logout:false,
	},
	{
		name:'Create Post',
		path:'/adoption/create-post',
		icon:'mdi-plus',
		logout:false
	},
	{
		name:'Add Module',
		path:'/module',
		icon:'mdi-plus',
		logout:false
	},
	{
		name:'Users',
		path:'/user',
		icon:'mdi-account',
		logout:false
	},
	{
		name:'Add User',
		path:'/user/add-user',
		icon:'mdi-plus',
		logout:false
	},

	{
		name: 'For Rescue',
		path:'/rescue',
		icon:'mdi-ambulance',
		logout:false
	},


	{
		name:'Logout',
		path:'dashboard',
		icon:'mdi-logout',
		logout:true
	}
];

const drawer = ref(null);
const router = useRouter();
</script>