<template>
    <v-container fluid>
        <h1>Dashboard</h1>
        <v-container fluid>
            <v-card
                height="100vh"
            >
                <v-toolbar>
                    <v-btn
                        class="pa-1 blinking-button"
                        >
                        New Pet For Rescue
                    </v-btn>
                    <v-btn
                        class="ml-2 pa-1 blinking-button"
                        >
                        New Request For Adoption
                    </v-btn>
                </v-toolbar>
                <v-row>
                    <v-col cols="12" sm="6" md="3">
                        <v-card rounded>
                        <v-card-title>Registered User</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="text-center">20</v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-card rounded>
                        <v-card-title>Rescued Pets</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="text-center">4</v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-card rounded>
                        <v-card-title>Adopted Pets</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="text-center">10</v-card-text>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                        <v-card rounded>
                        <v-card-title>Donated Amounts</v-card-title>
                        <v-divider></v-divider>
                        <v-card-text class="text-center">P 1000.00</v-card-text>
                        </v-card>
                    </v-col>
                    </v-row>

            </v-card>
        </v-container>
    </v-container>
</template>

<script setup>
    import {ref} from 'vue';
    definePageMeta({
        layout: "default-layout",
        middleware: 'auth'
    })
</script>
<style scoped>
    .blinking-button {
        background-color: #F44336; /* Deep purple */
        color: white;
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        animation: blink 1s infinite;
        transition: opacity 0.3s;
    }

    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }

    .blinking-button:hover {
        animation: none;
        opacity: 1; /* Ensure the button is fully visible when hovered */
    }

</style>