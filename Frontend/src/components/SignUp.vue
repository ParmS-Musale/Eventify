<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";

const firstName = ref("");
const lastName = ref("");
const email = ref("");
const password = ref("");
const toast = useToast();
const router = useRouter();

const handleSignup = async () => {
  try {
    const response = await fetch("http://localhost:5000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: firstName.value,
        lastName: lastName.value,
        emailId: email.value,
        password: password.value,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message); // Show success toast
      router.push("/login"); // Redirect to login page
    } else {
      toast.error(data.message); // Show error toast
    }
  } catch (error) {
    toast.error("An error occurred. Please try again.");
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-center text-2xl font-bold text-gray-800 mb-4">Evently</h2>
      <p class="text-center text-gray-600 mb-6">
        Create your account to continue to Evently
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

      <!-- Signup Form -->
      <form @submit.prevent="handleSignup">
        <div class="mb-4">
          <input
            v-model="firstName"
            type="text"
            placeholder="First name"
            class="border w-full p-2 rounded-lg text-gray-700"
            required
          />
        </div>
        <div class="mb-4">
          <input
            v-model="lastName"
            type="text"
            placeholder="Last name"
            class="border w-full p-2 rounded-lg text-gray-700"
            required
          />
        </div>
        <div class="mb-4">
          <input
            v-model="email"
            type="email"
            placeholder="Email address"
            class="border w-full p-2 rounded-lg text-gray-700"
            required
          />
        </div>
        <div class="mb-6">
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="border w-full p-2 rounded-lg text-gray-700"
            required
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
        Have an account?
        <router-link to="/login" class="text-purple-600 font-bold"
          >Sign in</router-link
        >
      </p>
    </div>
  </div>
</template>
