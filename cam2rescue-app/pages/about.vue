<template>
    <v-app>
        <v-app-bar app color="#6A0DAD">
            <v-container fluid>
                <v-row align="center" no-gutters>
                    <v-col class="text-left d-flex d-md-none">
                        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                    </v-col>
                    <v-col class="d-none d-md-flex">
                        <v-toolbar-title>
                            <v-btn text tag="nuxt-link" to="/">
                                Cam2Rescue
                            </v-btn>
                        </v-toolbar-title>
                    </v-col>

                    <v-col class="d-none d-md-flex text-right" cols="6">
                        <v-col cols="12">
                            <v-btn text tag="nuxt-link" to="/about">About Us</v-btn>
                            <v-btn text tag="nuxt-link" to="/contact">Contact Us</v-btn>
                            <template v-if="!isAuthenticated">
                            <v-btn text tag="nuxt-link" to="/login">Login</v-btn>
                            </template>
                            <template v-else>
                            <v-btn text @click.prevent="logout">Logout</v-btn>
                            </template>
                            <!-- <v-btn text tag="nuxt-link" to="/registration">Register</v-btn> -->
                            <v-btn @click="handleModal">Register</v-btn>
                            <v-btn text tag="nuxt-link" to="/adoption-form">Adoption</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary app color="#6A0DAD">
            <v-list>
                <v-list-item link to="/">Home</v-list-item>
                <v-list-item link to="/about">About Us</v-list-item>
                <v-list-item link to="/contact">Contact Us</v-list-item>
                <template v-if="!isAuthenticated">
                    <v-list-item link to="/login">Login</v-list-item>
                </template>
                <template v-else>
                    <v-list-item @click.prevent="logout">Logout</v-list-item>
                </template>
                <v-btn @click="handleModal">Register</v-btn>
                <v-list-item link to="/adoption-form">Adoption</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-container class="contact-us">
        <v-row class="align-center">
            <!-- Left Side: Contact Form -->
            <v-col cols="12" md="6">
                <v-img 
                    src="../assets/images/c2r_bg5.webp" 
                    alt="Rescue Pets" 
                    max-width="500"
                    class="mx-auto"
                ></v-img>
            </v-col>
            
            <!-- Right Side: Image -->
            <v-col cols="12" md="6" class="text-center">
                <div>
                    <h2 class="text-h5 font-weight-bold text-left">Mission</h2>
                    <p class="text-body-2 text-left">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Dolore eveniet laboriosam beatae dicta assumenda, recusandae modi, 
                        et molestiae ipsum deleniti sunt maxime tempore ipsam officia sit facilis laudantium quos, 
                        officiis tempora. Neque, eaque tempora quas, 
                        hic corporis eveniet dicta officiis est tenetur doloribus dignissimos accusantium magni. 
                        Eaque porro iusto molestiae?
                    </p>
                </div>
                <div>
                    <h2 class="text-h5 font-weight-bold mt-6 text-left">Vission</h2>
                    <p class="text-body-2 text-left">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Possimus odio eum reprehenderit excepturi suscipit qui. 
                        Debitis labore obcaecati ipsum doloremque error, 
                        laudantium atque distinctio sint aperiam ab quam doloribus enim, 
                        tempora omnis maxime ipsa dignissimos adipisci, 
                        perferendis eveniet animi voluptatibus eius corporis? Architecto, 
                        suscipit voluptas esse quis sunt sapiente deleniti?
                    </p>
                </div>
            </v-col>
        </v-row>
        </v-container>
        <v-footer app>
            <v-col class="text-center">
                <span>&copy; 2024 Cam2Rescue. All rights reserved.</span>
            </v-col>
        </v-footer>
    </v-app>
    <registration :show="showModal" @load-user="loadUserList" @close-modal="handleCloseModal" />
  </template>
  
  <script setup>
        import { ref } from 'vue';
        import { useAuthStore, path } from '@/stores/auth';
        import { useRouter } from 'vue-router';
        const router = useRouter();
        import Registration from '@/components/reusables/registration/Registration.vue';

        const authStore = useAuthStore();
        import '~/assets/css/main.css';
        const drawer = ref(false);
        const isAuthenticated = ref(false);
        const showModal         = ref(false);

        const handleModal = () => {
            showModal.value = true;
        }

        const handleCloseModal = () => {
            showModal.value = false;
        }

        // onMounted(() => {
        //     if (process.client) {
        //         const authenticated = localStorage.getItem('Authenticated');
        //         console.log('Authenticated:', authenticated); 
        //         isAuthenticated.value = authenticated === 'true';
        //     }
        // });
  </script>
  
<style scoped>
    .contact-us {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
</style>
