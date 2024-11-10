<template>
    <v-app>
        <!-- Navigation Bar -->
        <v-app-bar app color="#6A0DAD">
            <v-container fluid>
                <v-row align="center" no-gutters>
                    <v-col class="text-left d-flex d-md-none">
                        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                    </v-col>
                    <v-col class="d-none d-md-flex">
                        <v-toolbar-title>
                            <v-btn text tag="nuxt-link" to="/user-dashboard">
                                Cam2Rescue
                            </v-btn>
                        </v-toolbar-title>
                    </v-col>

                    <v-col class="d-none d-md-flex text-right" cols="6">
                        <v-col cols="12">
                            <v-btn text tag="nuxt-link" to="/about">About Us</v-btn>
                            <v-btn text tag="nuxt-link" to="/contact">Contact Us</v-btn>
                            <template v-if="!isAuthenticated">
                            <v-btn text tag="nuxt-link" to="/login">Login</v-btn>
                            </template>
                            <template v-else>
                            <v-btn text @click="logout">Logout</v-btn>
                            </template>
                            <v-btn text tag="nuxt-link" to="/registration">Register</v-btn>
                            <v-btn text tag="nuxt-link" to="/adoption-form">Adoption</v-btn>
                        </v-col>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-navigation-drawer v-model="drawer" temporary app color="#6A0DAD">
            <v-list>
                <v-list-item link to="/about">About Us</v-list-item>
                <v-list-item link to="/contact">Contact Us</v-list-item>
                <template v-if="!isAuthenticated">
                    <v-list-item link to="/login">Login</v-list-item>
                </template>
                <template v-else>
                    <v-list-item @click="logout">Logout</v-list-item>
                </template>
                <v-list-item link to="/registration">Register</v-list-item>
                <v-list-item link to="/adoption-form">Adoption</v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-snackbar
            v-model="showSnackbar"
            :timeout="2000"
            color="#6A0DAD"
            elevation="24"
            location="top right"
            multi-line="true"
        >
            <div>
                <p>Logout Successful</p>
                <p><strong>Thank you for visiting <span style="letter-spacing: 2px;">Cam2Rescue</span></strong></p>
            </div>
        </v-snackbar>
           
        <!-- Main Content -->
        <v-main>
            <v-progress-linear v-if="loading" color="deep-purple-accent-4" indeterminate></v-progress-linear>
            <!-- Header -->
            <v-container class="text-center my-5">
                <v-row class="align-center justify-center">
                    <v-col cols="auto">
                        <img src="/assets/images/logo3.png" alt="Cam2Rescue Official logo" style="height: 100px;">
                    </v-col>
                    <v-col cols="auto">
                        <h1 class="page-header-text">
                            <span style="color: #6A0DAD">Cam</span>2Rescue
                        </h1>
                        <p>An online platform for pet rescue and shelter</p>
                    </v-col>
                </v-row>
            </v-container>

            <v-container fluid class="animated-content">
                <v-img src="../assets/images/cam2rescue-banner.jpg" class="banner-image">
                    <v-row class="fill-height" align="center" justify="center">
                        <v-col class="text-center">
                            <div class="action-btn">
                                <v-btn text tag="nuxt-link" to="/adoption/home" large color="primary" class="mx-3">Find Your Furry Friend</v-btn>
                                <v-btn large color="secondary" class="mx-3">Post Rescue</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-img>
                <v-card class="mt-4">
                    <p class="text-justify pa-4 home-p">
                        If you believe that animals need help as much as humans do, we, the cam2rescue team encourage you to support and donate to organizations located in Cebu. Cam2Rescue is a place where we prioritize the helpless strays. With our partnered organizations, they are always called upon to rescue animals suffering from abandonment, abuse, injury or neglect and none of it is possible without your support. Donations may be used to help cover the costs of daily operations, supplies, staff training, animal housing upgrades, community outreach programs, animal enrichment and much more.
                    </p>
                </v-card>
                <!-- Team Section -->
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
</template>

<script setup>
    import { ref } from 'vue';
    import '~/assets/css/main.css';
    const drawer = ref(false);
</script>

<style>
.v-tab--selected {
    color: #6A0DAD !important;
    border-bottom: 2px solid #6A0DAD !important;
    font-weight: bold !important;
}
.banner-image {
    position: relative;
}

.fill-height {
    @media only screen and (max-width: 620px){
        position: relative !important;
        padding: 10;
        top: 30% !important;
    }
}

.v-tabs-bar__content {
  transition: transform 6s ease-in-out !important;
}

.v-tabs-slider-wrapper {
  transition: transform 6s ease-in-out !important;
}

/* Change border color of the outlined text field when focused */
.v-autocomplete__selection {
    border-width: 2px !important;
    color: #6A0DAD !important;
}

.v-field--active {
    border-color: #6A0DAD !important; 
    border-width: 2px !important; 

}

.v-field--active {
    color: #6A0DAD !important;
}

.v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .9;
    position: absolute;
    width: 100%;
}

.action-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  z-index: 10;
  transition: opacity 0.3s ease;
}

/* Team Section Styling */
.team-section {
    padding: 2rem 0;
    background-color: #f9f9f9;
    border-top: 2px solid #6A0DAD;
}

.team-card {
    transition: transform 0.3s ease-in-out;
    background-color: white;
}

.team-card:hover {
    transform: translateY(-10px);
}

.team-member-card {
    margin-bottom: 1rem;
}

.team-member-name {
    color: #6A0DAD;
    font-weight: bold;
    font-size: 1.2rem;
}

.team-member-role {
    color: #6A0DAD;
    font-style: italic;
}

.team-image {
    border-radius: 50%;
    object-fit: cover;
    margin-top: -4rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

/* Scroll animation */
@keyframes fadeInUp {
    0% {
        opacity: 0;
        transform: translateY(30px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.animated-content {
    animation: fadeInUp 1.5s ease-in-out;
}

</style>