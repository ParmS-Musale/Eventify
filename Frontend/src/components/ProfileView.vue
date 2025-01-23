<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const profile = ref({
  firstName: "",
  lastName: "",
  emailId: "",
  role: 0,
  photoUrl: "",
  createdAt: "",
  updatedAt: "",
  registeredEvents: [],
});

const fetchProfile = async () => {
  try {
    const response = await axios.get("http://localhost:5000/profile/view",{
      withCredentials: true,
    });
    profile.value = response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    alert("Failed to load profile data.");
  }
};

onMounted(fetchProfile);
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <div
      class="bg-white rounded-lg shadow-lg flex flex-col md:flex-row w-full max-w-6xl mx-auto"
    >
      <!-- Left Section -->
      <div class="w-full md:w-1/3 border-r p-6">
        <!-- Profile Info -->
        <div class="flex flex-col items-center">
          <img
            :src="profile.photoUrl || '/default-placeholder.jpg'"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full object-cover mb-4"
          />
          <h2 class="text-xl font-bold text-gray-900">
            {{ profile.firstName }} {{ profile.lastName }}
          </h2>
          <p class="text-sm text-gray-500">{{ profile.emailId }}</p>
          <p class="text-sm text-gray-400 mt-2">
            Joined {{ new Date(profile.createdAt).toLocaleDateString() }}
          </p>
        </div>

        <!-- Stats -->
        <div class="mt-6">
          <h3 class="text-lg font-semibold text-center text-gray-900 mb-4">Status</h3>
          <div class="space-y-4">
            <div class="bg-gray-100 rounded-lg p-4 text-center">
              <h4 class="text-xl font-bold text-gray-800">5</h4>
              <p class="text-sm text-gray-500">Days of Streak</p>
            </div>
            <div class="bg-gray-100 rounded-lg p-4 text-center">
              <h4 class="text-xl font-bold text-gray-800">{{ profile?.registeredEvents?.length }}</h4>
              <p class="text-sm text-gray-500">Registered Events</p>
            </div>
            <div class="bg-gray-100 rounded-lg p-4 text-center">
              <h4 class="text-xl font-bold text-gray-800">
                {{ profile.role }}
              </h4>
              <p class="text-sm text-gray-500">User Role</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Section -->
      <div class="w-full md:w-2/3 p-6">
        <!-- Registered Events -->
        <div class="mt-8">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">
            Registered Events
          </h3>
          <div v-if="profile.registeredEvents.length" class="space-y-4">
            <div
              v-for="event in profile.registeredEvents"
              :key="event.id"
              class="bg-gray-100 p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h4 class="text-gray-800 font-bold">{{ event.name }}</h4>
                <p class="text-sm text-gray-500">
                  {{ new Date(event.date).toLocaleDateString() }}
                </p>
              </div>
              <button
                class="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                View
              </button>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No registered events.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: "Inter", sans-serif;
}
</style>
