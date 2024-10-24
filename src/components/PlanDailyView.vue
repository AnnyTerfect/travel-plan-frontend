<script setup lang="ts">
import IntercityTransportCard from "./IntercityTransportCard.vue";
import ActivityTimeline from "./ActivityTimeline.vue";
import type { Activity, PlanDaily } from "types";

const emits = defineEmits<{
  clickTrans: [Activity];
  clickActivity: [Activity];
}>();

function proxyClickTrans(activity: Activity) {
  emits("clickTrans", activity);
}

function proxyClickActivity(activity: Activity) {
  emits("clickActivity", activity);
}

const props = defineProps<{
  planDaily: PlanDaily;
}>();
</script>

<template>
  <IntercityTransportCard
    v-if="props.planDaily.intercityTransportStart"
    :transport="props.planDaily.intercityTransportStart"
  />
  <!-- 游玩路径 -->
  <ActivityTimeline
    :activities="props.planDaily.activities"
    @click-trans="proxyClickTrans"
    @click-activity="proxyClickActivity"
  />
  <!-- 跨城通行（结束） -->
  <IntercityTransportCard
    v-if="props.planDaily.intercityTransportEnd"
    :transport="props.planDaily.intercityTransportEnd"
  />
</template>
