<script setup>
    import { ref, computed, onMounted, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import { useAuthStore } from '~/stores/auth'
    import '~/assets/css/main.css'

    const drawer = ref(false)
    const router = useRouter()
    const route = useRoute()
    const authStore = useAuthStore()

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

    const isAuthenticated = computed(() => authStore.authenticated)

    const logout = async () => {
        await authStore.logout()
        router.push('/login')
    }


    const normalizePath = (path) => {
        if (!path) return '/'
        let cleaned = path.trim().toLowerCase()
        if (!cleaned.startsWith('/')) cleaned = '/' + cleaned
        return cleaned.replace(/\/+$/, '') || '/'
    }

    const allowedPaths = computed(() => {
        const user = authStore.user
        if (!user) return []

        const access = user.roles?.access_control || []
        const cleaned = access
            .filter(a => a.access_permission === 1)
            .filter(a => a.Name && a.Name.trim() !== '')
            .filter(a => a.group_url === 1)
            .map(a => ({
                path: normalizePath(a.registered_url.replace(/\\/g, '')),
                name: a.Name
            }))
            console.log('allowedPaths:', cleaned)
            return cleaned
        })

        const breadcrumbs = computed(() => {
            const segments = route.path.split('/').filter(Boolean)
            const items = [{ title: 'Home', to: '/' }]
            segments.reduce((path, segment) => {
                const newPath = `${path}/${segment}`
                items.push({
                title: segment.charAt(0).toUpperCase() + segment.slice(1),
                to: newPath
                })
                return newPath
            }, '')
            return items
        })
</script>



<template>
    <v-layout>
        <v-app-bar app color="#fefefe">
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

                    <v-col class="d-none d-md-flex text-right" cols="8">
                        <v-col cols="12">
                            <template v-for="item in allowedPaths" :key="item.path">
                                <v-btn text tag="nuxt-link" :to="item.path">
                                    {{ item.name }}
                                </v-btn>
                            </template>
                            <template v-if="!isAuthenticated">
                                <v-btn text tag="nuxt-link" to="/login">Login</v-btn>
                            </template>
                            <template v-else>
                                <v-btn text @click.prevent="logout">Logout</v-btn>
                            </template>
                            <!-- <v-btn text tag="nuxt-link" to="/registration">Register</v-btn> -->
                            <!-- <v-btn @click="handleModal">Register</v-btn> -->
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
         <v-navigation-drawer v-model="drawer" temporary app color="#fefefe">
            <v-list>
                <template v-for="item in allowedPaths" :key="item.path">
                    <v-list-item link :to="item.path">
                        {{ item.name }}
                    </v-list-item>
                </template>
                <template v-if="!isAuthenticated">
                    <v-list-item link to="/login">Login</v-list-item>
                </template>
                <template v-else>
                    <v-list-item @click.prevent="logout">Logout</v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>
         <v-snackbar
            v-model="showSnackbar"
            :timeout="2000"
            color="#50075e"
            elevation="24"
            location="top right"
            multi-line="true"
        >
            <div>
                <p>Logout Successful</p>
                <p><strong>Thank you for visiting <span style="letter-spacing: 2px;">Cam2Rescue</span></strong></p>
            </div>
        </v-snackbar>
        <v-main>
            <v-container :fluid="true">
                <v-row justify="center" align="center" class="mb-4">
                    <v-row class="align-center justify-center">
                        <v-col cols="auto">
                            <img src="/assets/images/logo3.png" alt="Cam2Rescue Official logo" style="height: 100px;">
                        </v-col>
                        <v-col cols="auto">
                            <h1 class="page-header-text">
                                <span style="color: #50075e">Cam</span>2Rescue
                            </h1>
                            <p>An online platform for pet rescue and shelter</p>
                        </v-col>
                    </v-row>
                </v-row>
                <v-breadcrumbs :items="breadcrumbs" class="mb-4">
                    <template #divider>
                        <v-icon>mdi-chevron-right</v-icon>
                    </template>
                </v-breadcrumbs>
                <NuxtPage />
            </v-container>
        </v-main>
    </v-layout>
</template>

<style scoped>

</style>