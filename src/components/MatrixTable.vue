<template>
  <h3>Sannsynlighet</h3>
  <table class="matrix">
    <tr>
      <td>Svært stor</td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '5' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
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
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '4' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
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
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '3' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
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
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '2' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
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
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet === '1' && hendelse.konsekvens === '5'">
              {{ index + 1 }}
            </li>
          </template>
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
  <h3 style="float:right">Konsekvens</h3>
</template>
<script>
export default {
  name: 'MatrixTable',
  props: {
    hendelser: {}
  }
}
</script>
