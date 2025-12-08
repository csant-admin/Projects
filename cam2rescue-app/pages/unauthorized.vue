<script setup>
</script>
<template>
  <div class="unauthorized-container">
    <div class="unauthorized-card">
      <div class="icon">
        🚫
      </div>
      <h1>Access Denied</h1>
      <p>
        You don't have permission to view this page.<br />
        Please contact your administrator if you believe this is an error.
      </p>
      <NuxtLink to="/" class="back-button">
        Go Back Home
      </NuxtLink>   

    </div>
  </div>
</template>

<style scoped>
    .unauthorized-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: linear-gradient(135deg, #f9fafb, #eef1f5);
        padding: 1rem;
    }

    .unauthorized-card {
        background: white;
        border-radius: 16px;
        padding: 2rem 2.5rem;
        box-shadow: 0 8px 20px rgba(0,0,0,0.08);
        text-align: center;
        max-width: 420px;
        width: 100%;
    }

    .icon {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    h1 {
        font-size: 1.8rem;
        margin-bottom: 0.5rem;
        color: #d32f2f;
    }

    p {
        font-size: 1rem;
        color: #555;
        margin-bottom: 1.5rem;
        line-height: 1.5;
    }

    .back-button {
        background: #1976d2;
        color: white;
        border: none;
        padding: 0.7rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-size: 0.95rem;
        transition: background 0.2s ease;
    }

    .back-button:hover {
        background: #125aa3;
    }
</style>
