<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"
           @click="hideModalCreatePromotion"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div
          class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-96 sm:p-6">
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
            <label for="code" class="block text-sm font-medium text-gray-700 flex flex-row">
              Code de la promotion <p class="text-gray-400 ml-2">(ex : 123ABC)</p>
            </label>
            <div class="mt-1">
              <input id="code" name="code" type="text" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="code">
            </div>
          </div>
          <div>
            <label for="perscentageReduction" class="block text-sm font-medium text-gray-700 flex flex-row">
              Pourcentage de la réduction <p class="text-gray-400 ml-2">(ex : 50%)</p>
            </label>
            <div class="mt-1">
              <input id="perscentageReduction" name="perscentageReduction" type="number" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="percentageReduction">
            </div>
          </div>
          <div>
            <label for="expireAtDate" class="block text-sm font-medium text-gray-700">
              Date d'expiration
            </label>
            <div class="mt-1 flex justify-center flex-row">
              <input id="expireAtDate" name="expireAtDate" type="date" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="expireAtDate">
              <input id="expireAtTime" name="expireAtTime" type="time" required
                     class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                     v-model="expireAtTime">
            </div>
          </div>
          <div>
            <p class="mb-1">Choisissez un article :</p>
            <autocomplete class="z-50" :search="searchArticle" :getResultValue="getValueArticle"></autocomplete>
          </div>
          <div>
            <p class="mb-1">Choisissez un qrcode :</p>
            <autocomplete class="z-50" :search="searchQRcode" :getResultValue="getValueQRCode"></autocomplete>
          </div>
          <div>
            <button type="button"
                    @click="createPromotion"
                    class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Créer une promotion
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
import {store} from "@/store/store";
import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
import Vue from "vue";

export default {
  name: 'modalCreatePromotion',
  components: {Navbar, Autocomplete},
  data() {
    return {
      qrcode: '',
      qrcodesNames: [],
      qrcodes: [],
      article: '',
      articlesNames: [],
      articles: [],
      name:'',
      code:'',
      percentageReduction:'',
      expireAtDate:'',
      expireAtTime:''
    }
  },
  methods: {
    hideModalCreatePromotion() {
      this.$store.commit('setCloseModalCreatePromotion')
    },
    getAllArticles() {
      axios.get('http://localhost:3000/articles', {
        headers: {'X-JWT': `${store.state.token}`}
      }).then((res) => {
        this.articlesNames = [];
        this.articles = res.data.data;
        const datas = res.data.data;
        datas.map(data => {
          this.articlesNames.push(data.name);
        })
      })
    },
    getAllQRcodes() {
      axios.get('http://localhost:3000/qrcodes', {
        headers: {'X-JWT': `${store.state.token}`}
      }).then((res) => {
        this.qrcodesNames = [];
        this.qrcodes = res.data.data;
        const datas = res.data.data;
        datas.map(data => {
          this.qrcodesNames.push(data.name);
        })
      })
    },
    searchArticle(input) {
      if (input.length < 1) {
        return []
      }
      return this.articlesNames.filter(article => {
        return article.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    searchQRcode(input) {
      if (input.length < 1) {
        return []
      }
      return this.qrcodesNames.filter(qrcode => {
        return qrcode.toLowerCase().startsWith(input.toLowerCase())
      })
    },
    getValueQRCode(result) {
      this.qrcode = result;
      return result
    },
    getValueArticle(result) {
      this.article = result;
      return result
    },
    createPromotion() {
      const articleId = this.articles.find(article => article.name === this.article).id
      const qrcodeId = this.qrcodes.find(qrcode => qrcode.name === this.qrcode).id
      const expireAt = `${this.expireAtDate} ${this.expireAtTime}`
      axios.post('http://localhost:3000/promotions', {
        qrcode_id: qrcodeId,
        article_id: articleId,
        name: this.name,
        code: this.code,
        percentageReduction: this.percentageReduction,
        generic: false,
        expireAt: expireAt
      }, {
        headers: {'X-JWT': `${store.state.token}`}
      }).then(() => {
      Vue.notify({
        group: 'foo',
        type: 'success',
        title: 'Promotion créée avec succès ! 🤩'
      })
      this.$emit('createPromotion');
      this.$store.commit('setCloseModalCreatePromotion')
      })
    }
  },
  mounted() {
    this.getAllArticles()
    this.getAllQRcodes()
  }
}
</script>
