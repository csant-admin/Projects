<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import '~/assets/css/main.css';
    import { useAuthStore, userAuthenticated } from '@/stores/auth';
    import Registration from '@/components/reusables/registration/Registration.vue';
    const authStore = useAuthStore();

    const userList          = ref([]);
    const loading           = ref(true);
    const pagination        = ref({ page: 1, itemsPerPage: 10 });
    const base_url          =  useApiUrl();
    const showSnackbar      = ref(false);
    const isError           = ref(false);
    const message           = ref('');
    const showModal         = ref(false);

    definePageMeta({
        layout: "default-layout",
        middleware: 'auth'
    });

    const handleModal = () => {
        showModal.value = true;
    }

    const handleCloseModal = () => {
       showModal.value = false;
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

    const handleStatus = async (id) => {
        await  handleAPIRequest(id, 'update-user-status');
    }

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        loading.value = true;
        try {
            let response;

            switch (apiRequest) {
                case 'user-list':
                    response = await axios.get(`${base_url}api/user-list`);
                    if (response.status >= 200 && response.status < 300) {
                        userList.value = response.data;
                        loading.value = false;
                    }
                    break;

                case 'update-user-status': 
                    response = await axios.put(`${base_url}api/update-user-status/${data}`);
                    if(response) {
                        message.value = response.message || 'Updated Successfully';
                        loading.value = false;
                    } else {
                        message.value = response.message || 'Failed to change user status, call Cam2Rescue team';
                        loading.value = false;
                    }
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

    const loadUserList = async () => {
       await handleAPIRequest({}, 'user-list');
    }

    onMounted(() => {
        const loggedInUser = sessionStorage.getItem('user');
            if (loggedInUser) {
                const userObject = JSON.parse(loggedInUser);
                console.log('User Object : ', userObject);
                // userID.value = userObject.UserID;
            }
        handleAPIRequest({}, 'user-list');
    })

</script>

<template>
    <div class="animated animatedFadeInUp fadeInUp">
        <v-row class="pa-4">
            <h3>User List <v-icon color="#6A0DAD" medium @click="loadUserList">mdi-reload</v-icon></h3>
            <v-spacer></v-spacer>
            <v-btn 
                color="#6A0DAD" 
                type="button"
                @click="handleModal";
            ><v-icon>mdi-plus</v-icon>Add User</v-btn>
        </v-row>
    </div>
    <v-progress-linear
        v-if="loading"
        color="yellow-darken-2"
        indeterminate
    ></v-progress-linear>
    <div class="animated animatedFadeInUp fadeInUp">
        <v-data-table
            :headers="headers"
            :items="userList"
            :pagination.sync="pagination"
            :loading="loading"
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
                            <v-btn 
                                color="#6A0DAD" 
                                size="small" 
                                class="zoom-button">
                                <v-icon>
                                    mdi-pencil-box-outline
                                </v-icon>
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                    color="#6A0DAD"
                                >Edit</v-tooltip>
                            </v-btn>
                            <v-btn color="error" size="small" class="zoom-button"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                            <v-btn color="warning" size="small" class="zoom-button" @click.prevent="handleStatus(item.UserID)"><v-icon>mdi-lock-open-outline</v-icon></v-btn>
                        </div>
                    </td>
                </tr>
            </template>
        </v-data-table>
        <v-snackbar
            v-model="showSnackbar"
            :timeout="2000"
            color="#107dac"
            elevation="24"
            location="top right"
            multi-line="true"
            >
            <div v-if="!isError">
                <p><strong>{{ message }}</strong></p>
            </div>
            <div v-else>
                <p><strong>ERROR! </strong>{{ message }}</p>
            </div>
        </v-snackbar>
    </div>
    <registration :show="showModal" @load-user="loadUserList" @close-modal="handleCloseModal" />
</template>

