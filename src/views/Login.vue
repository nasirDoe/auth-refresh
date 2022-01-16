<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/auth';
import { useStore } from 'vuex';

const email = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();
const store = useStore();
const { login } = useAuth();

async function doLogin() {
  try {
    error.value = '';
    const data = await login(email.value, password.value);
    store.commit('user/SET_USER_TOKEN', data.accessToken);
    await router.push('/dashboard');
  } catch (err) {
    error.value = err.response.data.message;
  }
}
</script>

<template>
  <div class="m-auto max-w-xs w-full">
    <div class="rounded shadow-lg bg-white p-5" :class="{ 'shake-me': error }">
      <h1 class="text-3xl font-bold mb-5">Login</h1>
      <transition name="route" mode="out-in">
        <p v-if="error" class="text-sm text-red-600 my-4">{{ error }}</p>
      </transition>
      <form class="block" @submit.prevent="doLogin">
        <div class="flex flex-col">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email"> Email </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="text"
            placeholder="Email"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Password"
            autocomplete="off"
          />
        </div>
        <div class="flex flex-col mt-4">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
      <div class="text-center mt-6">
        <router-link
          to="/register"
          class="text-gray-600 text-sm hover:underline hover:underline-green-300"
          >Register</router-link
        >
      </div>
    </div>
  </div>
</template>
<style>
.shake-me {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
