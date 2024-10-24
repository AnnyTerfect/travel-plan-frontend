<script setup lang="ts">
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";
import TravelIsometric from "@/assets/img/Traveling-isometric.svg";

const router = useRouter();

const startTravel = () => {
  router.push("/query-submit");
};
</script>

<template>
  <header class="relative">
    <div class="py-20 flex flex-col justify-center items-center text-center">
      <h1 class="text-7xl font-bold">XiaKe Agent</h1>
      <p class="mb-12 mt-4 text-2xl leading-tight text-gray-600">
        Hi, I'm your personal travel agent. <br />
        Let's get started!
      </p>
      <el-button
        round
        size="large"
        type="primary"
        class="text-xl px-8 py-4"
        @click="startTravel"
      >
        <el-icon class="mr-4"><Search /></el-icon>
        Ask me
      </el-button>

      <TravelIsometric class="max-w-xl mx-auto" />
    </div>
  </header>

  <!-- 展示团队背景 -->
  <section class="bg-gray-50 py-32">
    <div class="max-w-4xl mx-auto px-4">
      <h2 class="text-center text-4xl font-bold mb-8">
        Powered by a team you can trust
      </h2>
      <div class="flex justify-center space-x-8 mt-8">
        <!-- 示例: 添加4个圆形占位符作为团队成员头像或logo -->
        <div
          v-for="i in 4"
          :key="i"
          class="w-24 h-24 bg-gray-300 rounded-full"
        ></div>
      </div>
    </div>
  </section>

  <!-- Footer Section -->
  <footer class="bg-secondary py-8 text-white">
    <div class="max-w-7xl mx-auto px-4">
      <p class="text-lg text-center">
        © 2024 All rights reserved by China Travel
      </p>
      <div class="mt-4 flex justify-center space-x-6">
        <a href="#" class="hover:text-sky-300">About Us</a>
        <a href="#" class="hover:text-sky-300">Contact</a>
        <a href="#" class="hover:text-sky-300">Privacy Policy</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>
