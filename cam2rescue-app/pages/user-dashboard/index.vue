<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar app color="#6A0DAD">
            <v-container fluid>
                <v-row align="center" no-gutters>
                    <v-col class="text-left d-flex d-md-none">
                        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                    </v-col>
                    <v-col class="d-none d-md-flex">
                        <v-toolbar-title>Cam2Rescue</v-toolbar-title>
                    </v-col>

                    <v-col class="d-none d-md-flex text-right" cols="6">
                        <v-col cols="12">
                            <v-btn text tag="nuxt-link" to="/about">About Us</v-btn>
                            <v-btn text tag="nuxt-link" to="/contact">Contact Us</v-btn>
                            <template v-if="!isAuthenticated">
                            <v-btn text tag="nuxt-link" to="/login">Login</v-btn>
                            </template>
                            <template v-else>
                            <v-btn text @click="logout">Logout</v-btn>
                            </template>
                            <v-btn text tag="nuxt-link" to="/registration">Register</v-btn>
                            <v-btn text tag="nuxt-link" to="/adoption-form">Adoption</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary app color="#6A0DAD">
            <v-list>
                <v-list-item link to="/about">About Us</v-list-item>
                <v-list-item link to="/contact">Contact Us</v-list-item>
                <template v-if="!isAuthenticated">
                    <v-list-item link to="/login">Login</v-list-item>
                </template>
                <template v-else>
                    <v-list-item @click="logout">Logout</v-list-item>
                </template>
                <v-list-item link to="/registration">Register</v-list-item>
                <v-list-item link to="/adoption-form">Adoption</v-list-item>
            </v-list>
        </v-navigation-drawer> -->
        <v-snackbar
            v-model="showSnackbar"
            :timeout="2000"
            color="#6A0DAD"
            elevation="24"
            location="top right"
            multi-line="true"
        >
            <div>
                <p>Logout Successful</p>
                <p><strong>Thank you for visiting <span style="letter-spacing: 2px;">Cam2Rescue</span></strong></p>
            </div>
        </v-snackbar>
           
        <!-- Main Content -->
        <v-main>
            <v-container fluid>
                <v-tabs v-model="activeTab" centered background-color="primary" dark>
                    <v-tab v-if="isAuthenticated" v-for="tab in authenticatedTabs" :key="tab.id" :value="tab.id">
                        
                            {{ tab.text }}
                      
                    </v-tab>
                </v-tabs>
            </v-container>
            <v-progress-linear v-if="loading" color="deep-purple-accent-4" indeterminate></v-progress-linear>
            <v-tabs-window v-model="activeTab">
                <v-tabs-window-item value="AdoptionRequest">
                    <v-container fluid>
                        <div class="animated animatedFadeInUp fadeInUp">
                            <v-responsive>
                                <v-data-table
                                    :headers="headers"
                                    :items="userList"
                                    :pagination.sync="pagination"
                                    :loading="loading"
                                    class="elevation-1"
                                >
                                    <template v-slot:item="{ item }">
                                        <tr>
                                            <td>{{ item.Lastname }}</td>
                                            <td>{{ item.Firstname }}</td>
                                            <td>{{ item.Middlename }}</td>
                                            <td>{{ item.Email }}</td>
                                            <td>{{ item.Gender }}</td>
                                            <td>{{ item.Barangay }}</td>
                                            <td>{{ item.City }}</td>
                                            <td>
                                                <div>
                                                    <v-btn color="success" size="small" class="zoom-button"><v-icon>mdi-pencil-box-outline</v-icon></v-btn>
                                                    <v-btn color="error" size="small" class="zoom-button"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                                    <v-btn color="warning" size="small" class="zoom-button"><v-icon>mdi-lock-open-outline</v-icon></v-btn>
                                                </div>
                                            </td>
                                        </tr>
                                    </template>
                                </v-data-table>
                            </v-responsive>
                        </div>
                    </v-container>
                </v-tabs-window-item>

                <v-tabs-window-item value="ForRescue">
                    <v-container fluid>
                        <div class="animated animatedFadeInUp fadeInUp">
                            <v-responsive>
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
                                                        @click.prevent="handleAction(item.RescueId, 1)"
                                                        :disabled="
                                                            parseInt(item.RescueStatusId) === 1 || 
                                                            parseInt(item.RescueStatusId) === 2 || 
                                                            parseInt(item.RescueStatusId) === 3
                                                        "
                                                    >
                                                        <v-icon>mdi-ambulance</v-icon>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="top"
                                                        >
                                                            Confirm Rescue
                                                        </v-tooltip>
                                                    </v-btn>
                                                    <v-btn 
                                                        color="success" 
                                                        size="small"
                                                        class="zoom-button"
                                                        @click.prevent="handleAction(item.RescueId, 2)"
                                                        :disabled="
                                                            parseInt(item.RescueStatusId) === 0 || 
                                                            parseInt(item.RescueStatusId) === 2 || 
                                                            parseInt(item.RescueStatusId) === 3
                                                        "
                                                    >
                                                        <v-icon>mdi-check-bold</v-icon>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="top"
                                                        >
                                                            Rescue was Successful
                                                        </v-tooltip>
                                                    </v-btn>
                                                    <v-btn 
                                                        color="error" 
                                                        size="small"
                                                        class="zoom-button"
                                                        @click.prevent="handleFailedRescue(item.RescueId, 3)"
                                                        :disabled="
                                                            parseInt(item.RescueStatusId) === 0 || 
                                                            parseInt(item.RescueStatusId) === 2 || 
                                                            parseInt(item.RescueStatusId) === 3
                                                        "
                                                    >
                                                        <v-icon>mdi-close-thick</v-icon>
                                                        <v-tooltip
                                                            activator="parent"
                                                            location="top"
                                                        >
                                                            Rescue Operation Failed
                                                        </v-tooltip>
                                                    </v-btn>
                                                    <v-btn 
                                                        color="#6A0DAD" 
                                                        size="small"
                                                        class="zoom-button"
                                                        @click.prevent="generateRescueReport(item.RescueId)"
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
                            </v-responsive>
                        </div>
                    </v-container>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-main>
        <!-- Footer -->
        <v-footer app>
            <v-col class="text-center">
                <span>&copy; 2024 Cam2Rescue. All rights reserved.</span>
            </v-col>
        </v-footer>
        <!-- Modal -->
            <div class="text-center pa-4">
                <v-dialog
                    v-model="failedRescueDialog"
                    transition="dialog-bottom-transition"
                    max-width="600"
                    persistent
                >
            
                <v-card>

                    <v-container class="text-center my-5">
                        <h1 class="page-header-text"><span style="color: #6A0DAD">Cam</span>2Rescue</h1>
                        <p>An online platform for pet rescue and shelter</p>
                    </v-container>
                    <v-container>
                        <form @submit.prevent="handleFailedRecue">
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Rescue ID"
                                        v-model="RescueId"
                                        density="compact"
                                        variant="outlined"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        label="Rescue Status ID"
                                        v-model="RescueStatusId"
                                        density="compact"
                                        variant="outlined"
                                        readonly
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12">
                                    <v-textarea
                                        label="Reason for failed rescue"
                                        v-model="failedReason"
                                        density="compact"
                                        variant="outlined"
                                    >
                                        
                                    </v-textarea>
                                </v-col>
                            </v-row>
                            <v-btn
                                type="submit"
                                color="#6A0DAD"
                            >
                            Submit
                            </v-btn> 
                        </form>
                    </v-container>
                    <template v-slot:actions>
                    <v-spacer></v-spacer>

                    <v-btn 
                        @click="failedRescueDialog = false"
                        color="#6A0DAD"
                        >
                        Close
                    </v-btn>

                    </template>
                </v-card>
                </v-dialog>
            </div>
    </v-app>
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

    const imageFile         = ref(null);
    const imagePreview      = ref(null);
    const userList          = ref([]);
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
    const base_url          =  useApiUrl();
    const ID                = generateUniqueIdb();
    const userID            = ref('');
    const selectedColor     = ref('');
    const selectedBarangay  = ref('');
    const selectedGender    = ref('');
    const selectedInjury    = ref('');
    const selectedUrgency   = ref('');
    const foundStreet       = ref('');
    const foundCity         = ref('');
    const petDescription    = ref('');
    const isAuthenticated   = ref('')
    const activeTab         = ref('Home');
    const showSnackbar      = ref(false);
    const drawer            = ref(false);
    const failedRescueDialog = ref(false);
    const failedReason = ref('');
    const RescueId = ref(null);
    const RescueStatusId = ref(null);
   
    if (process.client) {
        const authenticated = localStorage.getItem('Authenticated');
        isAuthenticated.value = authenticated === 'true'; 
        console.log('Authenticated : ', isAuthenticated);
    }

    const handleTargetSelected = (event) => {
        if (event.target.files.length === 0) {
            imageFile.value = null;
            imagePreview.value = null;
            return;
        }

        imageFile.value = event.target.files[0];

        if (imagePreview.value) {
            URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = URL.createObjectURL(imageFile.value);
    };

    // const handleAction = async (rescueId, rescueStatusId) => {
    //     const url = `${base_url}api/approve-rescue/${rescueId}`;
    //     const formData = new FormData();
    //     formData.append('RescueId', rescueId);
    //     formData.append('RescueStatus', rescueStatusId);
    //     const loggedInUser = sessionStorage.getItem('user');
    //     if (loggedInUser) {
    //         const userObject = JSON.parse(loggedInUser);
    //         formData.append('updated_by', userObject.UserID);
    //     } 
    //     try{
    //         loading.value = true;
    //         const response = await axios.put(url, formData);

    //         if(response) {
    //             console.log('Successfull')
    //         } else {
    //             console.log('Failed');
    //         }
    //     } catch( error ) {
    //         console.error(`Error ${response}:`, error);
    //         loading.value = false;
    //         throw error;
    //     } finally {
    //         loading.value = false;
    //     }

    // }

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

    const handleFailedRescue = (rescueId, rescueStatusId) => {
        RescueId.value = rescueId;              
        RescueStatusId.value = rescueStatusId; 
        console.log(RescueId.value)
        console.log(RescueStatusId.value)
        failedRescueDialog.value = true;

    }

    const handleFailedRecue = async () => {
        const url = `${base_url}api/approve-rescue/${RescueId.value}`;
        const data = {
            RescueStatus: RescueStatusId.value,
            updated_by: JSON.parse(sessionStorage.getItem('user')).UserID,
            FailedReason: failedReason.value
        }
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
            failedRescueDialog.value = false;
        }
    }

    const generateRescueReport = async (rescueId) => {
        console.log('Test');
        try{
            const url = `${base_url}api/generate-rescue-report/${rescueId}`;
            window.open(url, '_blank');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    }

    const postRescue = async () => {
        const data = {
            petId: ID,
            Color: selectedColor.value,
            Gender: selectedGender.value,
            Barangay: selectedBarangay.value,
            Injury: selectedInjury.value,
            Urgency: selectedUrgency.value,
            Street: foundStreet.value,
            City: foundCity.value,
            description: petDescription.value,
            image: imageFile.value,

        }
        await handleAPIRequest(data, 'post-rescue');
    }

    const headers = [
        { title: 'Lastname', key: 'Lastname' },
        { title: 'Firstname', key: 'Firstname'},
        { title: 'Middlename', key: 'Middlename' },
        { title: 'Email', key: 'Email'},
        { title: 'Gender', key: 'Gender'},
        { title: 'Barangay', key: 'Barangay' },
        { title: 'City', key: 'City' },
        { title: 'Action', key: 'Action', sortable: false},
    ];

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

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        try {
            loading.value = true;
            let response;

            switch (apiRequest) {
                case 'user-list':
                    response = await axios.get(`${base_url}api/user-list`);
                    if (response.status >= 200 && response.status < 300) {
                        userList.value = response.data;
                        loading.value = false;
                    }
                    break;

                case 'list-of-pets':
                    response = await axios.get(`${base_url}api/list-of-pets`);
                    if (response.status >= 200 && response.status < 300) {
                        petList.value = response.data;
                        loading.value = false;
                    }
                    break;

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

                case 'post-rescue': 
                    const formData = new FormData();
                    for (const key in data) {
                        formData.append(key, data[key]);
                    }
                    const loggedInUser = sessionStorage.getItem('user');
                    if (loggedInUser) {
                        const userObject = JSON.parse(loggedInUser);
                        const userID = userObject.UserID;
                        formData.append('UserID', userID);
                    } else {
                        console.log('No user data found in sessionStorage.');
                    }
                    console.log('Logged In:', sessionStorage.getItem('loggedIn'));

                    response = await axios.post(`${base_url}api/post-rescue`, formData, {
                        headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                    });
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

    handleAPIRequest({}, 'user-list');

    const tabs = [
        {text: 'Home',              id: 'Home'},
    ];
    
    const authenticatedTabs = [
        {text: 'Donation',          id: 'Donation'},
        {text: 'Adoption Request',  id: 'AdoptionRequest' }, 
        {text: 'For Rescue',        id: 'ForRescue'}
    ]

    const logout = () => {
        loading.value = true;
        authStore.logout(); 
        isAuthenticated.value = false;
        showSnackbar.value = true;
        setTimeout(function(){
            router.push('/login');
        }, 2000)
    };

    onMounted(() => {
        handleAPIRequest({}, 'list-of-pets');
        handleAPIRequest({}, 'get-rescue-list');
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'color-list');
        handleAPIRequest({}, 'injury-list');
        handleAPIRequest({}, 'get-urgency');
    })


</script>

<style>
.v-tab--selected {
    color: #6A0DAD !important;
    border-bottom: 2px solid #6A0DAD !important;
    font-weight: bold !important;
}
.banner-image {
    position: relative;
}

.v-tabs-bar__content {
  transition: transform 6s ease-in-out !important;
}

.v-tabs-slider-wrapper {
  transition: transform 6s ease-in-out !important;
}

/* Change border color of the outlined text field when focused */
.v-autocomplete__selection {
    border-width: 2px !important;
    color: #6A0DAD !important;
}

.v-field--active {
    border-color: #6A0DAD !important; 
    border-width: 2px !important; 

}

.v-field--active {
    color: #6A0DAD !important;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}

.action-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  z-index: 10;
  transition: opacity 0.3s ease;
}

</style>