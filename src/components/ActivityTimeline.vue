<script setup lang="ts">
import { PLACE_ICON_MAP, SPACE_NAME_MAP } from "@/constants";
import type { Activity } from "types";

const props = defineProps<{ activities: Activity[] }>();
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in props.activities"
      :key="index"
      placement="top"
    >
      <!-- 交通card -->
      <el-card
        v-if="activity.transDetail && activity.transDetail.length"
        shadow="always"
      >
        <el-collapse accordion>
          <el-collapse-item :name="String(index)">
            <template #title>
              <el-row class="flex items-center space-x-2 mt-4">
                <img
                  v-if="activity.transType == 'walk'"
                  class="h-[2em]"
                  src="../assets/walk.svg"
                  alt="activity type icon"
                />
                <img
                  v-if="activity.transType == 'metro'"
                  class="h-[2rem]"
                  src="../assets/地铁.svg"
                  alt="activity type icon"
                />
                <span class="text-lg font-semibold">
                  {{ activity.transTime }} 分钟 | {{ activity.transCost }} 元
                </span>
              </el-row>
            </template>
            <el-table :data="activity.transDetail" stripe class="custom-table">
              <el-table-column prop="start" label="起始地" width="180" />
              <el-table-column prop="end" label="目的地" width="180" />
              <el-table-column prop="mode" label="交通方式" />
              <el-table-column prop="start_time" label="开始时间" />
              <el-table-column prop="end_time" label="结束时间" />
              <el-table-column prop="cost" label="花费" />
              <el-table-column prop="distance" label="距离" />
            </el-table>
          </el-collapse-item>
        </el-collapse>
      </el-card>
      <!-- 景点活动card -->
      <el-card
        v-if="activity.position && activity.position.length"
        shadow="always"
        class="mt-2"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <el-icon :size="24">
                <component :is="PLACE_ICON_MAP[activity.type]" />
              </el-icon>
              <span class="text-lg font-semibold">{{
                SPACE_NAME_MAP[activity.type]
              }}</span>
            </el-row>
            <p class="text-lg font-bold">
              {{ activity.position }}
            </p>
            <p
              v-if="activity.foodList && activity.foodList.length"
              class="text-lg font-bold"
            >
              推荐菜品：{{ activity.foodList }}
            </p>
            <div class="text-sm text-gray-500">
              <span>{{ activity.startTime }} - {{ activity.endTime }}</span>
              |
              <span v-if="activity.cost == 0">免费</span>
              <span v-if="activity.cost != 0">{{ activity.cost }} 元</span>
            </div>
          </el-col>
          <el-col :span="6">
            <el-image
              :src="activity.picture || '../assets/default-placeholder.png'"
              fit="cover"
              class="w-full h-20 bg-gray-300 flex items-center justify-center text-lg font-bold"
            >
              <template #placeholder>img</template>
            </el-image>
          </el-col>
        </el-row>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
