<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
           @click="hideModalCreateArticle"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-96 sm:p-6">
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
</template>

<script>
import Navbar from "@/components/nav";
import axios from "axios";
import Vue from "vue";
import {store} from "@/store/store";
export default {
  name: 'modalCreateArticle',
  components: {Navbar},
  data() {
    return {
      name: '',
      description: '',
      image: '',
      price: ''
    }
  },
  methods: {
    hideModalCreateArticle() {
      this.$store.commit('setCloseModalCreateArticle')
    },
    createArticle() {
      axios.post('http://localhost:3000/articles', {
        name: this.name,
        description: this.description,
        img: this.image,
        price: this.price
      }, {
        headers: {'X-JWT': `${store.state.token}`}
      }).then(() => {
        Vue.notify({
          group: 'foo',
          type: 'success',
          title: 'Article créé avec succès ! 🤩'
        })
        this.$emit('createArticle');
        this.$store.commit('setCloseModalCreateArticle')
      })
    }
  },
}
</script>

