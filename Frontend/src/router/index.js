import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import CreateEvent from '@/components/CreateEvent.vue';
import CardDescription from '../components/CardDescription.vue';
import CardEdit from '../components/CardEdit.vue';



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/signup',
      name: 'Signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/create-event',
      name: 'Create Event',
      component: CreateEvent,
    },
    {
      path: '/card-description/:id',
      name: 'CardDescription',
      component: CardDescription,
    },
    {
      path: '/event-update/:id',
      name: 'EditEvent',
      component: CardEdit,
    },
  ],
});

export default router;