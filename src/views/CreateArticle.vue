<template>
  <div class="min-h-screen">
    <navbar is-create-article="true"/>
    <div class="w-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form class="space-y-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <div class="mt-1">
                <input id="name" name="name" type="text" required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       v-model="name">
              </div>
            </div>
            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">
                Description
              </label>
              <div class="mt-1">
                <input id="description" name="description" type="text" required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       v-model="description">
              </div>
            </div>
            <div>
              <label for="image" class="block text-sm font-medium text-gray-700">
                Image
              </label>
              <div class="mt-1">
                <input id="image" name="image" type="text" required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       v-model="image">
              </div>
            </div>
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">
                Prix
              </label>
              <div class="mt-1">
                <input id="price" name="price" type="number" required
                       class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                       v-model="price">
              </div>
            </div>


            <div>
              <button type="button"
                      @click="createArticle"
                      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Créer un article
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Navbar from "@/components/nav";
import axios from "axios";

export default {
  name: 'createPromotions',
  components: {Navbar},
  data(){
    return{
      name: '',
      description: '',
      image: '',
      price: ''
    }
  },
  methods: {
    createArticle(){
      axios.post('http://localhost:3000/articles', {
        name: this.name,
        description: this.description,
        img: this.image,
        price: this.price
      },{
        headers: {'X-JWT': `${localStorage.getItem('token')}`}
      }).then((res) => {
        console.log(res)
      })
    }
  }
}
</script>
