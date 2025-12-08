<template>
  <v-container class="story-board pa-6 animated animatedFadeInUp fadeInUp">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <h1 class="text-h3 font-weight-light text-center mb-8 primary--text">
            Story Board
        </h1>
        <p class="text-subtitle-1 text-center mb-10">
            Every rescued pet has a story worth telling. Inspire others, honor their journey, and let your voice be the one that saves the next life.
        </p>

        <div class="d-flex justify-end mb-6">
          <v-btn
            color="#50075e"
            elevation="2"
            @click="showAddStoryDialog"
            class="text-none font-weight-medium px-6"
          >
            <v-icon left>mdi-plus</v-icon>
            Share Your Story
          </v-btn>
        </div>

        <v-card
            class="animated animatedFadeInUp fadeInUp"
            v-for="story in stories"
            v-if="stories && stories.length"
            :key="story.id"
        >
            <v-card-title class="text-h5 font-weight-medium pt-4 px-4">
                    {{ story.Title }}
            </v-card-title>
                <v-card-subtitle class="pb-0 px-4">
                    <v-icon small color="grey darken-1">mdi-account</v-icon>
                    <span class="ml-1 grey--text text--darken-1">{{ story.user_details.Firstname }} {{ story.user_details.Lastname }}</span>
                    <v-icon small color="grey darken-1" class="ml-4">mdi-calendar</v-icon>
                    <span class="ml-1 grey--text text--darken-1">{{ formatDate(story.created_at) }}</span>
                </v-card-subtitle>
                <v-card-text class="text-body-1 px-4" style="white-space: pre-line;">
                    {{ truncateContent(story.Story) }}
                </v-card-text>
                <v-card-actions class="px-4 pb-4">
                    <v-btn
                        text
                        color="primary"
                        class="text-none font-weight-medium"
                        @click="likeStory(story.id)"
                    >
                        <v-icon left>mdi-heart</v-icon>
                        <!-- {{ story.likes }} Likes -->
                    </v-btn>
                    <v-btn
                        text
                        color="secondary"
                        class="text-none font-weight-medium"
                        @click="showComments(story.id)"
                    >
                        <v-icon left>mdi-comment</v-icon>
                        Comments
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn
                        text
                        color="primary"
                        class="text-none font-weight-medium"
                        @click="readMore(story.id)"
                    >
                        Read More
                        <v-icon right>mdi-chevron-right</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-- Pagination -->
            <div class="text-center mt-10">
                <v-pagination
                    v-model="page"
                    :length="totalPages"
                    @input="fetchStories"
                    color="primary"
                    circle
                ></v-pagination>
            </div>
        </v-col>
    </v-row>

    <v-dialog v-model="addStoryDialog" max-width="600px" persistent>
        <v-card rounded="lg" class="animated animatedFadeInUp fadeInUp">
            <v-card-title class="text-h5 font-weight-medium primary--text pa-4 text-center" style="letter-spacing: 2px;">
                Share your story with your pet
            </v-card-title>
            <v-card-text class="pa-4">
                <v-form @submit.prevent="submitStory" ref="storyForm">
                    <v-text-field
                        v-model="payload.title"
                        label="Title"
                        required
                        variant="outlined"
                        density="compact"
                        class="mb-4"
                    ></v-text-field>
                    <v-textarea
                        v-model="payload.content"
                        label="Your Story"
                        required
                        variant="outlined"
                        density="compact"
                        rows="6"
                        class="mb-4"
                    ></v-textarea>
                    <v-text-field
                        accept="image/*"
                        label="Add a photo (optional)"
                        variant="outlined"
                        type="file"
                        density="compact"
                        prepend-icon="mdi-camera"
                        show-size
                        @change="handleTargetSelected"
                        truncate-length="15"
                    ></v-text-field>
                </v-form>
                <v-row>
                    <img 
                        v-if="imagePreview" 
                        :src="imagePreview" 
                        alt="Image Preview" 
                        class="preview-image"
                    />
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn 
                    text color="grey darken-1" 
                    @click="addStoryDialog = false"
                >
                    Cancel
                </v-btn>
                <v-btn
                    color="#50075e"
                    :loading="submitting"
                    elevation="2"
                    @click="submitStory"
                    class="px-6"
                >
                    Share Story
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    definePageMeta({
        layout: 'user-default-layout',
        // middleware: 'auth'
    });

    const payload = ref({});
    const userID  = ref(null); 
    const imageFile = ref(null);
    const imagePreview = ref(null);
    const stories = ref([]);
    const page = ref(1);
    const totalPages = ref(1);
    const addStoryDialog = ref(false);
    const submitting = ref(false);

    // const Story = ref({
    //     title: '',
    //     content: '',
    //     author: '',
    //     date: '',
    //     likes: 0,
    // });

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

    const postStories = async () => {
        const data = {
            title: payload.value.title,
            content: payload.value.content,
            userId: userID.value,
            image: imageFile.value,
        };
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        try {
            const response = await axios.post(`${useApiUrl()}/api/my-story`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${useAuthStore().token}`,
                },
            });
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };

    
    const fetchStories = async () => {
   
        try {
            const response = await axios.get(`${useApiUrl()}/api/get-user-stories`, {
                headers: {
                    'Authorization': `Bearer ${useAuthStore().token}`,
                },
            });

            stories.value = response.data.data;
            console.log('Stories : ', stories.value);
            totalPages.value = response.data.data.length;
            console.log('Length : ', totalPages.value);
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };

    const showAddStoryDialog = () => {
    addStoryDialog.value = true;
    };

    const submitStory = async () => {

        submitting.value = true;
        addStoryDialog.value = false;
        submitting.value = false;
        await postStories();
    };



    const likeStory = async (storyId) => {
    // TODO: Implement liking a story
    };

    const showComments = (storyId) => {
    // TODO: Show comments for the story
    };

    const readMore = (storyId) => {
    // TODO: Navigate to full story page
    };

    const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    };

    const truncateContent = (content, maxLength = 200) => {
        if (content.length <= maxLength) return content;
        return content.substr(0, maxLength) + '...';
    };

    onMounted(() => {
        const loggedInUser = sessionStorage.getItem('user');
        if (loggedInUser) {
            const userObject = JSON.parse(loggedInUser);
            userID.value = userObject.UserID;
            fetchStories();
        }
    });
</script>

<style scoped>
    .story-board {
        background-color: #f8f9fa;
        min-height: 100vh;
    }

    .v-card {
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .v-card:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
        transform: translateY(-4px);
    }

    .v-btn {
        text-transform: none;
        letter-spacing: 0.5px;
    }

    .v-pagination {
        justify-content: center;
    }

    .preview-image {
        max-width: 100%;
        height: auto;
    }
</style>