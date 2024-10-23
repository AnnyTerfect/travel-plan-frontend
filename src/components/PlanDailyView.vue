<script setup lang="ts">
import IntercityTransportCard from "./IntercityTransportCard.vue";
import ActivityTimeline from "./ActivityTimeline.vue";
import type { PlanDaily } from "types";

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
  <ActivityTimeline :activities="props.planDaily.activities" />
  <!-- 跨城通行（结束） -->
  <IntercityTransportCard
    v-if="props.planDaily.intercityTransportEnd"
    :transport="props.planDaily.intercityTransportEnd"
  />
</template>
