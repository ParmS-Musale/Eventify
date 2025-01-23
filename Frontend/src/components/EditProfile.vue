<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router"; // For navigation
import { useToast } from "vue-toastification"; // For toast notifications
import axios from "axios";

const router = useRouter();
const toast = useToast();

const profile = ref({
  firstName: "",
  lastName: "",
  emailId: "",
  role: 0,
  photoUrl: "",
  createdAt: "",
  updatedAt: "",
  registeredEvents: "",
});

const fetchProfile = async () => {
  try {
    const response = await axios.get("http://localhost:5000/profile/view", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    profile.value = response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    toast.error("Failed to load profile data.");
  }
};

const updateProfile = async () => {
  try {
    await axios.patch("http://localhost:5000/profile/edit", profile.value, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    toast.success("Profile updated successfully!");
    router.push("/profile-view");
  } catch (error) {
    console.error("Failed to update profile:", error);
    toast.error("Failed to update profile.");
  }
};

onMounted(fetchProfile);
</script>


<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <!-- Card Container -->
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Title & Category -->
        <div class="md:col-span-2 space-y-4">
          <input
            type="text"
            v-model="profile.firstName"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="FirstName"
          />
          <input
            type="text"
            v-model="profile.lastName"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="LastName"
          />
        </div>

        <!-- Image -->
        <div class="relative">
          <img
            :src="profile.photoUrl || 'https://via.placeholder.com/400x400'"
            alt="Profile Image"
            class="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>

      <!-- Description -->
      <div class="py-4">
        <input
          type="email"
          v-model="profile.emailId"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Email"
        />
      </div>
      <!-- PhotoUrl -->
      <div>
        <input
          type="string"
          v-model="profile.photoUrl"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="PhotoUrl"
        />
      </div>

      <!-- Location, Date & Price -->
      <div class="grid grid-row-1 md:row-cols-2 gap-4 mt-4">
        <input
          type="text"
          v-model="profile.createdAt"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Created At (read-only)"
          readonly
        />
        <input
          type="text"
          v-model="profile.updatedAt"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Updated At (read-only)"
          readonly
        />
      </div>

      <!-- Update Event Button -->
      <button
        class="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        @click="updateProfile"
      >
        Edit Profile
      </button>
    </div>
  </div>
</template>
  