<template>
  <div>
    <navbar is-liste-article="true"/>
    <div class="p-5 overflow-x-hidden">
      <!-- This example requires Tailwind CSS v2.0+ -->
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
                <tr-table-article v-for="(article, i) in articles" :id="i" :article="article"/>
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

export default {
  name: 'listeArticle',
  components: {Navbar, trTableArticle},
  data() {
    return {
      articles: []
    }
  },
  methods: {
    getAllPromotions() {
      axios.get('http://localhost:3000/articles', {
        headers: {'X-JWT': `${localStorage.getItem('token')}`}
      }).then((res) => {
        this.articles = res.data.data
      })
    }
  },
  mounted() {
    this.getAllPromotions()
  }
}
</script>