<!-- <template>
    <v-app>
        <v-main>
            <v-progress-linear v-if="loading" color="deep-purple-accent-4" indeterminate></v-progress-linear>
            <v-container fluid class="animated-content">
                <v-img src="../assets/images/c2r_bg5.webp" class="banner-image">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-col class="text-center">
                            <div class="glass-panel">
                                <v-btn 
                                    text tag="nuxt-link" 
                                    to="/adoption/home" 
                                    large color="primary" 
                                    class="mx-3 bg-button"
                                >
                                    Find Your Furry Friend
                                </v-btn>
                                <v-btn 
                                    large color="secondary" 
                                    class="mx-3 bg-button"
                                >
                                    Post Rescue
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
                <v-card class="mt-4">
                    <p class="text-justify pa-4 home-p">
                        If you believe that animals need help as much as humans do, we, the cam2rescue team encourage you to support and donate to organizations located in Cebu. Cam2Rescue is a place where we prioritize the helpless strays. With our partnered organizations, they are always called upon to rescue animals suffering from abandonment, abuse, injury or neglect and none of it is possible without your support. Donations may be used to help cover the costs of daily operations, supplies, staff training, animal housing upgrades, community outreach programs, animal enrichment and much more.
                    </p>
                </v-card>
      
                <v-container fluid class="team-section my-12">
                    <h2 class="text-center mb-8">Meet Our Team</h2>
                    <v-row>
                        <v-col cols="12" md="3" lg="2.4" class="team-member-card">
                            <v-hover v-slot:default="{ isHovering }">
                                <v-card class="elevation-1 team-card" outlined>
                                    <v-img src="/assets/images/team1.png" aspect-ratio="1" lazy-src="../assets/images/placeholder.jpg" class="team-image" transition="scale-transition" :eager="false" />
                                    <v-card-text class="text-center">
                                        <h3 class="team-member-name">Roselyn S. Ramos</h3>
                                        <p class="team-member-role">Founder & Project Manager</p>
                                        <p class="team-member-bio">Animal lover with a passion for rescue missions.</p>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col cols="12" md="3" lg="2.4" class="team-member-card">
                            <v-hover v-slot:default="{ isHovering }">
                                <v-card class="elevation-1 team-card" outlined>
                                    <v-img src="/assets/images/team4.png" aspect-ratio="1" lazy-src="../assets/images/placeholder.jpg" class="team-image" transition="scale-transition" :eager="false" />
                                    <v-card-text class="text-center">
                                        <h3 class="team-member-name">Regine Heruela</h3>
                                        <p class="team-member-role">Frontend Developer</p>
                                        <p class="team-member-bio">Animal lover with a passion for rescue missions.</p>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col cols="12" md="3" lg="2.4" class="team-member-card">
                            <v-hover v-slot:default="{ isHovering }">
                                <v-card class="elevation-1 team-card" outlined>
                                    <v-img src="/assets/images/team5.png" aspect-ratio="1" lazy-src="../assets/images/placeholder.jpg" class="team-image" transition="scale-transition" :eager="false" />
                                    <v-card-text class="text-center">
                                        <h3 class="team-member-name">Greg Jamero</h3>
                                        <p class="team-member-role">Layout Designer</p>
                                        <p class="team-member-bio">Animal lover with a passion for rescue missions.</p>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col cols="12" md="3" lg="2.4" class="team-member-card">
                            <v-hover v-slot:default="{ isHovering }">
                                <v-card class="elevation-1 team-card" outlined>
                                    <v-img src="/assets/images/team3.png" aspect-ratio="1" lazy-src="../assets/images/placeholder.jpg" class="team-image" transition="scale-transition" :eager="false" />
                                    <v-card-text class="text-center">
                                        <h3 class="team-member-name">Lorgel Cantal</h3>
                                        <p class="team-member-role">Client Coordinator</p>
                                        <p class="team-member-bio">Animal lover with a passion for rescue missions.</p>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                        <v-col cols="12" md="3" lg="2.4" class="team-member-card">
                            <v-hover v-slot:default="{ isHovering }">
                                <v-card class="elevation-1 team-card" outlined>
                                    <v-img src="/assets/images/team2.png" aspect-ratio="1" lazy-src="../assets/images/placeholder.jpg" class="team-image" transition="scale-transition" :eager="false" />
                                    <v-card-text class="text-center">
                                        <h3 class="team-member-name">Charlie Santander</h3>
                                        <p class="team-member-role">Website Developer / Programmer</p>
                                        <p class="team-member-bio">Animal lover with a passion for rescue missions.</p>
                                    </v-card-text>
                                </v-card>
                            </v-hover>
                        </v-col>
                    </v-row>
                </v-container>
            </v-container>
        </v-main>

        <v-footer app>
            <v-col class="text-center">
                <span>&copy; 2024 Cam2Rescue. All rights reserved.</span>
            </v-col>
        </v-footer>
    </v-app>
    <registration :show="showModal" @load-user="loadUserList" @close-modal="handleCloseModal" />
</template> -->

