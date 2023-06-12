<template>
    <table id="risk-matrix" class="matrix">
      <span><strong>Sannsynlighet</strong></span>
      <tr v-for="sannsynlighet in sannsynligheter" :key="sannsynlighet">
        <td v-if="sannsynlighet===5">Svært Stor</td>
        <td v-if="sannsynlighet===4">Stor</td>
        <td v-if="sannsynlighet===3">Moderat</td>
        <td v-if="sannsynlighet===2">Liten</td>
        <td v-if="sannsynlighet===1">Meget Liten</td>
        <td v-for="konsekvens in 5" :key="konsekvens" :class="getClass(sannsynlighet, konsekvens)">
          <div>
            <template v-for="(hendelse, index) in hendelser">
            <template v-if="hendelse.sannsynlighet === sannsynlighet && hendelse.konsekvens === konsekvens">
              <span>{{ index + 1 }}</span>
              <span v-if="!isLast(index, sannsynlighet, konsekvens, this.hendelser, false)">, </span>
            </template>
            </template>
          </div>
        </td>
      </tr>
      <tr>
        <td></td>
        <td>Ubetydelig</td>
        <td>Lav</td>
        <td>Moderat</td>
        <td>Alvorlig</td>
        <td>Svært alvorlig</td>
      </tr>
      <KonsekvensRow />
    </table>
    <button class="copy-button" @click="copyTable('risk-matrix')">Kopier tabell</button>
</template>
<script>
import common from '../common.js';
import KonsekvensRow from "@/components/parts/KonsekvensRow.vue";
export default {

  name: 'MatrixTable',
  components: {KonsekvensRow},
  props: {
    hendelser: {}
  },
  computed: {
    sannsynligheter() {
      return [5, 4, 3, 2, 1];
    }
  },
  created() {
    this.getClass = common.getClass;
    this.copyTable = common.copyTable;
    this.isLast = common.isLast;
  },
}

</script>
