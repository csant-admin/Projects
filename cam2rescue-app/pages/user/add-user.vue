<template>
    <v-container>
        <div class="page-label animated-page-header">
            <h3>Add User</h3>
        </div>
        <div class="animated animatedFadeInUp fadeInUp">
            <form @submit.prevent="addUser">
                <v-progress-linear
                    v-if="loading"
                    color="deep-purple-accent-4"
                    indeterminate
                ></v-progress-linear>
                <v-row>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="Lastname" 
                            label="Last Name" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="Firstname" 
                            label="First Name" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="Middlename" 
                            label="Middle Name" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="dob" 
                            label="Date of Birth" 
                            type="date" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete 
                            v-model="Gender" 
                            label="Gender" 
                            variant="outlined" 
                            :items="gender_data"
                            item-title="description" 
                            item-value="id" 
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete 
                            v-model="Status" 
                            label="Status" 
                            variant="outlined" 
                            :items="statuses"
                            item-title="description" 
                            item-value="id" 
                        ></v-autocomplete>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="4">
                        <v-autocomplete 
                            v-model="Barangay" 
                            label="Barangay" 
                            variant="outlined" 
                            :items="barangay_data"
                            item-title="description" 
                            item-value="id" 
                        ></v-autocomplete>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="City" 
                            label="City" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="Email" 
                            label="Email" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="">
                        <v-text-field 
                            v-model="Username" 
                            label="Username" 
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="Password" 
                            label="Password" 
                            variant="outlined" 
                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                            @click:append-inner="toggleVisibility"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field 
                            v-model="ConfirmPassword" 
                            label="Confirm Password" 
                            variant="outlined" 
                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                            @click:append-inner="toggleVisibility"
                        ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="6">
                        <v-btn 
                            color="#6A0DAD" 
                            type="submit"
                        ><v-icon>mdi-plus</v-icon> Add User</v-btn>
                    </v-col>
                </v-row>
            </form>
        </div>
    </v-container>
</template>

<script setup>
    import {ref} from 'vue';
    import axios from 'axios';
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import { logEvent } from '~/assets/js/LoggingService';
    definePageMeta({
        layout: "default-layout"
    });

    const Lastname = ref('');
    const Firstname = ref('');
    const Middlename = ref('');
    const dob = ref('');
    const Gender = ref('');
    const Status = ref('');
    const Barangay = ref('');
    const City = ref('');
    const Email = ref('');
    const Username = ref('');
    const Password = ref('');
    const ConfirmPassword = ref('');
    const gender_data = ref([]);
    const barangay_data = ref([]);
    const statuses = ref([]);
    const base_url = useApiUrl();
    const ID = generateUniqueIdb();
    const visible = ref(false);
    const loading = ref(false);

    const toggleVisibility = () => {
        visible.value = !visible.value;
    };
    
    const initialFormState = {
        Lastname: '',
        Firstname: '',
        Middlename: '',
        dob: '',
        Gender: '',
        Status: '',
        Barangay: '',
        City: '',
        Email: '',
        Username: '',
        Password: '',
        ConfirmPassword: ''
    };

    const addUser = async () => {
        const data = {
            UserId: ID,
            Lastname: Lastname.value,
            Firstname: Firstname.value,
            Middlename: Middlename.value,
            dob: dob.value,
            Gender: Gender.value,
            Status: Status.value,
            Barangay: Barangay.value,
            City: City.value,
            Email: Email.value,
            Username: Username.value,
            Password: Password.value,
            Password_confirmation: ConfirmPassword.value
        };
        await handleAPIRequest(data, 'add-user');
    };

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {
            loading.value = true;
            let response;
            switch(apiRequest) {
                case 'add-user':
                    response = await axios.post(`${base_url}api/add-user`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    Object.assign(form.value, initialFormState);
                    logEvent('Create User', {
                        User: {
                            UserId: data.UserId,
                            Lastname: data.Lastname,
                            Firstname: data.Firstname,
                            Middlename: data.Middlename,
                        }
                    });
                    break;
                    case 'get-gender':
                    response = await axios.get(`${base_url}api/get-gender`);
                    gender_data.value = response.data;
                    loading.value = false;
                    break;

                case 'barangay-list':
                    response = await axios.get(`${base_url}api/barangay-list`);
                    barangay_data.value = response.data;
                    loading.value = false;
                    break;

                case 'get-statuses':
                    response = await axios.get(`${base_url}api/get-statuses`);
                    statuses.value = response.data;
                    loading.value = false;
                    break;

                default:
                    throw new Error('Invalid API request');
            }
            return response.data;
        } catch (error) {
            console.error(`Error ${apiRequest}:`, error);
            throw error;
        }
    };

    onMounted(() => {
        handleAPIRequest('', 'get-gender');
        handleAPIRequest('', 'barangay-list');
        handleAPIRequest('', 'get-statuses');

    })
</script>