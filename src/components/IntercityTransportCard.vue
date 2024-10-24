<script setup lang="ts">
import Plane from "@/assets/icon/plane.svg";
import Train from "@/assets/icon/train.svg";
import type { IntercityTransport } from "types";

const props = defineProps<{
  transport: IntercityTransport;
}>();
</script>

<template>
  <div class="p-4 rounded-xl space-y-4">
    <div class="flex items-center space-x-2">
      <component
        :is="props.transport.type == 'airplane' ? Plane : Train"
        alt="transport type icon"
        class="w-6 h-6"
      />
      <span class="text-lg font-semibold">
        {{
          props.transport.type == "airplane"
            ? "城际交通（飞机）"
            : "城际交通（高铁）"
        }}
      </span>
    </div>
    <!-- 地点 -->
    <div class="flex justify-center border rounded-md bg-white">
      <div class="p-8">
        <div class="flex justify-center items-center space-x-6">
          <h3 class="text-xl">{{ props.transport.start }}</h3>
          <div class="flex flex-col items-stretch">
            <div v-if="props.transport.type == 'train'">
              {{ props.transport.trainId }}
            </div>
            <div
              v-else-if="
                props.transport.flightId && props.transport.flightId.length
              "
            >
              {{ props.transport.flightId }}
            </div>
            <!--Right arrow-->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-gray-500"
              fill="none"
              viewBox="0 0 100 20"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 10h90m0 0l-4-4m4 4l-4 4"
              />
            </svg>
          </div>
          <h3 class="text-xl">{{ props.transport.end }}</h3>
        </div>
        <!-- 其他信息：班次、价格等 -->
        <div class="text-sm text-gray-500 mt-4 flex justify-around">
          <span>{{ props.transport.cost }} 元</span>
          <span>
            {{ props.transport.startTime }} - {{ props.transport.endTime }}
          </span>
          <span>{{ props.transport.tickets }} 张票</span>
        </div>
      </div>
    </div>
  </div>
</template>
