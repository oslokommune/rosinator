<template>
  <table id="risk-matrix" class="matrix">
    <span><strong>Sannsynlighet</strong></span>
    <tr>
      <td>Svært stor</td>
      <td class="yellow">
        <div>
          <template v-for="(hendelse, index) in hendelser">
            <template v-if="hendelse.sannsynlighet === 5 && hendelse.konsekvens === 1">
              <span>{{ index + 1 }}</span>
              <span v-if="index < hendelser.length - 1">, </span>
            </template>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 5 && hendelse.konsekvens === 2">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 5 && hendelse.konsekvens === 3">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 5 && hendelse.konsekvens === 4">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 5 && hendelse.konsekvens === 5">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
    </tr>
    <tr>
      <td>Stor</td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 4 && hendelse.konsekvens === 1">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 4 && hendelse.konsekvens === 2">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 4 && hendelse.konsekvens === 3">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 4 && hendelse.konsekvens === 4">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 4 && hendelse.konsekvens === 5">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
    </tr>
    <tr>
      <td>Moderat</td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 3 && hendelse.konsekvens === 1">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 3 && hendelse.konsekvens === 2">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 3 && hendelse.konsekvens === 3">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 3 && hendelse.konsekvens === 4">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 3 && hendelse.konsekvens === 5">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
    </tr>
    <tr>
      <td>Liten</td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 2 && hendelse.konsekvens === 1">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 2 && hendelse.konsekvens === 2">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 2 && hendelse.konsekvens === 3">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 2 && hendelse.konsekvens === 4">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="red">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 2 && hendelse.konsekvens === 5">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
    </tr>
    <tr>
      <td>Meget Liten</td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 1 && hendelse.konsekvens === 1">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="green">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 1 && hendelse.konsekvens === 2">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 1 && hendelse.konsekvens === 3">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 1 && hendelse.konsekvens === 4">
              {{ index + 1 }}
            </span>
          </template>
        </div>
      </td>
      <td class="yellow">
        <div class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <span v-if="hendelse.sannsynlighet === 1 && hendelse.konsekvens === 5">
              {{ index + 1 }}
            </span>
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
    <tr class="no-border">
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border"></td>
      <td class="no-border" style="text-align:right"><bold>Konsekvens</bold></td>
    </tr>
  </table>
  <button class="copy-button" @click="copyTable">Kopier tabell</button>
</template>
<script>
export default {
  name: 'MatrixTable',
  props: {
    hendelser: {}
  },
  methods: {
    copyTable() {
      // Get the HTML table element
      var table = document.getElementById('risk-matrix');

      // Create a Range object
      var range = document.createRange();

      // Select the table content
      range.selectNode(table);

      // set td style border to 1px solid black
      var tds = table.getElementsByTagName('td');
      for (var i = 0; i < tds.length; i++) {
        // unless it has class border-none set border
        if (tds[i].classList.contains('no-border')) {
          continue;
        }
        tds[i].style.border = '1px solid black';
      }


      // Create a Selection object
      var selection = window.getSelection();

      // Clear any existing selections
      selection.removeAllRanges();

      // Add the table range to the selection
      selection.addRange(range);

      // Execute the "copy" command
      document.execCommand('copy');

      var tds = table.getElementsByTagName('td');
      for (var i = 0; i < tds.length; i++) {
        tds[i].style.border = '';

      }

      // Clear the selection
      selection.removeAllRanges();

      // Alert the user that the table has been copied
      alert('Table copied to clipboard!');

    }
  }
}

</script>
