<template>
    <div class="dialog-wrapper pa-6">
        <v-dialog
            v-model="dialog"
            max-width="420"
            persistent
            scrollable
        >
            <v-card elevation="3" class="rounded-lg">
            <v-card-title class="headline font-weight-bold" color="#50075e">
                <v-icon left color="warning" size="28">mdi-alert-circle-outline</v-icon>
                Important Notice:
            </v-card-title>
            <v-card-text class="body-1 text-justify" style="white-space: pre-line; line-height: 1.6;">
                We do not allow cancellation of pet bookings or adoption reservations.
                Every adoption is a life-changing commitment, not just a decision made in passing.
                When you choose a pet, you're choosing to give them a second chance — not a trial run.
                This isn't entertainment — it's a life you're saving.

                Please adopt with intention, responsibility, and heart.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn class="notice-button"  @click="dialog = false" elevation="2">
                I Understand & Agreed
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
    <v-container class="adopt-container">
        <v-divider></v-divider>
        <div class="adopt-wrapper">
            <v-stepper v-model="step" vertical class="adopt-stepper">
                <v-stepper-header class="adopt-stepper-header">
                    <v-stepper-step
                        v-for="(stepLabel, index) in stepLabels"
                        :key="index"
                        :complete="step > index + 1"
                        :step="index + 1"
                        :class="{'active-step': step === index + 1}"
                    >
                        <v-icon color="blue" class="mr-2">{{ stepIcons[index] }}</v-icon>
                        <span class="font-weight-bold text-h6 text-cerulean pa-4 rounded-lg my-1">{{ stepLabel }}</span>
                    </v-stepper-step>
                </v-stepper-header>
        
                <v-stepper-items>
                    <transition name="fade" mode="out-in">
                        <v-stepper-content
                            v-if="step === 1"
                            step="1"
                            class="adopt-step-content"
                        >
                        <div class="step-content pa-6">  <!-- Added div to wrap step content -->
                            <v-sheet class="font-weight-bold text-h6 text-cerulean pa-3 rounded-lg my-1">
                                <v-icon start color="muted">mdi-book-cross</v-icon>
                                <span class="text-muted" color="#50075e">Pet </span> Information
                            </v-sheet>
                            <v-row dense>
                                <v-col 
                                    v-for="field in petDetails"
                                    :key="field.label"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-list-subheader class="sp-form-header text-medium-emphasis">
                                        {{ field.label }}
                                    </v-list-subheader>
                                    <component 
                                        rounded="lg"
                                        class="font-weight-medium"
                                        color="cerulean"
                                        :is="field.component"
                                        v-model="payload[field.model]"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        v-bind="field.props || {}"
                                    ></component>
                                </v-col>
                            </v-row>
                            <v-btn @click="nextStep" color="#50075e" class="mt-4">Next</v-btn>
                        </div>
                    </v-stepper-content>
                </transition>
                <transition name="fade" mode="out-in">
                    <v-stepper-content
                        v-if="step === 2"
                        step="2"
                        class="adopt-step-content"
                    >
                        <div class="step-content mb-4">
                            <v-sheet class="font-weight-bold text-h6 text-cerulean pa-3 rounded-lg my-1">
                                <v-icon start color="muted">mdi-book-cross</v-icon>
                                <span class="text-muted" color="#50075e">Personal </span> Information
                            </v-sheet>
                            <v-row dense>
                                <v-col 
                                    v-for="field in name"
                                    :key="field.label"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-list-subheader class="sp-form-header text-medium-emphasis">
                                        {{ field.label }}
                                    </v-list-subheader>
                                    <component 
                                        rounded="lg"
                                        class="font-weight-medium"
                                        color="cerulean"
                                        :is="field.component"
                                        v-model="payload[field.model]"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        v-bind="field.props || {}"
                                    ></component>
                                </v-col>
                            </v-row>
                            <v-row dense>
                                <v-col 
                                    v-for="field in otherDetails"
                                    :key="field.label"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-list-subheader class="sp-form-header text-medium-emphasis">
                                        {{ field.label }}
                                    </v-list-subheader>
                                    <component 
                                        rounded="lg"
                                        class="font-weight-medium"
                                        color="cerulean"
                                        :is="field.component"
                                        v-model="payload[field.model]"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        v-bind="field.props || {}"
                                    ></component>
                                </v-col>
                            </v-row>
                            <v-btn @click="previousStep" color="error" class="ma-2">Back</v-btn>
                            <v-btn @click="nextStep" color="#50075e" class="ma-2">Next</v-btn>
                        </div>
                    </v-stepper-content>
                </transition>
                <transition name="slide-fade">
                    <v-stepper-content
                        v-if="step === 3"
                        step="3"
                        class="adopt-step-content"
                    >
                        <div class="step-content mb-4">
                            <v-sheet class="font-weight-bold text-h6 text-cerulean pa-3 rounded-lg my-1">
                                <v-icon start color="muted">mdi-book-cross</v-icon>
                                <span class="text-muted" color="#50075e">Organization </span> Information
                            </v-sheet>
                            <v-row dense>
                                <v-col 
                                    v-for="field in organizationDetails"
                                    :key="field.label"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-list-subheader class="sp-form-header text-medium-emphasis">
                                        {{ field.label }}
                                    </v-list-subheader>
                                    <component 
                                        rounded="lg"
                                        class="font-weight-medium"
                                        color="cerulean"
                                        :is="field.component"
                                        v-model="payload[field.model]"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        v-bind="field.props || {}"
                                    ></component>
                                </v-col>
                            </v-row>
                            <v-btn @click="previousStep" color="error" class="ma-2">Back</v-btn>
                            <v-btn @click="nextStep" color="#50075e">Next</v-btn>
                        </div>
                    </v-stepper-content>
                </transition>
                <transition name="slide-fade">
                    <v-stepper-content
                        v-if="step === 4"
                        step="4"
                        class="adopt-step-content"
                    >
                    <div class="step-content">
                        <v-sheet class="font-weight-bold text-h6 text-cerulean pa-3 rounded-lg my-1">
                            <v-icon start color="muted">mdi-book-cross</v-icon>
                            <span class="text-muted" color="#50075e">Appointment </span> Schedule
                        </v-sheet>
                        <v-row dense>
                                <v-col 
                                    v-for="field in appointmentSchedule"
                                    :key="field.label"
                                    cols="12"
                                    sm="6"
                                    md="4"
                                    lg="3"
                                >
                                    <v-list-subheader class="sp-form-header text-medium-emphasis">
                                        {{ field.label }}
                                    </v-list-subheader>
                                    <component 
                                        rounded="lg"
                                        class="font-weight-medium"
                                        color="cerulean"
                                        :type="field.type"
                                        :is="field.component"
                                        v-model="payload[field.model]"
                                        hide-details
                                        variant="outlined"
                                        density="compact"
                                        v-bind="field.props || {}"
                                    ></component>
                                </v-col>
                            </v-row>
                            <v-btn @click="previousStep" color="error" class="ma-2">Back</v-btn>
                            <v-btn @click="nextStep" color="#50075e">Next</v-btn>
                        </div>
                    </v-stepper-content>
                </transition>
        
                <transition name="slide-fade">
                    <v-stepper-content
                        v-if="step === 5"
                        step="5"
                        class="adopt-step-content"
                    >
                    <div class="step-content">
                        <v-sheet class="font-weight-bold text-h6 text-cerulean pa-3 rounded-lg my-1">
                            <v-icon start color="muted">mdi-book-cross</v-icon>
                            <span class="text-muted" color="#50075e">Aggreement </span> 
                        </v-sheet>
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
                    <v-btn @click="previousStep" color="error" class="ma-2">Back</v-btn>
                    <v-btn @click="submitForm" :disabled="!agreementConfirmed" color="#50075e">Submit</v-btn>
                    </v-stepper-content>
                </transition>
                </v-stepper-items>
            </v-stepper>
        </div>
    </v-container>
  </template>
  
  <script setup>
    import { ref } from 'vue';

        import axios from 'axios';
        import { useAuthStore } from '@/stores/auth';
        import { generateUniqueIdb } from '~/assets/js/IDCenter';
        import '~/assets/css/main.css';
        const isAuthenticated   = ref(false);

        definePageMeta({
            layout: "user-default-layout",
            // middleware: 'auth'
        })

        const gender_data           = ref([]);
        const barangay_data         = ref([]);
        const statuses              = ref([]);
        const userType              = ref([]);
        const orgType               = ref([]);
        const color                 = ref([]);
        const base_url              = useApiUrl();
        const loading               = ref(false);
        const agreementConfirmed    = ref(false);
        const petDetail             = ref([]);
        const petId                 = ref(null)
        const userID                = ref(null); 
        const UserDetail            = ref([]);
        const step = ref(1);
        const isLoading = ref(false);
        const payload = ref({});
        const dialog = ref(true);
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
    
        const submitForm = async () => {
            if (agreementConfirmed.value) {
                isLoading.value = true;
                try {
                    const response = await axios.post(`${base_url}/api/post-adoption`, payload.value);
                    if(response) {
                        console.log('Successfull');
                        isLoading.value = false;
                    }
                } catch(error) {
                    console.log('Error' + error);
                } finally {
                    isLoading.value = false;
                }
            }
        };

        const handleAPIRequest = async (data = {}, apiRequest = '') => {
            try {
                loading.value = true;
                let response;
                switch(apiRequest) {
                    case 'get-gender':
                        response = await axios.get(`${base_url}/api/get-gender`);
                        gender_data.value = response.data;
                        loading.value = false;
                        break;
                    case 'barangay-list':
                        response = await axios.get(`${base_url}/api/barangay-list`);
                        barangay_data.value = response.data;
                        loading.value = false;
                        break; 
                    case 'get-statuses':
                        response = await axios.get(`${base_url}/api/get-statuses`);
                        statuses.value = response.data;
                        loading.value = false;
                        break;         
                    case 'get-user-type':
                        response = await axios.get(`${base_url}/api/get-user-type`);
                        userType.value = response.data;
                        loading.value = false;
                        break;  
                    case 'color-list':
                        response = await axios.get(`${base_url}/api/color-list`);
                        color.value = response.data;
                        console.log('Color : ', color.value);  
                        loading.value = false;
                        break;          
                    case 'get-organization-type':
                        response = await axios.get(`${base_url}/api/get-organization-type`);
                        orgType.value = response.data;
                        loading.value = false;
                        break;                
                    case 'get-pet-details':
                        if (petId.value) { 
                            response = await axios.get(`${base_url}/api/get-pet-details/${petId.value}`);
                            console.log('PET ID : ', response.data);
                            petDetail.value = response.data;
                            payload.value.pet_id = petDetail.value[0].PetID;
                            payload.value.petname = petDetail.value[0].PetName;
                            payload.value.gender  = petDetail.value[0].PetSex;
                            payload.value.color   = petDetail.value[0].PetColor;
                        }
                        loading.value = false;
                        break;
                    case 'get-user-details':
                        if(userID.value) {
                            response = await axios.get(`${base_url}/api/get-user-details/${userID.value}`);
                            UserDetail.value = response.data;
                            console.log('User Detail : ', UserDetail.value);
                            payload.value.user_id = UserDetail.value[0].id
                            payload.value.Firstname = UserDetail.value[0].firstname
                            payload.value.Lastname = UserDetail.value[0].lastname
                            payload.value.Middlename = UserDetail.value[0].middlename
                            payload.value.dob = UserDetail.value[0].birthday
                            payload.value.Gender = UserDetail.value[0].gender
                            payload.value.CivilStatus = UserDetail.value[0].CivilStatus
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
            const loggedInUser = localStorage.getItem('user');
            if (loggedInUser && petId) {
                const userObject = JSON.parse(loggedInUser);
                userID.value = userObject.UserID;
                console.log('User ID: ', userID.value);

                handleAPIRequest({}, 'get-pet-details');
                handleAPIRequest({}, 'get-user-details');
                handleAPIRequest({}, 'get-gender');
                handleAPIRequest({}, 'barangay-list');
                handleAPIRequest({}, 'get-statuses');
                handleAPIRequest({}, 'get-user-type');
                handleAPIRequest({}, 'color-list');
                handleAPIRequest({}, 'get-organization-type');
            } 
        });

        const petDetails = [
            {
                label: 'Pet Name',
                model: 'petname',
                type: 'text',
                component: 'v-text-field'
            },
            {
                label: 'Color',
                model: 'color',
                type: 'text',
                items: color,
                component: 'v-autocomplete',
                props: {
                    itemTitle: 'description',
                    itemValue: 'id'
                }
            },
            {
                label: 'Sex',
                model: 'Gender',
                type: 'text',
                items: gender_data,
                component: 'v-autocomplete',
                props: {
                    itemTitle: 'description',
                    itemValue: 'id'
                }
            },
            
        ]
        const name = [
            {
                label: 'Last Name',
                model: 'Lastname',
                type: 'text',
                component: 'v-text-field'
            },
            {
                label: 'First Name',
                model: 'Firstname',
                type: 'text',
                component: 'v-text-field'
            },
            {
                label: 'Middle Name',
                model: 'Middlename',
                type: 'text',
                component: 'v-text-field'
            },
            {
                label: 'Suffix',
                model: 'Suffix',
                type: 'text',
                component: 'v-text-field'
            }
        ];

    const otherDetails = [
        {
            label: 'Birthdate',
            model: 'dob',
            type: 'date',
            component: 'v-text-field'
        },
         {
            label: 'Birth Place',
            model: 'PlaceOfBirth',
            type: 'text',
            component: 'v-autocomplete',
        },
        {
            label: 'Sex',
            model: 'Gender',
            type: 'text',
            items: gender_data,
            component: 'v-autocomplete',
            props: {
                itemTitle: 'description',
                itemValue: 'id'
            }
        },
        {
            label: 'Civil Status',
            model: 'CivilStatus',
            type: 'text',
            items: statuses,
            component: 'v-autocomplete',
            props: {
                itemTitle: 'description',
                itemValue: 'id'
            }
        }
    ];

    const organizationDetails = [
        {
            label: 'Organization Name',
            model: 'orgname',
            type: 'text',
            component: 'v-text-field'
        },
         {
            label: 'Organzation Email',
            model: 'orgemail',
            type: 'email',
            component: 'v-text-field'
        },
    ];

    const appointmentSchedule = [
        {
            label: 'Appointment Date',
            model: 'appointmentDetails_date',
            type: 'date',
            component: 'v-text-field'
        },
         {
            label: 'Appointment Time',
            model: 'appointmentDetails_time',
            type: 'time',
            component: 'v-text-field'
        },
    ];
    
    </script>
  
    <style>

/* === Dialog Redesign === */
.dialog-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
}

.v-dialog .v-card {
  border-radius: 16px !important;
  background: rgba(255, 255, 255, 0.95) !important;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15) !important;
  backdrop-filter: blur(10px);
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.v-dialog .v-card:hover {
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.18);
}

