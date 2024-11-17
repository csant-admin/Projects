<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import '~/assets/css/main.css';

    const userList          = ref([]);
    const loading           = ref(true);
    const pagination        = ref({ page: 1, itemsPerPage: 10 });
    const base_url          =  useApiUrl();
    const value             = ref(0)
    const interval          = ref(null)
    const showSnackbar      = ref(false);
    const isError           = ref(false);
    const message           = ref('');

    definePageMeta({
        layout: "default-layout",
        middleware: 'auth'
    });

    const startLoader = () => {
        clearInterval(interval.value);
        value.value = 0;
        interval.value = setInterval(() => {
            if (value.value === 100) {
                value.value = 0 
            } else {
                value.value += 10
            }
        }, 1000)
    }

    const stopLoader = () => {
        clearInterval(interval.value);
        value.value = 0; 
    };

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
        startLoader();
        try {
            let response;

            switch (apiRequest) {
                case 'user-list':
                    response = await axios.get(`${base_url}api/user-list`);
                    if (response.status >= 200 && response.status < 300) {
                        userList.value = response.data;
                        loading.value = false;
                        stopLoader();
                    }
                    break;

                case 'update-user-status': 
                    console.log('Sending request');
                    response = await axios.put(`${base_url}api/update-user-status/${data}`);
                    if(response) {
                        message.value = response.message || 'Updated Successfully';
                        loading.value = false;
                        startLoader();
                    } else {
                        message.value = response.message || 'Failed to change user status, call Cam2Rescue team';
                        loading.value = false;
                        startLoader();
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
            stopLoader();
        }
    };

    onMounted(() => {
        handleAPIRequest({}, 'user-list');
    })

</script>

<template>
    <div class="page-label animated-page-header">
        <h3>User List</h3>
    </div>
    <div class="animated-content">
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
        <div v-if="loading">
            <div class="text-center">
                <v-progress-circular :model-value="value" :rotate="360" :size="100" :width="15" color="#107bac">
                    <template v-slot:default> {{ value }} % </template>
                </v-progress-circular><br/>
                Checking Eligibility for May Go Home...
            </div>
        </div>
    </div>

</template>

