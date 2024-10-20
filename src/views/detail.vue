<template>
  <el-container class="bg-gray-100">
    <el-main class="max-w-2xl mx-auto p-4">
      <!-- 标题:Day{{day}} -->
      <el-row>
        <el-col :span="24" style="text-align: center">
          <h1 style="font-size: 28pt">Day {{ this.$route.params.day }}</h1>
        </el-col>
      </el-row>
      <!-- 跨城通行（出发） -->
      <el-card
        v-if="intercityTransportStart"
        shadow="always"
        class="my-4"
        style="
          margin-left: 18rem;
          margin-right: 17rem;
          border-radius: 20px;
          padding-left: 5px;
        "
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <!-- 飞机/高铁icon +（文字）跨城交通 -->
            <el-row>
              <img
                v-if="intercityTransportStart.type == 'airplane'"
                src="../assets/plane.svg"
                alt="transport type icon"
                style="height: 2rem"
              />
              <span
                v-if="intercityTransportStart.type == 'airplane'"
                class="text-lg font-semibold"
                style="margin-left: 1rem; margin-top: -0.1rem"
                >城际交通 ( 飞机 )</span
              >

              <img
                v-if="intercityTransportStart.type == 'train'"
                src="../assets/train.svg"
                alt="transport type icon"
                style="height: 2rem"
              />

              <span
                v-if="intercityTransportStart.type == 'train'"
                class="text-lg font-semibold"
                style="margin-left: 1.5rem; margin-top: -0.05rem"
                >城际交通 ( 高铁 )</span
              >
            </el-row>
            <!-- 地点 -->
            <p
              class="text-lg font-bold"
              style="font-size: larger; margin-top: 13px"
            >
              {{ intercityTransportStart.start }} -
              {{ intercityTransportStart.end }}
            </p>
            <!-- 其他信息：班次、价格等 -->
            <div class="text-sm text-gray-500" style="margin-top: 1rem">
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
          <!-- <el-col :span="6">
            <el-image
              :src="intercityTransportStart.imgSrc || '../assets/airplane-placeholder.png'"
              fit="cover"
              class="w-full h-20 bg-gray-300 flex items-center justify-center text-lg font-bold"
            >
              <template #placeholder>img</template>
            </el-image>
          </el-col> -->
        </el-row>
      </el-card>
      <!-- 游玩路径 -->
      <el-timeline style="margin-left: 14rem; margin-right: 17rem">
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
        class="my-4"
        style="
          margin-left: 18rem;
          margin-right: 17rem;
          border-radius: 20px;
          padding-left: 5px;
        "
      >
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <img
                v-if="intercityTransportEnd.type == 'airplane'"
                src="../assets/plane.svg"
                alt="transport type icon"
                style="height: 2rem"
              />
              <span
                v-if="intercityTransportEnd.type == 'airplane'"
                class="text-lg font-semibold"
                style="margin-left: 1rem; margin-top: -0.1rem"
                >城际交通 ( 飞机 )</span
              >

              <img
                v-if="intercityTransportEnd.type == 'train'"
                src="../assets/train.svg"
                alt="transport type icon"
                style="height: 2rem"
              />

              <span
                v-if="intercityTransportEnd.type == 'train'"
                class="text-lg font-semibold"
                style="margin-left: 1.5rem; margin-top: -0.05rem"
                >城际交通 ( 高铁 )</span
              >
            </el-row>
            <p
              class="text-lg font-bold"
              style="font-size: larger; margin-top: 13px"
            >
              {{ intercityTransportEnd.start }} -
              {{ intercityTransportEnd.end }}
            </p>
            <div class="text-sm text-gray-500" style="margin-top: 1rem">
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
          <!-- <el-col :span="6">
            <el-image
              :src="intercityTransportStart.imgSrc || '../assets/airplane-placeholder.png'"
              fit="cover"
              class="w-full h-20 bg-gray-300 flex items-center justify-center text-lg font-bold"
            >
              <template #placeholder>img</template>
            </el-image>
          </el-col> -->
        </el-row>
      </el-card>
      <!-- 游玩map -->
      <!-- <el-card class="box-card" shadow="hover" style="margin-top: 32px; margin-bottom: 50px">
        <div class="card-header">
          <el-icon><map-location /></el-icon>
          <span class="travel-route-title">Travel route</span>
        </div>
        <div id="map" class="map-container"></div>
      </el-card> -->
    </el-main>
  </el-container>
</template>

<script>
import axios from "axios";
import { House, Bowl, Place, MapLocation } from "@element-plus/icons-vue";
import { ref } from "vue";

