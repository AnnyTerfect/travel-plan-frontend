<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();

const splitText = ref(
  "Hi, I'm your  personal  travel  agent. Let's  get  started!".split(/\s+/),
);

const carouselImages = ref([
  new URL("../assets/img1.jpg", import.meta.url).href,
  new URL("../assets/img1.jpg", import.meta.url).href,
  new URL("../assets/img1.jpg", import.meta.url).href,
]);

const startTravel = () => {
  router.push("/query-submit");
};
</script>

<template>
  <el-scrollbar height="100vh">
    <!-- 图片走马灯 -->
    <el-carousel height="700px" indicator-position="outside" :interval="4000">
      <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
        <img :src="image" class="block w-full h-[700px]" alt="Travel Image" />
      </el-carousel-item>
    </el-carousel>

    <!-- Header Section -->
    <header class="h-[90vh] flex justify-center items-center">
      <div class="text-center">
        <h1 class="text-8xl text-[#21bcbe] font-bold mt-40">XiaKe Agent</h1>
        <p
          class="w-4/5 mx-auto mt-2 text-6xl text-[#002c6a] font-bold leading-[5rem]"
        >
          <span
            v-for="(word, index) in splitText"
            :key="index"
            class="inline-block mr-5 font-bold"
          >
            {{ word }}
          </span>
        </p>
        <el-button
          type="primary"
          class="mt-14 mb-48 bg-[#21bcbe] border-0 px-20 py-12 text-4xl rounded-full"
          @click="startTravel"
        >
          <el-icon class="mr-4"><Search /></el-icon>
          Ask me
        </el-button>
      </div>
    </header>

    <!-- 展示团队背景 -->
    <section class="bg-white py-14 px-0 text-center">
      <h2 class="text-5xl font-bold text-[#002c6a] -mb-8">
        由值得信赖的研发团队提供支持
      </h2>
      <!-- NJU、lamda logo 部分已被注释掉 -->
    </section>

    <!-- Footer Section -->
    <footer class="py-4">
      <div
        class="flex justify-between items-center max-w-7xl mx-auto text-gray-400"
      >
        <p class="text-gray-600 text-base">
          © 2024 All rights reserved by China Travel
        </p>
      </div>
    </footer>
  </el-scrollbar>
</template>
