<template>
    <v-container>
        <div class="page-label animated-page-header">
            <h3>Create Post</h3>
        </div>
        
            <div class="animated animatedFadeInUp fadeInUp">
                <form  @submit.prevent="submitImage">
                    <v-row>
                        <v-col cols="4">
                            <v-text-field 
                                v-model="petName" 
                                label="Pet Name" 
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete 
                            v-model="petGender" 
                            label="Pet Gender" 
                            variant="outlined" 
                            :items="gender"
                            item-title="description" 
                            item-value="id" 
                        ></v-autocomplete>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete
                            v-model="petColor" 
                            label="Pet Color" 
                            variant="outlined" 
                            :items="color"
                            item-title="description" 
                            item-value="id" 
                        ></v-autocomplete>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea 
                            label="Description" 
                            v-model="petDescription" 
                            name="input-7-1" 
                            variant="outlined" 
                            auto-grow
                        ></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field 
                                label="Upload Images" 
                                variant="outlined" 
                                type="file" 
                                @change="handleTargetSelected"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-btn color="#6A0DAD" type="submit">Upload</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <img 
                            v-if="imagePreview" 
                            :src="imagePreview" 
                            alt="Image Preview" 
                            style="max-width: 400px; height: auto;" class="mt-3"
                        />
                    </v-row>
                </form>
            </div>
    </v-container>
</template>

<script setup>
    import {ref, onBeforeUnmount } from 'vue';
    import axios from 'axios';
    import { generateUniqueIdb } from '~/assets/js/IDCenter';
    import { logEvent } from '~/assets/js/LoggingService';
    import '~/assets/css/main.css'
    definePageMeta({
        layout: "default-layout",
        middleware: 'auth'
    });

    const imageFile = ref(null);
    const imagePreview = ref(null);
    const petName = ref('');
    const petGender = ref('');
    const petColor = ref('');
    const petDescription = ref('');
    const color = ref([]);
    const gender = ref([]);
    const base_url =  useApiUrl();
    const ID = generateUniqueIdb();

    const handleTargetSelected = (event) => {
        if (event.target.files.length === 0) {
            imageFile.value = null;
            imagePreview.value = null;
            return;
        }

        imageFile.value = event.target.files[0];

        if (imagePreview.value) {
            URL.revokeObjectURL(imagePreview.value);
        }
        imagePreview.value = URL.createObjectURL(imageFile.value);
    };

    const submitImage = async () => {
        const data = {
            petId: ID,
            petName: petName.value,
            petGender: petGender.value,
            petColor: petColor.value,
            petDescription: petDescription.value,
            image: imageFile.value,
        };
        await handleAPIRequest(data, 'post-pet');
    };

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
            const formData = new FormData();
            for (const key in data) {
                formData.append(key, data[key]);
            }
            console.log('Data', formData);
            try {
                let response;
                switch(apiRequest) {
                    case 'post-pet':
                        response = await axios.post(`${base_url}api/post-pet`, formData, {
                            headers: {
                                'Content-Type': 'multipart/form-data',
                            },
                        });
                        logEvent('Uploading Pet', {
                            upload: {
                                petId: data.petId,
                                petName: data.petname,
                                sex: data.petGender,
                                description: data.petDescription,
                                image: data.image.name
                            }
                        });
                        break;
                    
                    case 'fetch-images':
                        response = await axios.get(`${base_url}api/images`);
                        break;

                    case 'get-gender':
                        response = await axios.get(`${base_url}api/get-gender`);
                        gender.value = response.data;
                        loading.value = false;
                        break;

                    case 'color-list':
                        response = await axios.get(`${base_url}api/color-list`);
                        color.value = response.data;
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

        onBeforeUnmount(() => {
            if (imagePreview.value) {
                URL.revokeObjectURL(imagePreview.value);
            }
        });

        onMounted(() => {
            handleAPIRequest('', 'color-list');
            handleAPIRequest('', 'get-gender');
        })
    
</script>

<style>
    .file-upload-icon {
        position: absolute;
        top: 50%;
        left: 10px;
        transform: translateY(-50%);
    }
</style>
