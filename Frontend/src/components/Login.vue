<script setup>
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-4">Evently</h2>
      <p class="text-center text-gray-600 mb-6">
        Sign in to continue to Evently
      </p>

      <!-- Social Login -->
      <div class="flex justify-center gap-4 mb-4">
        <button class="bg-gray-100 p-3 rounded-full">
          <i class="fab fa-github text-gray-800"></i>
        </button>
        <button class="bg-gray-100 p-3 rounded-full">
          <i class="fab fa-google text-gray-600"></i>
        </button>
      </div>
      <div class="flex items-center my-4">
        <div class="border-t border-gray-300 flex-grow"></div>
        <span class="mx-2 text-sm text-gray-500">or</span>
        <div class="border-t border-gray-300 flex-grow"></div>
      </div>

      <!-- Login Form -->
      <form>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Email Id"
            class="border w-full p-2 rounded-lg text-gray-700"
          />
        </div>
        <div class="mb-4">
          <input
            type="text"
            placeholder="Password"
            class="border w-full p-2 rounded-lg text-gray-700"
          />
        </div>
        <button
          type="submit"
          class="w-full bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700"
        >
          Continue
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-4">
        No account?
        <a href="/signup" class="text-purple-600 font-bold">Sign up</a>
      </p>
    </div>
  </div>
</template>
  

  
  <style scoped>
</style>
  