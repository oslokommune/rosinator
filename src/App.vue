<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MatrixTable   from "./components/MatrixTable.vue";
import MatrixTableEtter   from "./components/MatrixTableEtter.vue";
import MatrixTableEdit from "./components/MatrixTableEdit.vue";
</script>

<script>
export default {
  data() {
    return {
      hendelser: [],
      tiltak: []
    }
  },
  methods: {
    //  export json
    exportJson() {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(this, null, 2)], {
        type: "application/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    //export json to console
    exportJsonToConsole() {
      console.log(JSON.stringify(this, null, 2));
    },
    // save to local storage
    save() {
      let {hendelser, tiltak} = this;
      localStorage.setItem('hendelser', JSON.stringify(hendelser));
      localStorage.setItem('tiltak', JSON.stringify(tiltak));
    },
    // load from local storage
    load() {
      this.hendelser = JSON.parse(localStorage.getItem('hendelser'));
      this.tiltak = JSON.parse(localStorage.getItem('tiltak'));
    },
    // load from json
    loadJson() {
      let json = prompt('Paste JSON here');
      let data = JSON.parse(json);
      this.hendelser = data.hendelser;
      this.tiltak = data.tiltak;
    },
    pushHendelse() {
      // create if empty
      if (!this.hendelser) {
        this.hendelser = [];
      }
      // push
      this.hendelser.push({hendelse: '', sannsynlighet: '', konsekvens: '', tiltak: []});
    },
    pushTiltak() {
      // create if empty
      if (!this.tiltak) {
        this.tiltak = [];
      }
      // push
      this.tiltak.push({beskrivelse: '', frist: ''});
    },

    toggleUpdate(hendelse) {
      hendelse.update = !hendelse.update;
      if (hendelse.update) {
        hendelse.update_etter = false;
      }
    },

    toggleUpdateEtter(hendelse) {
      hendelse.update_etter = !hendelse.update_etter;
      if (hendelse.update_etter) {
        hendelse.update = false;
      }
    }
  }
}
</script>

<template>

  <nav>
    <button @click="save">Sav to local</button>
    <button @click="load">Load from local</button>
    <button @click="exportJson">Save as Json</button>
    <button @click="loadJson">Load from Json</button>
    <button @click="exportJsonToConsole">Dump Json to console</button>
  </nav>
  <div id="edit" class="edit">
  <h2>Hendelser</h2>
    <div class="hendelse" v-for="(hendelse, index) in hendelser">

      <h3>Hendelse {{ index + 1 }}</h3>
      <textarea class="medium-text" v-model="hendelse.hendelse"></textarea>
      <div>
        <button v-if="hendelse.sannsynlighet && hendelse.konsekvens && !hendelse.update"
                @click="toggleUpdate(hendelse)">Endre risiko
        </button>
        <!-- TODO only show after you get tiltak-->
        <button v-if="hendelse.sannsynlighet && hendelse.konsekvens && !hendelse.update_etter"
                @click="toggleUpdateEtter(hendelse)">Restrisiko
        </button>
        <!-- TODO add tiltak here -->
        <button @click="hendelser.splice(hendelser.indexOf(hendelse), 1)">Slett hendelse</button>
      </div>

      <MatrixTableEdit
          v-if="(!hendelse.sannsynlighet && !hendelse.konsekvens) || hendelse.update || hendelse.update_etter"
          :hendelse="hendelse" :index="index"></MatrixTableEdit>
    </div>

    <button @click="pushHendelse">Legg til</button>

<!--    TODO  ok  - now the focus is to connect -->

    <h2>Tiltak</h2>
    <table>
      <th style="width: 25px;">Nr.</th>
      <th>Beskrivelse</th>
      <th>Frist</th>
      <tr v-for="(tiltak, index) in tiltak">
        <td>{{ index + 1 }}</td>
        <td><textarea class="medium-text" v-model="tiltak.beskrivelse"></textarea></td>
        <td><textarea class="medium-text" v-model="tiltak.frist"></textarea></td>
        <td><button @click="tiltak.splice(tiltak.indexOf(tiltak), 1)">X</button></td>
      </tr>
    </table>
<!--    TODO Here we need to select which hendlese - so, we need a button on the actual one ... so that uh, we can add on. Needs dropdown to select existing and / or make new -->
    <button @click="pushTiltak">Legg til</button>
  </div>

  <div id="preview" class="preview">

<h2>Identifiserte hendelser</h2>
  <table class="data">
    <tr>
      <th style="width: 25px;">Nr. </th>
      <th>Hendelse</th>
      <th>S før</th>
      <th>K før</th>
      <th>S etter</th>
      <th>K etter</th>
    </tr>

    <tr v-for="(hendelse, index) in hendelser">
      <td>{{ index + 1 }}</td>
      <td>{{ hendelse.hendelse }}</td>
      <td>{{ hendelse.sannsynlighet }}</td>
      <td>{{ hendelse.konsekvens }}</td>
      <td>{{ hendelse.sannsynlighet_etter }}</td>
      <td>{{ hendelse.konsekvens_etter }}</td>
    </tr>

  </table>

<!--<h2>Planlagte tiltak</h2>
  <table class="data">
    <tr>
      <th style="width: 25px;">Nr. </th>
      <th>Hendelse nr</th>
      <th>Planlagte tiltak</th>
    </tr>

    <tr v-for="(hendelse, index) in hendelser">
      <td>{{ index + 1 }}</td>
      <td>{{ hendelse.hendelse }}</td>
      <td>Liste tiltak? / vise K/S før etter - eller farger? hmm Snakk med Rune, men forsøk på sammendarg</td>
    </tr>

  </table>-->




  <h2>Vurdert risiko med eksisterende tiltak</h2>
  <br />
    <MatrixTable :hendelser="hendelser"  />
  <br />
  <h2>Vurdert risiko med planlagte tiltak</h2>
  <br />
    <MatrixTableEtter :hendelser="hendelser" />
  </div>

</template>

