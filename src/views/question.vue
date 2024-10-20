<template>
  <div class="content">
    <h1 class="title">China Travel</h1>
    <el-form ref="formRef" :model="form" class="form">
      <h1 class="title1">query</h1>
      <div
        style="
          display: flex;
          justify-content: center;
          width: 100%;
          height: 100%;
        "
      >
        <el-input
          v-model="input"
          style="
            width: 1200px;
            font-size: x-large;
            margin-bottom: 20px;
            border-radius: 20px !important;
          "
          :rows="4"
          type="textarea"
          placeholder="Please input your question."
        />
      </div>
    </el-form>
  </div>
  <div class="button">
    <el-button
      type="primary"
      :icon="Search"
      @click="query_submit"
      class="search-button"
      >Search</el-button
    >
  </div>
  <div class="footer">
    <el-text class="footer-text">
      Powered by
      <el-icon>
        <ElementPlus />
      </el-icon>
      Element-Plus
    </el-text>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElForm, ElInput, ElButton } from "element-plus";
import { ElementPlus, Search } from "@element-plus/icons-vue";
import axios from "axios";
const formRef = ref();
const form = ref({
  question: "",
});
const input = ref("");
const query_submit = async () => {
  try {
    // 将用户输入的内容传递给后端
    const response = await axios.post("/api/query", { question: input.value });
    // 接收并处理后端返回的信息
    console.log(response.data); // 你可以根据需要将其展示在界面上
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
</script>

<style lang="scss">
html,
body {
  font-family: "Roboto", Arial, sans-serif;
}
.content {
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #ecf5ff;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.title {
  font-size: 4.4rem;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 40px;
  margin-top: -150px;
  color: #337ecc;
  letter-spacing: -0.05em;
  font-family: "Arial", sans-serif;
}
.title1 {
  font-size: 3.4rem;
  font-weight: 600;
  line-height: 1.2;
  margin-top: -10px;
  margin-bottom: 30px;
  text-align: center;
  color: #409eff;
  letter-spacing: 0.5 em;
  font-family: "Arial", sans-serif;
}
.form {
  width: 100%;
  max-width: 1400px;
  min-height: 300px;
  background-color: #c6e2ff;
  padding: 20px;
  border-radius: 40px;
}
.button {
  margin-top: -160px;
  text-align: center;
  background-color: #ecf5ff;
  display: flex;
  justify-content: center;
  border-radius: 20px;
}
.search-button {
  min-height: 60px;
  font-size: 1.4rem !important;
  border-radius: 20px !important;
}
.footer {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding-bottom: 10px;
}
.footer-text {
  font-size: 1.32rem !important;
  color: #337ecc;
}
</style>
