<template>
    <table id="risk-matrix" class="matrix">
      <span><strong>Sannsynlighet</strong></span>
      <tr v-for="sannsynlighet in sannsynligheter" :key="sannsynlighet">
        <td v-if="sannsynlighet===1">Svært Stor</td>
        <td v-if="sannsynlighet===2">Stor</td>
        <td v-if="sannsynlighet===3">Moderat</td>
        <td v-if="sannsynlighet===4">Liten</td>
        <td v-if="sannsynlighet===5">Meget Liten</td>
        <td v-for="konsekvens in 5" :key="konsekvens" :class="getClass(sannsynlighet, konsekvens)">
          <div>
            <template v-for="(hendelse, index) in hendelser">
            <template v-if="hendelse.sannsynlighet === sannsynlighet && hendelse.konsekvens === konsekvens">
              <span>{{ index + 1 }}</span>
              <!-- TODO, this is broken, and the logics gets kind of hard, we need to count if this is the last one for this given KS -->
              <span v-if="index < hendelser.length - 1">, </span>
            </template>
            </template>
          </div>
        </td>
      </tr>


      <tr>
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
  computed: {
    sannsynligheter() {
      return [5, 4, 3, 2, 1];
    }
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

    },

    getClass(sannsynlighet, konsekvens) {
      if (sannsynlighet === 5) {
        if (konsekvens < 3) {
          return "yellow"
        }
        return "red";
      }

      if (sannsynlighet === 4) {
        if (konsekvens === 1) {
          return "green"
        } else if (konsekvens < 4) {
          return "yellow"
        } else {
          return "red";
        }
      }

      if (sannsynlighet === 3) {
        if (konsekvens < 3) {
          return "green"
        } else if (konsekvens === 3) {
          return "yellow"
        } else {
          return "red";
        }
      }

      if (sannsynlighet === 2) {
        if (konsekvens < 3) {
          return "green"
        } else if (konsekvens < 5) {
          return "yellow"
        } else {
          return "red"
        }
      }

      if (sannsynlighet === 1) {
        if (konsekvens < 3) {
          return "green"
        } else {
          return "yellow"
        }
      }

      return "green"
    }
  }
}

</script>
