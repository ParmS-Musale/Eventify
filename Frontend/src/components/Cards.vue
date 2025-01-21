<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const searchQuery = ref("");
const selectedCategory = ref("All");
const categories = ref([
  "All",
  "NextJS",
  "UI/UX",
  "Development",
  "Tech",
  "Artificial Intelligence",
  "AI",
]);

const events = ref([]);

// Fetch events from MongoDB backend
// const fetchEvents = async () => {
//   try {
//     const response = await axios.get("/api/events", {
//       params: {
//         search: searchQuery.value,
//         category:
//           selectedCategory.value === "All" ? "" : selectedCategory.value,
//       },
//     });
//     events.value = response.data;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//   }
// };

// Refetch events when search query or category changes
// onMounted(fetchEvents);
// watch([searchQuery, selectedCategory], fetchEvents);
</script>

<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-3xl font-bold text-gray-900">
          Trusted by Thousands of Events
        </h2>
      </div>

      <!-- Search and Category Filters -->
      <div class="flex flex-col lg:flex-row items-center justify-between mb-8">
        <!-- Search Bar -->
        <div class="relative w-full lg:w-1/2 mb-4 lg:mb-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search title..."
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

        <!-- Category Dropdown -->
        <div class="relative w-full lg:w-1/4">
          <select
            v-model="selectedCategory"
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          >
            <option
              v-for="category in categories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>
      </div>

      <!-- Event Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="event in events"
          :key="event.id"
          class="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            :src="event.image"
            alt="Event Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900">{{ event.title }}</h3>
            <p class="text-sm text-gray-500 mt-2">{{ event.date }}</p>
            <p class="text-sm text-gray-500">{{ event.time }}</p>
            <div class="mt-2 flex justify-between items-center">
              <span
                class="bg-purple-100 text-purple-600 text-xs font-medium px-2 py-1 rounded-full"
              >
                {{ event.category }}
              </span>
              <span class="text-sm font-bold text-gray-900">
                {{ event.price === 0 ? "FREE" : `$${event.price}` }}
              </span>
            </div>
            <p class="mt-2 text-sm text-gray-700">Hosted by {{ event.host }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
