
<template>
    <v-container class="about-page animated animatedFadeInUp fadeInUp">
        <v-row justify="center" align="center">
        <v-col cols="12" md="10" lg="8">
            <v-card class="about-card animated animatedFadeInUp fadeInUp" elevation="2">
            <v-card-title class="text-h4 font-weight-bold text-center mb-6">
                About Cam2Rescue
            </v-card-title>
            
            <v-row>
                <v-col cols="12" md="6">
                <v-img 
                    src="../assets/images/bg2.jpg" 
                    alt="Rescue Pets" 
                    class="about-image"
                    cover
                ></v-img>
                </v-col>
                
                <v-col cols="12" md="6">
                <div class="about-content animated animatedFadeInUp fadeInUp">
                    <h2 class="text-h5 font-weight-medium mb-4">Our Mission</h2>
                    <p class="text-body-1">
                    At Cam2Rescue, we are dedicated to creating a world where every pet has a loving home. 
                    Our mission is to connect compassionate individuals with animals in need, 
                    facilitating adoptions that enrich both human and animal lives.
                    </p>
                    
                    <h2 class="text-h5 font-weight-medium mt-6 mb-4">Our Vision</h2>
                    <p class="text-body-1">
                    We envision a future where animal shelters are no longer necessary, 
                    and every pet is cherished in a caring home. Through education, 
                    community engagement, and innovative adoption processes, 
                    we strive to make this vision a reality.
                    </p>
                </div>
                </v-col>
            </v-row>
            
            <v-divider class="my-8"></v-divider>
            
            <v-row class="values-section">
                <v-col cols="12" md="4" v-for="(value, index) in coreValues" :key="index">
                  <v-card class="value-card" elevation="2">
                    <div class="value-item text-center">
                        <v-icon :icon="value.icon" size="large" color="#50075e" class="mb-4"></v-icon>
                        <h3 class="text-h6 font-weight-medium mb-2">{{ value.title }}</h3>
                        <p class="text-body-2">{{ value.description }}</p>
                    </div>
                  </v-card>
                </v-col>
            </v-row>
            </v-card>
        </v-col>
        </v-row>
    </v-container>
</template>
  
  <script setup>
        import { ref } from 'vue';
        import Registration from '@/components/reusables/registration/Registration.vue';

        definePageMeta({
            layout: "user-default-layout",
            // middleware: 'auth'
        })

        const showModal         = ref(false);

        const handleModal = () => {
            showModal.value = true;
        }

        const handleCloseModal = () => {
            showModal.value = false;
        }

        const coreValues = ref([
            {
                icon: 'mdi-heart',
                title: 'Compassion',
                description: 'We approach every animal and adopter with empathy and understanding.'
            },
            {
                icon: 'mdi-account-group',
                title: 'Community',
                description: 'We believe in the power of community to make a difference in animal welfare.'
            },
            {
                icon: 'mdi-shield-check',
                title: 'Responsibility',
                description: 'We promote responsible pet ownership and ethical adoption practices.'
            }
        ]);

  </script>
  
<style scoped>
    .about-page {
        padding-top: 2rem;
        padding-bottom: 2rem;
        background-color: #f5f5f5;
    }

.about-card {
	background-color: white;
	border-radius: 16px;
	overflow: hidden;
	padding: 2rem;
}

.about-image {
	border-radius: 8px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.about-content {
  	padding: 0 1rem;
}

.values-section {
  	margin-top: 2rem;
}

.value-item {
	padding: 1rem;
	transition: transform 0.3s ease;
}

.value-item:hover {
  	transform: translateY(-5px);
}

@media (max-width: 960px) {
	.about-content {
		padding: 2rem 0 0 0;
	}
}
</style>
