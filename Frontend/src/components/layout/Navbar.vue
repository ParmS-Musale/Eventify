<template>
  <nav class="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    <!-- Logo Section -->
    <div class="flex items-center space-x-2">
      <!-- Make the logo smaller -->
      <img
        src="/src/assets/images/logo.svg"
        alt="Evently Logo"
        class="h-8 w-auto"
      />
    </div>

    <!-- Login Button aligned to the right -->
    <button
      class="ml-auto px-6 py-2 text-sm font-medium text-white bg-purple-500 rounded-full hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
    >
      Login
    </button>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
/* Add any additional styling here if needed */
</style>
