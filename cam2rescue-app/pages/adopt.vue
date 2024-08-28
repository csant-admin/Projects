<template>
    <v-container>
        <div class="mx-auto px-6 py-8">
            <v-card-title class="text-center animated animatedFadeInUp fadeInUp" style="letter-spacing: 2px;">
                <h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
            </v-card-title>
		  <p class="text-center ">An Online Platform form for pet rescue and shelter</p>
            <div class="animated animatedFadeInUp fadeInUp">
                <div class="py-8">
                    <div class="page-label">
                        <h3>Adoption Form</h3>
                    </div>
                    <form @submit.prevent="handleAdoption">
                        <v-row>
                            <v-col cols="12">
                                <v-subheader 
                                    class="pb-4"
                                >
                                    Address and Contact Information
                                </v-subheader>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Street"
                                    label="Street" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-autocomplete 
                                    v-model="payload.Barangay"
                                    label="Barangay" 
                                    variant="outlined"
                                    :items="barangay_data"
                                    item-title="description"
                                    item-value="id"
                                ></v-autocomplete>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.City"
                                    label="City" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Email"
                                    label="Email Address" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Mobile_No"
                                    label="Mobile Number" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Tel_No"
                                    label="Telephone Number" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    
                        <!-- Adoptee Information -->
                        <v-row>
                            <v-col cols="12">
                                <v-subheader 
                                    class="pb-4"
                                >
                                    Adoptee Information
                                </v-subheader>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Lastname"
                                    label="Last Name" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="payload.Firstname"
                                    label="First Name" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Middlename"
                                    label="Middle Name" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field 
                                    v-model="payload.Suffix"
                                    label="Name Extension" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <!-- Additional fields as needed -->
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="payload.dob" 
                                    label="Date of Birth" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>
                    
                            <v-col cols="12" md="3">
                                <v-text-field
                                    v-model="payload.PlaceOfBirth" 
                                    label="Place of Birth" 
                                    variant="outlined"
                                ></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-autocomplete 
                                    v-model="payload.Gender"
                                    label="Gender" 
                                    variant="outlined"
                                    :items="gender_data"
                                    item-title="description"
                                    item-value="id"
                                ></v-autocomplete>
                            </v-col>

                            <v-col cols="12" md="3">
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
                    
                        <!-- Agreement Section -->
                        <v-row>
                            <v-col cols="12">
                                <v-checkbox
                                    v-model="agreementConfirmed"
                                    label="I agree to the terms and conditions of Cam2Rescue"
                                    variant="outlined"
                                    color="#6A0DAD"
                                    @click="readAgreement"
                                ></v-checkbox>
                            </v-col>
                        </v-row>
                    
                        <!-- Submit Button -->
                        <v-row>
                            <v-col cols="12">
                                <v-btn color="#6A0DAD" type="submit">Send Adoption Request Form</v-btn>
                            </v-col>
                        </v-row>
                    </form>
                </div>
            </div>
        </div>
        <div class="pa-4 text-center">
			<v-dialog max-width="800" v-model="showAgreement">
				<v-card>
					<v-card-title>Terms and Conditions</v-card-title>
					<v-card-text>
						<p>
							Welcome to Cam2Rescue! By using our services, you agree to the
							following terms and conditions regarding the use of your
							information:
						</p>

						<ol>
							<li>
								<strong>Information Collection:</strong> We collect personal
								information such as your name, contact details, and any other
								information you provide when using our services. This information
								is collected to ensure that we can effectively provide our
								services and keep you updated.
							</li>
							<li>
								<strong>Use of Information:</strong> The information you provide
								will be used solely for the purposes of operating Cam2Rescue,
								including contacting you regarding adoption, rescue, and other
								related services. Your information will not be shared with third
								parties without your explicit consent.
							</li>
							<li>
								<strong>Data Security:</strong> We take data security seriously
								and implement various measures to protect your personal
								information. However, please note that no method of transmission
								over the internet is 100% secure.
							</li>
							<li>
								<strong>User Responsibilities:</strong> You are responsible for
								ensuring that the information you provide is accurate and
								up-to-date. Misuse of the platform or providing false information
								may result in termination of your access to Cam2Rescue services.
							</li>
							<li>
								<strong>Changes to Terms:</strong> Cam2Rescue reserves the right
								to modify these terms and conditions at any time. We will notify
								users of significant changes via email or through our platform.
							</li>
						</ol>
					</v-card-text>

					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn text @click="agreementDisagreed">Disagree</v-btn>
						<v-btn color="primary" @click="handleAgreement">Agree</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</div>
    </v-container>
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
    const CivilStatus            = ref('');
    const Barangay          = ref('');
    const City              = ref('');
    const Email             = ref('');
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
    const showAgreement = ref(false);
	const agreementConfirmed = ref(false);

    const payload = ref({
        Street: '',
        Barangay: '',
        City: '',
        Email: '',
        Mobile_No: '',
        Tel_No: '',
        Lastname: '',
        Firstname: '',
        Middlename: '',
        Suffix: '',
        dob: '',
        PlaceOfBirth: '',
        Gender: '',
        CivilStatus: ''
    });

    const handleAdoption = () => {
        console.log(payload);
    }

	const emit = defineEmits(['update:payload']);
	console.log('Payload : ', payload);

	const readAgreement = () => {
		agreementConfirmed.value = false;
		showAgreement.value = true;
	};
	const agreementDisagreed = () => {
		agreementConfirmed.value = false;
		showAgreement.value = false;
	}
  	const handleAgreement = () => {
		agreementConfirmed.value = true;
		showAgreement.value = false;
	}

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