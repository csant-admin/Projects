<template>
    <container fluid>
        <div>
            <v-container>
                <v-card-title class="text-center animated animatedFadeInUp fadeInUp" style="letter-spacing: 2px;">
                    <h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
                </v-card-title>
                <p class="text-center ">An Online Platform form for pet rescue and shelter</p>
                <div class="animated animatedFadeInUp fadeInUp">
                    <div class="py-8">
                        <div class="page-label">
                            <h3>Registration Form</h3>
                        </div>
                        <v-form @submit.prevent="handleRegistration" ref="form" v-model="valid">
                            <v-container>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            hint="Last Name"
                                            v-model="Lastname"
                                            :rules="fieldRules"
                                            label="Last Name"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="Firstname"
                                            hint="First Name"
                                            label="First Name"
                                            :rules="fieldRules"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="Middlename"
                                            hint="Middle Name"
                                            label="Middle Name"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="dob" 
                                            hint="Date Of Birth"
                                            label="Date of Birth" 
                                            type="date" 
                                            :rules="fieldRules"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="Gender" 
                                            label="Gender" 
                                            variant="outlined" 
                                            :items="gender_data"
                                            :rules="fieldRules"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="Status" 
                                            label="Status" 
                                            variant="outlined" 
                                            :items="statuses"
                                            :rules="fieldRules"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                            
                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="Barangay" 
                                            label="Barangay"
                                            variant="outlined" 
                                            :items="barangay_data"
                                            :rules="fieldRules"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="City" 
                                            label="City" 
                                            :rules="fieldRules"
                                            hint="City"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="Email" 
                                            label="Email" 
                                            :rules="emailRules"
                                            hint="Email"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="UserType" 
                                            label="User Type"
                                            :rules="fieldRules" 
                                            variant="outlined"
                                            :items="userType"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="OrgType" 
                                            label="Organization Type" 
                                            variant="outlined"
                                            :items="orgType"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="OrgName" 
                                            label="Organization Name" 
                                            hint="Organization Name"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-autocomplete 
                                            v-model="OrgBarangay" 
                                            label="Barangay"
                                            variant="outlined" 
                                            :items="barangay_data"
                                            item-title="description" 
                                            item-value="id" 
                                        ></v-autocomplete>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="OrgCity" 
                                            label="City" 
                                            hint="City"
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                            
                                    <v-col cols="">
                                        <v-text-field 
                                            v-model="Username" 
                                            hint="Username"
                                            label="Username" 
                                            variant="outlined"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="Password" 
                                            label="Password" 
                                            hint="Password"
                                            variant="outlined" 
                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                                            @click:append-inner="toggleVisibility"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field 
                                            v-model="ConfirmPassword" 
                                            label="Confirm Password" 
                                            hint="Confirm Password"
                                            variant="outlined" 
                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                                            @click:append-inner="toggleVisibility"
                                        ></v-text-field>
                                    </v-col>
                        
                                    <v-col cols="6">
                                        <v-btn 
                                            color="#6A0DAD" 
                                            type="submit"
                                        ><v-icon>mdi-account-plus</v-icon> Register User</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </div>
                </div>
            </v-container>
        </div>
    </container>
  </template>
  
  <script setup>
    import {ref} from 'vue';
    import axios from 'axios';
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import { logEvent } from '~/assets/js/LoggingService';
    const valid             = ref(true)
    const Lastname          = ref('')
    const Firstname         = ref('');
    const Middlename        = ref('');
    const dob               = ref('');
    const Gender            = ref('');
    const Status            = ref('');
    const Barangay          = ref('');
    const City              = ref('');
    const Email             = ref('');
    const UserType          = ref('');
    const OrgType           = ref('');
    const OrgName           = ref('');
    const OrgBarangay       = ref('');
    const OrgCity           = ref('');
    const Username          = ref('');
    const Password          = ref('');
    const ConfirmPassword   = ref('');
    const gender_data       = ref([]);
    const barangay_data     = ref([]);
    const statuses          = ref([]);
    const userType          = ref([]);
    const orgType           = ref([]);
    const base_url          = useApiUrl();
    const ID                = generateUniqueIdb();
    const visible           = ref(false);
    const loading           = ref(false);
    const email             = ref('')
    const form              = ref(null)

    const fieldRules = [
        v => !!v || 'Field is required',
    ]
    const emailRules = [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
    ]

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
        UserType: '',
        OrgType: '',
        OrgName: '',
        OrgCity: '',
        OrgBarangay: '',
        Username: '',
        Password: '',
        ConfirmPassword: '',
        OrgBarangay: ''
    };

    const handleRegistration = async () => {
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
            UserType: UserType.value,
            OrgType: OrgType.value,
            OrgName: OrgName.value,
            OrgBarangay: OrgBarangay.value,
            OrgCity: OrgCity.value,
            Username: Username.value,
            Password: Password.value,
            Password_confirmation: ConfirmPassword.value
        };
        await handleAPIRequest(data, 'add-user');
    };

    
    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        console.log(data);
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
                    form.value.reset();
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

                case 'get-user-type':
                    response = await axios.get(`${base_url}api/get-user-type`);
                    userType.value = response.data;
                    loading.value = false;
                    break;

                case 'get-organization-type':
                    response = await axios.get(`${base_url}api/get-organization-type`);
                    orgType.value = response.data;
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
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'get-statuses');
        handleAPIRequest({}, 'get-user-type');
        handleAPIRequest({}, 'get-organization-type');
    });

</script>

<style scoped>
html, body, #app, .v-application {
  height: 100%;
}

.v-container {
  height: 100%;
}
</style>