<script setup xmlns="http://www.w3.org/1999/html">
import MatrixTable   from "./components/MatrixTable.vue";
import MatrixTableEtter   from "./components/MatrixTableEtter.vue";
import MatrixTableEdit from "./components/MatrixTableEdit.vue";
</script>

<script>
import common from './common.js';
export default {
  data() {
    return {
      hendelser: [{hendelse: '', sannsynlighet: '', konsekvens: '', tiltak: []}],
      tiltak: [],
      tittel: '',
      saveEmoji : false,
      loadOverlay: false,
      savedLocal: []
    }
  },
  created() {
    this.copyTable = common.copyTable;
  },
  beforeCreate() {
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 's') {
          e.preventDefault();
          this.save();
        }
      });
  },
  watch: {
    tittel(newTitle) {
      document.title = 'Rosinator ' + newTitle;
    },
  },
  methods: {
    //  export json
    exportJson() {
      let tmp = this.$data;
      delete tmp.saveEmoji;
      delete tmp.loadOverlay;
      delete tmp.savedLocal;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(tmp, null, 2)], {
        type: "application/json"
      }));
      a.setAttribute("download", "data.json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    //export json to console
    exportJsonToConsole() {
      let tmp = this.$data;
      delete tmp.saveEmoji;
      delete tmp.loadOverlay;
      delete tmp.savedLocal;
      console.log(JSON.stringify(tmp, null, 2));
    },
    // save to local storage
    save() {
      this.saveEmoji = true;
      setTimeout(() => {
        this.saveEmoji = false;
      }, 1000);

      localStorage.setItem('tittel', this.tittel);

      // save hendelser and tiltak under the key tittel if it exists
      if (this.tittel) {
        localStorage.setItem(this.tittel, JSON.stringify(this.$data));
      } else {
        localStorage.setItem('hendelser', JSON.stringify(hendelser));
        localStorage.setItem('tiltak', JSON.stringify(tiltak));
      }

    },
    // load from local storage
    load() {
      this.loadOverlay = true;
      let savedLocal = Object.keys(localStorage);
      // filter out hendelser, tiltak and tittel from savedLocal
      savedLocal = savedLocal.filter((item) => {
        return item !== 'hendelser' && item !== 'tiltak' && item !== 'tittel';
      });
      this.savedLocal = savedLocal;
    },
    loadFromLocalStorage(key) {
      let data = JSON.parse(localStorage.getItem(key));
      this.hendelser = data.hendelser;
      this.tiltak = data.tiltak;
      this.tittel = key;
      this.loadOverlay = false;
    },
    loadSelected() {
      this.loadOverlay = false;
    },
    // load from json
    loadJson() {
      let json = prompt('Paste JSON here');
      let data = JSON.parse(json);
      this.hendelser = data.hendelser;
      this.tiltak = data.tiltak;
      this.tittel = data.tittel;
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
      this.tiltak.push({beskrivelse: '', frist: '', ansvarlig: '', konsekvens: false, sannsynlighet: false });
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
        // iterate hendelse.tiltak, and delete tiltaket from all lists that include it in hendelse.tiltak
        for (let currentTiltak of hendelse.tiltak)
          if(currentTiltak.beskrivelse === tiltaket.beskrivelse) {
            hendelse.tiltak.splice(hendelse.tiltak.indexOf(tiltaket), 1);
          }
        if (hendelse.tiltak.includes(tiltaket)) {
        }
      }
      tiltak.splice(tiltak.indexOf(tiltaket), 1)
    },
    toggleTiltakKonsekvens(tiltak) {
      tiltak.konsekvens = !tiltak.konsekvens;
    },
    toggleTiltakSannsynlighet(tiltak) {
      tiltak.sannsynlighet = !tiltak.sannsynlighet;
    },
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
    <br />
    <span v-if="saveEmoji">Lagrer ... 💾</span>
  </nav>

  <div class="loading-menu" v-if="loadOverlay">
    <h1>Velg ROS</h1>
    <button v-for="item in this.savedLocal" @click="loadFromLocalStorage(item)">{{ item }}</button>
    <br />
    <button @click="loadSelected">Lukk</button>
  </div>
  <div class="loading-overlay" v-if="loadOverlay"></div>

  <div id="edit" class="edit">
  <h1>ROS for: <input v-model="tittel" /></h1>
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
      <th>Risikoreduserende</th>
      <tr v-for="(tiltaket, index) in tiltak">
        <td>{{ index + 1 }}</td>
        <td><textarea class="small-text" v-model="tiltaket.beskrivelse"></textarea></td>
        <td><textarea class="small-text" v-model="tiltaket.frist"></textarea></td>
        <td><textarea class="small-text" v-model="tiltaket.ansvarlig"></textarea></td>
        <td class="multi-check">
          <span @click="toggleTiltakKonsekvens(tiltaket)">Konsekvens: <input type="checkbox" :checked="tiltaket.konsekvens"/></span>
          <span @click="toggleTiltakSannsynlighet(tiltaket)">Sannsynlighet: <input type="checkbox" :checked="tiltaket.sannsynlighet"/></span>
        </td>
        <td><button @click="slettTiltak(tiltaket, tiltak)">Slett tiltak</button></td>
      </tr>
    </table>
  <button @click="pushTiltak">Nytt tiltak</button>
  </div>

  <div id="preview" class="preview">
<h1>ROS for: {{ tittel }}</h1>
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
      <th>Risikoreduserende</th>
    </tr>

    <tr v-for="(tiltaket, index) in tiltak">
      <td>{{ index + 1 }}</td>
      <td>{{ tiltaket.beskrivelse }}</td>
      <td>{{ tiltaket.frist }}</td>
      <td>{{ tiltaket.ansvarlig }}</td>
      <td><span v-if="tiltaket.konsekvens">K </span> <span v-if="tiltaket.sannsynlighet">S </span></td>
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

