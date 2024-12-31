<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    const emits = defineEmits(['close-dialog']);
    const props = defineProps({
        utilityTitle: String,
        icon: String,
        show: Boolean
    });
    const base_url  = useApiUrl();
    const payload = ref({});
    const loading = ref(false);
    const snackbar = ref(false);
    const text = ref('');

    const dialogVisibility = ref(props.show);
    const closeDialog = () => {
        emits('close-dialog');
    }

    watch(() => props.show, (newValue) => {
        console.log(newValue);
        dialogVisibility.value = newValue;
    })

    const onSubmit = async (utilityTitle) => {
        let response;
        loading.value = true;
        try {
            switch(utilityTitle){
                case "Color":
                    response = await axios.post(`${base_url}api/add-new-color`, payload.value);
                    if(response) {
                        loading.value = false;
                        text.value = response.message || 'New color was added';
                        snackbar.value = true;
                    } else {
                        loading.value = false;
                        text.value = response.message || 'Failed to add new color';
                        snackbar.value = true;
                    }
                    break;
                case "Illness":
                    response = await axios.post(`${base_url}api/add-new-illness`, payload.value);
                    if(response) {
                        loading.value = false;
                        text.value = response.message || 'Added Successfully'
                        snackbar.value = true;
                    } else {
                        loading.value = false;
                        text.value = response.message || 'Added Failed'
                        snackbar.value = true;
                    }
                    break;
                case "Barangay":
                    response = await axios.post(`${base_url}api/add-new-barangay`, payload.value);
                    if(response) {
                        loading.value = false;
                        text.value = response.message || 'New barangay was added';
                        snackbar.value = true;
                    } else {
                        loading.value = false;
                        text.value = response.message || 'Failed to add new barangay';
                        snackbar.value = true;
                    }
                    break;
                case "Urgency":
                    response = await axios.post(`${base_url}api/add-new-urgency`, payload.value);
                    if(response) {
                        loading.value = false;
                        text.value = response.message || 'New urgency was added'
                        snackbar.value = true;
                    } else {
                        loading.value = false;
                        text.value = response.message || 'Failed to add new urgency'
                        snackbar.value = true;
                    }
                default:
                    response = await axios.post(`${base_url}api/add-new-injury`, payload.value)
                    if(response) {
                        loading.value = false;
                        text.value = response.message || 'New injury was added'
                        snackbar.value = true;
                    } else {
                        loading.value = false;
                        text.value = response.message || 'Failed to add new injury'
                        snackbar.value = true;
                    }
                    break;
            }
        } catch(error) {
            console.log(error);
        }
    
    }
</script>
<template>
    <v-dialog v-model="dialogVisibility" transition="dialog-top-transition" persistent max-width="400px">
            <v-card rounded>
                <v-progress-linear
                    v-if="loading"
                    color="#6A0DAD"
                    indeterminate
                ></v-progress-linear>
              <v-toolbar color="#6A0DAD" :title="'Add New ' + utilityTitle"></v-toolbar>
              <v-card-text class="text-h2 pa-12">
                <v-form @submit.prevent="onSubmit(utilityTitle)">
                    <v-text-field
                        label="New Utility"
                        v-model="payload.addNewUtility"
                        variant="outlined"
                    >
                    </v-text-field>
                    <v-btn 
                        type="submit" 
                        color="#6A0DAD"
                        >
                        <v-icon>
                            mdi-map-marker
                        </v-icon> 
                        Add {{ utilityTitle }}</v-btn>
                </v-form>
              </v-card-text>

              <v-card-actions class="justify-end">
                <v-btn
                  text="Close"
                  @click="closeDialog"
                ></v-btn>
              </v-card-actions>
            </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :multi-line="mode === 'multi-line'" right top :vertical="mode === 'vertical'"> {{ text }}</v-snackbar>
</template>
<style>

</style>