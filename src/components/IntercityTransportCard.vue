<script setup lang="ts">
import type { IntercityTransport } from "types";

const props = defineProps<{ transport: IntercityTransport }>();
</script>

<template>
  <el-card shadow="always" class="my-4 rounded-3xl pl-1">
    <el-row>
      <el-col>
        <!-- 飞机/高铁icon +（文字）跨城交通 -->
        <el-row>
          <template v-if="props.transport.type == 'airplane'">
            <img
              src="../assets/plane.svg"
              alt="transport type icon"
              class="h-8"
            />
            <span class="text-lg font-semibold ml-4 -mt-0.5">
              城际交通 ( 飞机 )
            </span>
          </template>
          <template v-else-if="props.transport.type == 'train'">
            <img
              src="../assets/train.svg"
              alt="transport type icon"
              class="h-8"
            />
            <span class="text-lg font-semibold ml-6 -mt-0.5">
              城际交通 ( 高铁 )
            </span>
          </template>
        </el-row>
        <!-- 地点 -->
        <p class="text-xl font-bold mt-3">
          {{ props.transport.start }} -
          {{ props.transport.end }}
        </p>
        <!-- 其他信息：班次、价格等 -->
        <div class="text-sm text-gray-500 mt-4">
          <span v-if="props.transport.type == 'train'">
            {{ props.transport.trainId }}</span
          >
          |
          <span
            >{{ props.transport.startTime }} -
            {{ props.transport.endTime }}</span
          >
          |
          <span
            v-if="props.transport.flightId && props.transport.flightId.length"
            >{{ props.transport.flightId }}</span
          >
          |
          <span>{{ props.transport.tickets }} 张票</span> |
          <span>{{ props.transport.cost }} 元</span>
        </div>
      </el-col>
    </el-row>
  </el-card>
</template>
