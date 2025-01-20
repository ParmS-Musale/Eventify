<template>
  <div>
    <login />
    <sign-up />
    <navbar />

  </div>
</template>

<script>
import Navbar from "./components/layout/Navbar.vue";
import Login from './pages/Login.vue';
import SignUp from './pages/SignUp.vue';

export default {
  components: {
    Navbar,
    Login,
    SignUp,
  },
};
</script>