/* Elegant Header */
.v-card-title {
  display: flex;
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  color: #50075e !important;
  background: linear-gradient(90deg, rgba(80,7,94,0.1), rgba(255,255,255,0));
  border-bottom: 1px solid #f0f0f0;
  padding: 1rem 1.5rem;
}

/* Icon styling */
.v-card-title v-icon {
  margin-right: 0.5rem;
  color: #f4a261 !important;
}

/* Elegant body text */
.v-card-text {
  color: #444;
  font-size: 1rem;
  line-height: 1.7;
  padding: 1.5rem;
  font-family: "Poppins", sans-serif;
}

/* Highlight key emotional sentence */
.v-card-text strong,
.v-card-text em {
  color: #50075e;
  font-weight: 600;
}

/* Button styling */
.notice-button {
  background: #50075e !important;
  color: #fff !important;
  border-radius: 30px;
  font-weight: 600;
  text-transform: none;
  padding: 0.75rem 1.5rem;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
}

.notice-button:hover {
  background: #711f82 !important;
  transform: scale(1.03);
}

/* Centered actions */
.v-card-actions {
  justify-content: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
}

/* Fade in animation */
.v-dialog.v-overlay--active .v-card {
  animation: fadeInUp 0.4s ease;
}

@keyframes fadeInUp {
  from {
    transform: translateY(25px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}



    .adopt-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 2rem;
    }

.adopt-stepper {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
}

.adopt-stepper-header {
    background-color: #f5f5f5;
    padding: 1rem 0;
}

.adopt-step-content {
    padding: 2rem;
    background-color: #ffffff;
}

.step-content {
    margin-top: 1rem;
}

.active-step {
    color: #50075e !important;
    font-weight: bold;
}

.v-stepper-header .v-stepper-step::after {
    content: "";
    position: absolute;
    height: 2px;
    background-color: #50075e;
    left: 50%;
    top: 25%;
    width: 100%;
    z-index: -1;
}

.form-header {
    color: #333;
    margin: 0 0 1rem 0;
    font-size: 1.2rem !important;
    font-weight: 500;
}

.form-col {
    margin: 0.5rem 0 !important;
}

.v-input--density-compact {
    --v-input-control-height: 40px !important;
}

.rounded-fieldset {
    border: 1px solid #d0d0d0;
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
}

.v-btn {
    text-transform: none;
    font-weight: 500;
    letter-spacing: 0.5px;
}

.v-card-title {
    font-size: 1.5rem;
    color: #50075e;
    margin-bottom: 1rem;
}

.v-card-text {
    color: #333;
    line-height: 1.6;
}

.v-checkbox {
    margin-top: 1rem;
}

.slide-fade-enter-active, .slide-fade-leave-active {
    transition: transform 0.4s ease, opacity 0.4s ease;
}

.slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}

    </style>
  