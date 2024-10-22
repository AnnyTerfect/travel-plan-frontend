import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomeView.vue";
import Submit from "@/views/SubmitView.vue";
import PlanOverall from "@/views/PlanOverallView.vue";
import PlanDaily from "@/views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/query-submit", name: "QuerySubmit", component: Submit },
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
