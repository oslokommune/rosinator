<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MatrixTable   from "./components/MatrixTable.vue";
import MatrixTableEtter   from "./components/MatrixTableEtter.vue";
import html2pdf from "html2pdf.js";
</script>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      verdier: [ {tittel: '', fokus: ''}],
      hendelser : [ {hendelse: '', situasjon: '', action: '', sannsynlighet: '', konsekvens: '', sannsynlighet_etter: '', konsekvens_etter: ''}],
      tiltak: [ { beskrivelse: '', frist: ''}]
    }
  },
  methods: {
    exportToPDF() {
      html2pdf(document.getElementById("preview"), {
        margin: 1,
        filename: "ros.pdf",
      });
    },
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
      let {title, description, verdier, hendelser, tiltak} = this;
      localStorage.setItem('title', title);
      localStorage.setItem('description', description);
      localStorage.setItem('verdier', JSON.stringify(verdier));
      localStorage.setItem('hendelser', JSON.stringify(hendelser));
      localStorage.setItem('tiltak', JSON.stringify(tiltak));
    },
    // load from local storage
    load() {
      this.title = localStorage.getItem('title');
      this.description = localStorage.getItem('description');
      this.verdier = JSON.parse(localStorage.getItem('verdier'));
      this.hendelser = JSON.parse(localStorage.getItem('hendelser'));
      this.tiltak = JSON.parse(localStorage.getItem('tiltak'));
    },
    // load from json
    loadJson() {
      let json = prompt('Paste JSON here');
      let data = JSON.parse(json);
      this.title = data.title;
      this.description = data.description;
      this.verdier = data.verdier;
      this.hendelser = data.hendelser;
      this.tiltak = data.tiltak;
    },
    fullEdit() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      edit.style.width = '100%'
      edit.style.display = 'block';
      preview.style.display = 'none';
    },
    fullPreview() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      preview.style.width = '100%'
      preview.style.display = 'block';
      edit.style.display = 'none';
    },
    sideBySide() {
      let edit = document.getElementById('edit');
      let preview = document.getElementById('preview');
      edit.style.width = '';
      preview.style.width = '';
      preview.style.display = 'block';
      edit.style.display = 'block';
    },
    toggle(id) {
      let elem = document.getElementById(id);
      if (elem.style.display === 'none') {
        elem.style.display = 'block';
      } else {
        elem.style.display = 'none';
      }
    },
    pushHendelse() {
      // create if empty
      if (!this.hendelser) {
        this.hendelser = [];
      }
      // push
      this.hendelser.push({hendelse: '', situasjon: '', action: '', sannsynlighet: '', konsekvens: ''});
    },
    pushVerdi() {
      // create if empty
      if (!this.verdier) {
        this.verdier = [];
      }
      // push
      this.verdier.push({tittel: '', fokus: ''});
    },
    pushTiltak() {
      // create if empty
      if (!this.tiltak) {
        this.tiltak = [];
      }
      // push
      this.tiltak.push({beskrivelse: '', frist: ''});
    }
  }
}
</script>

