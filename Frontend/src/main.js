import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router"; // Import the router

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.use(router); // Use the router in your app
app.mount("#app");
