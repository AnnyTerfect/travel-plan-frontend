<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

interface FormData {
  startCity: string;
  destinationCity: string;
  peopleCount: number;
  daysCount: number;
  additionalRequirements: string;
}

const form = reactive<FormData>({
  startCity: "上海",
  destinationCity: "杭州",
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
    console.log("ok!", response.data);
    router.push({
      name: "PlanTotal",
      params: { id: response.data.task_id },
    });
  } catch (error) {
    console.error("Failed to send the form data:", error);
  } finally {
    loading.value = false;
  }
};

const handleReset = () => {
  Object.assign(form, {
    startCity: "",
    destinationCity: "",
    peopleCount: 1,
    daysCount: 1,
    additionalRequirements: "",
  });
};
</script>

<template>
  <!-- 全屏滚动效果 -->
  <el-scrollbar class="h-screen" v-loading="loading">
    <el-container
      class="bg-gray-100 flex items-center justify-center min-h-screen"
    >
      <el-main class="w-full p-8 bg-white shadow-lg rounded-lg">
        <!-- 标题Travel Plan -->
        <el-row class="flex justify-center mb-8 mt-9">
          <h1 class="text-5xl font-bold text-blue-900 text-center">
            Travel Plan
          </h1>
        </el-row>
        <!-- 起始城市、目的城市、人数、天数card -->
        <el-row class="gap-8 mb-6">
          <el-col :span="2"></el-col>
          <el-col :span="9">
            <!-- 起始城市、目的城市  -->
            <el-card class="bg-blue-100 p-4 rounded-2xl mb-6">
              <el-row class="gap-5 ml-1 mt-2">
                <el-col :span="24">
                  <el-form-item
                    label="起始城市"
                    label-position="top"
                    label-width="200px"
                  >
                    <el-input
                      v-model="form.startCity"
                      placeholder="例如：北京"
                      class="w-60 ml-6 rounded-2xl"
                      size="large"
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item
                    label="目的城市"
                    label-position="top"
                    label-width="200px"
                  >
                    <el-input
                      class="w-60 ml-6"
                      size="large"
                      v-model="form.destinationCity"
                      placeholder="例如：南京"
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
          <el-col :span="1"></el-col>

          <el-col :span="9">
            <el-card class="bg-blue-100 p-4 rounded-2xl mb-6">
              <el-row class="gap-5 mt-2 ml-0.5">
                <el-col :span="24">
                  <el-form-item label="出行人数" label-width="100px">
                    <el-input-number
                      v-model="form.peopleCount"
                      size="large"
                      class="ml-6 rounded-2xl"
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="游玩天数" label-width="100px">
                    <el-input-number
                      v-model="form.daysCount"
                      size="large"
                      class="ml-6 rounded-2xl"
                      :min="1"
                    ></el-input-number>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- 自然语言输入框 -->
        <el-row>
          <el-col :span="2"></el-col>
          <el-col :span="19">
            <el-card class="bg-blue-100 p-4 rounded-2xl mb-6">
              <el-row class="mb-6 m-1 mt-6">
                <el-form-item label="其他要求">
                  <el-input
                    type="textarea"
                    v-model="form.additionalRequirements"
                    placeholder="Please input"
                    class="w-[50rem] ml-1"
                    :rows="6"
                  ></el-input>
                </el-form-item>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
        <!-- 搜索、重置按钮 -->
        <el-row class="flex justify-center mt-4">
          <el-button
            type="primary"
            class="py-6 px-6 text-xl rounded-full bg-[#21bcbe] border-0 -ml-3"
            @click="handleSearch"
            >搜索</el-button
          >
          <el-button
            type="default"
            plain
            class="py-6 px-6 text-xl rounded-full text-[#21bcbe] border-[#21bcbe] ml-[50px]"
            @click="handleReset"
            >重置</el-button
          >
        </el-row>
      </el-main>
    </el-container>
  </el-scrollbar>
</template>
