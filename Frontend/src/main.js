import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";

// Import Font Awesome
import "@fortawesome/fontawesome-free/css/all.css";

const app = createApp(App);

app.use(Toast, {
  position: POSITION.TOP_CENTER, // Options: TOP_CENTER, BOTTOM_CENTER, or CENTER
  timeout: 3000, // Customize duration
  closeOnClick: true, // Allow click to close
  pauseOnHover: true, // Pause timeout on hover
});
app.use(router);
app.mount("#app");
