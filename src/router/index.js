import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import GroupDetailsView from '../views/GroupDetailsView.vue';
import DailyHabitsView from '../views/DailyHabitsView.vue';
import HabitsHistoryView from '../views/HabitsHistoryView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/group/:id',
      name: 'group-details',
      component: GroupDetailsView
    },
    {
      path: '/habits/:memberId',
      name: 'daily-habits',
      component: DailyHabitsView
    },
    {
      path: '/habits-history/:memberId',
      name: 'habits-history',
      component: HabitsHistoryView
    }
  ]
});

export default router;
