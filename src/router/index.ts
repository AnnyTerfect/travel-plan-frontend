import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomeView.vue";
import QuerySubmit from "@/views/QuerySubmitView.vue";
import PlanOverall from "@/views/PlanOverallView.vue";
import PlanDaily from "@/views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage },
    { path: "/query-submit", name: "QuerySubmit", component: QuerySubmit },
    {
      path: "/plan-overall/:id",
      name: "PlanOverall",
      component: PlanOverall,
    },
    {
      path: "/plan-overall/:id/:day",
      name: "PlanDaily",
      component: PlanDaily,
    },
  ],
});

export default router;
