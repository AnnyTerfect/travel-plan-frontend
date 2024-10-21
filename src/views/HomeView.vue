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
    <el-carousel height="100vh" indicator-position="outside" :interval="4000">
      <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
        <img
          :src="image"
          class="w-full h-full object-cover"
          alt="Travel Image"
        />
      </el-carousel-item>
    </el-carousel>

    <!-- Header Section -->
    <header
      class="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-black bg-opacity-40"
    >
      <div class="text-center">
        <h1 class="text-8xl text-white font-bold mb-6">XiaKe Agent</h1>
        <p
          class="w-4/5 mx-auto mb-10 text-5xl text-white font-bold leading-tight"
        >
          <span
            v-for="(word, index) in splitText"
            :key="index"
            class="inline-block mr-3"
          >
            {{ word }}
          </span>
        </p>
        <el-button
          round
          size="large"
          type="primary"
          class="mt-8 bg-[#21bcbe] hover:bg-[#1a9a9c] border-0 px-16 py-6 text-3xl rounded-full transition duration-300"
          @click="startTravel"
        >
          <el-icon class="mr-4"><Search /></el-icon>
          Ask me
        </el-button>
      </div>
    </header>

    <!-- 展示团队背景 -->
    <section class="bg-white py-20 px-4">
      <h2 class="text-5xl font-bold text-[#002c6a] mb-12">
        由值得信赖的研发团队提供支持
      </h2>
      <!-- 可以在这里添加团队logo或其他内容 -->
    </section>

    <!-- Footer Section -->
    <footer class="bg-gray-100 py-6">
      <div class="max-w-7xl mx-auto px-4">
        <p class="text-gray-600 text-base text-center">
          © 2024 All rights reserved by China Travel
        </p>
      </div>
    </footer>
  </el-scrollbar>
</template>
