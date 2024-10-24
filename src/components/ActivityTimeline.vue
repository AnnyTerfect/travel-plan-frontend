<script setup lang="ts">
import Walk from "@/assets/icon/walk.svg";
import Metro from "@/assets/icon/metro.svg";
import { PLACE_ICON_MAP, SPACE_NAME_MAP } from "@/constants";
import type { Activity } from "types";
import TransDetail from "./TransDetail.vue";

const emits = defineEmits<{
  clickTrans: [Activity];
  clickActivity: [Activity];
}>();

function handleClickTrans(transDetail: Activity) {
  emits("clickTrans", transDetail);
}

function handleClickActivity(activity: Activity) {
  emits("clickActivity", activity);
}

const props = defineProps<{ activities: Activity[] }>();
</script>

<template>
  <template v-for="(activity, index) in props.activities" :key="index">
    <!-- 交通card -->
    <div
      v-if="activity.transDetail && activity.transDetail.length"
      class="p-4 rounded-xl space-y-4"
      @click="handleClickTrans(activity)"
    >
      <div class="flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <Walk v-if="activity.transType == 'walk'" class="w-6 h-6" />
          <Metro v-if="activity.transType == 'metro'" class="w-6 h-6" />
          <span class="text-lg font-semibold">
            {{ activity.transType == "walk" ? "步行" : "地铁" }}
          </span>
        </div>
        <div class="text-sm">
          {{ activity.transTime }} 分钟 | {{ activity.transCost }} 元
        </div>
      </div>

      <div class="bg-white p-6 rounded-md border space-y-4">
        <div v-for="trans in activity.transDetail" :key="JSON.stringify(trans)">
          <TransDetail :trans-detail="trans" />
        </div>
      </div>
    </div>
    <!-- 景点活动card -->
    <el-card
      v-if="activity.position && activity.position.length"
      @click="handleClickActivity(activity)"
    >
      <template #header>
        <div class="flex items-center space-x-2">
          <el-icon :size="18">
            <component :is="PLACE_ICON_MAP[activity.type]" />
          </el-icon>
          <span class="text-lg font-semibold">{{
            SPACE_NAME_MAP[activity.type]
          }}</span>
        </div>
      </template>
      <div class="space-y-2">
        <p class="text-lg font-bold">
          {{ activity.position }}
        </p>
        <p
          v-if="activity.foodList && activity.foodList.length"
          class="text-sm"
        >
          推荐菜品：{{ activity.foodList }}
        </p>
        <div class="text-sm text-gray-500">
          <span>{{ activity.startTime }} - {{ activity.endTime }}</span>
          |
          <span v-if="activity.cost == 0">免费</span>
          <span v-if="activity.cost != 0">{{ activity.cost }} 元</span>
        </div>
        <el-image
          :src="activity.picture || '../assets/default-placeholder.png'"
          fit="cover"
          class="w-full bg-gray-300 flex items-center justify-center text-lg font-bold rounded-md cursor-pointer"
        >
          <template #placeholder>img</template>
        </el-image>
      </div>
    </el-card>
  </template>
</template>
