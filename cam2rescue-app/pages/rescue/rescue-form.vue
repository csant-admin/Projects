<template>
    <div>
    <v-container>
        <div class="page-label animated-page-header">
            <h3>Create Post</h3>
        </div>
        
            <div class="animated-content">
                <form  @submit.prevent="submitImage">
                    <v-row>
                        <v-col cols="6">
                            <v-text-field 
                                v-model="petName" 
                                label="Pet Name" 
                                variant="outlined"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-select 
                            v-model="petGender" 
                            label="Pet Gender" 
                            variant="outlined" 
                            item-title="text" 
                            item-value="id" 
                            :items="gender"
                        ></v-select>
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
                            <v-btn color="info" type="submit">Upload</v-btn>
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
    </div>
</template>

<script setup>

</script>