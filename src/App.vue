<script setup xmlns="http://www.w3.org/1999/html">
import MatrixTable from "./components/MatrixTable.vue";
import MatrixTableEtter from "./components/MatrixTableEtter.vue";
import MatrixTableEdit from "./components/MatrixTableEdit.vue";</script>

<script>
import common from './common.js';
export default {
  data() {
    return {
      hendelser: [{hendelse: '', sannsynlighet: '', konsekvens: '', tiltak: []}],
      tiltak: [],
      tittel: '',
      saveEmoji : false,
      version: '1.0.0',
      savedLocal: []
    }
  },
  created() {
    this.copyTable = common.copyTable;
    this.filterLocal();
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
      this.save();
      let tmp = this.$data;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([JSON.stringify(tmp, null, 2)], {
        type: "application/json"
      }));
      // filename string  is title + version
      a.setAttribute("download", this.tittel + "-" + this.version + ".json");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    },
    exportLocalToJson() {
      this.save();
      // export local storage to json
      let tmp = "{ \"Roser\" : [\n"
      for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if(key === 'tittel' || key === 'hendelser' || key === 'tiltak') continue;

         //Adding commas for json validity
        if (i > 0 && i < localStorage.length ) {
              tmp += ",\n"
        }

        var tmpItem = localStorage.getItem(key);

        tmp += JSON.stringify(JSON.parse(tmpItem), null, 2)

      }
      tmp += "]}"

      // save tmp string to file
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([tmp], {
        type: "text/plain"
      }));

      a.setAttribute("download", "all-ros.txt");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
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
      this.filterLocal();

    },
    filterLocal() {
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
      this.version = data.version;
      this.fixAssociations()
      this.loadOverlay = false;
    },
    loadJsonFromFile(filePath){
      // load json from user file input
      let file = filePath.target.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        let topLevel = JSON.parse(reader.result);
        console.log(topLevel)

        // if first element is an array named ROSER, loop and echo all elements
        if(topLevel.Roser){
          topLevel.Roser.forEach((element) => {
            this.hendelser = element.hendelser;
            this.tiltak = element.tiltak;
            this.tittel = element.tittel;
            this.version = element.version;
            this.fixAssociations();
            this.save();

          });
        } else {
          // if not, echo the first element
          let data = JSON.parse(reader.result);
          this.hendelser = data.hendelser;
          this.tiltak = data.tiltak;
          this.tittel = data.tittel;
          this.version = data.version;
          this.fixAssociations();
          this.save();
        }
      };
    },
    fixAssociations() {
      // iterate through hendelser if beskrivelse match a tiltak, set that as refrence
      this.hendelser.forEach((hendelse) => {
        // make a copy of hendelse.tiltak
        let tmpTiltak = JSON.parse(JSON.stringify(hendelse.tiltak));
        // delete hendlese tiltak
        hendelse.tiltak = [];

        tmpTiltak.forEach((tiltaket) => {
          this.tiltak.forEach((tiltakLocal) => {
            if(tiltaket.beskrivelse === tiltakLocal.beskrivelse &&
                tiltaket.ansvarlig === tiltakLocal.ansvarlig &&
                tiltaket.frist === tiltakLocal.frist &&
                tiltaket.konsekvens === tiltakLocal.konsekvens &&
                tiltaket.sannsynlighet === tiltakLocal.sannsynlighet){
              hendelse.tiltak.push(tiltakLocal);
            }
          });
        });
      });
    },

    pushHendelse() {
      // create if empty
      if (!this.hendelser) {
        this.hendelser = [];
      }
      // push
      this.hendelser.push({hendelse: '', sannsynlighet: '', konsekvens: '', tiltak: []});
    },
    moveUp(item, list) {
      let index = list.indexOf(item);
      // if index is 0, do nothing
      if (this.isFirst(item, list)) return;
      // else, swap with previous
      let tmp = list[index - 1];
      list[index - 1] = item;
      list[index] = tmp;
    },
    moveDown(item, list) {
      let index = list.indexOf(item);
      // if index is last, do nothing
      if (this.isLast(item, list)) return;
      // else, swap with next
      let tmp = list[index + 1];
      list[index + 1] = item;
      list[index] = tmp;
    },
    isLast(item, list) {
      return list.indexOf(item) === list.length - 1
    },
    isFirst(item, list) {
      return list.indexOf(item) === 0
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
    isActive(item) {
      if (this.$data && this.$data.tittel) {
        return this.$data.tittel === item;
      }
      return false
    },
  }
}
</script>

<template>
  <nav>
    <input style="display: none" id="files" type="file" @change="loadJsonFromFile" /> <label class="ros-tab" for="files">Last inn</label>
    <button :class="{ active: isActive(item) }" class="ros-tab" v-for="item in savedLocal" @click="loadFromLocalStorage(item)">{{ item }}</button>
    <button class="ros-tab export" @click="exportLocalToJson">Eksporter alle ROS</button>
  </nav>
  <div id="edit" class="edit">
  <span v-if="saveEmoji">Lagrer {{ tittel }} ... 💾</span>
  <h1>ROS for: <input v-model="tittel" /> Versjon: <input v-model="version" />
    <span v-if="$data.tittel"><button @click="save">Lagre</button> <button @click="exportJson">Eksporter</button></span>
  </h1>

  <h2>Hendelser</h2>
    <div class="hendelse" v-for="(hendelse, index) in hendelser">
      <h3>Hendelse {{ index + 1 }}
        <span style="float:right">
          <button v-if="!isFirst(hendelse, hendelser)" @click="moveUp(hendelse, hendelser)">⬆</button>
          <button v-if="!isLast(hendelse, hendelser)" @click="moveDown(hendelse, hendelser)">⬇</button>
        </span>
      </h3>
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
        <td><button @click="slettTiltak(tiltaket, tiltak)">Slett tiltak</button>
        </td>
        <td class="up-downg">
          <button v-if="!isFirst(tiltaket, tiltak)" @click="moveUp(tiltaket, tiltak)">⬆</button>
          <button v-if="!isLast(tiltaket, tiltak)" @click="moveDown(tiltaket, tiltak)">⬇</button>
        </td>
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

