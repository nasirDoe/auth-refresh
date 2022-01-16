<script setup>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useAuth } from '@/services/auth';
import { useRouter } from 'vue-router';

import Loading from '@/components/Loading.vue';

const users = ref([]);
const loading = ref(false);
const store = useStore();
const router = useRouter();
const { decodedToken, getUsers, logout } = useAuth();

const isVisible = ref(false);

const isAuthenticated = computed(() => store.getters['user/isAuthenticated']);
const user = computed(() => decodedToken(store.state.user.token));

onMounted(() => {
  fetchUser();
});

async function fetchUser() {
  try {
    loading.value = true;
    const members = await getUsers();
    users.value = members;
  } catch (error) {
    throw new Error(error);
  } finally {
    loading.value = false;
  }
}
async function doLogout() {
  await logout();
  await store.commit('user/DESTROY_TOKEN');
  await router.push('/');
}
</script>
<template>
  <div class="max-w-3xl w-full mx-auto p-4 my-10 bg-white shadow rounded">
    <div class="flex justify-between mb-4">
      <h1 class="text-2xl font-bold text-gray-700">
        Welcome back, {{ isAuthenticated && user.name }}
      </h1>
      <div class="flex gap-4">
        <button
          type="button"
          class="px-4 py-2 text-blue-700 bg-blue-300 rounded hover:bg-blue-400"
          @click="fetchUser"
        >
          Fetch User
        </button>
        <button
          type="button"
          class="px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400"
          @click="isVisible = true"
        >
          Logout
        </button>
      </div>
    </div>
    <div class="border-b border-gray-300 mb-5"></div>
    <table class="table-auto w-full">
      <thead>
        <tr class="text-left">
          <th class="px-2 py-1">No</th>
          <th class="px-2 py-1">Name</th>
          <th class="px-2 py-1">Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" class="border-t border-gray-200">
          <td colspan="3" class="px-2 pt-4" align="center">
            <Loading :show="loading" />
          </td>
        </tr>
        <tr v-else v-for="(row, index) in users" :key="row.id" class="border-t border-gray-200">
          <td class="px-2 py-2">{{ index + 1 }}</td>
          <td class="px-2 py-2">{{ row.name }}</td>
          <td class="px-2 py-2">{{ row.email }}</td>
        </tr>
      </tbody>
    </table>
    <teleport to="#popup">
      <transition name="fade" mode="out-in">
        <div
          v-if="isVisible"
          class="w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center bg-black bg-opacity-30"
        >
          <div class="p-5 bg-white rounded flex flex-col w-64 space-y-4">
            <button
              type="button"
              class="px-4 py-2 text-red-700 bg-red-300 rounded hover:bg-red-400"
              @click="doLogout"
            >
              Yes, log me out
            </button>
            <button
              type="button"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              @click="isVisible = false"
            >
              No, stay logged in
            </button>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-leave-from,
.fade-enter-to {
  opacity: 1;
}
</style>
