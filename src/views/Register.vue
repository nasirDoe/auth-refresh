<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/services/auth';

const router = useRouter();

const email = ref('');
const password = ref('');
const name = ref('');
const confPassword = ref('');

const { register } = useAuth();

const error = ref('');
const loading = ref(false);

async function doRegister() {
  try {
    error.value = '';
    loading.value = true;
    const params = {
      name: name.value,
      email: email.value,
      password: password.value,
      confPassword: confPassword.value,
    };
    await register(params);
    await router.push('/');
  } catch (err) {
    error.value = err.response.data.message;
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="m-auto max-w-xs w-full">
    <div class="rounded shadow-lg bg-white p-5">
      <h1 class="text-3xl font-bold mb-5">Register</h1>
      <p v-if="error" class="text-sm text-red-600 my-4">{{ error }}</p>
      <form class="block" @submit.prevent="doRegister">
        <div class="flex flex-col mt-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="name"> Name </label>
          <input
            v-model="name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="neme"
            type="text"
            placeholder="Name"
          />
        </div>
        <div class="flex flex-col mt-4">
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
          <label class="block text-gray-700 text-sm font-bold mb-2" for="confpassword">
            Confirm Password
          </label>
          <input
            v-model="confPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confpassword"
            type="password"
            placeholder="confpassword"
          />
        </div>
        <div class="flex flex-col mt-8">
          <button
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {{ loading ? 'Loading...' : 'Register' }}
          </button>
        </div>
      </form>
      <div class="text-center mt-6">
        <router-link to="/" class="text-gray-600 text-sm hover:underline hover:decoration-blue-500"
          >Login</router-link
        >
      </div>
    </div>
  </div>
</template>
