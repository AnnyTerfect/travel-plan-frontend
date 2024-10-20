<template>
  <el-scrollbar height="100vh">
    <div>
      <!-- 标题：{{目的城市}}旅程 -->
      <el-header class="header" style="padding-top: 17px; height: 75px">
        <el-row>
          <el-col :span="6"> </el-col>
          <el-col :span="12" class="title-col">
            <h1 class="title" style="font-size: 2.8cap">
              {{ targetCity }}精彩旅程
            </h1>
          </el-col>
          <el-col :span="6" class="trip-duration-col"> </el-col>
        </el-row>
      </el-header>

      <el-main class="container main-content">
        <!-- 每日路线卡片 -->
        <el-card class="box-card" shadow="hover" style="margin-top: 30px">
          <!-- icon+daily POI 标题  -->
          <div class="card-header">
            <el-icon><calendar /></el-icon>
            <span>Daily POI</span>
          </div>
          <!-- 每日的信息总览 card -->
          <el-row :gutter="10">
            <!-- for循坏一天一个卡片 -->
            <el-col :span="24" v-for="(day, index) in dailyPOI" :key="index">
              <el-card class="poi-card">
                <h3 class="day-title">{{ day.title }}</h3>
                <p>{{ day.cost }} 元</p>
                <p>{{ day.route }}</p>
                <el-button
                  type="text"
                  class="details-button"
                  @click="viewDetails(day.day)"
                  >详情 {{ day.day }}</el-button
                >
              </el-card>
            </el-col>
          </el-row>
        </el-card>
        <!-- 高德地图部分 -->
        <el-card
          class="box-card"
          shadow="hover"
          style="margin-top: 32px; margin-bottom: 50px"
        >
          <!-- icon+travel route 标题  -->
          <div class="card-header">
            <el-icon><map-location /></el-icon>
            <span class="travel-route-title">Travel route</span>
          </div>
          <!-- 地图 -->
          <div id="map" class="map-container"></div>
        </el-card>
      </el-main>
    </div>
  </el-scrollbar>
</template>

<script>
import {
  ArrowLeft,
  View,
  Calendar,
  MapLocation,
} from "@element-plus/icons-vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  name: "TravelItinerary",
  components: {
    //icon组件声明
    ArrowLeft,
    View,
    Calendar,
    MapLocation,
  },
  data() {
    return {
      dailyPOI: [], //对应后端的 itinerary，用来渲染卡片
      dailyPOI1: [], //和dailyPOI差不多，用来画高德路线
      map: null, //高德地图初始化
      center: [118.796877, 32.060255], //高德地图中心城市
      targetCity: "", //旅游目的城市
    };
  },
  created() {
    this.fetchItineraryData(); // 加载数据时不立即初始化地图
  },
  methods: {
    async fetchItineraryData() {
      try {
        const id = this.$route.params.id; //获取task_id
        const response = await axios.get(
          `http://210.28.135.197:8081/get_plan`,
          {
            //const response = await axios.get(`/plan_POI.json`, {
            params: { task_id: id },
          },
        );
        console.log(response.data);

        const itinerary = response.data.plan.itinerary;
        this.targetCity = response.data.plan.target_city;

        // 更新 dailyPOI，用于显示 POI 信息
        this.dailyPOI = itinerary.map(day => ({
          title: `Day ${day.day}`,
          day: day.day,
          cost: day.cost, // 费用
          route: day.position.join(" ↔ "),
        }));

        // 保存每一天的位置详情
        this.dailyPOI1 = itinerary;

        // 设置地图中心位置，数据获取后初始化地图并绘制路线
        this.setCityCenter(this.targetCity);
      } catch (error) {
        console.error("Error fetching itinerary data:", error);
      }
    },

    initMap() {
      //地图初始化
      if (typeof AMap !== "undefined") {
        this.map = new AMap.Map("map", {
          zoom: 12,
          center: this.center,
        });
      } else {
        console.error(
          "AMap is not defined. 请检查高德地图 JS API 是否正确引入。",
        );
      }
    },

    setCityCenter(city) {
      //设置地图的中心点
      AMap.plugin("AMap.Geocoder", () => {
        const geocoder = new AMap.Geocoder();
        geocoder.getLocation(city, (status, result) => {
          if (status === "complete" && result.geocodes.length) {
            const location = result.geocodes[0].location;
            this.center = [location.lng, location.lat];

            // 初始化地图，确保地图已经加载完成后再进行路线绘制
            this.initMap();

            // 检查并转换坐标后再绘制路线
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

    planRoute(locations, index) {
      //绘制路线
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
              const colorList = [
                "#417ab5",
                "#d93b3a",
                "#FFA500",
                "#9CD5E3",
                "#CEBDCF",
                "#F37455",
              ]; // 定义颜色列表，每天不同颜色
              //设置路线的样式
              const polyline = new AMap.Polyline({
                path: path,
                borderWeight: 1,
                strokeColor: colorList[index % colorList.length], // 使用不同颜色
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
    viewDetails(day) {
      //跳转每日规划页面
      this.$router.push({
        name: "Detail",
        params: { id: this.$route.params.id, day: day },
      });
    },
  },
};
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-button {
  color: #606060;
}

.title {
  color: #1e3a8a;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
}

.trip-duration {
  color: #1d4ed8;
  text-align: right;
}

.tags-section {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.card-header el-icon {
  margin-right: 10px;
}

.travel-route-title {
  font-size: 18px;
  font-weight: bold;
}

.map-container {
  height: 400px;
  width: 100%;
  background-color: #e5e7eb;
  border-radius: 10px;
  margin-top: 20px;
}

.poi-card {
  background-color: #f9fafb;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
}

.day-title {
  font-weight: bold;
}

.details-button {
  color: #3b82f6;
}
</style>