export default {
  name: "DayItinerary",
  components: {
    //icon组件声明
    House,
    Bowl,
    Place,
    MapLocation,
  },
  data() {
    return {
      activities: [], //对应后端的activities
      intercityTransportStart: null, //换乘起始信息，对应后端intercity_transport_start
      intercityTransportEnd: null, //换乘起始信息，对应后端intercity_transport_end
      activeCollapse: null,
      dailyPOI1: [],
      map: null,
      center: [118.796877, 32.060255],
      targetCity: "",
    };
  },
  created() {
    this.fetchActivities();
  },
  methods: {
    async fetchActivities() {
      try {
        const day = this.$route.params.day;
        const id = this.$route.params.id;
        //后端请求
        const response = await axios.get(
          `http://210.28.135.197:8081/get_plan`,
          {
            //本地文件读取
            //const response = await axios.get(`/plan_daily`, {
            params: { task_id: id, day: day },
          },
        );
        console.log(response.data);
        // 保存每一天的位置详情（如果是本地读取请去掉response.data后的plan ↓）
        this.dailyPOI1 = response.data.plan.position_detail;
        this.activities = response.data.plan.activities;
        this.targetCity = response.data.plan.target_city;
        if (response.data.plan.intercity_transport_start) {
          this.intercityTransportStart =
            response.data.plan.intercity_transport_start;
        }
        if (response.data.plan.intercity_transport_end) {
          this.intercityTransportEnd =
            response.data.plan.intercity_transport_end;
        }
        // 设置地图中心位置，数据获取后初始化地图并绘制路线
        this.setCityCenter(this.targetCity);
      } catch (error) {
        console.error("Failed to load activities:", error);
      }
    },
    getPlaceIcon(type) {
      switch (type) {
        case "attraction":
          return Place;
        case "accommodation":
          return House;
        default:
          return Bowl;
      }
    },
    getSpaceType(type) {
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
    },
    getTransportIcon(type) {
      switch (type) {
        case "airplane":
          return "../assets/plane.svg";
        default:
          return Bowl;
      }
    },
    activityTitle(activity) {
      return `${activity.trans_time} 分钟 | ${activity.trans_cost} 元`;
    },
    toggleCollapse(index) {
      this.activeCollapse =
        this.activeCollapse === String(index) ? null : String(index);
    },
    initMap() {
      if (typeof AMap !== "undefined") {
        this.map = new AMap.Map("map", {
          zoom: 12,
          center: this.center,
        });
        console.log("初始化成功");
      } else {
        console.error(
          "AMap is not defined. 请检查高德地图 JS API 是否正确引入。",
        );
      }
    },
    setCityCenter(city) {
      //设置中心城市
      AMap.plugin("AMap.Geocoder", () => {
        const geocoder = new AMap.Geocoder();
        geocoder.getLocation(city, (status, result) => {
          if (status === "complete" && result.geocodes.length) {
            const location = result.geocodes[0].location;
            this.center = [location.lng, location.lat];

            // 初始化地图
            this.initMap();

            // 确保地图已经加载完成后再进行路线规划
            if (this.dailyPOI1 && this.dailyPOI1.length > 0) {
              this.dailyPOI1.forEach((day, index) => {
                this.planRoute(day.position_detail, index);
              });
            } else {
              console.error("dailyPOI1 数据尚未准备好");
            }
          }
        });
      });
    },

    planRoute(locations) {
      //画路线
      console.log("规划路线的经纬度坐标：", locations);
      AMap.plugin("AMap.Driving", () => {
        const driving = new AMap.Driving({
          map: this.map,
          showTraffic: false,
          policy: AMap.DrivingPolicy.LEAST_TIME,
        });
        driving.search(
          locations[0], // 起点
          locations[locations.length - 1], // 终点
          {
            waypoints: locations.slice(1, locations.length - 1), // 途经点
            showTraffic: false, // 不显示交通情况
            extensions: "base", // 基本路径信息，不显示详细路径信息
          },
          (status, result) => {
            if (status === "complete") {
              console.log("路线规划成功", result);
              // 绘制路径并设置颜色
              const path = result.routes[0].steps.flatMap(step => step.path);

              const polyline = new AMap.Polyline({
                path: path,
                borderWeight: 1,
                strokeColor: "#417ab5", // 使用不同颜色
                lineJoin: "round",
                strokeWeight: 3, // 线条宽度
                strokeOpacity: 0.8, // 线条透明度
                lineJoin: "round", // 拐角类型
                lineCap: "round", // 线端类型
                isOutline: true, // 是否描边
                outlineColor: "#ffffff", // 描边颜色
              });
              this.map.add(polyline);
            } else {
              console.error("路线规划失败", result);
            }
          },
        );
      });
    },
  },
};
</script>

<style scoped>
.bg-gray-100 {
  background-color: #f7fafc;
}
.w-20 {
  width: 5rem;
}
.h-20 {
  height: 5rem;
}
.flex {
  display: flex;
}
.items-center {
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.flex-shrink-0 {
  flex-shrink: 0;
}
.mx-auto {
  margin-left: auto;
  margin-right: auto;
}
.p-4 {
  padding: 1rem;
}
.text-lg {
  font-size: 1.125rem;
}
.font-bold {
  font-weight: 700;
}
.text-gray-500 {
  color: #6b7280;
}
.mb-6 {
  margin-bottom: 1.5rem;
}
.mt-2 {
  margin-top: 1rem;
}
.my-4 {
  margin: 1rem 0;
}
:deep(.el-table__header-wrapper) {
  border-radius: 8px;
  z-index: 100 !important;
  overflow: hidden;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  -ms-border-radius: 8px;
  -o-border-radius: 8px;
}
.map-container {
  height: 400px; /* 确保设置了足够的高度 */
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 10px;
  margin-top: 20px;
}
</style>
