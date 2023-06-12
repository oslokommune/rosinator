<template>
  <table class="matrix_add">
    <span><strong>Sannsynlighet</strong></span>
    <tr v-for="sannsynlighet in sannsynligheter" :key="sannsynlighet">
      <td v-if="sannsynlighet===1">Svært Stor</td>
      <td v-if="sannsynlighet===2">Stor</td>
      <td v-if="sannsynlighet===3">Moderat</td>
      <td v-if="sannsynlighet===4">Liten</td>
      <td v-if="sannsynlighet===5">Meget Liten</td>
      <td @click="pushHendelse(sannsynlighet, konsekvens)" v-for="konsekvens in 5" :key="konsekvens" :class="getClass(sannsynlighet, konsekvens)">

        <span v-bind:class="{ 'bold' : hendelse.update}" v-if="hendelse.sannsynlighet === sannsynlighet && hendelse.konsekvens === konsekvens">
          (Før)
        </span>
        <span v-bind:class="{ 'bold' : hendelse.update_etter}" v-if="hendelse.sannsynlighet_etter === sannsynlighet && hendelse.konsekvens_etter === konsekvens">
          (Etter)
        </span>
      </td>
    </tr>


    <tr>
      <td><button v-if="hendelse.sannsynlighet && hendelse.konsekvens" @click="closeEditMatrix">Lukk matrise</button></td>
      <td>Ubetydelig</td>
      <td>Lav</td>
      <td>Moderat</td>
      <td>Alvorlig</td>
      <td>Svært alvorlig</td>
    </tr>
    <tr class="no-border">
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border" style="text-align:right"><strong>Konsekvens</strong></td>
    </tr>
  </table>
</template>
<script>
import common from '../common.js';
export default {
  name: 'MatrixTableEdit',
  props: {
    hendelse : {},
    index : '',
  },
  data() {
    return {
      etter: ''  }
  },
  computed: {
    sannsynligheter() {
      return [5, 4, 3, 2, 1];
    }
  },
  created() {
    this.getClass = common.getClass;
  },
  methods: {
    pushHendelse(sannsynlighet, konsekvens) {
      if(this.hendelse.update_etter) {
        this.hendelse.sannsynlighet_etter = sannsynlighet;
        this.hendelse.konsekvens_etter = konsekvens;
       // this.hendelse.update_etter = false;
      } else {
        this.hendelse.sannsynlighet = sannsynlighet;
        this.hendelse.konsekvens = konsekvens;
        //this.hendelse.update = false;
      }

    },

    closeEditMatrix() {
      this.hendelse.update = false;
      this.hendelse.update_etter = false;
    },
  }
}
</script>
