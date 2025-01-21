<script setup>
import { ref } from "vue";

const title = ref("");
const description = ref("");
const category = ref("Tech");
const location = ref("");
const startDate = ref("");
const endDate = ref("");
const price = ref(0);
const freeTicket = ref(false);
const link = ref("");
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
            v-model="title"
            type="text"
            placeholder="Event Title"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            v-model="description"
            placeholder="Event Description"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            rows="4"
          ></textarea>
        </div>

        <!-- Category -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            v-model="category"
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
            v-model="location"
            type="text"
            placeholder="Event Location"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Date and Time -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input
              v-model="startDate"
              type="datetime-local"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input
              v-model="endDate"
              type="datetime-local"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
        </div>

        <!-- Price -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              v-model="price"
              type="number"
              min="0"
              placeholder="Event Price"
              class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
              :disabled="freeTicket"
            />
          </div>
          <div class="flex items-center">
            <input
              v-model="freeTicket"
              type="checkbox"
              id="free-ticket"
              class="mr-2"
            />
            <label for="free-ticket" class="text-sm text-gray-700">Free Ticket</label>
          </div>
        </div>

        <!-- Link -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Link</label>
          <input
            v-model="link"
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
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
