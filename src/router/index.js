import { createRouter, createWebHistory } from "vue-router";
import Intro from "@/views/Intro.vue";
import Chat from "@/views/Chat.vue";

const routes = [
  { path: '', component: Intro, name: 'intro' },
  { path: '/chat', component: Chat, name: 'chat' },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), routes, linkActiveClass: "active",
});

export default router;
