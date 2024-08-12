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
                    <v-btn text tag="nuxt-link" to="/about">About Us</v-btn>
                    <v-btn text tag="nuxt-link" to="/contact">Contact Us</v-btn>
                    <v-btn text tag="nuxt-link" to="/login">Login</v-btn>
                </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <!-- Main Content -->
        <v-main>
            <!-- Header -->
            <v-container class="text-center my-5">
                <h1 class="page-header-text"><span style="color: #6A0DAD">Cam</span>2Rescue</h1>
                <p>An online platform for pet rescue and shelter</p>
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
                                If you believe that animals need help as much as humans do, we, the cam2rescue team encourage you to support and donate to organizations located in Cebu. Cam2Rescue is a place where we prioritize the helpless strays. With our partnered organizations, they are always called upon to rescue animals suffering from abandonment, abuse, injury or neglect and none of it is possible without your support. Donations may be used to help cover the costs of daily operations, supplies, staff training, animal housing upgrades, community outreach programs, animal enrichment and much more.
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
                
                <v-tabs-window-item value="PostRescue">
                    <v-container>
                        <div class="page-label animated-page-header">
                            <h3>Create Post</h3>
                        </div>
                        <div class="animated animatedFadeInUp fadeInUp">
                            <form  @submit.prevent="postRescue">
                                <v-row>
                                    <v-col cols="6">
                                        <v-autocomplete 
                                            v-model="selectedColor" 
                                            label="Pet Color" 
                                            variant="outlined" 
                                            :items="color"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete 
                                            v-model="selectedGender" 
                                            label="Pet Gender" 
                                            variant="outlined" 
                                            :items="gender"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-autocomplete 
                                            v-model="selectedInjury" 
                                            label="Injury List" 
                                            variant="outlined" 
                                            :items="injuryList"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="6">
                                        <v-autocomplete 
                                            v-model="selectedUrgency" 
                                            label="Urgency" 
                                            variant="outlined" 
                                            :items="urgency"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="4">
                                        <v-text-field 
                                            v-model="foundStreet" 
                                            label="St./Blg/Zone" 
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-autocomplete 
                                            v-model="selectedBarangay" 
                                            label="Barangay" 
                                            variant="outlined" 
                                            :items="barangay"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-text-field 
                                            v-model="foundCity" 
                                            label="City/Municipality" 
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12">
                                        <v-textarea 
                                        label="Description" 
                                        v-model="petDescription" 
                                        name="input-7-1" 
                                        variant="outlined" 
                                        auto-grow
                                    ></v-textarea>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-text-field 
                                            label="Upload Images" 
                                            variant="outlined" 
                                            type="file" 
                                            multiple
                                            @change="handleTargetSelected"
                                        >
                                        </v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="6">
                                        <v-btn color="#6A0DAD" type="submit">Post a Rescue</v-btn>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <img 
                                        v-if="imagePreview" 
                                        :src="imagePreview" 
                                        alt="Image Preview" 
                                        style="max-width: 400px; height: auto;" class="mt-3"
                                    />
                                </v-row>
                            </form>
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
    import { createRouter, createWebHistory } from 'vue-router'
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import '~/assets/css/main.css';

    const imageFile         = ref(null);
    const imagePreview      = ref(null);
    const userList          = ref([]);
    const petList           = ref([]);
    const loading           = ref(true);
    const pagination        = ref({ page: 1, itemsPerPage: 10 });
    const rowsPerPageItems  = [4, 8, 12 ]
    const gender            = ref([]);
    const barangay          = ref([]);
    const color             = ref([]);
    const injuryList        = ref([]);
    const urgency           = ref([]);
    const base_url          =  useApiUrl();
    const ID                = generateUniqueIdb();
    const userID            = ref('');
    const activeTab         = ref(0);
    const selectedColor = ref('');
    const selectedBarangay = ref('');
    const selectedGender = ref('');
    const selectedInjury = ref('');
    const selectedUrgency = ref('');
    const foundStreet = ref('');
    const foundCity = ref('');
    const petDescription = ref('');

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


    const  routes = [
        { text: "Home", id: "Home" },
        { text: "About Us", id: "AboutUs" },
        { text: "Contact Us", id: "ContactUs" },
        { text: "Services", id: "Services" },
        { text: "The Team", id: "Team" }
    ];


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
.v-field--active {
    border-color: #6A0DAD !important; 
    border-width: 2px !important; 

}

.v-field--active {
    color: #6A0DAD !important;
}
</style>