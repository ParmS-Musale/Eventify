<script setup>
import { RouterLink, useRoute } from "vue-router";

// Get current route
const route = useRoute();

// Check if a link is active
const isActiveLink = (path) => route.path === path;
</script>

<template>
  <nav class="bg-white border-b border-gray-300">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo Section -->
        <div class="flex items-center">
          <RouterLink to="/" class="flex items-center">
            <img
              src="/src/assets/images/logo.png"
              alt="Evently"
              class="h-8 w-auto"
            />
            <span class="ml-2 text-2xl font-bold text-gray-800"></span>
          </RouterLink>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-6">
          <RouterLink
            to="/"
            class="text-gray-800 hover:text-purple-600 font-medium"
            :class="{ 'text-purple-600': isActiveLink('/') }"
          >
            Home
          </RouterLink>
          <RouterLink
            to="/events"
            class="text-gray-800 hover:text-purple-600 font-medium"
            :class="{ 'text-purple-600': isActiveLink('/my-events') }"
          >
            Events
          </RouterLink>
          <RouterLink
            to="/profile-view"
            class="text-gray-800 hover:text-purple-600 font-medium"
            :class="{ 'text-purple-600': isActiveLink('/my-profile') }"
          >
            My Profile
          </RouterLink>
        </div>

        <!-- Login Button -->
        <div>
          <RouterLink
            to="/login"
            class="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 font-medium"
          >
            Login
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
  

  