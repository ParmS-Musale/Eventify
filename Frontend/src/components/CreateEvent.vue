<script setup>
// import { ref } from "vue";
import { ref } from "vue";
// import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification"; // Import toast
import { BASE_URL } from "../utils/constant";

const toast = useToast(); // Initialize toast

const event = ref({
  name: "",
  description: "",
  date: "1/2/2025",
  category: "",
  location: "",
  price: 0,
  capacity: 0,
  photoUrl: "",
});


const createEvent = async () => {
  console.log(event.value.date);
  try {
    await axios.post(BASE_URL+`/events/create`, event.value, {
      withCredentials: true,
    });

    if(response.data.message)
    toast.success(response.data.message); // Show success toast
    router.push("/"); // Redirect to events list
  } catch (error) {
    // console.error("Failed to update event:", error);
    toast.error(error?.response?.data?.message); // Show error toast
  }
  // console.log(event.value);
};

</script>



<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto max-w-4xl bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Create Event</h2>
      <form class="space-y-6">
        <!-- Title -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            v-model="event.name"
            type="text"
            placeholder="Event Title"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="event.description"
            placeholder="Event Description"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            rows="4"
          ></textarea>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="event.category"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          >
            <option value="Tech">Tech</option>
            <option value="AI">AI</option>
            <option value="Development">Development</option>
            <option value="UI/UX">UI/UX</option>
          </select>
        </div>

        <!-- Location -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            v-model="event.location"
            type="text"
            placeholder="Event Location"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              v-model="event.date"
              type="datetime-local"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
        <!-- Date and Time -->
        <!-- <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              v-model="event.date"
              type="datetime-local"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              v-model="event.date"
              type="datetime-local"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div> -->
        <!-- </div> -->

        <!-- Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              v-model="event.price"
              type="number"
              min="0"
              placeholder="Event Price"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              :disabled="freeTicket"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
            <input
              v-model="event.capacity"
              type="number"
              min="0"
              placeholder="Capacity"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              
            />
          </div>
        </div>

        <!-- Link -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link</label>
          <input
            v-model="event.link"
            type="url"
            placeholder="Event Link"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="button"
            class="w-full bg-purple-600 text-white text-sm font-medium py-3 rounded-lg hover:bg-purple-700 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            @click="createEvent"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
