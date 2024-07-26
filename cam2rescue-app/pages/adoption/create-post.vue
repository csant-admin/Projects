<template>
    <v-container>
        <div>
            <h3>Create Post</h3>
        </div>
        <form>
            <v-row>
                <v-col cols="6">
                    <v-text-field v-model="objectData.petName" label="Pet Name" variant="solo"></v-text-field>
                </v-col>
                <v-col cols="6">
                    <v-select v-model="objectData.petGender" label="Pet Name" variant="solo"></v-select>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-textarea label="Description" v-model="objectData.petDescription" name="input-7-1" variant="solo" auto-grow></v-textarea>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-file-input label="Upload Images" prepend-icon="mdi-camera" variant="solo"></v-file-input>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="6">
                    <v-btn color="info">Upload</v-btn>
                </v-col>
            </v-row>
        </form>
    </v-container>
</template>

<script setup>
    import {ref} from 'vue';
    definePageMeta({
        layout: "default-layout"
    });

    const objectData = ref({
        petName: "",
        petGender: "",
        petDescription: "",
        petImage: "",
    })
</script>