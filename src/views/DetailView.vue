<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { House, Bowl, Place, MapLocation } from "@element-plus/icons-vue";
import { useRoute } from "vue-router";

// 定义类型
interface Activity {
  trans_detail?: any[];
  trans_type?: string;
  trans_time?: number;
  trans_cost?: number;
  position?: string;
  type?: string;
  food_list?: string[];
  start_time?: string;
  end_time?: string;
  cost?: number;
  picture?: string;
}

interface IntercityTransport {
  type: string;
  start: string;
  end: string;
  TrainID?: string;
  start_time: string;
  end_time: string;
  FlightID?: string;
  tickets: number;
  cost: number;
}

// 响应式状态
const activities = ref<Activity[]>([]);
const intercityTransportStart = ref<IntercityTransport | null>(null);
const intercityTransportEnd = ref<IntercityTransport | null>(null);
const activeCollapse = ref<string | null>(null);
const dailyPOI1 = ref<any[]>([]);
const map = ref<any>(null);
const center = ref([118.796877, 32.060255]);
const targetCity = ref("");

const route = useRoute();

// 方法
const fetchActivities = async () => {
  try {
    const day = route.params.day;
    const id = route.params.id;
    const response = await axios.get(`http://210.28.135.197:8081/get_plan`, {
      params: { task_id: id, day: day },
    });
    console.log(response.data);
    dailyPOI1.value = response.data.plan.position_detail;
    activities.value = response.data.plan.activities;
    targetCity.value = response.data.plan.target_city;
    if (response.data.plan.intercity_transport_start) {
      intercityTransportStart.value =
        response.data.plan.intercity_transport_start;
    }
    if (response.data.plan.intercity_transport_end) {
      intercityTransportEnd.value = response.data.plan.intercity_transport_end;
    }
    setCityCenter(targetCity.value);
  } catch (error) {
    console.error("Failed to load activities:", error);
  }
};

const getPlaceIcon = (type: string) => {
  switch (type) {
    case "attraction":
      return Place;
    case "accommodation":
      return House;
    default:
      return Bowl;
  }
};

const getSpaceType = (type: string) => {
  switch (type) {
    case "attraction":
      return "景点";
    case "accommodation":
      return "住宿";
    case "breakfast":
      return "早餐";
    case "lunch":
      return "午餐";
    default:
      return "晚餐";
  }
};

const toggleCollapse = (index: number) => {
  activeCollapse.value =
    activeCollapse.value === String(index) ? null : String(index);
};

const initMap = () => {
  if (typeof AMap !== "undefined") {
    map.value = new AMap.Map("map", {
      zoom: 12,
      center: center.value,
    });
    console.log("初始化成功");
  } else {
    console.error("AMap is not defined. 请检查高德地图 JS API 是否正确引入。");
  }
};

const setCityCenter = (city: string) => {
  AMap.plugin("AMap.Geocoder", () => {
    const geocoder = new AMap.Geocoder();
    geocoder.getLocation(city, (status: string, result: any) => {
      if (status === "complete" && result.geocodes.length) {
        const location = result.geocodes[0].location;
        center.value = [location.lng, location.lat];
        initMap();
        if (dailyPOI1.value && dailyPOI1.value.length > 0) {
          dailyPOI1.value.forEach((day, index) => {
            planRoute(day.position_detail, index);
          });
        } else {
          console.error("dailyPOI1 数据尚未准备好");
        }
      }
    });
  });
};

const planRoute = (locations: any[]) => {
  console.log("规划路线的经纬度坐标：", locations);
  AMap.plugin("AMap.Driving", () => {
    const driving = new AMap.Driving({
      map: map.value,
      showTraffic: false,
      policy: AMap.DrivingPolicy.LEAST_TIME,
    });
    driving.search(
      locations[0],
      locations[locations.length - 1],
      {
        waypoints: locations.slice(1, locations.length - 1),
        showTraffic: false,
        extensions: "base",
      },
      (status: string, result: any) => {
        if (status === "complete") {
          console.log("路线规划成功", result);
          const path = result.routes[0].steps.flatMap((step: any) => step.path);
          const polyline = new AMap.Polyline({
            path: path,
            borderWeight: 1,
            strokeColor: "#417ab5",
            lineJoin: "round",
            strokeWeight: 3,
            strokeOpacity: 0.8,
            lineCap: "round",
            isOutline: true,
            outlineColor: "#ffffff",
          });
          map.value.add(polyline);
        } else {
          console.error("路线规划失败", result);
        }
      },
    );
  });
};

// 生命周期钩子
onMounted(() => {
  fetchActivities();
});
</script>

