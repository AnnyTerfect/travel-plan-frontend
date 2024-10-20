<template>
  <el-scrollbar height="100vh">
    <div style="background-color: white; font-family: sans-serif; color: blue">
      <!-- Header Section  -->
      <el-header
        height="90vh"
        style="
          background-color: white;
          color: blue;
          display: flex;
          justify-content: center;
          align-items: center;
        "
      >
        <div style="text-align: center">
          <!-- 依次为大标题、文字、按钮 -->
          <h1
            style="
              font-size: 5rem;
              color: #21bcbe;
              font-weight: 700;
              margin-top: 10rem;
            "
          >
            XiaKe Agent
          </h1>
          <p
            style="
              width: 80%;
              margin: 0 auto;
              margin-top: 0.55rem;
              font-size: 4rem;
              color: rgb(0, 44, 106);
              font-weight: 700;
              line-height: 5rem;
            "
          >
            <span
              v-for="(word, index) in splitText"
              :key="index"
              style="
                display: inline-block;
                margin-right: 1.3rem;
                font-weight: 700;
              "
              >{{ word }}</span
            >
          </p>
          <el-button
            type="primary"
            style="
              margin-top: 2.5rem;
              background: #21bcbe;
              border: 0;
              margin-bottom: 12rem;
              margin-top: 3.5rem;
              padding: 3rem 5rem;
              font-size: 2.5rem;
              border-radius: 228px;
            "
            @click="startTravel"
          >
            <el-icon style="margin-right: 1rem"><Search /></el-icon>
            Ask me</el-button
          >
        </div>
      </el-header>

      <!-- 图片走马灯 -->
      <el-carousel height="700px" indicator-position="outside" :interval="4000">
        <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
          <img
            :src="image"
            style="display: block; width: 100%; height: 700px"
            alt="Travel Image"
          />
        </el-carousel-item>
      </el-carousel>

      <!-- 展示团队背景 -->
      <section
        style="
          background-color: #fff;
          padding: 3.5rem 0 5rem;
          text-align: center;
        "
      >
        <h2
          style="
            font-size: 3rem;
            font-weight: bold;
            color: #002c6a;
            margin-bottom: -2rem;
          "
        >
          由值得信赖的研发团队提供支持
        </h2>
        <!-- ↓ NJU、lamda logo，因为比赛要求所以没展示-->
        <!-- <el-scrollbar height="100px">
          <div style="display: flex; justify-content: center; gap: 7rem">
            <img
              v-for="(partner, index) in partners"
              :key="index"
              :src="partner.image"
              :alt="partner.name"
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                width: auto;
                height: 80px;
                margin: 10px;
                text-align: center;
                border-radius: 4px;
                color: var(--el-color-primary);
              "
            />
          </div>
        </el-scrollbar> -->
      </section>

      <!-- Footer Section -->
      <el-footer style="padding: 1rem 0">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
            color: #a0aec0;
          "
        >
          <p style="color: #6c727f; font-size: 16px">
            © 2024 All rights reserved by China Travel
          </p>
        </div>
      </el-footer>
    </div>
  </el-scrollbar>
</template>

<script>
import { Search } from "@element-plus/icons-vue";
export default {
  name: "ChinaTravel",
  components: {
    Search, //搜索的图标icon
  },
  data() {
    return {
      splitText:
        "Hi, I'm your  personal  travel  agent. Let's  get  started!".split(
          /\s+/,
        ),
      carouselImages: [
        //走马灯图片
        new URL("../assets/img1.jpg", import.meta.url).href,
        new URL("../assets/img1.jpg", import.meta.url).href,
        new URL("../assets/img1.jpg", import.meta.url).href,
      ],
      partners: [
        //NJU、lamda logo
        {
          name: "nju",
          image: "https://www.lamda.nju.edu.cn/2022_files/NJU_badge.png",
        },
        {
          name: "lamda",
          image: "https://www.lamda.nju.edu.cn/2022_files/verylarge1.png",
        },
      ],
    };
  },
  methods: {
    startTravel() {
      //路由跳转
      this.$router.push("/query-submit");
    },
  },
};
</script>
