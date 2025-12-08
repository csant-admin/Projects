<script setup>
    import { ref, onMounted} from 'vue';
    import axios from 'axios';
    import { useAuthStore, userAuthenticated } from '@/stores/auth';
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import '~/assets/css/main.css';

    const authStore = useAuthStore();
    const router = useRouter();

    definePageMeta({
        layout: "user-default-layout",
        // middleware: 'auth'
    })
    const myAdoptionData = ref([]);
    const loading           = ref(false);
    const isAuthenticated   = ref('')
    const base_url          =  useApiUrl();
    if (process.client) {
        const authenticated = localStorage.getItem('Authenticated');
        isAuthenticated.value = authenticated === 'true'; 
        console.log('Authenticated : ', isAuthenticated);
    }

    const handleAction = async () => {
        const id = JSON.parse(sessionStorage.getItem('user')).UserID
        const url = `${base_url}/api/adoption-request-list?id=${id}`;
        loading.value = true;
        try {
            const response = await axios.get(url);
            if (response.status === 200) {
                myAdoptionData.value = response.data;
            } else {
                console.log('Failed');
            }
        } catch (error) {
            console.error('Error:', error);
            throw error;
        } finally {
            loading.value = false;
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }


    onMounted(() => {
        handleAction()
    })

</script>
<template>
    <v-container fluid class="pa-6">
        <v-row justify="center">
            <v-col cols="12" sm="10" md="8" lg="6">
                <v-card class="adoption-ticket">
                    <div class="ticket-header">
                        <h4 class="font-weight-bold">Adoption Request # 1 - Mayari Animal Rescue Organization (MARO)</h4>
                    </div>
                    <v-divider class="ticket-divider"></v-divider>
                    <v-card-text>
                        <template v-if="Array.isArray(myAdoptionData?.data)">
                            <div v-for="(data, index) in myAdoptionData.data" :key="index">
                                <p v-if="parseInt(data.adoption_id) < 1000" class="ticket-number">Request No: 
                                    <span>{{ String(data.adoption_id).padStart(4, '0') }}</span>
                                </p>

                                <p v-else>Request No: {{ data.adoption_id }} </p>
                                <div class="ticket-content">
                                    <div class="ticket-section">
                                        <h4 class="font-weight-medium">Pet Details</h4>
                                        <p><strong>Name:</strong> {{ data.pet?.[0]?.PetName || 'N/A' }}</p>
                                        <p><strong>Sex:</strong> {{ data.pet?.[0]?.pet_sex?.description || 'Unknown' }}</p>
                                        <p><strong>Color:</strong> {{ data.pet?.[0]?.pet_color?.description || 'Unknown' }}</p>
                                    </div>
                                    <div class="ticket-section">
                                        <h4 class="font-weight-medium">Requestee Information</h4>
                                        <p><strong>Name</strong> {{ data.user_details?.Firstname ?? 'N/A' }} {{ data.user_details?.Lastname ?? '' }}</p>
                                        <p><strong>Date:</strong> {{ formatDate(data.created_at) }}</p>
                                    </div>
                                    <div class="ticket-section">
                                        <h4 class="font-weight-medium">Request Status</h4>
                                        <p><strong>Status:</strong> Pending </p>
                                        <p><strong>Date Reviewed:</strong> {{ formatDate(data.created_at) }}</p>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </v-card-text>
                    <div class="ticket-footer">
                        <!-- <v-btn color="#50075e" class="text-capitalize" elevation="2">
                            View Details
                        </v-btn> -->
                        <!-- <v-btn color="error" class="text-capitalize" elevation="2">
                            Cancel Request
                        </v-btn> -->
                    </div>
                    <div class="ticket-stub"></div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>
    .v-card--variant-elevated {
        box-shadow: unset !important;
    }
    .adoption-ticket {
        background-color: #f8f8f8;
        border-radius: 10px;
        overflow: hidden;
        position: relative;
        border: 2px dashed #000;
    }

    .ticket-header {
        /* background-color: #50075e; */
        color: #000;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .status-chip {
        font-weight: bold;
    }

    .ticket-divider {
        margin: 0;
        border-color: #50075e;
    }

    .ticket-content {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px dashed #000;
    }

    .ticket-number {
        display: flex;
        justify-content: flex-start;
        font-size: 14px;
        color: #000;
        margin-bottom: 5px;
        border-bottom: 1px dashed #000;
    }

    .ticket-number span {
        font-size: 14px;
        font-weight: bold;
        text-decoration: underline;
    }



    .ticket-section {
        flex: 1;
        padding: 5px;
        /* border-right: 1px dashed #000; */

    }

    .ticket-section h4 {
        color: #50075e;
        margin-bottom: 10px;
        /* border-top: 1px dashed #000; */
        border-bottom: 1px dashed #000;
    }

    .ticket-footer {
        background-color: #f0f0f0;
        padding: 10px;
        display: flex;
        justify-content: space-around;
        /* justify-content: space-between; */
    }

    .ticket-stub {
        position: absolute;
        top: 0;
        right: 30px;
        height: 100%;
        width: 2px;
        background-image: linear-gradient(to bottom, #50075e 50%, transparent 50%);
        background-size: 2px 20px;
    }

    *, ::before, ::after {
    background-repeat: unset !important;
    box-sizing: inherit;
}
</style>
