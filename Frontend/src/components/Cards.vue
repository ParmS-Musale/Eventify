<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router"; // Import Vue Router
import { BASE_URL } from "../utils/constant";

const router = useRouter(); // Initialize the router
const searchQuery = ref("");
const selectedCategory = ref("All");
const currentPage = ref(1);
const eventsPerPage = 6;
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

const fetchEvents = async () => {
  try {
    const response = await axios.get(BASE_URL + "/events", {
      // params: {
      //   search: searchQuery.value,
      //   category:
      //     selectedCategory.value === "All" ? "" : selectedCategory.value,
      // },
      withCredentials: true,
    });

    // Filter events based on search query
    events.value = response.data.filter(
      (event) =>
        // Case-insensitive search across multiple fields
        event.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        event.category
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase()) ||
        event.description
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
    );

    currentPage.value = 1; // Reset to first page on new search
  } catch (error) {
    console.error("Error fetching events:", error);
  }
};

// Paginated events
const paginatedEvents = computed(() => {
  const start = (currentPage.value - 1) * eventsPerPage;
  const end = start + eventsPerPage;
  return events.value.slice(start, end);
});

// Total pages
const totalPages = computed(() =>
  Math.ceil(events.value.length / eventsPerPage)
);

// Navigate to event details page
const goToEventDetails = (eventId) => {
  if (eventId) {
    router.push(`/card-description/${eventId}`);
  } else {
    console.error("Event ID is missing!");
  }
};

// Pagination methods
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Refetch events when search query or category changes
onMounted(fetchEvents);
watch([searchQuery, selectedCategory], fetchEvents);
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
        <div class="relative w-full lg:w-1/2 mb-4 lg:mb-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search title..."
            class="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-600 focus:outline-none"
          />
        </div>

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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div
          v-for="event in paginatedEvents"
          :key="event._id"
          @click="goToEventDetails(event._id)"
          class="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
        >
          <img
            :src="event.photoUrl"
            alt="Event Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-4">
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
            <h3 class="text-lg font-bold text-gray-900">{{ event.name }}</h3>
            <p class="text-sm text-gray-500 mt-2">{{ event.date }}</p>
            <p class="text-sm text-gray-500">{{ event.time }}</p>
            <p class="mt-2 text-sm text-gray-700">ParmS-Musale</p>
          </div>
        </div>
      </div>
      <!-- Pagination Controls -->
      <div class="flex justify-center items-center space-x-4">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <span class="text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-purple-600 text-white rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </section>
</template>
