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

        <span v-if="hendelse.sannsynlighet === sannsynlighet && hendelse.konsekvens === konsekvens">
          (Før)
        </span>
        <span v-if="hendelse.sannsynlighet_etter === sannsynlighet && hendelse.konsekvens_etter === konsekvens">
          (Etter)
        </span>
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
    <tr class="no-border">
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border" style="text-align:right"><bold>Konsekvens</bold></td>
    </tr>
  </table>
</template>
<script>
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
  methods: {
    pushHendelse(sannsynlighet, konsekvens) {
      console.log(this.etter)
      console.log(this.hendelse)
      console.log(this.hendelse.konsekvens)
      console.log(this.hendelse.sannsynlighet)
      console.log(this.hendelse.update_etter)
      if(this.hendelse.update_etter === true) {
        console.log('UPDATING ETTER')
        this.hendelse.sannsynlighet_etter = sannsynlighet;
        this.hendelse.konsekvens_etter = konsekvens;
        this.hendelse.update_etter = false;
      } else {
        console.log("UPDATING NORMAL")
        this.hendelse.sannsynlighet = sannsynlighet;
        this.hendelse.konsekvens = konsekvens;
        this.hendelse.update = false;
      }

    },

    getClass(sannsynlighet, konsekvens) {
      if (sannsynlighet === 5 ) {
        if (konsekvens < 3) {
          return "yellow"
        }
        return "red";
      }

      if (sannsynlighet === 4) {
        if (konsekvens === 1) {
          return "green"
        }
        else if (konsekvens < 4) {
          return "yellow"
        }
        else {
          return "red";
        }
      }

      if (sannsynlighet === 3) {
        if (konsekvens < 3) {
          return "green"
        }
        else if(konsekvens === 3) {
          return "yellow"
        }
        else {
          return "red";
        }
      }

      if (sannsynlighet === 2) {
        if (konsekvens < 3) {
          return "green"
        }
        else if(konsekvens < 5) {
          return "yellow"
        }
        else {
          return "red"
        }
      }

      if (sannsynlighet === 1) {
        if (konsekvens < 3) {
          return "green"
        }
        else {
          return "yellow"
        }
      }

      return "green"
    }
  }
}
</script>
