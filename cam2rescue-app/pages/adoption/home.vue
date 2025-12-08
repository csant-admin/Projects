<template>
    <v-container fluid class="animated animatedFadeInUp fadeInUp">
            <h1 class="tag-line-banner">
               “Don’t ask if you have space in your home. Ask if you have space in your heart.”
            </h1>
            <div class="animated-content">
                <v-row class="d-flex justify-center">
                    <template v-for="(pet, index) in petList" :key="index">
                        <v-hover v-slot:default="{ isHovering, props }">
                            <v-col cols="12" sm="6" md="4" lg="3" xl="2">
                                <v-card
                                    class="mx-auto pet-card d-flex flex-column animated animatedFadeInUp fadeInUp"
                                    elevation="2"
                                    height="100%"
                                    v-bind="props"
                                >
                                    <div class="pet-image-container">
                                        <v-img
                                            :src="`${base_url}/storage/${pet.ImagePath}`"
                                            :alt="pet.PetName"
                                            height="200"
                                            cover
                                            class="pet-image"
                                        >
                                            <template v-slot:placeholder>
                                                <v-row class="fill-height ma-0" align="center" justify="center">
                                                    <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
                                                </v-row>
                                            </template>
                                            <v-expand-transition>
                                                <div
                                                    v-if="isHovering"
                                                    class="hover-overlay d-flex flex-column align-center justify-center"
                                                >
                                                    <v-btn
                                                        link
                                                        to="/adopt"
                                                        color="#6A0DAD"
                                                        class="text-capitalize mb-2"
                                                        variant="elevated"
                                                        @click.prevent="handleRequest(pet.PetID)"
                                                    >
                                                        Adopt
                                                    </v-btn>
                                                    <v-btn
                                                        color="#6A0DAD"
                                                        class="text-capitalize"
                                                        variant="outlined"
                                                    >
                                                        View Details
                                                    </v-btn>
                                                </div>
                                            </v-expand-transition>
                                        </v-img>
                                    </div>

                                    <v-card-text class="text-center d-flex flex-column justify-space-between flex-grow-1">
                                        <div>
                                            <h3 class="text-h5 font-weight-bold mb-2">
                                                {{ pet.PetName }}
                                            </h3>
                                            <p class="pet-description mb-2">
                                                {{ truncateDescription(pet.PetDescription) }}
                                                <span
                                                    v-if="pet.PetDescription.split(' ').length > 10"
                                                    class="see-more font-weight-medium"
                                                    @click="toggleDescription(pet)"
                                                >
                                                    {{ pet.showFullDescription ? "See Less" : "See More" }}
                                                </span>
                                            </p>
                                        </div>
                                        <v-chip
                                            class="ma-2 align-self-center"
                                            color="#6A0DAD"
                                            text-color="white"
                                            size="small"
                                        >
                                            {{ pet.PetType }}
                                        </v-chip>
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
        import { useAuthStore } from '@/stores/auth';
        import '~/assets/css/main.css';

        definePageMeta({
            layout: 'user-default-layout',
        })

        const authStore = useAuthStore();
        const router = useRouter();
        const petList  = ref([]);
        const isAuthenticated   = ref('')
        const loading = ref(false);
        const base_url          =  useApiUrl();
        const gender            = ref([]);
        const barangay          = ref([]);
        const color             = ref([]);
        const injuryList        = ref([]);
        const urgency           = ref([]);
        if (process.client) {
            const authenticated = localStorage.getItem('Authenticated');
            isAuthenticated.value = authenticated === 'true'; 
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
   .pet-card {
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.pet-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1) !important;
}

.pet-image-container {
    height: 200px;
    overflow: hidden;
}

.pet-image {
    object-fit: cover;
    object-position: center top;
}

.hover-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.v-card:hover .hover-overlay {
    opacity: 1;
}

.see-more {
    color: #6A0DAD;
    cursor: pointer;
    text-decoration: underline;
}

.pet-description {
    color: rgba(0, 0, 0, 0.6);
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.tag-line-banner {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    color: #6A0DAD;
    padding: 20px;
}
</style>