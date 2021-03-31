<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
           alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Se connecter
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Adresse email :
            </label>
            <div class="mt-1">
              <input id="email" name="email" type="email" autocomplete="email" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="email">
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe :
            </label>
            <div class="mt-1">
              <input id="password" name="password" type="password" autocomplete="current-password" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="password">
            </div>
          </div>
          <div>
            <button @click="login" type="button"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import router from "@/router";
import axios from "axios";
import {store} from "@/store/store";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      axios.post('http://localhost:3000/login', {
        email: this.email,
        password: btoa(this.password)
      }).then((res) => {


        store.commit('setToken',{
          token: res.data.data.jwt.token
        })
        store.commit('changeStatusLogin')
        // localStorage.setItem('token', res.data.data.jwt.token)
        return router.replace("/liste-promotion");
      })
    }
  }
}
</script>
