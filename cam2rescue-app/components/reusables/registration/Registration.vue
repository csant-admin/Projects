<script setup>
     import {ref} from 'vue';
     import axios from 'axios';

    const props = defineProps({
        show: Boolean,
    });

    const emits = defineEmits(['close-modal, load-user']);

    const valid             = ref(true)
    const gender_data       = ref([]);
    const barangay_data     = ref([]);
    const statuses          = ref([]);
    const userType          = ref([]);
    const orgType           = ref([]);
    const base_url          = useApiUrl();
    const visible           = ref(false);
    const loading           = ref(false);
    const showSnackbar      = ref(false);
    const isError           = ref(false);
    const message           = ref('');
    const form              = ref(null)
    const payload           = ref({});
    const value             = ref(0)
    const interval          = ref(null)

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

    const handleRegistration = async () => {
      await handleAPIRequest(payload.value, 'add-user');
    };

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        startLoader();
        try {
            loading.value = true;
            let response;
            switch(apiRequest) {
                case 'add-user':
                    response = await axios.post(`${base_url}api/add-user`, data);
                    showSnackbar.value = true;
                    if(response ) {
                        message.value = response.message ? response.message : 'User Registered Successfully';
                        isError.value = false;
                        closeModal();
                        emits('load-user');
                    } else {
                        message.value = response.message ? response.message : 'Failed To Register, Call Cam2Rescue Team';
                        isError.value = true;
                    }
                    payload.value = {};
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
        } finally {
            stopLoader();
        }
    };

    onMounted(() => {
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'get-statuses');
        handleAPIRequest({}, 'get-user-type');
        handleAPIRequest({}, 'get-organization-type');
    });



    let dialogVisibility = ref(props.show);

    const closeModal = () => {
        emits('close-modal');
    }

    watch(() => props.show,
     (newValue) => {
        console.log(newValue);
        dialogVisibility.value = newValue;
    })

</script>

