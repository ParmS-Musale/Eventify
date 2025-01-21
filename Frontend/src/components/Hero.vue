<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <section class="bg-gray-50 py-16">
    <div
      class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-between"
    >
      <!-- Left Content -->
      <div class="lg:w-1/2 text-center lg:text-left">
        <h1
          class="text-4xl lg:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Host, Connect, Celebrate: <br />
          <span class="text-purple-600">Your Events, Our Platform!</span>
        </h1>
        <p class="mt-4 text-gray-700 text-lg">
          Book and learn helpful tips from 3,168+ mentors in world-class
          companies with our global community.
        </p>
        <div class="mt-8">
          <RouterLink
            to="/explore"
            class="bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-purple-700"
          >
            Explore Now
          </RouterLink>
        </div>
      </div>

      <!-- Right Single Image -->
      <div class="mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end">
        <div class="w-80 h-50 overflow-hidden shadow-lg ">
          <img
            src="/src/assets/images/hero.png"
            alt="Event Preview"
            class="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </section>
</template>