<template>

  <nav>

    <button @click="save">Sav to local</button>
    <button @click="load">Load from local</button>
    <button @click="fullEdit">Edit view</button>
    <button @click="fullPreview">Preview view</button>
    <button @click="sideBySide">Side-by-side</button>
    <button @click="exportJson">Save as Json</button>
    <button @click="loadJson">Load from Json</button>
    <button @click="exportToPDF">Save as pdf</button>
    <button @click="exportJsonToConsole">Dump Json to console</button>
  </nav>
  <div id="edit" class="edit">
  <h2>Overskriften til rosen</h2>
  <input class="single" v-model="title">
  <h2>Beskrivelse av løsningen</h2>
    <textarea class="long-text" v-model="description"></textarea>
    <h2>Verdier som skal beskyttes <button @click="toggle('verdier_hjelp')">?</button></h2>

    <p id="verdier_hjelp">Verdiene i løsningen man ønsker å beskytte (skrive noe mer om K I T) og hva det betyr</p>
    <table>
      <tr>
        <th>Verdi</th>
        <th>Vekting</th>
      </tr>
      <tr v-for="verdi in verdier">
        <td><textarea class="medium-text" v-model="verdi.tittel"></textarea></td>
        <td><textarea class="medium-text" v-model="verdi.fokus"></textarea></td>
        <td><button @click="verdier.splice(verdier.indexOf(verdi), 1)">X</button></td>
      </tr>
    </table>
  <button @click="pushVerdi">Legg til</button>
     <h2>Hendelser  <button @click="toggle('hendelser_hjelp')">?</button></h2>

    <p id="hendelser_hjelp">Skriv om hendleser ...</p>
  <table>
    <tr>
      <th>Nr.</th>
      <th>Hendelse</th>
      <th>Eksisteredne tiltak</th>
      <th>Planlagte tiltak</th>
      <th>Sannsynlighet</th>
      <th>Konsekvens</th>
    </tr>
    <tr v-for="(hendelse, index) in hendelser">
      <td>{{ index + 1 }}</td>
      <td><textarea class="medium-text" v-model="hendelse.hendelse"></textarea></td>
      <td><textarea class="medium-text" v-model="hendelse.situasjon"> </textarea></td>
      <td><textarea class="medium-text" v-model="hendelse.action"></textarea></td>
      <td>
        <select v-model="hendelse.sannsynlighet">
        <option value="1">Meget Liten</option>
        <option value="2">Liten</option>
        <option value="3">Moderat</option>
        <option value="4">Stor</option>
        <option value="5">Svært stor</option>
      </select>
      </td>
      <td>
        <select v-model="hendelse.konsekvens">
        <option value="1">Ubetydelig</option>
        <option value="2">Lav</option>
        <option value="3">Moderat</option>
        <option value="4">Alvorlig</option>
        <option value="5">Svært alvorlig</option>
      </select></td>
      <td><button @click="hendelser.splice(hendelser.indexOf(hendelse), 1)">X</button></td>
    </tr>
    </table>
    <button @click="pushHendelse">Legg til</button>

    <h2>Tiltak</h2>
    <table>
      <th>Nr.</th>
      <th>Beskrivelse</th>
      <th>Frist</th>
      <tr v-for="(tiltak, index) in tiltak">
        <td>{{ index + 1 }}</td>
        <td><textarea class="medium-text" v-model="tiltak.beskrivelse"></textarea></td>
        <td><textarea class="medium-text" v-model="tiltak.frist"></textarea></td>
        <td><button @click="tiltak.splice(tiltak.indexOf(tiltak), 1)">X</button></td>
      </tr>
    </table>
    <button @click="pushTiltak">Legg til</button>

    <h2>Vurdert risiko etter tiltak</h2>
    <table>
      <tr>
        <th>Nr.</th>
        <th>Hendelse</th>
        <th>Sannsynlighet etter tiltak</th>
        <th>Konsekvens etter tiltak</th>
      </tr>
      <tr v-for="(hendelse, index) in hendelser">
        <td>{{ index + 1 }}</td>
        <td>{{ hendelse.hendelse }}</td>
        <td>
          <select v-model="hendelse.sannsynlighet_etter">
            <option value="1">Meget Liten</option>
            <option value="2">Liten</option>
            <option value="3">Moderat</option>
            <option value="4">Stor</option>
            <option value="5">Svært stor</option>
          </select>
        </td>
        <td>
          <select v-model="hendelse.konsekvens_etter">
            <option value="1">Ubetydelig</option>
            <option value="2">Lav</option>
            <option value="3">Moderat</option>
            <option value="4">Alvorlig</option>
            <option value="5">Svært alvorlig</option>
          </select></td>
      </tr>
    </table>



  </div>

  <div id="preview" class="preview">
  <h1>{{ title }}</h1>
  <pre>{{ description }}</pre>

  <h2>Verdier i løsningen</h2>
  <table class="data">
    <tr>
      <th>Verdi</th>
      <th>Vekting</th>
    </tr>

    <tr v-for="verdi in verdier" :key="verdi.tittel">
      <td>{{ verdi.tittel }}</td>
      <td>{{ verdi.fokus }}</td>
    </tr>

  </table>

<h2>Identifiserte hendelser</h2>
    <table class="data">
      <tr>
        <th>Hendelse</th>
        <th>Eksisterende tiltak</th>
        <th>Planlagte tiltak</th>
      </tr>

      <tr v-for="hendelse in hendelser">
        <td>{{ hendelse.hendelse }}</td>
        <td>{{ hendelse.situasjon }}</td>
        <td>{{ hendelse.action }}</td>
      </tr>

    </table>
  <h2>Vurdert risiko med eksisterende tiltak</h2>
  <br />
    <MatrixTable :hendelser="hendelser"  />
  <br />
  <h2>Vurdert risiko med planlagte tiltak</h2>
  <br />
    <MatrixTableEtter :hendelser="hendelser" />
  </div>

</template>

