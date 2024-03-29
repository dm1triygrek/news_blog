import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../pages/Home.vue";
import News from "../pages/News.vue";
import EditNews from "../pages/EditNews.vue";
import AddNews from "../pages/AddNews.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/news/:rid",
    name: "news",
    component: News
  },
  {
    path: "/edit-news/:rid",
    name: "edit-news",
    component: EditNews
  },
  {
    path: "/add-news",
    name: "add-news",
    component: AddNews
  },
];

const router = createRouter({
  //@ts-expect-error
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
