<template>
    <v-container fluid>
        <h1>Home Page</h1>
            <div class="animated-content">
                <v-row>
                    <template v-for="(pet, index) in petList" :key="index">
                        <v-hover v-slot:default="{ isHovering, props }">
                            <v-col cols="12" sm="6" md="3" lg="2">
                                <v-col cols="12">
                                    <v-card
                                        class="mx-auto"
                                        color="grey-lighten-4"
                                        max-width="600"
                                        v-bind="props"
                                    >
                                        <v-img
                                            :src="`${base_url}storage/${pet.ImagePath}`"
                                            :alt="pet.PetName"
                                            cover
                                            class="pet-image"
                                        >
                                            <v-expand-transition>
                                                <div
                                                    v-if="isHovering"
                                                    class="d-flex transition-fast-in-fast-out v-card--reveal text-h2"
                                                    style="height: 25%; background-color: #FFF !important;"
                                                >
                                                    <div
                                                        class="action-buttons"
                                                    >
                                                    <v-btn 
                                                        link to="/adopt" 
                                                        color="#6A0DAD" 
                                                        size="large" 
                                                        class="zoom-button"
                                                        @click.prevent="handleRequest(pet.PetID)"
                                                    >
                                                        Adopt
                                                    </v-btn>

                                                        <v-btn 
                                                            color="#6A0DAD" 
                                                            size="large" 
                                                            class="zoom-button"
                                                        >
                                                            View
                                                        </v-btn>
                                                    </div>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                        <v-card-text class="pt-6">
                                            <h4 class="text-h4 font-weight-light mb-2" style="color: #6A0DAD">
                                                {{ pet.PetName }}
                                            </h4>

                                            <div class="font-weight-light text-h6 mb-2">
                                                {{ pet.PetDescription }}
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </v-col>
                            </v-col>
                        </v-hover>
                    </template>
                </v-row>
            </div>
    </v-container>
</template>

<script setup>
        import { ref, onMounted} from 'vue';
        import axios from 'axios';
        import { useAuthStore, userAuthenticated } from '@/stores/auth';
        import { generateUniqueIdb } from '~/assets/js/IDCenter';
        import '~/assets/css/main.css';

        definePageMeta({
            middleware: 'auth'
        })

        const authStore = useAuthStore();
        const router = useRouter();
        const petList  = ref([]);
        const isAuthenticated   = ref('')
        const loading = ref(false);
        const base_url          =  useApiUrl();
        const ID                = generateUniqueIdb();
        const gender            = ref([]);
        const barangay          = ref([]);
        const color             = ref([]);
        const injuryList        = ref([]);
        const urgency           = ref([]);
        if (process.client) {
            const authenticated = localStorage.getItem('Authenticated');
            isAuthenticated.value = authenticated === 'true'; 
            console.log('Authenticated : ', isAuthenticated);
        }

    const handleRequest = (id) => {
       localStorage.setItem('PetId', id);
    }

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        try {
            loading.value = true;
            let response;

            switch (apiRequest) {
                case 'list-of-pets':
                    response = await axios.get(`${base_url}api/list-of-pets`);
                    if (response.status >= 200 && response.status < 300) {
                        petList.value = response.data;
                        loading.value = false;
                        console.log(petList.value);
                    }
                    break;
                    
                case 'get-gender':
                    response = await axios.get(`${base_url}api/get-gender`);
                    gender.value = response.data;
                    loading.value = false;
                    break;

                case 'barangay-list':
                    response = await axios.get(`${base_url}api/barangay-list`);
                    barangay.value = response.data;
                    loading.value = false;
                    break;

                case 'color-list':
                    response = await axios.get(`${base_url}api/color-list`);
                    color.value = response.data;
                    loading.value = false;
                    break;

                case 'injury-list':
                    response = await axios.get(`${base_url}api/injury-list`);
                    injuryList.value = response.data;
                    loading.value = false;
                    break;

                case 'get-urgency':
                    response = await axios.get(`${base_url}api/get-urgency`);
                    urgency.value = response.data;
                    loading.value = false;
                    break;

                default:
                    throw new Error('Invalid API request');
            }

            return response.data;
        } catch (error) {
            console.error(`Error ${apiRequest}:`, error);
            loading.value = false;
            throw error;
        } finally {
            loading.value = false;
        }
    };

    onMounted(() => {
        handleAPIRequest({}, 'list-of-pets');
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'color-list');
        handleAPIRequest({}, 'injury-list');
        handleAPIRequest({}, 'get-urgency');
    })
</script>