<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification"; // Import toast
import { BASE_URL } from "../utils/constant";

const toast = useToast(); // Initialize toast

const event = ref({
  name: "",
  description: "",
  date: "",
  category: "",
  location: "",
  startDate: "",
  endDate: "",
  price: 0,
  isFree: false,
  photoUrl: "",
});

const route = useRoute();
const router = useRouter();
const eventId = route.params.id; // Assume event ID is passed as a route param

// Fetch event details on component mount
const fetchEvent = async () => {
  try {
    const response = await axios.get(`http://localhost:5000/events/${eventId}`);
    event.value = response.data; // Populate event data
  } catch (error) {
    console.error("Failed to fetch event:", error);
    toast.error("Failed to fetch event details."); // Show error toast
  }
};

// Update event details
const updateEvent = async () => {
  try {
    await axios.post(BASE_URL +`/events/${eventId}`, event.value, {
      withCredentials: true,
    });
    if(response.data.message)
    toast.success(response.data.message); // Show success toast
    router.push("/"); // Redirect to events list
  } catch (error) {
    // console.error("Failed to update event:", error);
    toast.error(error?.response?.data?.message); // Show error toast
  }
};

// Fetch event details when the component is mounted
onMounted(fetchEvent);
</script>


<template>
  <div class="bg-gray-100 min-h-screen flex items-center justify-center p-4">
    <!-- Card Container -->
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Edit Event</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Title & Category -->
        <div class="md:col-span-2 space-y-4">
          <input
            type="text"
            v-model="event.name"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Event Title"
          />
          <input
            type="text"
            v-model="event.category"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Category"
          />
        </div>

        <!-- Image -->
        <div class="relative">
          <img
            :src="event.photoUrl || 'https://via.placeholder.com/400x400'"
            alt="Event Image"
            class="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>

      <!-- Description -->
      <textarea
        v-model="event.description"
        class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 mt-4"
        rows="5"
        placeholder="Event Description"
      ></textarea>

      <!-- Location, Date & Price -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          v-model="event.location"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Location"
        />
        <input
          type="text"
          v-model="event.startDate"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Start Date"
        />
        <input
          type="text"
          v-model="event.endDate"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="End Date"
        />
        <div class="flex items-center space-x-2">
          <input
            type="number"
            v-model="event.price"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Price"
          />
          <label class="flex items-center space-x-2">
            <input type="checkbox" v-model="event.isFree" />
            <span class="text-gray-700">Free Ticket</span>
          </label>
        </div>
      </div>

      <!-- Update Event Button -->
      <button
        class="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
        @click="updateEvent"
      >
        Update Event
      </button>
    </div>
  </div>
</template>
