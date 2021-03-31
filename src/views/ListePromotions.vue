<template>
  <div>
    <navbar is-liste-promotion="true"/>
    <modal-create-promotion @createPromotion="refreshPromotion" v-if="this.$store.state.modalCreatePromotion"/>
    <button type="button"
            @click="openModalCreatePromotion"
            class="mt-5 ml-5 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
      <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Ajouter une promotion
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
                    Code
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date d'expiration
                  </th>
                  <th scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr-table-promotion v-for="(promotion, i) in promotions" :id="i" :promotion="promotion" @deletePromotion="refreshPromotion"/>
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
import TrTablePromotion from "@/components/trTablePromotion";
import axios from "axios";
import Navbar from "@/components/nav";
import {store} from "@/store/store";
import ModalCreatePromotion from "@/components/modalCreatePromotion";
export default {
  name: 'listePromotions',
  data() {
    return {
      promotions: []
    }
  },
  components: {ModalCreatePromotion, Navbar, TrTablePromotion},
  methods: {
    getAllPromotions() {
      axios.get('http://localhost:3000/promotions', {
        headers: {'X-JWT': `${store.state.token}`}
      }).then((res) => {
        this.promotions = res.data.data
      })
    },
    refreshPromotion(){
      this.getAllPromotions()
    },
    openModalCreatePromotion() {
      this.$store.commit('setOpenModalCreatePromotion')
    }
  },
  mounted() {
    this.getAllPromotions()
  }
}
</script>
