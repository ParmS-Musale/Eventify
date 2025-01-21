import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignUp from '@/components/SignUp.vue';
import Login from '@/components/Login.vue';
import CreateEvent from '@/components/CreateEvent.vue';
import CardDescription from '../components/CardDescription.vue';
// import JobsView from '@/views/JobsView.vue';
// import NotFoundView from '@/views/NotFoundView.vue';
// import JobView from '@/views/JobView.vue';
// import AddJobView from '@/views/AddJobView.vue';
// import EditJobView from '@/views/EditJobView.vue';

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
      path: '/card-description',
      name: 'edit-job',
      component: CardDescription,
    },
    // {
    //   path: '/:catchAll(.*)',
    //   name: 'not-found',
    //   component: NotFoundView,
    // },
  ],
});

export default router;