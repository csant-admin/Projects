<template>
    <v-container fluid>

      <!-- Address and Contact Information -->
      <div class="mx-auto px-16 py-12">
            <v-card-title class="text-center animated animatedFadeInUp fadeInUp" style="letter-spacing: 2px;">
                <h1><span style="color:#6A0DAD;">Cam</span>2Rescue</h1>
            </v-card-title>
		  	<p class="text-center ">An Online Platform form for pet rescue and shelter</p>
            <div class="animated animatedFadeInUp fadeInUp">
                <div class="py-8">
                    <div class="page-label">
                        <h3>Adoption Form</h3>
                    </div>
						<form>
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
										label="Street" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Barangay" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="City" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Email Address" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Mobile Number" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
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
										label="Last Name" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="First Name" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Middle Name" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Name Extension" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<!-- Additional fields as needed -->
								<v-col cols="12" md="3">
									<v-text-field 
										label="Date of Birth" 
										variant="outlined"
									></v-text-field>
								</v-col>
						
								<v-col cols="12" md="3">
									<v-text-field 
										label="Place of Birth" 
										variant="outlined"
									></v-text-field>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field 
										label="Gender" 
										variant="outlined"
									></v-text-field>
								</v-col>

								<v-col cols="12" md="3">
									<v-text-field 
										label="Status" 
										variant="outlined"
									></v-text-field>
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
										@click="readAgreement";
									></v-checkbox>
								</v-col>
							</v-row>
						
							<!-- Submit Button -->
							<v-row>
								<v-col cols="12">
									<v-btn color="#6A0DAD">Send Adoption Request Form</v-btn>
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
    const showAgreement = ref(false);
	const agreementConfirmed = ref(false);

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
  </script>
  
  <style scoped>
	.pb-4 {
		padding-bottom: 16px;
	}

  </style>
  