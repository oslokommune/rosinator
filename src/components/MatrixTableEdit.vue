<template>
  <table class="matrix_add">
    <span><strong>Sannsynlighet</strong></span>
    <tr v-for="index in 5" :key="index">
      <td v-if="index===1">Svært Stor</td>
      <td v-if="index===2">Stor</td>
      <td v-if="index===3">Moderat</td>
      <td v-if="index===4">Liten</td>
      <td v-if="index===5">Meget Liten</td>
      <td @click="pushHendelse(index, konsekvens)" v-for="konsekvens in 5" :key="konsekvens" :class="getClass(index, konsekvens)">



        <span v-if="hendelse.sannsynlighet === index && hendelse.konsekvens === konsekvens">
          (Før)
        </span>
        <span v-if="hendelse.sannsynlighet_etter === index && hendelse.konsekvens_etter === konsekvens">
          (Etter)
        </span>
      </td>
    </tr>



    <tr>
      <td>Svært stor</td>
      <td @click="pushHendelse('5','1')" class="yellow">
        <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
          (Før)
        </span>
        <span v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '1'">
          (Etter)
        </span>
      </td>
      <td @click="pushHendelse('5','2')" class="yellow">
          <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
            (Før)
            </span>
        <span v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '2'">
              (Etter)
            </span>
      </td>
      <td @click="pushHendelse('5','3')" class="red">
        <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">(Før)</span>
        <span v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '3'">(Etter)</span>
      </td>
      <td @click="pushHendelse('5','4')" class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
              (Før))
            </span>
          <span v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '4'">
                (Etter)
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
    getClass(sannsynlighet, konsekvens) {
      if (sannsynlighet === 1) {
        if (konsekvens < 3)
        return 'yellow'
        else {
          return 'red'
        }
      }
      if (sannsynlighet === 2) {
        if (konsekvens === 1)
        return 'green'
        else if (konsekvens > 1 && konsekvens < 4) {
          return 'yellow'
        }
        else {
          return 'red'
        }
      }
      if (sannsynlighet === 3) {
        if (konsekvens === 1 || konsekvens === 2)
        return 'green'
        else if (konsekvens > 2 && konsekvens < 4) {
          return 'yellow'
        }
        else {
          return 'red'
        }
      }
      if (sannsynlighet === 4) {
        if (konsekvens === 1 || konsekvens === 2)
        return 'green'
        else if (konsekvens === 3 || konsekvens === 4) {
          return 'yellow'
        }
        else {
          return 'red'
        }
      }
      if (sannsynlighet === 5) {
        if (konsekvens === 1 || konsekvens === 2)
        return 'green'
        else {
          return 'yellow'
        }
      }
    }
  }
}
</script>