<template>
    <v-app>
        <v-main>
            <v-container fluid class="pa-0 animated animatedFadeInUp fadeInUp">
                <v-parallax
                    src="../assets/images/bg2.jpg"
                    height="90vh"
                >
                <div class="overlay"></div>
                    <v-row
                        align="center"
                        justify="center"
                        class="fill-height text-center px-4"
                    >
                        <v-col cols="12" md="8" lg="6">
                            <h1>
                                Give Every Animal a Second Chance
                            </h1>
                            <p class="subtitle-1">
                                Join Cam2Rescue in connecting loving homes with pets in need. Adopt, foster, or support our mission today.
                            </p>

                            <v-btn
                                text tag="nuxt-link" 
                                to="/adoption/home"
                                large
                                color="#50075e"
                                class="mr-4"
                                elevation="3"
                            >
                                Adopt a Pet
                            </v-btn>
                            <v-btn
                                to="/post-rescue"
                                large
                                outlined
                                color="white"
                                class="white--text"
                                elevation="3"
                            >
                                Post a Rescue
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-parallax>
                <v-container class="py-16 animated animatedFadeInUp fadeInUp">
                    <v-row justify="center" class="text-center mb-12">
                        <v-col cols="12" md="8">
                        <h2 class="text-h3 font-weight-bold mb-4">Why Choose Cam2Rescue?</h2>
                        <p class="subtitle-1 text--secondary">
                            We are committed to transparency, compassion, and community. Our platform makes adopting and rescuing pets simple, safe, and rewarding.
                        </p>
                        </v-col>
                    </v-row>
                    <v-row justify="center" align="stretch" dense>
                        <v-col cols="12" sm="6" md="4" class="mb-8">
                        <v-card class="pa-6 text-center elevation-2 hover-elevation-6 transition-smooth">
                            <v-icon size="48" color="#50075e" class="mb-4">mdi-heart</v-icon>
                            <h3 class="text-h6 font-weight-medium mb-2">Compassionate Care</h3>
                            <p class="text-body-2 text--secondary">
                            Every pet deserves love and care. We ensure all animals on our platform are treated with kindness and respect.
                            </p>
                        </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="mb-8">
                        <v-card class="pa-6 text-center elevation-2 hover-elevation-6 transition-smooth">
                            <v-icon size="48" color="#50075e" class="mb-4">mdi-account-group</v-icon>
                            <h3 class="text-h6 font-weight-medium mb-2">Trusted Community</h3>
                            <p class="text-body-2 text--secondary">
                            Connect with a network of passionate rescuers, adopters, and volunteers dedicated to animal welfare.
                            </p>
                        </v-card>
                        </v-col>
                        <v-col cols="12" sm="6" md="4" class="mb-8">
                        <v-card class="pa-6 text-center elevation-2 hover-elevation-6 transition-smooth">
                            <v-icon size="48" color="#50075e" class="mb-4">mdi-shield-check</v-icon>
                            <h3 class="text-h6 font-weight-medium mb-2">Safe & Secure</h3>
                            <p class="text-body-2 text--secondary">
                            We prioritize safety with verified listings and secure communication to protect both pets and adopters.
                            </p>
                        </v-card>
                        </v-col>
                    </v-row>
                </v-container>

                <!-- Meet Our Team Section -->
                <!-- <v-container fluid class="py-16 grey lighten-4">
                <h2 class="text-h4 font-weight-bold text-center mb-10">Meet Our Team</h2>
                <v-row justify="center" align="center" dense>
                    <v-col
                    v-for="member in teamMembers"
                    :key="member.name"
                    cols="12" sm="6" md="4" lg="2"
                    class="text-center"
                    >
                    <v-avatar size="140" class="mb-4 elevation-4">
                        <v-img :src="member.image" :alt="member.name" />
                    </v-avatar>
                    <h3 class="text-subtitle-1 font-weight-medium mb-1">{{ member.name }}</h3>
                    <p class="caption grey--text text--darken-1">{{ member.role }}</p>
                    </v-col>
                </v-row>
                </v-container> -->
            </v-container>
        </v-main>

        <v-footer app class="py-4">
            <v-container>
                <v-row no-gutters justify="center" align="center">
                <v-col cols="12" class="text-center white--text">
                    &copy; {{ new Date().getFullYear() }} Cam2Rescue. All rights reserved.
                </v-col>
                </v-row>
            </v-container>
        </v-footer>
    </v-app>
</template>

<script setup>
    import { ref } from 'vue';
    import Registration from '@/components/reusables/registration/Registration.vue';

    definePageMeta({
        layout: "user-default-layout",
        // middleware: 'auth'
    })

    // const teamMembers = ref([
    //     { name: 'Roselyn S. Ramos', role: 'Founder & Project Manager', image: '/assets/images/team1.png' },
    //     { name: 'Regine Heruela', role: 'Frontend Developer', image: '/assets/images/team4.png' },
    //     { name: 'Greg Jamero', role: 'Layout Designer', image: '/assets/images/team5.png' },
    //     { name: 'Lorgel Cantal', role: 'Client Coordinator', image: '/assets/images/team3.png' },
    //     { name: 'Charlie Santander', role: 'Website Developer', image: '/assets/images/team2.png' },
    // ]);

    const handleModal = () => {
        showModal.value = true;
    }

    const handleCloseModal = () => {
       showModal.value = false;
    }

</script>

<style scoped>
    h1 {
        font-size: 2.5rem;
        font-weight: bold;
        color: #50075e;
        text-shadow: 1px 1px 1px #000;
    }
    .subtitle-1 {
        font-size: 1.5rem;
        color: #50075e;
        text-shadow: 1px 1px 1px #000;
    }
    .v-btn {
        z-index: 10;
    }

    .v-parallax {
        position: relative;
    }

    .overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 1;
    }

    .v-parallax > .v-row {
        position: relative;
        z-index: 2;
    }

    .hover-elevation-6 {
        transition: box-shadow 0.3s ease;
    }

    .hover-elevation-6:hover {
        box-shadow: 0 12px 24px rgba(81, 45, 168, 0.3);
    }

    .text--secondary {
        color: rgba(0, 0, 0, 0.6);
    }

    .v-footer {
        font-weight: 400;
        font-size: 0.9rem;
    }

</style>
