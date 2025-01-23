<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { useToast } from "vue-toastification"; // Import the toast

const route = useRoute();
const router = useRouter();
const event = ref({});
const toast = useToast(); // Initialize toast

const fetchEventDetails = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/events/${route.params.id}`
    );
    event.value = response.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    toast.error("Failed to fetch event details.");
  }
};

// Redirect to Update Event Page
const redirectToUpdatePage = () => {
  router.push(`/event-update/${route.params.id}`);
};

// Delete Event
const deleteEvent = async () => {
  const confirmDelete = confirm("Are you sure you want to delete this event?");
  if (!confirmDelete) return;

  try {
    const response = await axios.delete(
      `http://localhost:5000/events/${route.params.id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(response?.data?.message); // Show success toast
    router.push("/events"); // Redirect to the events list page
  } catch (error) {
    console.error("Error deleting event:", error.response || error);
    toast.error(
      error.response?.data?.message ||
        "Failed to delete the event. Please try again."
    ); // Show error toast
  }
};

// Add a script tag to load Razorpay
onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://checkout.razorpay.com/v1/checkout.js";
  script.async = true;
  document.body.appendChild(script);
});

const initiatePayment = async () => {
  try {
    // Call backend to create a Razorpay order
    const { data } = await axios.post("http://localhost:5000/create-payment", {
      amount: 500, // Replace with dynamic amount
      currency: "INR",
    });

    if (data.success) {
      const options = {
        key: "rzp_test_t6ArxAcVBAShgb",
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Eventify",
        description: "Payment for Event Registration",
        order_id: data.order.id, // Razorpay Order ID
        handler: function (response) {
          // Step 2: Handle success and send payment details to the backend for verification
          axios
            .post(
              "http://localhost:5000/events/register/" + event.value._id,
              {},
              {
                withCredentials: true,
              }
            )
            .then((verificationResponse) => {
              alert("Success! Payment verified and ticket issued");
            })
            .catch((err) => {
              alert("Payment verification failed");
            });
        },
        prefill: {
          name: "Customer Name", // Pass customer name
          email: "customer@example.com", // Pass customer email
        },
        theme: {
          color: "#3399cc",
        },
      };

      // Use Razorpay global object instead
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } else {
      toast.alert("Failed to create Razorpay order");
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
};

onMounted(fetchEventDetails);
</script>


<template>
  <div class="bg-gray-100 min-h-screen overflow-x-hidden">
    <!-- Conditional Rendering -->
    <div v-if="event" class="container mx-auto px-4 py-8 max-w-screen-lg">
      <div
        class="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden"
      >
        <!-- Image Section -->
        <div class="md:w-1/3 relative">
          <img
            :src="event.photoUrl || 'https://via.placeholder.com/400x400'"
            alt="Event Image"
            class="object-cover w-full h-full"
          />

          <!-- Edit and Delete Icons -->
          <div
            class="absolute top-2 right-2 bg-slate-50 flex flex-col space-y-2"
          >
            <button
              class="text-black p-2 rounded-full hover:bg-gray-300 shadow-md"
              @click="redirectToUpdatePage"
            >
              <i class="fas fa-edit"></i>
            </button>
            <button
              class="text-black p-2 rounded-full hover:bg-gray-300 shadow-md"
              @click="deleteEvent"
            >
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <!-- Content Section -->
        <div class="md:w-2/3 p-6">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">
            {{ event.title }}
          </h2>

          <div class="flex items-center space-x-4 mb-4">
            <span class="text-lg font-semibold text-green-600">
              {{ event.price === 0 ? "FREE" : `$${event.price}` }}
            </span>
            <span
              class="px-3 py-1 bg-gray-200 text-sm text-gray-700 rounded-full"
            >
              {{ event.category }}
            </span>
            <span class="text-sm text-gray-500">
              by {{ event.organizer || "ParmS-Musale" }}
            </span>
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

          <button
            target="_blank"
            class="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
            @click="initiatePayment"
          >
            Get Ticket
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

