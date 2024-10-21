<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Calendar, MapLocation } from "@element-plus/icons-vue";
import axios from "axios";

interface DailyPOI {
  title: string;
  day: number;
  cost: number;
  route: string;
}

interface PositionDetail {
  // 根据实际数据结构定义
}

const route = useRoute();
const router = useRouter();

const dailyPOI = ref<DailyPOI[]>([]);
const dailyPOI1 = ref<any[]>([]); // 根据实际数据结构调整类型
const map = ref<any>(null);
const center = ref([118.796877, 32.060255]);
const targetCity = ref("");

const fetchItineraryData = async () => {
  try {
    const id = route.params.id as string;
    const response = await axios.get(
      import.meta.env.DEV ? "/get_plan" : "http://210.28.135.197:8081/get_plan",
      {
        params: { task_id: id },
      },
    );
    console.log(response.data);

    const itinerary = response.data.plan.itinerary;
    targetCity.value = response.data.plan.target_city;

    dailyPOI.value = itinerary.map((day: any) => ({
      title: `Day ${day.day}`,
      day: day.day,
      cost: day.cost,
      route: day.position.join(" ↔ "),
    }));

    dailyPOI1.value = itinerary;

    setCityCenter(targetCity.value);
  } catch (error) {
    console.error("Error fetching itinerary data:", error);
  }
};

const initMap = () => {
  if (typeof AMap !== "undefined") {
    map.value = new AMap.Map("map", {
      zoom: 12,
      center: center.value,
    });
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

const planRoute = (locations: PositionDetail[], index: number) => {
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
          const colorList = [
            "#417ab5",
            "#d93b3a",
            "#FFA500",
            "#9CD5E3",
            "#CEBDCF",
            "#F37455",
          ];
          const polyline = new AMap.Polyline({
            path: path,
            borderWeight: 1,
            strokeColor: colorList[index % colorList.length],
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

const viewDetails = (day: number) => {
  router.push({
    name: "Detail",
    params: { id: route.params.id, day: day },
  });
};

onMounted(() => {
  fetchItineraryData();
});
</script>

<template>
  <el-scrollbar class="h-screen">
    <div>
      <el-header class="bg-white shadow-md pt-[17px] h-[75px]">
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12">
            <h1 class="text-[2.8cap] text-center font-bold text-[#1e3a8a]">
              {{ targetCity }}精彩旅程
            </h1>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-header>

      <el-main class="max-w-[1200px] mx-auto px-5">
        <el-card class="mt-[30px] hover:shadow-lg">
          <div class="flex items-center mb-[10px]">
            <el-icon class="mr-[10px]"><calendar /></el-icon>
            <span>Daily POI</span>
          </div>
          <el-row :gutter="10">
            <el-col :span="24" v-for="(day, index) in dailyPOI" :key="index">
              <el-card class="bg-[#f9fafb] p-[10px] rounded-[10px] mb-[10px]">
                <h3 class="font-bold">{{ day.title }}</h3>
                <p>{{ day.cost }} 元</p>
                <p>{{ day.route }}</p>
                <el-button
                  type="text"
                  class="text-[#3b82f6]"
                  @click="viewDetails(day.day)"
                  >详情 {{ day.day }}</el-button
                >
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <el-card class="mt-[32px] mb-[50px] hover:shadow-lg">
          <div class="flex items-center mb-[10px]">
            <el-icon class="mr-[10px]"><map-location /></el-icon>
            <span class="text-[18px] font-bold">Travel route</span>
          </div>
          <div
            id="map"
            class="h-[400px] w-full bg-[#e5e7eb] rounded-[10px] mt-[20px]"
          ></div>
        </el-card>
      </el-main>
    </div>
  </el-scrollbar>
</template>
