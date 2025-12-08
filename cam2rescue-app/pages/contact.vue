
<template>
    <v-container class="contact-page">
        <v-row justify="center" align="center">
            <v-col cols="12" md="10" lg="8">
                <v-card class="contact-card animated animatedFadeInUp fadeInUp" elevation="3">
                    <v-row no-gutters>
                        <v-col cols="12" md="6" class="contact-image-col">
                            <v-img
                                src="../assets/images/bg2.jpg"
                                alt="Rescue Pets"
                                class="contact-image"
                                height="100%"
                                cover
                            ></v-img>
                        </v-col>
                        <v-col cols="12" md="6" class="contact-form-col">
                            <v-card-text>
                                <h2 class="text-h4 font-weight-bold mb-6">Get in Touch</h2>
                                <v-list>
                                    <v-list-item prepend-icon="mdi-email" class="mb-2">
                                        <v-list-item-title>contact@cam2rescue.com</v-list-item-title>
                                    </v-list-item>
                                    <v-list-item prepend-icon="mdi-phone" class="mb-4">
                                        <v-list-item-title>+63 900 123 4567</v-list-item-title>
                                    </v-list-item>
                                </v-list>
                                <v-form @submit.prevent="submitForm" class="mt-6 animated animatedFadeInUp fadeInUp">
                                    <v-text-field
                                        v-model="payload.FromName"
                                        label="Your Name"
                                        variant="outlined"
                                        required
                                        density="compact"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="payload.Subject"
                                        label="Subject"
                                        variant="outlined"
                                        type="text"
                                        required
                                        density="compact"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="payload.FromEmail"
                                        label="Your Email"
                                        variant="outlined"
                                        type="email"
                                        required
                                        density="compact"
                                    ></v-text-field>
                                    <v-textarea
                                        v-model="payload.Content"
                                        label="Your Message"
                                        variant="outlined"
                                        rows="4"
                                        required
                                        density="compact"
                                    ></v-textarea>
                                    <v-btn
                                        type="submit"
                                        color="#50075e"
                                        block
                                        class="mt-4"
                                        :loading="loading"
                                    >
                                        Send Message
                                    </v-btn>
                                </v-form>
                            </v-card-text>
                        </v-col>
                    </v-row>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

  <script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import { useAuthStore } from '@/stores/auth';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    
    const authStore = useAuthStore();
    import '~/assets/css/main.css';
    const drawer = ref(false);
    const isAuthenticated = ref(false);
    const showModal         = ref(false);

    definePageMeta({
        layout: 'user-default-layout',
        // middleware: 'auth'
    })

    const payload = ref({  
        FromName: '',
        Subject: '',
        FromEmail: '',
        Content: ''
    });
    const submitForm = async () => {
        try {
            const response = await axios.post(`${useApiUrl()}/api/send-email`, payload.value, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${useAuthStore().token}`,
                }
            });
            if (response.data.code === 200) {
                alert('email was sent to subject');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        }
    }

</script>
  
<style scoped>
    /* .contact-us {
        min-height: 100vh;
        display: flex;
        align-items: center;
    } */
     .contact-page {
  padding: 4rem 0;
  background-color: #f5f5f5;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.contact-card {
  border-radius: 16px;
  overflow: hidden;
}

.contact-image-col {
  min-height: 300px;
}

.contact-form-col {
  padding: 2rem;
}

@media (max-width: 960px) {
  .contact-image-col {
    min-height: 200px;
  }
  
  .contact-form-col {
    padding: 1.5rem;
  }
}
</style>
