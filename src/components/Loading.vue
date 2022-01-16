<script setup>
import { computed } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
});

const isShow = computed(() => props.show);
</script>
<template>
  <div
    v-if="isShow"
    class="animate-spin rounded-full h-5 w-5 border-2 border-blue-100 border-l-blue-600"
  ></div>
</template>
