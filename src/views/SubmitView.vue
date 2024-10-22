<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { Search } from "@element-plus/icons-vue";
import cityData from "@/assets/data/cities.json?raw";
import Travel from "@/assets/travel.svg";

const router = useRouter();

interface FormData {
  startCity: string;
  destinationCity: string;
  peopleCount: number;
  daysCount: number;
  additionalRequirements: string;
}

interface CityListItem {
  value: string;
  label: string;
}

let cityOptions: CityListItem[] = [];
try {
  cityOptions = JSON.parse(cityData).map((city: string) => ({
    value: city,
    label: city,
  }));
} catch (error) {
  console.error("Failed to parse the city data:", error);
}

const form = reactive<FormData>({
  startCity: "上海市",
  destinationCity: "杭州市",
  peopleCount: 1,
  daysCount: 1,
  additionalRequirements: "",
});

const loading = ref(false);

const handleSearch = async () => {
  loading.value = true;
  try {
    const response = await axios.post(
      "http://210.28.135.197:8081/test_plan",
      form,
    );

    router.push({
      name: "PlanOverall",
      params: { id: response.data.task_id },
    });
  } catch (error) {
    console.error("Failed to send the form data:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Travel class="max-w-6xl mx-auto" />
  
  <div class="w-full max-w-5xl mx-auto border p-6 rounded-lg relative my-4">
    <h1 class="text-5xl text-center my-6">Travel Plan</h1>
    <div class="grid grid-cols-2 lg:flex space-x-2">
      <el-form-item label="起始城市" label-position="top" class="flex-1">
        <el-select
          v-model="form.startCity"
          filterable
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="目的城市" label-position="top" class="flex-1">
        <el-select
          v-model="form.destinationCity"
          filterable
          placeholder="Select"
          size="large"
        >
          <el-option
            v-for="item in cityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出行人数" label-position="top">
        <el-input-number
          v-model="form.peopleCount"
          size="large"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="游玩天数" label-position="top">
        <el-input-number
          v-model="form.daysCount"
          size="large"
          :min="1"
        ></el-input-number>
      </el-form-item>
    </div>

    <el-form-item label="其他要求" label-position="top">
      <el-input
        type="textarea"
        v-model="form.additionalRequirements"
        placeholder="请输入您的其他要求"
        class="w-full"
        :rows="6"
      ></el-input>
    </el-form-item>

    <div class="text-center">
      <el-button
        class="mx-auto"
        type="primary"
        size="large"
        v-loading.fullscreen.lock="loading"
        @click="handleSearch"
      >
        <el-icon class="mr-4"><Search /></el-icon>
        开始规划
      </el-button>
    </div>
  </div>
</template>
