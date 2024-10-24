<script setup lang="ts">
import type { TransDetail } from "types";

const props = defineProps<{
  transDetail: TransDetail;
}>();
</script>

<template>
  <div class="flex items-center justify-center">
    <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
    <div class="relative flex-1 border-t-2 border-gray-300">
      <div
        class="absolute left-1/2 bottom-full transform -translate-x-1/2 -translate-y-1 text-xs"
      >
        {{ props.transDetail.mode === "walk" ? "步行" : "地铁" }}
        {{ props.transDetail.distance }} km
      </div>
      <div
        class="absolute left-1/2 top-full transform -translate-x-1/2 translate-y-1 text-xs"
      >
        {{ props.transDetail.startTime }} - {{ props.transDetail.endTime }}
      </div>
    </div>
    <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
  </div>

  <div class="flex justify-between items-start text-sm mt-1">
    <div>{{ props.transDetail.start }}</div>
    <div>{{ props.transDetail.end }}</div>
  </div>
</template>
