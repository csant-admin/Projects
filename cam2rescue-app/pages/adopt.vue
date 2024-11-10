<template>
    <v-container>
        <v-stepper v-model="step" vertical class="pa-4">
            <v-stepper-header>
                <v-stepper-step
                    v-for="(stepLabel, index) in stepLabels"
                    :key="index"
                    :complete="step > index + 1"
                    :step="index + 1"
                    :class="{'active-step': step === index + 1}"
                >
                    <v-icon color="blue" class="mr-2">{{ stepIcons[index] }}</v-icon>
                    {{ stepLabel }}
                </v-stepper-step>
            </v-stepper-header>
    
            <v-stepper-items>
                <transition name="slide-fade">
                    <v-stepper-content
                        v-if="step === 1"
                        step="1"
                    >
                    <div class="step-content">  <!-- Added div to wrap step content -->
                        <v-row>
                            <v-col cols="12">
                                <v-text-field 
                                    v-model="payload.petname" 
                                    label="Pet Name" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-select 
                                    v-model="payload.gender" 
                                    :items="genders" 
                                    label="Gender" 
                                    variant="outlined"
                                ></v-select>
                            </v-col>

                            <v-col cols="12" md="4">
                                <v-text-field 
                                    v-model="payload.color" 
                                    label="Color" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                        </v-row>
                    </div>

                    <v-btn @click="nextStep" color="primary">Next</v-btn>
                    </v-stepper-content>
                </transition>

                <transition name="slide-fade">
                    <v-stepper-content
                        v-if="step === 2"
                        step="2"
                    >
                    <div class="step-content mb-4">
                        <v-row>
                            <v-col cols="6">
                                <fieldset class="pa-4 rounded-fieldset">
                                    <legend class="pa-2">Adoptee Name</legend>
                                    <v-row >
                                        <v-col cols="3" class="form-col d-flex align-center justify-center">
                                            <v-list-subheader class="form-header">Last Name </v-list-subheader>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-text-field 
                                                v-model="payload.Lastname"
                                                label="Last Name" 
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>

                                    <v-row>
                                        <v-col cols="3" class="form-col d-flex align-center justify-center">
                                            <v-list-subheader class="form-header">First Name </v-list-subheader>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-text-field
                                                v-model="payload.Firstname"
                                                label="First Name" 
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    
                                    <v-row>
                                        <v-col cols="3" class="form-col d-flex align-center justify-center">
                                            <v-list-subheader class="form-header">Middle Name </v-list-subheader>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-text-field 
                                                v-model="payload.Middlename"
                                                label="Middle Name" 
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="3" class="form-col d-flex align-center justify-center">
                                            <v-list-subheader class="form-header">Suffix </v-list-subheader>
                                        </v-col>
                                        <v-col cols="9">
                                            <v-text-field 
                                                v-model="payload.Suffix"
                                                label="Name Extension" 
                                                variant="outlined"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </fieldset>
                            </v-col>

                            <v-col cols="6">
                            <!-- Additional fields as needed -->
                                <fieldset class="pa-4 rounded-fieldset">
                                    <legend class="pa-2">Adoptee Details</legend>
                                        <v-row>
                                            <v-col cols="3" class="form-col d-flex align-center justify-center">
                                                <v-list-subheader class="form-header">Birth Date </v-list-subheader>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-text-field
                                                    v-model="payload.dob" 
                                                    label="Date of Birth" 
                                                    variant="outlined"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="3" class="form-col d-flex align-center justify-center">
                                                <v-list-subheader class="form-header">Birth Place </v-list-subheader>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-text-field
                                                    v-model="payload.PlaceOfBirth" 
                                                    label="Place of Birth" 
                                                    variant="outlined"
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>

                                        <v-row>
                                            <v-col cols="3" class="form-col d-flex align-center justify-center">
                                                <v-list-subheader class="form-header">Gender </v-list-subheader>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-autocomplete 
                                                    v-model="payload.Gender"
                                                    label="Gender" 
                                                    variant="outlined"
                                                    :items="gender_data"
                                                    item-title="description"
                                                    item-value="id"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                        <v-row>
                                            <v-col cols="3" class="form-col d-flex align-center justify-center">
                                                <v-list-subheader class="form-header">Civil Status </v-list-subheader>
                                            </v-col>
                                            <v-col cols="9">
                                                <v-autocomplete 
                                                    v-model="payload.CivilStatus"
                                                    label="Status" 
                                                    variant="outlined"
                                                    :items="statuses"
                                                    item-title="description"
                                                    item-value="id"
                                                ></v-autocomplete>
                                            </v-col>
                                        </v-row>
                                </fieldset>
                            </v-col>

                        </v-row>
                    </div>
                    <div>
                        <v-btn 
                            @click="previousStep" 
                            color="secondary"
                            class="ma-2"
                            >   
                            Back
                        </v-btn>

                        <v-btn 
                            @click="nextStep" 
                            color="primary"
                            class="ma-2"
                            >
                            Next
                        </v-btn>
                    </div>

                    </v-stepper-content>

                </transition>
    
            <transition name="slide-fade">
                <v-stepper-content
                    v-if="step === 3"
                    step="3"
                >
                <div class="step-content">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field 
                                v-model="payload.orgname" 
                                label="Organization Name" 
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field v-model="payload.orgemail" label="Organization Email" outlined></v-text-field>
                        </v-col>
                    </v-row>
                </div>
                <v-btn @click="previousStep" color="secondary">Back</v-btn>
                <v-btn @click="nextStep" color="primary">Next</v-btn>
                </v-stepper-content>
            </transition>
    
            <transition name="slide-fade">
                <v-stepper-content
                v-if="step === 4"
                step="4"
                >
                <div class="step-content">
                    <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="payload.appointmentDetails_date" label="Date" type="date" outlined></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="payload.appointmentDetails_time" label="Time" type="time" outlined></v-text-field>
                    </v-col>
                    </v-row>
                </div>
                <v-btn @click="previousStep" color="secondary">Back</v-btn>
                <v-btn @click="nextStep" color="primary">Next</v-btn>
                </v-stepper-content>
            </transition>
    
            <transition name="slide-fade">
                <v-stepper-content
                v-if="step === 5"
                step="5"
                >
                <div class="step-content">
                    <v-card-title>Terms & Conditions</v-card-title>
                        <v-card-text class="pa-4">
                            <p>
                                Welcome to Cam2Rescue! By using our services, you agree to the
                                following terms and conditions regarding the use of your
                                information:
                            </p>

                            <ol class="pa-4">
                                <li class="pa-2">
                                    <strong>Information Collection:</strong> We collect personal
                                    information such as your name, contact details, and any other
                                    information you provide when using our services. This information
                                    is collected to ensure that we can effectively provide our
                                    services and keep you updated.
                                </li>
                                <li class="pa-2">
                                    <strong>Use of Information:</strong> The information you provide
                                    will be used solely for the purposes of operating Cam2Rescue,
                                    including contacting you regarding adoption, rescue, and other
                                    related services. Your information will not be shared with third
                                    parties without your explicit consent.
                                </li>
                                <li class="pa-2">
                                    <strong>Data Security:</strong> We take data security seriously
                                    and implement various measures to protect your personal
                                    information. However, please note that no method of transmission
                                    over the internet is 100% secure.
                                </li>
                                <li class="pa-2">
                                    <strong>User Responsibilities:</strong> You are responsible for
                                    ensuring that the information you provide is accurate and
                                    up-to-date. Misuse of the platform or providing false information
                                    may result in termination of your access to Cam2Rescue services.
                                </li>
                                <li class="pa-2">
                                    <strong>Changes to Terms:</strong> Cam2Rescue reserves the right
                                    to modify these terms and conditions at any time. We will notify
                                    users of significant changes via email or through our platform.
                                </li>
                            </ol>

                            <v-checkbox v-model="agreementConfirmed" label="I agree to the terms and conditions"></v-checkbox>
                        </v-card-text>
                </div>
                <v-btn @click="previousStep" color="secondary">Back</v-btn>
                <v-btn @click="submitForm" :disabled="!agreementConfirmed" color="success">Submit</v-btn>
                </v-stepper-content>
            </transition>
            </v-stepper-items>
        </v-stepper>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue';

        import axios from 'axios';
        import { useAuthStore, userAuthenticated } from '@/stores/auth';
        import { generateUniqueIdb } from '~/assets/js/IDCenter';
        import '~/assets/css/main.css';

        definePageMeta({
            middleware: 'auth'
        })

        const gender_data           = ref([]);
        const barangay_data         = ref([]);
        const statuses              = ref([]);
        const userType              = ref([]);
        const orgType               = ref([]);
        const base_url              = useApiUrl();
        const ID                    = generateUniqueIdb();
        const visible               = ref(false);
        const loading               = ref(false);
        const email                 = ref('');
        const form                  = ref(null)
        const showAgreement         = ref(false);
        const agreementConfirmed    = ref(false);
        const petDetail             = ref([]);
        const petId                 = ref(null);
        const userID                = ref(null); 
        const UserDetail            = ref([]);
        const step = ref(1);
        
        const props = defineProps({
            type: Boolean,
            default: ()=>false
        });

        const payload = ref([{}]);
    
        const stepLabels = [
            'Pet Details', 
            'Adoptee Information', 
            'Organization Information', 
            'Appointment', 
            'Agreement'
        ];

        const stepIcons = [
            'mdi-paw', 
            'mdi-account', 
            'mdi-home-group', 
            'mdi-calendar', 
            'mdi-file-document-outline'
        ];
    
        const nextStep = () => {
            if (step.value < stepLabels.length) step.value++;
        };
    
        const previousStep = () => {
            if (step.value > 1) step.value--;
        };
    
        const submitForm = () => {
            if (agreementConfirmed.value) {
                console.log('Form submitted:', {
                    petDetails: petDetails.value,
                    adopteeDetails: adopteeDetails.value,
                    organizationDetails: organizationDetails.value,
                    appointmentDetails: appointmentDetails.value,
                });
            }
        };

        const handleAPIRequest = async (data = {}, apiRequest = '') => {
            try {
                loading.value = true;
                let response;
                switch(apiRequest) {
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
                    case 'get-pet-details':
                        if (petId.value) { 
                            response = await axios.get(`${base_url}api/get-pet-details/${petId.value}`);
                            petDetail.value = response.data;
                            payload.value.petname = petDetail.value[0].PetName;
                            payload.value.gender  = petDetail.value[0].PetSex;
                        }
                        loading.value = false;
                        break;
                    case 'get-user-details':
                        if(userID.value) {
                            response = await axios.get(`${base_url}api/get-user-details/${userID.value}`);
                            UserDetail.value = response.data;
                            payload.value.Lastname = UserDetail.value[0].lastname
                            payload.value.Firstname = userDetail.value[0].firstname
                            payload.value.Middlename = userDetail.value[0].middlename
                            payload.value.dob = userDetail.value[0].birthday
                            payload.value.Gender = userDetail.value[0].gender
                            payload.value.CivilStatus = userDetail.value[0].CivilStatus
                            console.log('User man ni lagi : ', response.data);
                        }
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

        const getUserID = () => {
            const loggedInUser = sessionStorage.getItem('user');
            if (loggedInUser) {
                const userObject = JSON.parse(loggedInUser);
                const userID = userObject.UserID;
                
            } else {
                console.log('No user data found in sessionStorage.');
            }
        }
        
        const getPetInfo = async () => {
            let response;
            response = await axios.get(`${base_url}api/get-pet-info`)
        }

        onMounted(() => {
            petId.value = localStorage.getItem('PetId');
            const loggedInUser = sessionStorage.getItem('user');
            if (loggedInUser && petId) {
                const userObject = JSON.parse(loggedInUser);
                userID.value = userObject.UserID;

                handleAPIRequest({}, 'get-pet-details');
                handleAPIRequest({}, 'get-user-details');
                handleAPIRequest({}, 'get-gender');
                handleAPIRequest({}, 'barangay-list');
                handleAPIRequest({}, 'get-statuses');
                handleAPIRequest({}, 'get-user-type');
                handleAPIRequest({}, 'get-organization-type');
            } 
        });

    </script>
  
    <style>

        .slide-fade-enter-active, .slide-fade-leave-active {
            transition: transform 0.5s ease, opacity 0.5s ease;
        }

        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateX(100%);
            opacity: 0;
        }
        
        .step-content {
            margin-top: 2rem;
        }
        
        .active-step {
            color: #6A0DAD !important; 
        }
        
        .v-stepper-header .v-stepper-step::after {
            content: "";
            position: absolute;
            height: 2px;
            background-color: #6A0DAD;
            left: 50%;
            top: 25%;
            width: 100%;
            z-index: -1;
        }

        .form-header {
            color: #000;
            margin: -12px 0px -12px 0px;
            font-size: 18px !important;
            font-weight: 500;
        }

        .form-col {
            margin: 0px !important;
        }

        .v-input--density-compact {
            --v-input-control-height: 20px !important;
        }

        .rounded-fieldset {
            border: 1px solid #673AB7;
            background-color: #f9f9f9; 
            border-radius: 8px; 
        }

    </style>
  