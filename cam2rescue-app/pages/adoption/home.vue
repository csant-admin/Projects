<template>
    <v-container fluid>
        <v-container class="text-center">
                <v-row class="align-center justify-center">
                    <v-col cols="auto">
                        <img src="/assets/images/logo3.png" alt="Cam2Rescue Official logo" style="height: 100px;">
                    </v-col>
                    <v-col cols="auto">
                        <h1 class="page-header-text">
                            <span style="color: #6A0DAD">Cam</span>2Rescue
                        </h1>
                        <p>An online platform for pet rescue and shelter</p>
                    </v-col>
                </v-row>
            </v-container>
            <div class="animated-content">
                <v-row class="d-flex justify-center">
                    <template v-for="(pet, index) in petList" :key="index">
                        <v-hover v-slot:default="{ isHovering, props }">
                        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                            <v-card
                            class="mx-auto pet-card"
                            color="grey-lighten-4"
                            v-bind="props"
                            >
                            <!-- Pet Image -->
                            <v-img
                                :src="`${base_url}/storage/${pet.ImagePath}`"
                                :alt="pet.PetName"
                                cover
                                position="center center"
                                class="pet-image"
                            >
                                <v-expand-transition>
                                    <div
                                        v-if="isHovering"
                                        class="hover-overlay d-flex flex-column align-center justify-center"
                                    >
                                        <v-btn
                                            link to="/adopt"
                                            color="#6A0DAD"
                                            class="zoom-button mb-2"
                                            @click.prevent="handleRequest(pet.PetID)"
                                        >
                                            Adopt
                                        </v-btn>
                                        <v-btn color="#6A0DAD" class="zoom-button">
                                            View
                                        </v-btn>
                                    </div>
                                </v-expand-transition>
                            </v-img>


                            <!-- Pet Details -->
                            <v-card-text class="text-center">
                                <h4 class="pet-name text-h5 font-weight-bold mb-2">
                                {{ pet.PetName }}
                                </h4>

                                <p class="pet-description">
                                {{ truncateDescription(pet.PetDescription) }}
                                <span
                                    v-if="pet.PetDescription.split(' ').length > 10"
                                    class="see-more"
                                    @click="toggleDescription(pet)"
                                >
                                    {{ pet.showFullDescription ? "See Less" : "See More" }}
                                </span>
                                </p>
                            </v-card-text>
                            </v-card>
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
                    response = await axios.get(`${base_url}/api/list-of-pets`);
                    if (response.status >= 200 && response.status < 300) {
                        petList.value = response.data;
                        loading.value = false;
                        console.log(petList.value);
                    }
                    break;
                    
                case 'get-gender':
                    response = await axios.get(`${base_url}/api/get-gender`);
                    gender.value = response.data;
                    loading.value = false;
                    break;

                case 'barangay-list':
                    response = await axios.get(`${base_url}/api/barangay-list`);
                    barangay.value = response.data;
                    loading.value = false;
                    break;

                case 'color-list':
                    response = await axios.get(`${base_url}/api/color-list`);
                    color.value = response.data;
                    loading.value = false;
                    break;

                case 'injury-list':
                    response = await axios.get(`${base_url}/api/injury-list`);
                    injuryList.value = response.data;
                    loading.value = false;
                    break;

                case 'get-urgency':
                    response = await axios.get(`${base_url}/api/get-urgency`);
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

    const truncateDescription = (desc) => {
    const words = desc.split(" ");
    return words.length > 10 ? words.slice(0, 10).join(" ") + "..." : desc;
    };

    const toggleDescription = (pet) => {
    pet.showFullDescription = !pet.showFullDescription;
    pet.PetDescription = pet.showFullDescription
        ? pet.originalDescription
        : truncateDescription(pet.originalDescription);
    };

    petList.value.forEach((pet) => {
        pet.originalDescription = pet.PetDescription;
        pet.showFullDescription = false;
    });


    onMounted(() => {
        handleAPIRequest({}, 'list-of-pets');
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'color-list');
        handleAPIRequest({}, 'injury-list');
        handleAPIRequest({}, 'get-urgency');
    })
</script>
<style scoped>
    .hover-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255, 255, 255, 0.6);
    }

</style>