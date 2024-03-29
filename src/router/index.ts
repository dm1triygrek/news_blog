import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import NewsPage from "../pages/NewsPage.vue";
import EditNews from "../pages/EditNews.vue";
import AddNews from "../pages/AddNews.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: HomePage
  },
  {
    path: "/news/:rid",
    name: "news",
    component: NewsPage
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
  //@ts-expect-error Неправильная интерпретация ошибки
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;
