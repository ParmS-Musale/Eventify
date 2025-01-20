<!-- Sign-Up Component -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-sm">
      <div class="text-center">
        <!-- <img src="/path/to/logo.png" alt="Evently" class="h-10 mx-auto mb-4"> -->
        <h2 class="text-xl font-semibold mb-2">Create your account</h2>
        <p class="text-gray-600 text-sm mb-4">to continue to Evently</p>
      </div>

      <div class="flex justify-between mb-4">
        <button
          class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full flex items-center justify-center w-10 h-10"
        >
          <i class="fab fa-github text-gray-800"></i>
        </button>
        <button
          class="bg-gray-100 hover:bg-gray-200 p-2 rounded-full flex items-center justify-center w-10 h-10"
        >
          <i class="fab fa-google text-red-600"></i>
        </button>
      </div>

      <div class="relative text-center mb-4">
        <span class="text-gray-400 text-sm bg-white px-2 relative z-10"
          >or</span
        >
        <div class="absolute inset-0 border-t border-gray-200"></div>
      </div>

      <form @submit.prevent="handleSignUp">
        <div class="grid grid-cols-2 gap-2 mb-4">
          <input
            type="text"
            v-model="firstName"
            placeholder="First name"
            class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            v-model="lastName"
            placeholder="Last name"
            class="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <input
          type="text"
          v-model="username"
          placeholder="Username"
          class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="email"
          v-model="email"
          placeholder="Email address"
          class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          class="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700"
        >
          Continue
        </button>
      </form>

      <p class="text-sm text-center mt-4 text-gray-600">
        Have an account?
        <a
          href="#"
          class="text-purple-600 hover:underline"
          @click="$emit('toggle-view')"
          >Sign in</a
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["toggleView"],
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    handleSignUp() {
      // Handle sign-up logic here
      console.log(
        "Sign up with:",
        this.firstName,
        this.lastName,
        this.username,
        this.email,
        this.password
      );
    },
  },
};
</script>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
</style>
