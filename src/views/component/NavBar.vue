<template>
  <div class="navbar">
    <div class="toggle-button">
      <span v-if="!isCollapse">
        <span class="logo-text">China Travel</span>
        <el-icon @click="toggleMenu" class="collapse-button"
          ><ArrowLeft
        /></el-icon>
      </span>
      <el-icon v-else @click="toggleMenu" class="collapse-button"
        ><ArrowRight
      /></el-icon>
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" @click="$router.push('/query-submit')">
        <el-icon><ChatDotRound /></el-icon>
        <template #title>规划</template>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/query-submit')">
        <el-icon><Files /></el-icon>
        <template #title>收藏</template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  Files,
  ChatDotRound,
  ArrowLeft,
  ArrowRight,
} from "@element-plus/icons-vue";

const isCollapse = ref(true);
const toggleMenu = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<style scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  color: #fff;
  transition: width 0.3s;
  border-right: 1px solid #e6e6e6; /* 设置右边框样式 */
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 300px;
  min-height: 400px;
}
.el-menu-vertical-demo.el-menu--collapse {
  width: 85px;
  min-height: 400px;
  .el-menu-item {
    align-items: center;
    justify-content: center; /* 居中图标 */
  }
}
.el-menu-vertical-demo {
  border-right: none !important; /* 取消右边界线 */
}
.toggle-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
}
.logo-text {
  margin-left: 10px;
  margin-right: 35px;
  font-size: 18px;
  font-weight: bold;
  color: #337ecc;
}
.collapse-button {
  color: black;
}
</style>