<template>
  <el-container class="bg-gray-100">
    <el-main class="max-w-2xl mx-auto p-4">
      <!-- 标题:Day{{day}} -->
      <el-row>
        <el-col :span="24" class="text-center">
          <h1 class="text-4xl">Day {{ this.$route.params.day }}</h1>
        </el-col>
      </el-row>
      <!-- 跨城通行（出发） -->
      <el-card
        v-if="intercityTransportStart"
        shadow="always"
        class="my-4 ml-72 mr-68 rounded-3xl pl-1"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- 飞机/高铁icon +（文字）跨城交通 -->
            <el-row>
              <img
                v-if="intercityTransportStart.type == 'airplane'"
                src="../assets/plane.svg"
                alt="transport type icon"
                class="h-8"
              />
              <span
                v-if="intercityTransportStart.type == 'airplane'"
                class="text-lg font-semibold ml-4 -mt-0.5"
                >城际交通 ( 飞机 )</span
              >

              <img
                v-if="intercityTransportStart.type == 'train'"
                src="../assets/train.svg"
                alt="transport type icon"
                class="h-8"
              />

              <span
                v-if="intercityTransportStart.type == 'train'"
                class="text-lg font-semibold ml-6 -mt-0.5"
                >城际交通 ( 高铁 )</span
              >
            </el-row>
            <!-- 地点 -->
            <p class="text-xl font-bold mt-3">
              {{ intercityTransportStart.start }} -
              {{ intercityTransportStart.end }}
            </p>
            <!-- 其他信息：班次、价格等 -->
            <div class="text-sm text-gray-500 mt-4">
              <span v-if="intercityTransportStart.type == 'train'">
                {{ intercityTransportStart.TrainID }}</span
              >
              |
              <span
                >{{ intercityTransportStart.start_time }} -
                {{ intercityTransportStart.end_time }}</span
              >
              |
              <span
                v-if="
                  intercityTransportStart.FlightID &&
                  intercityTransportStart.FlightID.length
                "
                >{{ intercityTransportStart.FlightID }}</span
              >
              <span>{{ intercityTransportStart.tickets }} 张票</span> |
              <span>{{ intercityTransportStart.cost }} 元</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <!-- 游玩路径 -->
      <el-timeline class="ml-56 mr-68">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          class="mb-6"
          placement="top"
        >
          <!-- 交通card -->
          <el-card
            v-if="activity.trans_detail && activity.trans_detail.length"
            shadow="always"
            class="mt-2"
            style="border-radius: 13px"
          >
            <el-collapse
              v-model="activeCollapse"
              accordion
              style="border-color: transparent !important"
            >
              <el-collapse-item
                :name="String(index)"
                style="border-radius: 13px"
              >
                <template #title style="border-radius: 13px">
                  <el-row
                    style="border-radius: 13px"
                    class="flex items-center space-x-2 mt-4"
                    @click="toggleCollapse(index)"
                  >
                    <img
                      v-if="activity.trans_type == 'walk'"
                      src="../assets/walk.svg"
                      alt="activity type icon"
                      style="height: 2rem"
                    />
                    <img
                      v-if="activity.trans_type == 'metro'"
                      src="../assets/地铁.svg"
                      alt="activity type icon"
                      style="height: 2rem"
                    />
                    <span
                      class="text-lg font-semibold"
                      style="margin-left: 2cap"
                    >
                      {{ activity.trans_time }} 分钟 |
                      {{ activity.trans_cost }} 元
                    </span>
                  </el-row>
                </template>
                <el-table
                  :data="activity.trans_detail"
                  stripe
                  style="width: 100%"
                  class="custom-table"
                >
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
            style="border-radius: 13px"
          >
            <el-row :gutter="20">
              <el-col :span="16">
                <el-row style="margin-top: -0.5rem">
                  <el-icon :size="24">
                    <component :is="getPlaceIcon(activity.type)" />
                  </el-icon>
                  <span
                    class="text-lg font-semibold"
                    style="margin-left: 1rem; margin-top: -0.1rem"
                    >{{ getSpaceType(activity.type) }}</span
                  >
                </el-row>
                <p class="text-lg font-bold" style="font-size: large">
                  {{ activity.position }}
                </p>
                <p
                  v-if="activity.food_list && activity.food_list.length"
                  class="text-lg font-bold"
                  style="
                    margin-top: 11px;
                    margin-bottom: -23px;
                    font-size: 14px;
                  "
                >
                  推荐菜品：{{ activity.food_list }}
                </p>
                <div class="text-sm text-gray-500" style="margin-top: 2rem">
                  <span
                    >{{ activity.start_time }} - {{ activity.end_time }}</span
                  >
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
      <!-- 跨城通行（结束） -->
      <el-card
        v-if="intercityTransportEnd"
        shadow="always"
        class="my-4 ml-72 mr-68 rounded-3xl pl-1"
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <img
                v-if="intercityTransportEnd.type == 'airplane'"
                src="../assets/plane.svg"
                alt="transport type icon"
                class="h-8"
              />
              <span
                v-if="intercityTransportEnd.type == 'airplane'"
                class="text-lg font-semibold ml-4 -mt-0.5"
                >城际交通 ( 飞机 )</span
              >

              <img
                v-if="intercityTransportEnd.type == 'train'"
                src="../assets/train.svg"
                alt="transport type icon"
                class="h-8"
              />

              <span
                v-if="intercityTransportEnd.type == 'train'"
                class="text-lg font-semibold ml-6 -mt-0.5"
                >城际交通 ( 高铁 )</span
              >
            </el-row>
            <p class="text-xl font-bold mt-3">
              {{ intercityTransportEnd.start }} -
              {{ intercityTransportEnd.end }}
            </p>
            <div class="text-sm text-gray-500 mt-4">
              <span v-if="intercityTransportEnd.type == 'train'">
                {{ intercityTransportEnd.TrainID }}</span
              >
              |<span
                >{{ intercityTransportEnd.start_time }} -
                {{ intercityTransportEnd.end_time }}</span
              >
              |
              <span>{{ intercityTransportEnd.tickets }} 张票</span> |
              <span>{{ intercityTransportEnd.cost }} 元</span>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </el-main>
  </el-container>
</template>
