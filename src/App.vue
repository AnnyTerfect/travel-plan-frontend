<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <Transition name="fade" mode="out-in">
    <RouterView />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
