<template>
  <table class="matrix_add">
    <span><strong>Sannsynlighet</strong></span>
    <tr>
      <td>Svært stor</td>
      <td @click="pushHendelse('5','1')" class="yellow">
        <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
          {{ index + 1 }}
        </span>
      </td>
      <td @click="pushHendelse('5','2')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('5','3')" class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('5','4')" class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('5','5')" class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>
      </td>
    </tr>
    <tr>
      <td>Stor</td>
      <td @click="pushHendelse('4','1')" class="green">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('4','2')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('4','3')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('4','4')" class="red">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('4','5')" class="red">
            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>
      </td>
    </tr>
    <tr>
      <td>Moderat</td>
      <td @click="pushHendelse('3','1')" class="green">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('3','2')" class="green">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('3','3')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('3','4')" class="red">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('3','5')" class="red">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>
      </td>
    </tr>
    <tr>
      <td>Liten</td>
      <td @click="pushHendelse('2','1')" class="green">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('2','2')" class="green">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('2','3')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('2','4')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('2','5')" class="red">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>
      </td>
    </tr>
    <tr>
      <td>Meget Liten</td>
      <td @click="pushHendelse('1','1')" class="green">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('1','2')" class="green">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('1','3')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('1','4')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>
      </td>
      <td @click="pushHendelse('1','5')" class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
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
  methods: {
    pushHendelse(sannsynlighet, konsekvens) {
      console.log(this.etter)
      console.log(this.hendelse)
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
  }
}
</script>
