<script setup>
const event = {
  title: "JS Galaxy: Exploring the Universe of JavaScript",
  price: "$299",
  category: "Development",
  organizer: "Faizan | JS Mastery",
  date: "Wed, Dec 20, 2023 / 2:30 PM - 1:00 PM",
  location: "Houston Space Center, TX",
  description:
    "Embark on a cosmic journey through the galaxy of JavaScript at JS Galaxy! This event brings together JavaScript developers and enthusiasts for an out-of-this-world experience. Dive into deep-space discussions on the latest ECMAScript features, cutting-edge frameworks, and futuristic JavaScript technologies.",
  link: "http://jsgalaxyuniverse.com/",
  image: "https://via.placeholder.com/400x400", // Replace with your event image URL
};
</script>

<template>
  <div class="bg-gray-100 min-h-screen overflow-x-hidden">
    <!-- Event Card -->
    <div class="container mx-auto px-4 py-8 max-w-screen-lg">
      <div
        class="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
      >
        <!-- Image Section -->
        <div class="md:w-1/3">
          <img
            :src="event.image"
            alt="Event Image"
            class="object-cover w-full h-full"
          />
        </div>

        <!-- Content Section -->
        <div class="md:w-2/3 p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ event.title }}
          </h2>

          <div class="flex items-center space-x-4 mb-4">
            <span class="text-lg font-semibold text-green-600">
              {{ event.price }}
            </span>
            <span
              class="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-full"
            >
              {{ event.category }}
            </span>
            <span class="text-sm text-gray-500">by {{ event.organizer }}</span>
          </div>

          <div class="flex items-center space-x-4 text-gray-700 text-sm mb-4">
            <div class="flex items-center">
              <i class="fas fa-calendar-alt mr-2"></i>
              <span>{{ event.date }}</span>
            </div>
            <div class="flex items-center">
              <i class="fas fa-map-marker-alt mr-2"></i>
              <span>{{ event.location }}</span>
            </div>
          </div>

          <p class="text-gray-600 mb-4">{{ event.description }}</p>

          <a
            :href="event.link"
            target="_blank"
            class="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Get Ticket
          </a>
        </div>
      </div>
    </div>
  </div>
</template>


