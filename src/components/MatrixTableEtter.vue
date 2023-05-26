<template>
  <table id="etter" class="matrix">
    <span><strong>Sannsynlighet</strong></span>
    <tr>
      <td>Svært stor</td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '5' && hendelse.konsekvens_etter === '5'">
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
            <li v-if="hendelse.sannsynlighet_etter === '4' && hendelse.konsekvens_etter === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '4' && hendelse.konsekvens_etter === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '4' && hendelse.konsekvens_etter === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '4' && hendelse.konsekvens_etter === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '4' && hendelse.konsekvens_etter === '5'">
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
            <li v-if="hendelse.sannsynlighet_etter === '3' && hendelse.konsekvens_etter === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '3' && hendelse.konsekvens_etter === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '3' && hendelse.konsekvens_etter === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '3' && hendelse.konsekvens_etter === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '3' && hendelse.konsekvens_etter === '5'">
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
            <li v-if="hendelse.sannsynlighet_etter === '2' && hendelse.konsekvens_etter === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '2' && hendelse.konsekvens_etter === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '2' && hendelse.konsekvens_etter === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '2' && hendelse.konsekvens_etter === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="red">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '2' && hendelse.konsekvens_etter === '5'">
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
            <li v-if="hendelse.sannsynlighet_etter === '1' && hendelse.konsekvens_etter === '1'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="green">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '1' && hendelse.konsekvens_etter === '2'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '1' && hendelse.konsekvens_etter === '3'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '1' && hendelse.konsekvens_etter === '4'">
              {{ index + 1 }}
            </li>
          </template>
        </ul>
      </td>
      <td class="yellow">
        <ul class="comma-list">
          <template v-for="(hendelse, index) in hendelser">
            <li v-if="hendelse.sannsynlighet_etter === '1' && hendelse.konsekvens_etter === '5'">
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
  methods: {
    copyTable() {
        // Get the HTML table element
        var table = document.getElementById('etter');

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
  },
  name: 'MatrixTableEtter',
  props: {
    hendelser: {}
  }
}
</script>
