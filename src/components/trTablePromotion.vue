<template>
  <tr :class="tileColor">
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {{ promotion.code }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ promotion.name }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {{ expireAt }}
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <svg @click="deletePromotion" class="h-5 float-right text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </td>
  </tr>
</template>


<script>
import moment from "moment";
import axios from "axios";
import Vue from "vue";
import {store} from "@/store/store";
export default {
  name: 'tr-table-promotion',
  props: {
    id: Number,
    promotion: {}
  },
  data() {
    return {
      expireAt: moment(this.promotion.expireAt).format('YYYY-MM-DD')
    }
  },
  methods: {
    deletePromotion() {
      axios.delete(`http://localhost:3000/promotions/${this.promotion.id}`, {
        headers: {'X-JWT': `${store.state.token}`}
      }).then(() => {
        Vue.notify({
          group: 'foo',
          type: 'success',
          title: 'Promotion supprimée avec succès !',
          text: 'La page va être actualisée'
        })
        this.$emit('deletePromotion')
      })
    }
  },
  computed: {
    tileColor() {
      if (this.id % 2 === 1) {
        return 'bg-white'
      } else {
        return 'bg-gray-50'
      }
    }
  },
}
</script>
