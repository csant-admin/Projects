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
                                <v-btn color="warning" size="small" class="zoom-button"><v-icon>mdi-lock-open-outline</v-icon></v-btn>
                            </div>
                        </td>
                    </tr>
                </template>
            </v-data-table>
        </div>

</template>

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import '~/assets/css/main.css';

    const userList = ref([]);
    const loading = ref(true);
    const pagination = ref({ page: 1, itemsPerPage: 10 });
    const base_url =  useApiUrl();

    definePageMeta({
        layout: "default-layout"
    });

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

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
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

                case 'list-of-pets':
                    response = await axios.get(`${base_url}api/list-of-pets`);
                    break;

                default:
                    throw new Error('Invalid API request');
            }

            return response.data;
        } catch (error) {
            console.error(`Error ${apiRequest}:`, error);
            loading.value = false;
            throw error;
        }
    };

    handleAPIRequest({}, 'user-list');
</script>
