<script setup>
import { ref } from "vue";

const event = ref({
  title: "React Day Berlin",
  description:
    "React Day Berlin is your gateway to new opportunities and exciting collaboration on stellar tech. Attend in-depth talks, supercharge your hard and soft skills with career-boosting workshops, and connect with React enthusiasts.",
  category: "Tech",
  location: "Berlin",
  startDate: "12/15/2023 12:30 PM",
  endDate: "12/16/2023 7:00 PM",
  price: 999,
  isFree: false,
  link: "https://reactday.berlin",
  image: "https://via.placeholder.com/400x200",
});
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
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Event Title"
            :value="event.title"
          />
          <input
            type="text"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Category"
            :value="event.category"
          />
        </div>

        <!-- Image -->
        <div class="relative">
          <img
            :src="event.image"
            alt="Event Image"
            class="object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>

      <!-- Description -->
      <textarea
        class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 mt-4"
        rows="5"
        placeholder="Event Description"
        >{ event.description }</textarea
      >

      <!-- Location, Date & Price -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <input
          type="text"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Location"
          :value="event.location"
        />
        <input
          type="text"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="Start Date"
          :value="event.startDate"
        />
        <input
          type="text"
          class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
          placeholder="End Date"
          :value="event.endDate"
        />
        <div class="flex items-center space-x-2">
          <input
            type="number"
            class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500"
            placeholder="Price"
            :value="event.price"
          />
          <label class="flex items-center space-x-2">
            <input type="checkbox" :checked="event.isFree" />
            <span class="text-gray-700">Free Ticket</span>
          </label>
        </div>
      </div>

      <!-- Link -->
      <input
        type="text"
        class="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring focus:ring-purple-500 mt-4"
        placeholder="Event Link"
        :value="event.link"
      />

      <!-- Create Event Button -->
      <button
        class="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition"
      >
        Create Event
      </button>
    </div>
  </div>
</template>

