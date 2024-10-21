import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomeView.vue";
import QuerySubmit from "@/views/QuerySubmitView.vue";
import PlanTotal from "@/views/PlanTotalView.vue";
import detail from "@/views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: HomePage },
    { path: "/query-submit", name: "QuerySubmit", component: QuerySubmit },
    {
      path: "/plan-total/:id",
      name: "PlanTotal",
      component: PlanTotal,
    },
    {
      path: "/plan-total/:id/:day",
      name: "Detail",
      component: detail,
    },
  ],
});

export default router;
