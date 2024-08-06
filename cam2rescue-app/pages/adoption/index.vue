<template>
    <div>
        <h1>Adoption Request</h1>
    </div>
</template>

<script setup>

    import {ref} from 'vue';
    definePageMeta({
        layout: "default-layout"
    });

</script>

<script>
    export default {
        middleware: 'auth'
    }
</script>