<script setup></script>

<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <router-view v-slot="{ Component }">
      <transition name="route" mode="out-in" appear>
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>
<style>
.route-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.route-enter-active {
  transition: all ease-out 0.25s;
}
.route-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
.route-leave-active {
  transition: all ease-in 0.25s;
}
</style>
