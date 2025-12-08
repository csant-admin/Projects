<script setup>
    import {ref} from 'vue';
    import axios from 'axios';
    const { showAlert } = useAlert()
    const props = defineProps({
        show: {
            type: Boolean,
            default: false
        },
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

    const handleRegistration = async () => {
      await handleAPIRequest(payload.value, 'add-user');
    };

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
        try {
            loading.value = true;
            let response;
            switch(apiRequest) {
                case 'add-user':
                    response = await axios.post(`${base_url}/api/add-user`, data);
                    showSnackbar.value = true;
                    if(response ) {
                        showAlert('User Registered Successfully.', 'success');
                        isError.value = false;
                        closeModal();
                        emits('load-user');
                    } else {
                        message.value = response.message ? response.message : 'Failed To Register, Call Cam2Rescue Team';
                        showAlert(message.value, 'error');
                        isError.value = true;
                    }
                    payload.value = {};
                    break;
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

                case 'get-organization-type':
                    response = await axios.get(`${base_url}/api/get-organization-type`);
                    orgType.value = response.data;
                    loading.value = false;
                    break;

                default:
                    throw new Error('Invalid API request');
            }
            return response.data;
        } catch (error) {
            showAlert('Something went wrong, Please try again later', 'error');
            throw error;
        } finally {
            loading.value = false;
        }
    };
    
    let dialogVisibility = ref(props.show);
    const closeModal = () => {
        payload.value = {};
        emits('close-modal');
    }

    watch(() => props.show,(newValue) => {
        dialogVisibility.value = newValue;
        handleAPIRequest({}, 'get-gender');
        handleAPIRequest({}, 'barangay-list');
        handleAPIRequest({}, 'get-statuses');
        handleAPIRequest({}, 'get-user-type');
        handleAPIRequest({}, 'get-organization-type');
    });

</script>

<template>
    <v-dialog v-model="dialogVisibility" persistent fullscreen hide-overlay>
        <div class="registration-container">
            <v-card class="registration-card pa-8 rounded-2xl shadow-lg form-card animated animatedFadeInUp fadeInUp" >
                <v-card-title class="mt-4 text-center animated animatedFadeInUp fadeInUp" style="letter-spacing: 2px;">
                    <h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
                </v-card-title>
                <div class="animated animatedFadeInUp fadeInUp">
                    <p class="text-center ">An Online Platform form for pet rescue and shelter</p>
                    <div class="page-label">
                        <h3 class="text-2xl font-bold text-center">Registration Form</h3>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="py-8">
                        <v-form @submit.prevent="handleRegistration" ref="form" v-model="valid" class="registration-form">
                            <!-- Personal Info + Other Details Row -->
                            <v-row>
                                <!-- Left Column: Name Fields -->
                                <v-col cols="6">
                                    <!-- Last Name -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Last Name:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Lastname"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            hint="Last Name"
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- First Name -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">First Name:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Firstname"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            hint="First Name"
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- Middle Name -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Middle Name:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Middlename"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            hint="Middle Name"
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <!-- Right Column: Other Details -->
                                <v-col cols="6">
                                    <!-- Date of Birth -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Date of Birth:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.dob"
                                            type="date"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- Gender -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Gender:</v-col>
                                        <v-col cols="8">
                                            <v-autocomplete
                                            v-model="payload.Gender"
                                            :items="gender_data"
                                            item-title="description"
                                            item-value="id"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- Status -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Status:</v-col>
                                        <v-col cols="8">
                                            <v-autocomplete
                                            v-model="payload.Status"
                                            :items="statuses"
                                            item-title="description"
                                            item-value="id"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- Barangay -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Barangay:</v-col>
                                        <v-col cols="8">
                                            <v-autocomplete
                                            v-model="payload.Barangay"
                                            :items="barangay_data"
                                            item-title="description"
                                            item-value="id"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- City -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">City:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.City"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <!-- User Type -->
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">User Type:</v-col>
                                        <v-col cols="8">
                                            <v-autocomplete
                                            v-model="payload.UserType"
                                            :items="userType"
                                            item-title="description"
                                            item-value="id"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-divider class="my-6"></v-divider>
                            <!-- Username & Email Row -->
                            <v-row>
                                <v-col cols="6">
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Email:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Email"
                                            :rules="emailRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Username:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Username"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Password:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Password"
                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                            :type="visible ? 'text' : 'password'"
                                            @click:append-inner="toggleVisibility"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Confirm Password:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.Password_confirmation"
                                            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                                            :type="visible ? 'text' : 'password'"
                                            @click:append-inner="toggleVisibility"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>
                                </v-col>
                                <v-col cols="6" v-if="parseInt(payload.UserType) === 2">
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Organization Type:</v-col>
                                        <v-col cols="8">
                                            <v-autocomplete
                                            v-model="payload.OrgType"
                                            :items="orgType"
                                            item-title="description"
                                            item-value="id"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Organization Name:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.OrgName"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                        />
                                        </v-col>
                                    </v-row>
                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">Barangay:</v-col>
                                            <v-col cols="8">
                                                <v-autocomplete
                                                v-model="payload.OrgBarangay"
                                                :items="barangay_data"
                                                item-title="description"
                                                item-value="id"
                                                :rules="fieldRules"
                                                variant="outlined"
                                                density="compact"
                                                hide-details
                                            />
                                        </v-col>
                                    </v-row>

                                    <v-row align="center">
                                        <v-col cols="4" class="text-right">City:</v-col>
                                        <v-col cols="8">
                                            <v-text-field
                                            v-model="payload.OrgCity"
                                            :rules="fieldRules"
                                            variant="outlined"
                                            density="compact"
                                            hide-details
                                            />
                                        </v-col>
                                    </v-row>
                            </v-col>
                            </v-row>
                            <!-- Action Buttons -->
                            <v-row class="mt-4 mb-6" align="right">
                                <v-col>
                                    <v-btn color="#6A0DAD" type="submit" class="text-white align-right">
                                    <v-icon left>mdi-account-plus</v-icon> Register User
                                    </v-btn>
                                    <v-btn class="bg-error ml-2" @click.prevent="closeModal">Close</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </div>
                </div>
            </v-card>
        </div>
    </v-dialog>
    <div v-if="loading">
        <v-progress-linear
            color="deep-orange"
            height="10"
            model-value="60"
            striped
        ></v-progress-linear>
    </div>
</template>

<style scoped>
    html, body, #app, .v-application {
        height: 100%;
    }

    .v-container {
        height: 100%;
    }
    .v-col.v-col-8 {
        padding: 0 12px;
    }

    .registration-container {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		background: linear-gradient(
			to bottom right,
			rgba(247, 247, 247, 0.9),
			rgba(255, 255, 255, 0.9)
		),
		url('https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=1600&q=80');
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
		position: relative;
		overflow: hidden;
	}

	.registration-container::after {
		content: "";
		position: absolute;
		background: radial-gradient(circle, rgba(255, 182, 193, 0.3), transparent 70%);
		top: 10%;
		right: 15%;
		border-radius: 50%;
		filter: blur(80px);
		animation: softPulse 6s ease-in-out infinite;
	}

	@keyframes softPulse {
		0%, 100% { opacity: 0.4; transform: scale(1); }
		50% { opacity: 0.8; transform: scale(1.1); }
	}

	.registration-card {
		width: 100%;
		padding: 2.5rem;
		background: rgba(255, 255, 255, 0.85);
		border-radius: 16px !important;
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(10px);
		position: relative;
		z-index: 1;
		border: 1px solid rgba(255, 255, 255, 0.6);
	}

    .registration-form {
		display: flex;
		flex-direction: column;
	}

    /* .form-card {
        border: 1px solid #e8e8e8;
        background: #fff;
        animation: fadeUp 0.4s ease;
    } */
    .section-title {
        font-size: 1.4rem;
        font-weight: 600;
        color: #6A0DAD;
        text-align: center;
        margin-bottom: 1.5rem;
    }
    .v-dialog .v-card {
        overflow-y: auto;
        max-height: 90vh;
    }
    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @media (max-width: 960px) {
        .text-right {
            text-align: left !important;
        }
    }

</style>

  