<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar app color="#673AB7">
            <v-container>
                <v-row align="center">
                <v-col class="text-left">
                    <v-toolbar-title>Cam2Rescue</v-toolbar-title>
                </v-col>
                <v-col class="text-right">
                    <v-btn text>About Us</v-btn>
                    <v-btn text>Contact Us</v-btn>
                    <v-btn text>Login</v-btn>
                </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <!-- Main Content -->
        <v-main>
            <!-- Header -->
            <v-container class="text-center my-5">
                <h1 class="display-1">Cam2Rescue</h1>
            </v-container>

            <v-container fluid>
                <v-tabs v-model="activeTab" centered background-color="primary" dark>
                    <v-tab v-for="tab in tabs" :key="tab.id" :value="tab.id">{{ tab.text }}</v-tab>
                </v-tabs>
            </v-container>

            <v-tabs-window v-model="activeTab">
                <v-tabs-window-item value="Home">
                    <v-container fluid class="animated-content">
                        <v-img src="../assets/images/cam2rescue-banner.jpg" height="800"  class="banner-image">
                            <v-row class="fill-height" align="center" justify="center">
                                <v-col class="text-center">
                                    <!-- <v-btn large color="primary" class="mx-3">Adopt</v-btn>
                                    <v-btn large color="secondary" class="mx-3">Post Rescue</v-btn> -->
                                </v-col>
                            </v-row>
                        </v-img>
                        <v-card class="mt-4">
                            <p class="text-justify pa-4 home-p">
                                If you believe that animals need help as much as humans do, I encourage you to support and donate to organizations located in Cebu. Cam2Rescue is a place where we prioritize the helpless strays. With our partnered organizations, they are always called upon to rescue animals suffering from abandonment, abuse, injury or neglect and none of it is possible without your support. Donations may be used to help cover the costs of daily operations, supplies, staff training, animal housing upgrades, community outreach programs, animal enrichment and much more.
                            </p>
                        </v-card>
                    </v-container>
                </v-tabs-window-item>

                <v-tabs-window-item value="AdoptPet">
                    <v-container fluid>
                        <div class="animated-content">
                            <v-row>
                                <template v-for="(pet, index) in petList" :key="index">
                                    <v-col cols="3">
                                        <v-card>
                                            <v-img :src="`${base_url}storage/${pet.ImagePath}`" :alt="pet.PetName" height="500"></v-img>
                                            <v-card-title primary-title class="text-center">
                                                <div>
                                                    <h3 class="headline mb-0">{{ pet.PetName }}</h3>
                                                </div>
                                            </v-card-title>
                                            <v-card-actions>
                                                <v-btn color="info">Adopt</v-btn>
                                                <v-btn color="primary">View</v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-col>
                                </template>
                            </v-row>
                        </div>
                    </v-container>
                </v-tabs-window-item>
          
                <v-tabs-window-item value="AdoptionRequest">
                    <v-container fluid>
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
                                                <v-btn color="success" size="small"><v-icon>mdi-pencil-box-outline</v-icon></v-btn>
                                                <v-btn color="error" size="small"><v-icon>mdi-trash-can-outline</v-icon></v-btn>
                                                <v-btn color="warning" size="small"><v-icon>mdi-lock-open-outline</v-icon></v-btn>
                                            </div>
                                        </td>
                                    </tr>
                                </template>
                            </v-data-table>
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
    </v-app>
</template>

<script setup>
    import { ref, onMounted} from 'vue';
    import axios from 'axios';
    import '~/assets/css/main.css';

    const userList = ref([]);
    const petList = ref([]);
    const loading = ref(true);
    const pagination = ref({ page: 1, itemsPerPage: 10 });
    const rowsPerPageItems = [4, 8, 12 ]
    const base_url =  useApiUrl();
    const activeTab = ref(0);

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
                    if (response.status >= 200 && response.status < 300) {
                        petList.value = response.data;
                        console.log(petList);
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
        }
    };

    handleAPIRequest({}, 'user-list');

    const tabs = [
        {text: 'Home',              id: 'Home'},
        {text: 'Adopt Pet',         id: 'AdoptPet'},
        {text: 'Post Rescue',       id: 'PostRescue'},
        {text: 'Donation',          id: 'Donation'},
        {text: 'Adoption Request',  id: 'AdoptionRequest' }, 
        {text: 'For Rescue',        id: 'ForRescue'}
    ];

    const links = [
        {text: "Home",          id: "Home"},
        {text: "Abount Us",     id: "AbountUs"},
        {text: "Contact Us",    id: "ContactUs"},
        {text: "Services",      id: "Services"},
        {text: "The Team",      id: "Team"}
    ]

    onMounted(() => {
        handleAPIRequest({}, 'list-of-pets');
    })

</script>

<style>
.v-tab--selected {
    color: #673AB7 !important;
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
</style>