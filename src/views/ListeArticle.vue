<template>
  <div>
    <navbar is-liste-article="true"/>
    <modal-create-article @createArticle="refreshArticle" v-if="this.$store.state.modalCreateArticle"/>
    <button type="button"
            @click="openModalCreateArticle"
            class="mt-5 ml-5 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Ajouter un article
    </button>
    <div class="p-5 overflow-x-hidden">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr-table-article v-for="(article, i) in articles" :id="i" :article="article"
                                  @deleteArticle="refreshArticle"/>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/nav";
import axios from "axios";
import trTableArticle from "@/components/trTableArticle";
import ModalCreateArticle from "@/components/modalCreateArticle";
import {store} from "@/store/store";
export default {
  name: 'listeArticle',
  components: {ModalCreateArticle, Navbar, trTableArticle},
  data() {
    return {
      articles: []
    }
  },
  methods: {
    getAllPromotions() {
      axios.get('http://localhost:3000/articles', {
        headers: {'X-JWT': `${store.state.token}`}
      }).then((res) => {
        this.articles = res.data.data
      })
    },
    refreshArticle() {
      this.getAllPromotions()
    },
    openModalCreateArticle() {
      this.$store.commit('setOpenModalCreateArticle')
    }
  },
  mounted() {
    this.getAllPromotions()
  }
}
</script>