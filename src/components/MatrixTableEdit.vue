<template>
  <table class="matrix_add">
    <tr>
      <td>Svært stor</td>
      <td class="yellow">


        <button @click="pushHendelse('5','1')">  Velg   </button>
        <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
          {{ index + 1 }}
        </span>
      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('5','2')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('5','3')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('5','4')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('5','5')">  Velg   </button>

      </td>
    </tr>
    <tr>
      <td>Stor</td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('4','1')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('4','2')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('4','3')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('4','4')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('4','5')">  Velg   </button>

      </td>
    </tr>
    <tr>
      <td>Moderat</td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('3','1')">  Velg   </button>

      </td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('3','2')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('3','3')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('3','4')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('3','5')">  Velg   </button>

      </td>
    </tr>
    <tr>
      <td>Liten</td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('2','1')">  Velg   </button>

      </td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('2','2')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('2','3')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('2','4')">  Velg   </button>

      </td>
      <td class="red">

            <span v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('2','5')">  Velg   </button>

      </td>
    </tr>
    <tr>
      <td>Meget Liten</td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('1','1')">  Velg   </button>

      </td>
      <td class="green">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('1','2')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('1','3')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('1','4')">  Velg   </button>

      </td>
      <td class="yellow">

            <span v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </span>

          <button @click="pushHendelse('1','5')">  Velg   </button>
        
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
