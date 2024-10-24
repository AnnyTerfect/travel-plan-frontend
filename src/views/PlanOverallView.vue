<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import aMap, { markLocations, setCenter } from "@/lib/map";
import PlanDailyView from "@/components/PlanDailyView.vue";
import TravelPlans from "@/assets/img/travel-plans.svg";
import { Back } from "@element-plus/icons-vue";
import type { MapInstance, PlanOverall, PlanDaily, Activity } from "types";
import { fetchPlanDaily, fetchPlanOverall } from "@/request";

const route = useRoute();
const router = useRouter();

const map = ref<MapInstance | null>(null);

const loading = ref(true);
const activeDay = ref("1");

const planOverall = ref<PlanOverall>({
  peopleNumber: 1,
  startCity: "",
  targetCity: "",
  start: "",
  end: "",
  itinerary: [],
});
const planDaily = ref<PlanDaily[]>([]);
const scrollY = ref(0);

const scrollRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

const activeDayNumber = computed(() => Number(activeDay.value) - 1);
const activeItinerary = computed(() => {
  return planOverall.value.itinerary[activeDayNumber.value];
});
const activePlanDaily = computed(() => planDaily.value[activeDayNumber.value]);
const walkDistance = computed(() => {
  let distance = 0;
  if (!activePlanDaily.value) return 0;
  for (const activity of activePlanDaily.value.activities) {
    if (activity.transDetail) {
      for (const detail of activity.transDetail) {
        if (detail.mode === "walk") {
          distance += detail.distance;
        }
      }
    }
  }
  return distance;
});

function handleScroll({ scrollTop }: { scrollTop: number }) {
  scrollY.value = scrollTop;
}

function initMap() {
  map.value = new aMap.Map("map", {
    zoom: 12,
    center: [118.796877, 32.060255],
  });
}

async function loadPlanOverallData() {
  const id = route.params.id as string;
  planOverall.value = await fetchPlanOverall(id);
  planDaily.value[0] = await fetchPlanDaily(id, 1);
  handleSelectDay("1");
  loading.value = false;
}

async function handleSelectDay(index: string) {
  activeDay.value = index;
  const activeDayNumber = Number(index) - 1;
  const activeItinerary = planOverall.value.itinerary[activeDayNumber];
  if (!planDaily.value?.[activeDayNumber]) {
    loading.value = true;
    planDaily.value[activeDayNumber] = await fetchPlanDaily(
      route.params.id as string,
      activeDayNumber + 1,
    );
    loading.value = false;
  }

  if (map.value) {
    console.log(activeItinerary);
    const hasInterCityTransportStart =
      !!activePlanDaily.value.intercityTransportStart;
    const hasInterCityTransportEnd =
      !!activePlanDaily.value.intercityTransportEnd;
    markLocations(
      map.value,
      activeItinerary.positionDetail,
      activeItinerary.position
        .slice(hasInterCityTransportStart ? 1 : 0)
        .slice(0, hasInterCityTransportEnd ? -1 : undefined),
    );
  }

  scrollRef.value?.scrollTo({
    left: 0,
    top: headerRef.value?.offsetTop || 0,
    behavior: "smooth",
  });
}

function handleClickActivity(activity: Activity) {
  if (map.value) {
    const index = activeItinerary.value.position.findIndex(
      name => name === activity.position,
    );
    const hasInterCityTransportStart =
      !!activePlanDaily.value.intercityTransportStart;
    // An extra position is added for the start of the intercity transport
    const location =
      activeItinerary.value.positionDetail[
        index - (hasInterCityTransportStart ? 1 : 0)
      ];
    setCenter(map.value, location);
  }
}

onMounted(() => {
  initMap();
  loadPlanOverallData();
});

onUnmounted(() => {
  map.value?.destroy();
});
</script>

<template>
  <el-container class="fixed h-screen w-full">
    <el-aside v-loading="loading" class="max-w-[600px]" width="40%">
      <el-button
        class="fixed top-0 left-0 m-2 z-20"
        circle
        size="large"
        :icon="Back"
        @click="() => router.back()"
      />

      <el-scrollbar ref="scrollRef" class="h-full pr-2" @scroll="handleScroll">
        <TravelPlans
          class="w-full mx-auto origin-bottom transition-all duration-[50ms]"
          :style="{ scale: `${Math.max(1 - scrollY / 1000, 0)}` }"
        />

        <div ref="headerRef" class="sticky top-0 z-10 bg-white">
          <div class="p-4">
            <h1 class="text-3xl text-center">
              {{ planOverall.targetCity }}
              {{ planOverall.itinerary.length }} 天行程
            </h1>
          </div>

          <el-menu
            :default-active="activeDay"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelectDay"
          >
            <el-menu-item
              :index="String(day.day)"
              v-for="day in planOverall.itinerary"
              class="select-none"
              :key="day.day"
            >
              Day {{ day.day }}
            </el-menu-item>
          </el-menu>
        </div>

        <div class="pt-4 min-h-screen bg-gray-100 space-y-2">
          <template v-if="activeItinerary">
            <el-card shadow="never">
              <template #default>
                <div class="flex justify-around">
                  <el-statistic :value="activeItinerary.positionDetail.length">
                    <template #title>
                      <h3>到达景点</h3>
                    </template>
                  </el-statistic>
                  <el-statistic :value="walkDistance">
                    <template #title>
                      <h3>步行 (km)</h3>
                    </template>
                  </el-statistic>
                  <el-statistic :value="activeItinerary.cost">
                    <template #title>
                      <h3>花费 (RMB)</h3>
                    </template>
                  </el-statistic>
                </div>
              </template>
            </el-card>
          </template>

          <plan-daily-view
            v-if="planDaily[activeDayNumber]"
            :planDaily="planDaily[activeDayNumber]"
            @click-activity="handleClickActivity"
          />
        </div>
      </el-scrollbar>
    </el-aside>

    <el-container class="sticky top-0 h-screen">
      <div class="h-full w-full rounded-lg overflow-hidden">
        <div id="map" class="h-full"></div>
      </div>
    </el-container>
  </el-container>
</template>
