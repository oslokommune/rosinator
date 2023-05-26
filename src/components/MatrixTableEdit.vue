<template>
  <table class="matrix_add">
    <tr>
      <td>Svært stor</td>
      <td class="yellow">
        <ul class="comma-list">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
              🎂
            </li>
          <button @click="pushHendelse('5','1')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('5','2')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('5','3')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('5','4')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('5','5')">  ADD   </button>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Stor</td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('4','1')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('4','2')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('4','3')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('4','4')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('4','5')">  ADD   </button>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Moderat</td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('3','1')">  ADD   </button>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('3','2')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('3','3')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('3','4')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('3','5')">  ADD   </button>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Liten</td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('2','1')">  ADD   </button>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('2','2')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('2','3')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('2','4')">  ADD   </button>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('2','5')">  ADD   </button>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Meget Liten</td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('1','1')">  ADD   </button>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('1','2')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('1','3')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('1','4')">  ADD   </button>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
          <button @click="pushHendelse('1','5')">  ADD   </button>
        </ul>
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
    index : ''
  },
  methods: {
    pushHendelse(sannsynlighet, konsekvens) {
      this.hendelse.sannsynlighet = sannsynlighet;
      this.hendelse.konsekvens = konsekvens;
      this.hendelse.update = false;
    },
  }
}
</script>
