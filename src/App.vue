<script setup>
import { RouterLink, RouterView } from 'vue-router'
import MatrixTable   from "./components/MatrixTable.vue";
import MatrixTableEtter   from "./components/MatrixTableEtter.vue";
import MatrixTableEdit from "./components/MatrixTableEdit.vue";
</script>

<script>
import common from './components/common.js';
export default {
  data() {
    return {
      hendelser: [{hendelse: '', sannsynlighet: '', konsekvens: '', tiltak: []}],
      tiltak: []
    }
  },
  created() {
    this.copyTable = common.copyTable;
  },
  methods: {
    //  export json
    exportJson() {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(this.$data, null, 2)], {
        type: "application/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    //export json to console
    exportJsonToConsole() {
      console.log(JSON.stringify(this.$data, null, 2));
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
      this.tiltak.push({beskrivelse: '', frist: '', ansvarlig: '' });
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
    },
    toggleTiltaksliste(hendelse) {
      hendelse.update_tiltak = !hendelse.update_tiltak;
    },
    toggleTiltakForHendelse(hendelse, tiltaket) {
      // add the index of tiltaket to hendelse.tiltak
      if (!hendelse.tiltak) {
        hendelse.tiltak = [];
      }
      if (hendelse.tiltak.includes(tiltaket)) {
        hendelse.tiltak.splice(hendelse.tiltak.indexOf(tiltaket), 1);
      } else {
        hendelse.tiltak.push(tiltaket);
      }
      console.log(hendelse.tiltak[0]);
    },
    slettTiltak(tiltaket, tiltak) {
      // iterate hendelser, and delete tiltaket from all lists that include it in hendlerser.tiltak
      for (let hendelse of this.hendelser) {
        if (hendelse.tiltak.includes(tiltaket)) {
          hendelse.tiltak.splice(hendelse.tiltak.indexOf(tiltaket), 1);
        }
      }
      tiltak.splice(tiltak.indexOf(tiltaket), 1)
    }
  }
}
</script>

<template>

  <nav>
    <button @click="save">Lagre</button>
    <button @click="load">Last inn</button>
    <button @click="exportJson">Lagre Json</button>
    <button @click="loadJson">Last inn fra Json</button>
    <button @click="exportJsonToConsole">Json til console</button>
  </nav>
  <div id="edit" class="edit">
  <h2>Hendelser</h2>
    <div class="hendelse" v-for="(hendelse, index) in hendelser">

      <h3>Hendelse {{ index + 1 }}</h3>
      <textarea placeholder="[Trussel] utnytter {Sårbarhet] for/til å skade/stjele [Verdi]" class="medium-text" v-model="hendelse.hendelse"></textarea>

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
        <button v-if="!hendelse.update_tiltak && tiltak.length > 0" @click="toggleTiltaksliste(hendelse)">Velg tiltak</button>
        <button v-if="hendelse.update_tiltak" @click="toggleTiltaksliste(hendelse)">Lukk tiltaksliste</button>
      </div>

      <div v-if="hendelse.update_tiltak">
        <!-- List all tiltak here -->
        <div class="tiltaksVelger"  v-for="(tiltaket) in tiltak">

          <p @click="toggleTiltakForHendelse(hendelse, tiltaket)">
            <input  type="checkbox" :checked="hendelse.tiltak.includes(tiltaket)" />
            {{ tiltaket.beskrivelse }}

          </p>

        <!-- TODO here we just show all the tiltaks in a button  list, like the matrix,and we can check and stuff -->
        </div>
      </div>
      <MatrixTableEdit
          v-if="(!hendelse.sannsynlighet && !hendelse.konsekvens) || hendelse.update || hendelse.update_etter"
          :hendelse="hendelse" :index="index"></MatrixTableEdit>
    </div>

    <button @click="pushHendelse">Ny hendelse</button>

<!--    TODO  ok  - now the focus is to connect -->

  <h2>Tiltak</h2>
    <table>
      <th class="col-small">Nr.</th>
      <th class="col-medium">Beskrivelse</th>
      <th>Frist</th>
      <th>Ansvarlig</th>
      <tr v-for="(tiltaket, index) in tiltak">
        <td>{{ index + 1 }}</td>
        <td><textarea class="small-text" v-model="tiltaket.beskrivelse"></textarea></td>
        <td><textarea class="small-text" v-model="tiltaket.frist"></textarea></td>
        <td><textarea class="small-text" v-model="tiltaket.ansvarlig"></textarea></td>
        <td><button @click="slettTiltak(tiltaket, tiltak)">Slett tiltak</button></td>
      </tr>
    </table>
  <button @click="pushTiltak">Nytt tiltak</button>
  </div>

  <div id="preview" class="preview">

<h2>Identifiserte hendelser</h2>
  <table id="hendelseList" class="data">
    <tr>
      <th class="col-small">Nr. </th>
      <th>Hendelse</th>
      <th> Tiltak </th>
      <th> Redusert risiko </th>
    </tr>

    <tr v-for="(hendelse, index) in hendelser">
      <td>{{ index + 1 }}</td>
      <!-- iterate hendlese.tiltak here -->

      <td>{{ hendelse.hendelse }}</td>
      <td>
      <div v-if="hendelse.tiltak.length === 1">
        {{ hendelse.tiltak[0].beskrivelse }}
      </div>

          <ul v-if="hendelse.tiltak.length > 1" v-for="tiltaket in hendelse.tiltak">
            <li>{{ tiltaket.beskrivelse }}</li>
          </ul>
        </td>
      <td>
        <span v-if="hendelse.konsekvens_etter < hendelse.konsekvens">K </span>
        <span v-if="hendelse.sannsynlighet_etter < hendelse.sannsynlighet">S </span>
      </td>
    </tr>

  </table>
    <button class="copy-button" @click="copyTable('hendelseList')">Kopier tabell</button>


 <h2>Planlagte tiltak</h2>
  <table id="tiltakList" class="data">
    <tr>
      <th class="col-small">Nr. </th>
      <th>Tiltak</th>
      <th>Frist</th>
      <th>Ansvarlig</th>
    </tr>

    <tr v-for="(tiltaket, index) in tiltak">
      <td>{{ index + 1 }}</td>
      <td>{{ tiltaket.beskrivelse }}</td>
      <td>{{ tiltaket.frist }}</td>
      <td>{{ tiltaket.ansvarlig }}</td>
    </tr>

  </table>
  <button class="copy-button" @click="copyTable('tiltakList')">Kopier tabell</button>




  <h2>Vurdert risiko med eksisterende tiltak</h2>
  <br />
    <MatrixTable :hendelser="hendelser"  />
  <br />
  <h2>Vurdert risiko med planlagte tiltak</h2>
  <br />
    <MatrixTableEtter :hendelser="hendelser" />
  </div>

</template>

