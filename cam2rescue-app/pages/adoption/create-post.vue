<template>
    <v-container>
        <div class="page-label animated-page-header">
            <h3>Create Post</h3>
        </div>
        
            <div class="animated-content">
                <form  @submit.prevent="submitImage">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field v-model="petName" label="Pet Name" variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select v-model="petGender" label="Pet Gender" variant="outlined" item-title="text" item-value="id" :items="gender"></v-select>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <v-textarea label="Description" v-model="petDescription" name="input-7-1" variant="outlined" auto-grow></v-textarea>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-file-input label="Upload Images" prepend-icon="mdi-camera" variant="outlined" type="file" @change="handleTargetSelected"></v-file-input>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <v-btn color="info" type="submit">Upload</v-btn>
                        </v-col>
                    </v-row>
                    <v-row>
                        <img v-if="imagePreview" :src="imagePreview" alt="Image Preview" style="max-width: 400px; height: auto;" class="mt-3"/>
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
        layout: "default-layout"
    });

    const imageFile = ref(null);
    const imagePreview = ref(null);
    const petName = ref('');
    const petGender = ref('');
    const petDescription = ref('');
    const base_url =  useApiUrl();
    const ID = generateUniqueIdb();

    const gender = [
        {text: "Male",      id: "M"},
        {text: "Female",    id: "F"}
    ];

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
            petDescription: petDescription.value,
            image: imageFile.value,
        };
        await handleAPIRequest(data, 'post-pet');
    };

    const handleAPIRequest = async (data = {}, apiRequest = '') => {
            const formData = new FormData();
            console.log('Data Vlaues', data);
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
    
</script>