<template>
    <v-dialog v-model="dialogVisibility" persistent fullscreen hide-overlay>
        <v-card class="pa-6">
            <v-toolbar color="#6A0DAD">
                <v-spacer></v-spacer>
                <v-toolbar-items>
                    <v-btn icon dark @click.prevent="closeModal"> <v-icon>mdi-close</v-icon></v-btn>
                </v-toolbar-items>
            </v-toolbar>
            <v-card-title class="text-center animated animatedFadeInUp fadeInUp" style="letter-spacing: 2px;">
                <h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
            </v-card-title>
            <div class="animated animatedFadeInUp fadeInUp">
                <p class="text-center ">An Online Platform form for pet rescue and shelter</p>
                <div class="py-8">
                    <div class="page-label">
                        <h3>Registration Form</h3>
                    </div>
                    <v-form @submit.prevent="handleRegistration" ref="form" v-model="valid">
                        <v-row>
                            <v-col cols="12">
                                <fieldset class="pa-4 rounded-lg">
                                    <legend class="pa-2" style="color:#6A0DAD;">User Details</legend>
                                    <v-row>
                                        <v-col cols="4">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Name</legend>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        hint="Last Name"
                                                        v-model="payload.Lastname"
                                                        :rules="fieldRules"
                                                        label="Last Name"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>

                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="payload.Firstname"
                                                        hint="First Name"
                                                        label="First Name"
                                                        :rules="fieldRules"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field
                                                        v-model="payload.Middlename"
                                                        hint="Middle Name"
                                                        label="Middle Name"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                        <v-col cols="4">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Other Details</legend>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.dob" 
                                                        hint="Date Of Birth"
                                                        label="Date of Birth" 
                                                        type="date" 
                                                        :rules="fieldRules"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.Gender" 
                                                        label="Gender" 
                                                        variant="outlined" 
                                                        :items="gender_data"
                                                        :rules="fieldRules"
                                                        item-title="description" 
                                                        item-value="id" 
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.Status" 
                                                        label="Status" 
                                                        variant="outlined" 
                                                        :items="statuses"
                                                        :rules="fieldRules"
                                                        item-title="description" 
                                                        item-value="id" 
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.UserType" 
                                                        label="User Type"
                                                        :rules="fieldRules" 
                                                        variant="outlined"
                                                        :items="userType"
                                                        item-title="description" 
                                                        item-value="id" 
                                                    ></v-autocomplete>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                        <v-col cols="4">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Address</legend>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.Barangay" 
                                                        label="Barangay"
                                                        variant="outlined" 
                                                        :items="barangay_data"
                                                        :rules="fieldRules"
                                                        item-title="description" 
                                                        item-value="id" 
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.City" 
                                                        label="City" 
                                                        :rules="fieldRules"
                                                        hint="City"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                    </v-row>
                                </fieldset>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <fieldset class="pa-4 rounded-lg">
                                    <legend class="pa-2">Auth Credentials</legend>
                                    <v-row>
                                        <v-col cols="6">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Username & Email</legend>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.Email" 
                                                        label="Email" 
                                                        :rules="emailRules"
                                                        hint="Email"
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.Username" 
                                                        hint="Username"
                                                        label="Username" 
                                                        variant="outlined"
                                                    ></v-text-field>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                        <v-col cols="6">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Password</legend>
                                                    <v-col cols="12">
                                                        <v-text-field 
                                                            v-model="payload.Password" 
                                                            label="Password" 
                                                            hint="Password"
                                                            variant="outlined" 
                                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                                                            @click:append-inner="toggleVisibility"
                                                        ></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field 
                                                            v-model="payload.Password_confirmation" 
                                                            label="Confirm Password" 
                                                            hint="Confirm Password"
                                                            variant="outlined" 
                                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'":type="visible ? 'text' : 'password'"  
                                                            @click:append-inner="toggleVisibility"
                                                        ></v-text-field>
                                                    </v-col>
                                                </fieldset>
                                        </v-col>
                                    </v-row>
                                </fieldset>
                            </v-col>
                        </v-row>
                        <v-row v-if="parseInt(payload.UserType) === 2">
                            <v-col cols="12" >
                                <fieldset class="pa-4 rounded-lg">
                                    <legend class="pa-2" style="color:#6A0DAD;">Organization Details</legend>
                                    <v-row>
                                        <v-col cols="6">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Organization Details</legend>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.OrgType" 
                                                        label="Organization Type" 
                                                        variant="outlined"
                                                        :items="orgType"
                                                        item-title="description" 
                                                        item-value="id" 
                                                        :rules="parseInt(payload.UserType) === 2 ? fieldRules : ''"
                                                        :required="parseInt(payload.UserType) === 2"
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.OrgName" 
                                                        label="Organization Name" 
                                                        hint="Organization Name"
                                                        variant="outlined"
                                                        :rules="parseInt(payload.UserType) === 2 ? fieldRules : ''"
                                                        :required="parseInt(payload.UserType) === 2"
                                                    ></v-text-field>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                        <v-col cols="6">
                                            <fieldset class="pa-4 rounded-lg">
                                                <legend class="pa-2" style="color:#6A0DAD;">Organization Address</legend>
                                                <v-col cols="12">
                                                    <v-autocomplete 
                                                        v-model="payload.OrgBarangay" 
                                                        label="Barangay"
                                                        variant="outlined" 
                                                        :items="barangay_data"
                                                        item-title="description" 
                                                        item-value="id"
                                                        :rules="parseInt(payload.UserType) === 2 ? fieldRules : ''"
                                                        :required="parseInt(payload.UserType) === 2" 
                                                    ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field 
                                                        v-model="payload.OrgCity" 
                                                        label="City" 
                                                        hint="City"
                                                        variant="outlined"
                                                        :rules="parseInt(payload.UserType) === 2 ? fieldRules : ''"
                                                        :required="parseInt(payload.UserType) === 2"
                                                    ></v-text-field>
                                                </v-col>
                                            </fieldset>
                                        </v-col>
                                    </v-row>
                                </fieldset>
                            </v-col>
                        </v-row>
                        <v-btn 
                            color="#6A0DAD" 
                            type="submit"
                            class="mt-4"
                            >
                            <v-icon>mdi-account-plus</v-icon> 
                            Register User
                        </v-btn>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn class="mb-4" @click.prevent="closeModal">Close</v-btn>
                        </v-card-actions>
                    </v-form>
                </div>
            </div>
        </v-card>
    </v-dialog>
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
</template>

<style scoped>
    html, body, #app, .v-application {
        height: 100%;
    }

    .v-container {
        height: 100%;
    }
</style>

  