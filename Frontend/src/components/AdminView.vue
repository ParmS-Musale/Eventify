<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

const adminStats = ref({
  totalUsers: 0,
  totalEvents: 0,
  upcomingEvents: 0,
  recentUsers: [],
  recentEvents: []
});

const fetchAdminDashboard = async () => {
  try {
    const response = await axios.get(BASE_URL+"/admin/dashboard", {
      withCredentials: true,
    });
    adminStats.value = response.data.stats;
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    alert("Failed to load admin dashboard.");
  }
};

onMounted(fetchAdminDashboard);
</script>

<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-6xl mx-auto p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>

      <!-- Statistics Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-purple-100 p-6 rounded-lg text-center">
          <h3 class="text-lg font-semibold text-purple-800">Total Users</h3>
          <p class="text-3xl font-bold text-purple-900">{{ adminStats.totalUsers }}</p>
        </div>
        <div class="bg-green-100 p-6 rounded-lg text-center">
          <h3 class="text-lg font-semibold text-green-800">Total Events</h3>
          <p class="text-3xl font-bold text-green-900">{{ adminStats.totalEvents }}</p>
        </div>
        <div class="bg-blue-100 p-6 rounded-lg text-center">
          <h3 class="text-lg font-semibold text-blue-800">Upcoming Events</h3>
          <p class="text-3xl font-bold text-blue-900">{{ adminStats.upcomingEvents }}</p>
        </div>
      </div>

      <!-- Recent Users and Events -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 class="text-xl font-semibold mb-4">Recent Users</h2>
          <div v-if="adminStats.recentUsers.length" class="space-y-4">
            <div 
              v-for="user in adminStats.recentUsers" 
              :key="user._id" 
              class="bg-gray-100 p-4 rounded-lg"
            >
              <h4 class="font-bold">{{ user.firstName }} {{ user.lastName }}</h4>
              <p class="text-sm text-gray-500">{{ user.emailId }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No recent users.</p>
        </div>

        <div>
          <h2 class="text-xl font-semibold mb-4">Recent Events</h2>
          <div v-if="adminStats.recentEvents.length" class="space-y-4">
            <div 
              v-for="event in adminStats.recentEvents" 
              :key="event._id" 
              class="bg-gray-100 p-4 rounded-lg"
            >
              <h4 class="font-bold">{{ event.name }}</h4>
              <p class="text-sm text-gray-500">{{ event.date }}</p>
            </div>
          </div>
          <p v-else class="text-sm text-gray-500">No recent events.</p>
        </div>
      </div>
    </div>
  </div>
</template>