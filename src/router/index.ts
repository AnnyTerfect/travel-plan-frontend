import { createRouter, createWebHistory } from "vue-router";
import IndexPage from "../views/index.vue";
import QuerySubmit from "../views/query_submit.vue";
import PlanTotal from "../views/plan_total.vue";
import detail from "@/views/detail.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Index", component: IndexPage },
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
