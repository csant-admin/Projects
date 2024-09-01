<template>
   <div class="page-label animated-page-header">
            <h3>List of Posted Rescues</h3>
    </div>
    <v-container fluid>
                        <div class="animated animatedFadeInUp fadeInUp">
                            <v-data-table
                                :headers="RescueHeaders"
                                :items="rescueData"
                                :pagination.sync="pagination"
                                :loading="loading"
                                class="elevation-1"
                            >
                                <template v-slot:item="{ item }">
                                    <tr>
                                        <td>{{ item.Address }}</td>
                                        <td>{{ item.PetColorId }}</td>
                                        <td>{{ item.PetSexId }}</td>
                                        <td>{{ item.ImportantNote }}</td>
                                        <td>{{ item.Description }}</td>
                                        <td>{{ item.created_by }}</td>
                                        <td>{{ item.created_at }}</td>
                                        <td>{{ item.updated_by }}</td>
                                        <td>{{ item.RescueStatus }}</td>
                                        <td>
                                            <div>
                                                <v-btn 
                                                    color="#6A0DAD" 
                                                    size="small"
                                                    class="zoom-button"
                                                >
                                                    <v-icon> mdi-pencil-box-outline</v-icon>
                                                    <v-tooltip
                                                        activator="parent"
                                                        location="top"
                                                    >
                                                        Update Rescue Details
                                                    </v-tooltip>

                                                </v-btn>
                                                <v-btn 
                                                    color="error" 
                                                    size="small"
                                                    class="zoom-button"
                                                >
                                                    <v-icon>mdi-trash-can-outline</v-icon>
                                                    <v-tooltip
                                                        activator="parent"
                                                        location="top"
                                                    >
                                                        Delete From List
                                                    </v-tooltip>

                                                </v-btn>
                                                <v-btn 
                                                    color="#6A0DAD" 
                                                    size="small"
                                                    class="zoom-button"
                                                >
                                                    <v-icon>mdi-printer</v-icon>
                                                    <v-tooltip
                                                        activator="parent"
                                                        location="top"
                                                    >
                                                        Print Rescue Details
                                                    </v-tooltip>

                                                </v-btn>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
                        </div>
                    </v-container>

</template>

<script setup>
     import { ref, onMounted} from 'vue';
    import axios from 'axios';
    import { useAuthStore, userAuthenticated } from '@/stores/auth';
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import '~/assets/css/main.css';

    const authStore = useAuthStore();
    const router = useRouter();

    definePageMeta({
        layout: "default-layout"
    })

    const petList           = ref([]);
    const loading           = ref(false);
    const pagination        = ref({ page: 1, itemsPerPage: 10 });
    const rowsPerPageItems  = [4, 8, 12 ]
    const gender            = ref([]);
    const barangay          = ref([]);
    const color             = ref([]);
    const injuryList        = ref([]);
    const urgency           = ref([]);
    const rescueData        = ref([]);
    const isAuthenticated   = ref('')
    const base_url          =  useApiUrl();
    console.log(base_url);
    if (process.client) {
        const authenticated = localStorage.getItem('Authenticated');
        isAuthenticated.value = authenticated === 'true'; 
        console.log('Authenticated : ', isAuthenticated);
    }


    const RescueHeaders = [
        { title: 'Full Address', key: 'Address' },
        { title: 'PetColor', key: 'PetColorId'},
        { title: 'PetSex', key: 'PetSexId'},
        { title: 'Important Note', key: 'ImportantNote'},
        { title: 'Description', key: 'Description' },
        { title: 'Posted By', key: 'created_by' },
        { title: 'Date & Time Posted', key: 'created_at' },
        { title: 'Approved By', key: 'updated_by' },
        { title: 'Rescue Status', key:'RescueStatus'},
        { title: 'Action', key: 'Action', sortable: false},
    ];

    const handleAction = async (rescueId, rescueStatusId) => {
        const url = `${base_url}api/approve-rescue/${rescueId}`;
        const data = {
            RescueStatus: rescueStatusId,
            updated_by: JSON.parse(sessionStorage.getItem('user')).UserID
        };

        try {
            loading.value = true;
            const response = await axios.put(url, data);

            if (response.status === 200) {
                console.log('Successful');
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

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        try {
            loading.value = true;
            let response;

            switch (apiRequest) {
                case 'get-rescue-list': 
                    response = await axios.get(`${base_url}api/get-rescue-list`);
                    if(response.status >= 200 && response.status < 300) {
                        rescueData.value = response.data;
                        console.log('Rescue List : ', rescueData)
                        loading.value = false;
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
        handleAPIRequest({}, 'get-rescue-list');
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'color-list');
        handleAPIRequest({}, 'injury-list');
        handleAPIRequest({}, 'get-urgency');
    })

</script>